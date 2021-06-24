module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(png|jpe?g|gif|jp2|webp)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
  {
    test: /\.(scss|css)$/,
    loader: 'style-loader',
    exclude: /node_modules/,
  },
]