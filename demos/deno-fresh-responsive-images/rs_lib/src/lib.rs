#![warn(clippy::all, clippy::pedantic)]

mod fit;

use fit::output_dimensions;
use image::{
  codecs::jpeg::JpegEncoder, error::ImageResult, imageops::FilterType,
  ImageFormat,
};
use serde::{Deserialize, Serialize};
use std::io::{Cursor, Read, Seek};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[allow(unused_macros)]
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[derive(Deserialize)]
struct ResizeInputOptions {
  width: Option<u32>,
  height: Option<u32>,
  fit: Option<String>,
}

#[derive(Debug, Eq, PartialEq, Serialize)]
struct ResizeResult {
  resized_image_bytes: Option<Vec<u8>>,
  mime_type: Option<String>,
  error: Option<String>,
}

fn image_mime_type(format: &ImageResult<ImageFormat>) -> Option<String> {
  match format {
    Ok(ImageFormat::Png) => Some(String::from("image/png")),
    Ok(ImageFormat::Jpeg) => Some(String::from("image/jpeg")),
    Ok(_) | Err(_) => None,
  }
}

fn error_result(message: &str) -> JsValue {
  let result = ResizeResult {
    resized_image_bytes: None,
    mime_type: None,
    error: Some(message.into()),
  };
  serde_wasm_bindgen::to_value(&result).unwrap()
}

#[wasm_bindgen]
#[must_use]
/// # Panics
/// Panics if unable to convert the result into a JSValue
pub fn resize_image(image_bytes: &[u8], options: JsValue) -> JsValue {
  let Ok(input_image) = image::load_from_memory(image_bytes) else {
    return error_result("Unable to read input image bytes.");
  };
  let (input_width, input_height) = (input_image.width(), input_image.height());
  let Ok(ResizeInputOptions { width, height, fit }) =
    serde_wasm_bindgen::from_value(options)
  else {
    return error_result("Unable to parse input options.");
  };

  let (output_width, output_height) =
    output_dimensions(input_width, input_height, width, height, fit.as_deref());
  let format = image::guess_format(image_bytes);
  let mime_type = image_mime_type(&format);

  // no need to resize if the input dimensions match output dimensions
  if output_width == input_width && output_height == input_height {
    let result = ResizeResult {
      resized_image_bytes: Some(image_bytes.to_vec()),
      mime_type,
      error: None,
    };
    return serde_wasm_bindgen::to_value(&result).unwrap();
  }

  let resized_image =
    input_image.resize(output_width, output_height, FilterType::Lanczos3);

  let mut cursor = Cursor::new(Vec::new());
  let output_result = match format {
    Ok(ImageFormat::Png) => {
      resized_image.write_to(&mut cursor, ImageFormat::Png)
    }
    Ok(ImageFormat::Jpeg) => {
      let jpeg_quality = 90;
      let jpeg_encoder =
        JpegEncoder::new_with_quality(&mut cursor, jpeg_quality);
      resized_image.to_rgb8().write_with_encoder(jpeg_encoder)
    }
    Ok(_) | Err(_) => {
      return error_result("Image type not currently supported.")
    }
  };
  if output_result.is_err() {
    return error_result(
      "Something went wrong writing the resized image to its output format.",
    );
  }

  let mut buffer = Vec::new();
  cursor.rewind().unwrap();
  cursor.read_to_end(&mut buffer).unwrap();
  let result = ResizeResult {
    resized_image_bytes: Some(buffer),
    mime_type,
    error: None,
  };
  serde_wasm_bindgen::to_value(&result).unwrap()
}
