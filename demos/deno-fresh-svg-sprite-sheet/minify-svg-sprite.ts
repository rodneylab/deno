import { optimize } from "svgo";

const svgString = await Deno.readTextFile("./assets/sprite.svg");
const { data: optimisedSVG } = optimize(svgString, {
  path: "./assets/sprite.svg",
});
await Deno.writeTextFile("./static/sprite.svg", optimisedSVG);

Deno.exit(0);
