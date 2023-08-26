import { asset } from "$fresh/runtime.ts";
import { FunctionComponent } from "preact";

interface DenoIconProps {
  colour?: string;
  height?: number;
  width: number;
}

export const DenoIcon: FunctionComponent<DenoIconProps> = function DenoIcon({
  colour = "inherit",
  width,
  height = width,
}) {
  // SVG path by Simple Icons (https://simpleicons.org/) via Icônes (https://icones.js.org/collection/all)

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      style={{ color: colour }}
    >
      <use href={`${asset("/sprite.svg")}#deno`} />
    </svg>
  );
};
