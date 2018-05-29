module.exports = {
  entry: {
    javascript: "./app/timer.jsx"
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};