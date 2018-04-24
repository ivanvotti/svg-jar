'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: { enabled: false },
    sourcemaps: { enabled: false },
    vendorFiles: { 'jquery.js': null }
  });

  app.import('node_modules/normalize.css/normalize.css');

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
