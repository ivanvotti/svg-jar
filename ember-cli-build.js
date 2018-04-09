'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: { enabled: false },
    sourcemaps: { enabled: false }
  });

  app.import('node_modules/normalize.css/normalize.css');
  app.import('node_modules/velocity-animate/velocity.js');
  app.import('node_modules/velocity-animate/velocity.ui.js');
  app.import('node_modules/file-saver/FileSaver.js');

  return app.toTree();
};
