'use strict';

const isCI = !!process.env.CI;
const isDevelopment = process.env.EMBER_ENV === 'development';
const isProduction = process.env.EMBER_ENV === 'production';

const developmentBrowsers = ['last 1 Chrome versions'];
const defaultBrowsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions'
];

const browsers = isDevelopment ? developmentBrowsers : defaultBrowsers;

if (isCI || isProduction) {
  browsers.push('ie 11');
}

module.exports = {
  browsers
};
