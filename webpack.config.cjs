const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    MultiSelectDropdown: './MultiSelectDropdown.jsx', 
    MultiSelect: './MultiSelect.jsx', 
    Select: './Select.jsx',
    Counter: './Counter.jsx',
    SelectDropdown: './SelectDropDown.jsx',
    Form:'./Form.jsx',
    FormSubmit:'./FormSubmit.jsx',
    FormInput:'./FormInput.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', 
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html', 
      inject: 'body', 
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
