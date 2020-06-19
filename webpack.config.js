const path = require('path');

module.exports = {  
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
        {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },

    ],
  },  
  // devServer: {
  //   hot: true,    
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   publicPath: 'https://localhost:3001',
  //   port: 3001,
  //   //headers: { "Access-Control-Allow-Origin": "*" },
  //   lazy: true,
  //   //stats: { colors: true }
  // },
};