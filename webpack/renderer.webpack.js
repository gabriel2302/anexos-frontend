module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'png', 'jpg', 'jpeg']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}