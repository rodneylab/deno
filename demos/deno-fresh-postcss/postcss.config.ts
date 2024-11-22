import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import customMediaPlugin from "postcss-custom-media";
import postcssPresetEnv from "postcss-preset-env";

export const config = {
  plugins: [
    customMediaPlugin(),
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
      },
    }),
    autoprefixer(),
    csso(),
  ],
};
