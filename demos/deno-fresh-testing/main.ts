/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import { load } from "@std/dotenv";
import manifest from "@/fresh.gen.ts";
import config from "@/fresh.config.ts";

await load({ export: true });

await start(manifest, config);
