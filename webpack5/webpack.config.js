const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let production = process.env.NODE_ENV === 'production';

let config = {
  entry: ["./src/index", "./src/home"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader", path.resolve('./custom-loaders/find-logs.js')],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: 'asset/resource',
        parser: {
          // condição para ser inline ou arquivo <= 20Kb
          dataCondition: {
            maxSize: 20 * 1024
          }
        },
        generator: {
          filename: 'images/[hash]-[name][ext]'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          { 
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', {}]
                ]
              }
            }
         },
          "sass-loader",
        ],
        //loader são processados do último para o primeiro
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    watchFiles: ["src/**/*", "index.html"],
    static: "./dist",
  },
};

if (production) {
  config.mode = 'production';
  config.devtool = 'inline-source-map'
}

module.exports = config;
