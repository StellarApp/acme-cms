module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "bable-loader",
        exclude: "./node_modules/"
      }
    ]
  }
};
