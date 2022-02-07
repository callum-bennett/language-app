module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", "json"],
          alias: {
            "@components": "./components",
            "@screens": "./screens",
            "@store": "./store",
            "@utils": "./utils",
            "@assets": "./assets",
            "@constants": "./constants",
          },
        },
      ],
    ],
  };
};
