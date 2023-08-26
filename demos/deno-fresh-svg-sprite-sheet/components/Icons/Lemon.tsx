import { asset } from "$fresh/runtime.ts";
import { FunctionComponent } from "preact";

interface LemonIconProps {
  colour?: string;
  height?: number;
  width: number;
}

export const LemonIcon: FunctionComponent<LemonIconProps> = function LemonIcon({
  colour = "inherit",
  width,
  height = width,
}) {
  // SVG path by Firefox OS Emoji (https://github.com/mozilla/fxemoji) via Icônes (https://icones.js.org/collection/all)

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 512 512"
      style={{ color: colour }}
    >
      <use href={`${asset("/sprite.svg")}#lemon`} />
    </svg>
  );
};
