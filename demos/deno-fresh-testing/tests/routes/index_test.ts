import { createHandler } from "$fresh/server.ts";
import { load } from "$std/dotenv/mod.ts";
import type { ConnInfo } from "$std/http/server.ts";
import { assertEquals, assertStringIncludes } from "$std/testing/asserts.ts";
import { startOptions } from "@/configuration/configuration.ts";
import manifest from "@/fresh.gen.ts";
import { DOMParser } from "deno-dom/deno-dom-wasm.ts";

await load({ envPath: ".env.test", export: true });

const url = "http://127.0.0.1:8000/";

const CONN_INFO: ConnInfo = {
  localAddr: { hostname: "127.0.0.1", port: 8000, transport: "tcp" },
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("Home route", async (t) => {
  const handler = await createHandler(manifest, startOptions);

  await t.step("it returns a 200 status code", async () => {
    const response = await handler(new Request(url), CONN_INFO);
    const { status } = response;
    assertEquals(status, 200);
  });

  await t.step("it sets HTML lang attribute", async () => {
    const response = await handler(new Request(url), CONN_INFO);

    const body = await response.text();
    assertStringIncludes(body, `<html lang="en-GB">`);
  });

  await t.step("images have alt attribute", async () => {
    const response = await handler(new Request(url), CONN_INFO);
    const body = await response.text();
    const doc = new DOMParser().parseFromString(body, "text/html")!;
    const images = doc.getElementsByTagName("img");

    images.forEach((element) => {
      const altText = element.attributes.getNamedItem("alt")?.value;
      assertEquals(altText && typeof altText, "string");
    });
  });
});