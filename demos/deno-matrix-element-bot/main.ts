import "$std/dotenv/load.ts";
import { serve } from "$std/http/server.ts";
import {
  instantiate,
  matrix_message as matrixMessage,
} from "@/lib/deno_matrix_element_bot.generated.js";
import { Temporal } from "js-temporal/polyfill/?dts";

const ELEMENT_ROOM_ID = Deno.env.get("ELEMENT_ROOM_ID");
const ELEMENT_BOT_USERNAME = Deno.env.get("ELEMENT_BOT_USERNAME");
const ELEMENT_BOT_PASSWORD = Deno.env.get("ELEMENT_BOT_PASSWORD");

const port = 8080;

function logRequest(request: Request, response: Response) {
  const { method, url } = request;
  const { hostname, pathname } = new URL(url);
  const dateTime = Temporal.Now.plainDateTimeISO();
  const dateTimeString = `${dateTime.toPlainDate().toString()} ${
    dateTime.toLocaleString("en-GB", { timeStyle: "short" })
  }`;
  console.log(
    `[${dateTimeString}] ${method} ${hostname}${pathname} ${response.status} ${response.statusText}`,
  );
}

const handler = async (request: Request): Promise<Response> => {
  if (typeof ELEMENT_ROOM_ID === "undefined") {
    throw new Error("env `ELEMENT_ROOM_ID` must be set");
  }
  if (typeof ELEMENT_BOT_USERNAME === "undefined") {
    throw new Error("env `ELEMENT_BOT_USERNAME` must be set");
  }
  if (typeof ELEMENT_BOT_PASSWORD === "undefined") {
    throw new Error("env `ELEMENT_BOT_PASSWORD` must be set");
  }

  const { method, url } = request;
  const { pathname } = new URL(url);

  if (pathname === "/matrix-message" && method === "POST") {
    const body = await request.text();

    await instantiate();

    // remember to authenticate request before sending a message in a real-world app
    try {
      const messageSent = await matrixMessage(
        ELEMENT_ROOM_ID,
        body,
        ELEMENT_BOT_USERNAME,
        ELEMENT_BOT_PASSWORD,
      );

      if (!messageSent) {
        const response = new Response("Bad request", { status: 400 });
        logRequest(request, response);

        return response;
      }
    } catch (error) {
      console.error(`Error sending message: ${error}`);
      return new Response("Server error", { status: 500 });
    }

    const response = new Response(null, { status: 204 });
    logRequest(request, response);
    return response;
  }
  const response = new Response("Bad request", { status: 400 });
  logRequest(request, response);

  return response;
};

await serve(handler, { port });
