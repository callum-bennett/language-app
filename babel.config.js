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
            "@api": "./api",
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
            "@navigation": "./navigation",
            "@screens": "./screens",
            "@store": "./store",
            "@utils": "./utils",
          },
        },
      ],
    ],
  };
};
