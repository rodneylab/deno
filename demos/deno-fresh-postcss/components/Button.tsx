import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  );
}
