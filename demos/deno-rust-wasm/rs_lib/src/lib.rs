use photon_rs::{
  native::open_image_from_bytes,
  transform::{resize, SamplingFilter},
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

const PLACEHOLDER_WIDTH: u32 = 10;

#[wasm_bindgen]
pub fn base64_placeholder(data: &mut [u8]) -> String {
  let image = match open_image_from_bytes(data) {
    Ok(value) => value,
    Err(_) => {
      console_log!("Unable to open image");
      return String::from("");
    }
  };
  let aspect_ratio = image.get_width() / image.get_height();

  resize(
    &image,
    PLACEHOLDER_WIDTH,
    PLACEHOLDER_WIDTH / aspect_ratio,
    SamplingFilter::Lanczos3,
  )
  .get_base64()
}

#[cfg(test)]
mod tests {
  use super::*;
  use photon_rs::native::open_image;

  #[test]
  fn it_works() {
    let image = open_image("../content/dinosaur-lemon.jpg").unwrap();
    assert_eq!(512, image.get_height());
    //let result = base64_placeholder("1");
    //assert_eq!(result, String::from("Hello"));
  }
}
