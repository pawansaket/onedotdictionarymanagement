//configure of the webpack json files
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.NODE_ENV === "prod" ? "production" : "development",
  entry: {
    app: "./src/index.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: process.env.PORT || 4000,
    publicPath: "http://localhost:4000",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Dictonary Management",
      template: "./public/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "./dist/[name].bundle.css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_component)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|gif|jpeg|jpg|svg)$/,
        use: "file-loader?images=[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](('react').*)[\\/]/,
          chunks: "all",
          name: "react",
          reuseExistingChunk: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]((?!'react').*)[\\/]/,
          chunks: "all",
          name: "vendor",
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  }
};
