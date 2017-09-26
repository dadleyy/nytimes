const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
const destination = path.resolve(__dirname, "dist/news/assets");

module.exports = {
  "entry": path.join(destination, "main"),
  "output": {
    "path": destination,
    "filename": "main.bundle.js", 
  },
  "context": __dirname,
  "resolve": {
    "alias": {
      "react": path.resolve(__dirname, "./node_modules/react/dist/react.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/dist/react-dom.min.js"),
      "react-router-dom": "../../../node_modules/react-router-dom/umd/react-router-dom.min.js",
      "news": ".",
    }
  },
  "plugins": [
    new UglifyJSPlugin()
  ]
}
