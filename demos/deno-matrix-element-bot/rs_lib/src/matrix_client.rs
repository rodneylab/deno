use matrix_sdk::{
	config::SyncSettings,
	room::Room,
	ruma::{events::room::message::RoomMessageEventContent, RoomId},
	Client,
};

pub struct MatrixClient<'a> {
	homeserver_url: &'a str,
	username: &'a str,
	password: &'a str,
	room_id: &'a str,
}

impl <'a> MatrixClient<'a> {
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
			let client_builder = Client::builder().homeserver_url(self.homeserver_url);
			let client = client_builder.build().await.unwrap();
			if client
					.login_username(self.username, self.password)
					.initial_device_display_name("deno-matrix-element-bot app")
					.send()
					.await
					.is_err()
			{
					return false;
			}
			if client.sync_once(SyncSettings::default()).await.is_err() {
					return false;
			}

			let content = RoomMessageEventContent::text_plain(message);
			let owned_room_id = match RoomId::parse(self.room_id) {
					Ok(value) => value,
					Err(_) => return false,
			};
			let room = client.get_room(&owned_room_id).unwrap();
			if let Room::Joined(room) = room {
					room.send(content, None).await.is_ok()
			} else {
					false
			}
	}
}
