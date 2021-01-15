const path = require("path");

module.exports = {
  entry: ["./src/main.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: false,
  },
  watch: true,
  performance: { hints: false },
};
