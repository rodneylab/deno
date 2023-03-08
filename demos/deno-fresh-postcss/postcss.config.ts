import autoprefixer from "npm:autoprefixer";
import csso from "npm:postcss-csso";
import customMediaPlugin from "npm:postcss-custom-media";
import postcssPresetEnv from "npm:postcss-preset-env";

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
