use matrix_sdk::{
  config::SyncSettings,
  ruma::{events::room::message::RoomMessageEventContent, RoomId},
  Client,
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

pub struct MatrixClient<'a> {
  homeserver_url: &'a str,
  username: &'a str,
  password: &'a str,
  room_id: &'a str,
}

impl<'a> MatrixClient<'a> {
  pub fn new(
    username: &'a str,
    password: &'a str,
    room_id: &'a str,
    homeserver_url: Option<&'a str>,
  ) -> MatrixClient<'a> {
    let actual_homeserver_url: &str = match homeserver_url {
      Some(value) => value,
      None => "https://matrix-client.matrix.org",
    };

    MatrixClient {
      homeserver_url: actual_homeserver_url,
      username,
      password,
      room_id,
    }
  }

  pub async fn send_message(&self, message: &str) -> bool {
    let Ok(client) = Client::builder()
      .homeserver_url(self.homeserver_url)
      .build()
      .await
    else {
      return false;
    };
    if client
      .matrix_auth()
      .login_username(self.username, self.password)
      .initial_device_display_name("deno-matrix-element-bot app")
      .await
      .is_err()
    {
      return false;
    }
    let _ = if let Ok(value) = client.sync_once(SyncSettings::default()).await {
      value.next_batch
    } else {
      let _ = client.matrix_auth().logout().await;
      return false;
    };

    let content = RoomMessageEventContent::text_plain(message);
    let Ok(owned_room_id) = RoomId::parse(self.room_id) else {
      return false;
    };
    let room = match client.join_room_by_id(&owned_room_id).await {
      Ok(value) => value,
      Err(error) => {
        console_log!("Error joining room: {error}");
        let _ = client.matrix_auth().logout().await;
        return false;
      }
    };
    let send_result = room.send(content).await.is_ok();
    let _ = client.matrix_auth().logout().await;
    send_result
  }
}
