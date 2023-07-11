import type { StartOptions } from "$fresh/server.ts";

export const startOptions: StartOptions = {
  render: (ctx, render) => {
    ctx.lang = "en-GB";
    render();
  },
};
