const path = require("path");
const nodeExternals = require("webpack-node-externals");
const packagejson = require("./package.json");
const _moduleAliases = packagejson._moduleAliases;
const isProduction = process.env.NODE_ENV === "production";

const isModuleAlias = function(moduleName) {
  const aliases = Object.keys(_moduleAliases);

  return aliases.some(a => moduleName.indexOf(a) >= 0);
};

module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  externals: [
    nodeExternals({
      whitelist: [isModuleAlias]
    })
  ],
  target: "node",
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve("src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
