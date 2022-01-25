const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new WebpackPwaManifest({
        // the name of the generated manifest file
        filename: "manifest.json",

        // we aren't using webpack to generate our html so we
        // set inject to false
        inject: false,

        // set fingerprints to `false` to make the names of the generated
        // files predictable making it easier to refer to them in our code
        fingerprints: false,

        name: "Text Editor App",
        short_name: "Text Editor App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",

        icons: [
          {
            src: path.resolve(
              __dirname,
              "src/images/logo.png"
            ),
            // the plugin will generate an image for each size
            // included in the size array
            size: [72, 96, 128, 144, 152, 192, 384, 512]
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
