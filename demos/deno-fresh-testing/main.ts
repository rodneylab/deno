/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import "$std/dotenv/load.ts";
import { startOptions } from "@/configuration/configuration.ts";
import manifest from "@/fresh.gen.ts";

await start(manifest, startOptions);
