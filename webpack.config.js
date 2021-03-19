const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/39f7716b0148fd2c5885b81bb4dd3dc1c49afec6/docs/TROUBLESHOOTING.md#webpack-5-compatibility-issues-with-webpack-dev-server3
  target: isDevelopment ? "web" : "browserslist",
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: isDevelopment ? ["react-refresh/babel"] : [],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
