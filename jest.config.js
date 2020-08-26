module.exports = {
  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["/node_modules/(?!(@storybook/.*\\.vue$))"]
};
