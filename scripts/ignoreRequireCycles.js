const fs = require("fs");

const codeToObscure =
  "console.warn(\n" +
  '        `Require cycle: ${cycle.join(" -> ")}\\n\\n` +\n' +
  '          "Require cycles are allowed, but can result in uninitialized values. " +\n' +
  '          "Consider refactoring to remove the need for a cycle."\n' +
  "      );";
const problemFilePath = "./node_modules/metro/src/lib/polyfills/require.js";
const problemFileContent = fs.readFileSync(problemFilePath, "utf8");

fs.writeFileSync(
  problemFilePath,
  problemFileContent.replace(codeToObscure, ""),
  "utf8"
);
