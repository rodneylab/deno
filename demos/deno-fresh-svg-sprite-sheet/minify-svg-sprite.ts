import { optimize } from "svgo";

const svgString = await Deno.readTextFile("./assets/sprite.svg");
const { data: optimisedSVG } = optimize(svgString, {
  path: "assets/sprite.svg",
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeHiddenElems: false,
        },
      },
    },
  ],
});
await Deno.writeTextFile("./static/sprite.svg", `${optimisedSVG}\n`);

Deno.exit(0);
