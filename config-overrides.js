const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = {
  webpack: override(addWebpackAlias({ src: path.resolve('./src') }))
};
