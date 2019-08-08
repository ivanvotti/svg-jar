'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const postcssPlugins = require('narwin-pack');
const postcssFunctions = require('postcss-functions');

function pixelsToUnit(pixels, unit, context = '16px') {
  return `${parseInt(pixels, 10) / parseInt(context, 10)}${unit}`;
}

const postcssUnitsFunctions = {
  em: (pixels, context) => pixelsToUnit(pixels, 'em', context),
  rem: (pixels, context) => pixelsToUnit(pixels, 'rem', context)
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: { enabled: false },
    sourcemaps: { enabled: false },

    postcssOptions: {
      compile: {
        plugins: [
          { module: postcssPlugins },
          {
            module: postcssFunctions,
            options: { functions: postcssUnitsFunctions }
          }
        ]
      }
    },

    stylelint: {
      linterConfig: {
        syntax: 'css'
      }
    }
  });

  app.import('node_modules/velocity-animate/velocity.js', {
    using: [
      { transformation: 'amd', as: 'velocity' }
    ]
  });

  app.import('node_modules/velocity-animate/velocity.ui.js', {
    prepend: false,
    using: [
      { transformation: 'amd', as: 'velocity-ui' }
    ]
  });

  app.import('node_modules/file-saver/FileSaver.js');
  app.import('vendor/shims/file-saver.js');

  app.import('node_modules/sinon/pkg/sinon.js', {
    using: [
      { transformation: 'amd', as: 'sinon' }
    ],
    type: 'test'
  });

  return app.toTree();
};
