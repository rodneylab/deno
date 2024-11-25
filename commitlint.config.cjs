module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "demos",
        "root",
        "deno-fresh-html-lang-attribute",
        "deno-fresh-testing",
        "deno-fresh-postcss",
        "deno-get-client-ip-address",
        "deno-fresh-responsive-images",
        "deno-lightningcss",
        "deno-fresh-rss-feed",
        "deno-matrix-element-bot",
        "deno-fresh-stylelint",
        "deno-rust-wasm",
        "deno-fresh-svg-sprite-sheet",
        "trying-deno-fresh",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};
