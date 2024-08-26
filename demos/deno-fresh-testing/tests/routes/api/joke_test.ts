import { createHandler } from "$fresh/server.ts";
import config from "@/fresh.config.ts";
import manifest from "@/fresh.gen.ts";
import { assert, assertEquals } from "@std/assert";
import { load } from "@std/dotenv";

await load({ envPath: ".env.test", export: true });

const url = "http://127.0.0.1:8001/api/joke";

Deno.test("Jokes API route", async (t) => {
  const handler = await createHandler(manifest, config);

  await t.step("it returns a joke", async () => {
    //const response = await handler(new Request(url, {}), CONN_INFO);
    const response = await handler(new Request(url, {}));
    const { status } = response;
    assertEquals(status, 200);

    const body = await response.text();
    assert(body);
  });
});
