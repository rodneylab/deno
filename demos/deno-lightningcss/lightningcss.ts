import { debounce } from "$std/async/mod.ts";
import { relative, resolve } from "$std/path/mod.ts";
import browserslist from "browserslist";
import { build } from "esbuild/mod.js";
import init, { browserslistToTargets, transform } from "lightningcss";

const __dirname = resolve();
const ignoreFiles = ["styles/main_bundled.css"];

await init();
console.log("Watching for updates...");

const targets = browserslistToTargets(
  browserslist(
    "> 0.5%, last 2 versions, Firefox >= 102, Firefox ESR, not dead",
  ),
);

async function buildStyles(path: string) {
  try {
    const css = await Deno.readTextFile(path);
    const { code: outputCss } = transform({
      filename: path,
      code: new TextEncoder().encode(css),
      minify: true,
      targets,
    });

    const outputDir = "./static";
    const outputPath = `${outputDir}/styles.css`;
    const decoder = new TextDecoder();
    try {
      await Deno.writeTextFile(outputPath, decoder.decode(outputCss));
    } catch (error: unknown) {
      if (error instanceof Deno.errors.NotFound) {
        await Deno.mkdir(outputDir, { recursive: true });
        await Deno.writeTextFile(outputPath, decoder.decode(outputCss));
      }
      throw error;
    }
  } catch (error: unknown) {
    console.error(`Error building styles for path ${path}: ${error as string}`);
  }
}

async function bundleStyles() {
  try {
    await build({
      entryPoints: ["styles/main.css"],
      bundle: true,
      outfile: "styles/main_bundled.css",
      external: ["*.woff2"],
    });
  } catch (error: unknown) {
    console.error(`Error bundling styles: ${error as string}`);
  }
}

const debouncedUpdateStyles = debounce(async (path: string) => {
  const relativePath = relative(__dirname, path);

  if (!ignoreFiles.includes(relativePath)) {
    await bundleStyles();
    await buildStyles("styles/main_bundled.css");
    console.log("Updated static/styles.css");
  }
}, 200);

const watcher = Deno.watchFs(["./styles"]);
for await (const event of watcher) {
  const { paths } = event;
  paths.forEach((path) => {
    debouncedUpdateStyles(path);
  });
}
