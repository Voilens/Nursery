// базовые переменные
//1. модуль для управления путями
const path = require("path");
//подключить сам вебпак, подключив его модуль
const webpack = require("webpack");

// подключение плагинов
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// настройка самого модуля
module.exports = {
  //базовый путь к проекту (откуда собирать исходные коды )
  context: path.resolve(__dirname, "src"), // модуль паз будет разбирать модуль путь текущей директории (дирнейм) и добавлять к ней директорию src

  // настройка точек входа js
  entry: {
    // основной файл приложения
    app: "./scss/index.scss", // путь к тому файлу, который будет обрабатываться (путь к файлу app.js) - от src
  },

  // путь для собранных файлов
  output: {
    filename: "js/[name].js", // фаилнейм - имя файла, в который будет собираться джаваскрипт. Для этого указываем относительно нашего проекта путь. В [name] будет подставляться имя из app.js, который указывали выше в entry основного файла приложения
    //путь - директория, в которую мы будем помещать
    path: path.resolve(__dirname, "app/dist"),
    //  publicPath: '../'// специально значение, которое устраняет конфликты при переадресации scss и вообще указании файлов
  },
  mode: "development",
  plugins: [new MiniCssExtractPlugin(), 
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: '../app/index.html'
  })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
          },
        }, {
            loader: 'css-loader',
            options: { 
              url: false 
            }
          }, 'sass-loader'],
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
  devServer: {
    static: ["app"],
  },
};
