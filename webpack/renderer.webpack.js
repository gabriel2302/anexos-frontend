module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'png', 'jpg', 'jpeg', '.css', '.scss', '.sass']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}