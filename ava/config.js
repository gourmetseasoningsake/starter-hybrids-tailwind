export default {
  verbose: true,
  nodeArguments: [
    "--experimental-loader=./ava/loader.js",
    "--no-warnings", // supplied to suppress Node's warning about using experimental loaders...
  ],
}