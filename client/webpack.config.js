const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



//================================================================================
// Add and configure workbox plugins for a service worker and manifest file.
// Add CSS loaders and babel to webpack.
//================================================================================

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
      // Generate the HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        // favicon: './favicon.ico',
        title: 'Text Editor',
      }),

      // Inject the service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Source of the custom service worker
        swDest: 'src-sw.js', 
      }),

      // Generate the manifest file for PWA
      new WebpackPwaManifest({
        name: 'Jate', // Name of the PWA
        short_name: 'TextEditor', // Short name of the PWA
        description: 'Editing text the fun way!', // Description of the PWA
        background_color: '#ffffff', // Background color of the PWA
        theme_color: '#317EFB', // Theme color of the PWA
        start_url: '/', // Start URL of the PWA
        publicPath: '/', // Public path to ensure paths are correctly referenced in the manifest
        fingerprints: false, // To prevent fingerprinting in filenames
        inject: true, // Inject the manifest into the HTML

        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon image
            sizes: [96, 128, 192, 256, 384, 512], // Multiple sizes for the icon
            destination: path.join('assets', 'icons'), // Destination directory for the icons
          },
        ],
      }),
    ],

    module: {

      rules: [
        {
          test: /\.css$/i, // Test for .css files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
        },

        {
          test: /\.m?js$/, // Test for .js files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader
            options: {
              presets: ['@babel/preset-env'], // Use @babel/preset-env preset
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};


//================================================================================
// Removed for Error testing
//================================================================================

    // devServer: {
    //   static: {
    //    // directory: path.join(__dirname, 'public'),
    //   },
    //   port: 3001,
    // },
    
//================================================================================