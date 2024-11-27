import { relative, resolve } from "@std/path";
import stylelint from "stylelint";
import stylelintConfigRecommended from "stylelint-config-recommended";

type Severity = "warning" | "error";

interface Warning {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  rule: string;
  severity: Severity;
  text: string;
  stylelintType?: string;
}

interface LintResult {
  source?: string;
  deprecations: {
    text: string;
    reference?: string;
  }[];
  invalidOptionWarnings: {
    text: string;
  }[];
  parseErrors: { stylelintType: string }[];
  errored?: boolean;
  warnings: Warning[];
  ignored?: boolean;
}

// run
const { results }: { results: LintResult[] } = await stylelint.lint({
  config: {
    rules: {
      ...stylelintConfigRecommended.rules,
      "color-named": "never",
      "font-family-name-quotes": "always-where-required",
      "font-weight-notation": "named-where-possible",
      "function-url-no-scheme-relative": true,
      "function-url-quotes": "always",
      "value-keyword-case": ["lower", { ignoreKeywords: ["Raleway"] }],
      "unit-disallowed-list": [],
      "no-descending-specificity": true,
      "no-duplicate-selectors": true,
      "font-family-no-missing-generic-family-keyword": null,
      "property-no-unknown": [
        true,
        {
          ignoreProperties: ["/^lost-/"],
        },
      ],
    },
  },
  files: "static/**/*.css",
});

// process
const issues: string[] = [];
const deprecationWarnings = new Set<string>();

const __dirname = resolve();
results.forEach(({ deprecations, errored, source, warnings }) => {
  if (errored && source) {
    const outputPath = relative(__dirname, source);
    issues.push(outputPath);

    warnings.forEach(({ column, line, text }) => {
      issues.push(` ${line}:${column}  *  ${text}`);
    });
    issues.push("");
  }
  deprecations.forEach(({ text }) => {
    deprecationWarnings.add(text);
  });
});

// output
if (deprecationWarnings.size) {
  console.log("\nDeprecation warnings:");
  deprecationWarnings.forEach((element) => {
    console.log(` - ${element}`);
  });
  console.log("");
}

if (issues.length) {
  console.log(issues.join("\n"));
  Deno.exit(1);
}
