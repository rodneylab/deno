import { debounce } from "$std/async/mod.ts";
import { relative, resolve } from "$std/path/mod.ts";
import { config } from "@/postcss.config.ts";
import postcss from "postcss/mod.js";

const STYLES_INPUT_DIRECTORY = "styles";

async function buildStyles(path: string) {
  try {
    const css = await Deno.readTextFile(path);

    const { css: outputCss } = await postcss(config.plugins).process(css, {
      from: undefined,
    });

    const __dirname = resolve();
    const outputPath = `./static/${relative(__dirname, path)}`;
    console.log(`Updating styles for ${outputPath}`);
    await Deno.writeTextFile(outputPath, outputCss);
  } catch (error: unknown) {
    console.error(`Error building styles for path ${path}: ${error as string}`);
  }
}

const debouncedBuildStyles = debounce(async (path: string) => {
  await buildStyles(path);
}, 200);

const stylesOutputDirectory = `static/${STYLES_INPUT_DIRECTORY}`;
try {
  Deno.statSync(stylesOutputDirectory);
} catch (error: unknown) {
  if (error instanceof Deno.errors.NotFound) {
    Deno.mkdir(stylesOutputDirectory);
  }
}

const watcher = Deno.watchFs([`./${STYLES_INPUT_DIRECTORY}`]);
for await (const event of watcher) {
  const { paths } = event;
  paths.forEach((path) => {
    debouncedBuildStyles(path);
  });
}
