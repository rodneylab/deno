#![warn(clippy::all, clippy::pedantic)]

mod matrix_client;

use matrix_client::MatrixClient;
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

#[wasm_bindgen]
pub async fn matrix_message(
  element_room_id: &str,
  body: &str,
  element_username: &str,
  element_password: &str,
) -> bool {
  let matrix_client = MatrixClient::new(
    element_username,
    element_password,
    element_room_id,
    None,
  );
  matrix_client.send_message(body).await
}
