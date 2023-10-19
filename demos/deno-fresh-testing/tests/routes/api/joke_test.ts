import type { ServeHandlerInfo } from "$fresh/server.ts";
import { createHandler } from "$fresh/server.ts";
import { assert, assertEquals } from "$std/assert/mod.ts";
import { load } from "$std/dotenv/mod.ts";
import config from "@/fresh.config.ts";
import manifest from "@/fresh.gen.ts";

await load({ envPath: ".env.test", export: true });

const url = "http://127.0.0.1:8001/api/joke";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("Jokes API route", async (t) => {
  const handler = await createHandler(manifest, config);

  await t.step("it returns a joke", async () => {
    const response = await handler(new Request(url, {}), CONN_INFO);
    const { status } = response;
    assertEquals(status, 200);

    const body = await response.text();
    assert(body);
  });
});
