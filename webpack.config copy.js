// базовые переменные
//1. модуль для управления путями
const path = require("path");
//подключить сам вебпак, подключив его модуль
const webpack = require("webpack");

// подключение плагинов
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// настройка самого модуля
module.exports = {
  //базовый путь к проекту (откуда собирать исходные коды )
  context: path.resolve(__dirname, "src"), // модуль паз будет разбирать модуль путь текущей директории (дирнейм) и добавлять к ней директорию src

  // настройка точек входа js
  entry: {
    // основной файл приложения
    app: ["./js/app.js", "./scss/index.scss"], // путь к тому файлу, который будет обрабатываться (путь к файлу app.js) - от src
  },

  // путь для собранных файлов
  output: {
    filename: "js/[name].js", // фаилнейм - имя файла, в который будет собираться джаваскрипт. Для этого указываем относительно нашего проекта путь. В [name] будет подставляться имя из app.js, который указывали выше в entry основного файла приложения
    //путь - директория, в которую мы будем помещать
    path: path.resolve(__dirname, "app/dist"),
    //  publicPath: '../'// специально значение, которое устраняет конфликты при переадресации scss и вообще указании файлов
  },
  mode: "development",
  // конфигурация dev-сервера
  devServer: {
    static: ["app"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "css/[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'css-loader': path.resolve(__dirname, 'css-loader-config.js')
    }
  }
};
