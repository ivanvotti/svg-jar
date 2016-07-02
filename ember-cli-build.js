var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      // Fixes ember-cli-sass, that includes an outdated node-sass version,
      // that doesn't work with Node.js 6
      nodeSass: require('node-sass')
    },

    fingerprint: {
      enabled: false
    }
  });

  app.import(app.bowerDirectory + '/normalize-css/normalize.css');

  return app.toTree();
};
