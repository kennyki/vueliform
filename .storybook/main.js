const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions/preset',
    '@storybook/addon-knobs/preset',
    '@storybook/addon-links/preset',
    '@storybook/addon-storysource'
  ],
};
