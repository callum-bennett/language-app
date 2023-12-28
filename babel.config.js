module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", "json", ".ts", ".tsx"],
          alias: {
            "@api": "./src/api",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@models": "./src/models",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@store": "./src/store",
            "@utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
