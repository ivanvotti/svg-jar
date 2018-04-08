'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: { enabled: false },
    sourcemaps: { enabled: false }
  });

  app.import(`${app.bowerDirectory}/normalize-css/normalize.css`);
  app.import(`${app.bowerDirectory}/velocity/velocity.js`);
  app.import(`${app.bowerDirectory}/velocity/velocity.ui.js`);
  app.import(`${app.bowerDirectory}/file-saver/FileSaver.js`);

  return app.toTree();
};
