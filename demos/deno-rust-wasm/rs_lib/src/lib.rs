#![warn(clippy::all, clippy::pedantic)]

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
#[must_use]
pub fn base64_placeholder(data: &[u8]) -> String {
  let Ok(image) = open_image_from_bytes(data) else {
    console_log!("Unable to open image");
    return String::new();
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
  use super::base64_placeholder;
  use std::{fs::File, io::Read, path::Path};

  #[test]
  fn test_base64_placeholder() {
    // arrange
    let path = Path::new("../content/dinosaur-lemon.png");
    let mut file = File::open(&path).expect("Error opening file for test");
    let mut bytes = Vec::new();
    file
      .read_to_end(&mut bytes)
      .expect("Error reading bytes into vector");

    // act
    let result = base64_placeholder(bytes.as_ref());

    // assert
    let expected = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABfklEQVR4nA2QS0hUARiFv/869zXONE3OODTMkJVgbS1aRdAqqk1R0c5lu6AgKAhaRAthFhbVpkV7o32mu3Ez4KAgig/EJ6JXUcfxjo979f7e/Tkf53zytVJXESGKlGynw9WbWZJpm6kxD2/1gPL1DIVyGhmojGl0BhoHLUsQQ1AxMNrATSYwrTYauyfIt4G65gtJUhddFlYCjkPBDlq4jpK6YGPERb8RID8qNTVtG8Im9uI4rr+Ld+0+p1YOCQ8JY7Q4JvJlcFn9IM3toX7uVCvUel+y+fAVbrxrL7zMVqOKVXKQJ++G9Pn0b+7O/KfW3cPfR+9ZOSuTbR+l98oaM+tlNva7kLV8SounPvOZTl48/keu4xIT6zkG+57x4N4wn36+5fv0Z+TXh6SWRgTPNJl8fQPf6mHZu0W3LpFv7vDHe0PDiIn9ddSYMzhKKYWSkgjiX9uwJ1n2zSJGZNNslZCPfXlNdIWYTkSUUFrVDP6sg5tr0V70Yz0RHU8POQcy448ICLEvggAAAABJRU5ErkJggg==";
    assert_eq!(expected, result);
  }
}
