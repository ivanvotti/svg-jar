var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      enabled: false
    },

    sassOptions: {
      // Fixes ember-cli-sass, that includes an outdated node-sass version,
      // that doesn't work with Node.js 6
      nodeSass: require('node-sass')
    },

    svgJar: {
      sourceDirs: ['svgs'],
      embedDemo: false
    }
  });

  app.import(app.bowerDirectory + '/velocity/velocity.js');
  app.import(app.bowerDirectory + '/velocity/velocity.ui.js');
  app.import(app.bowerDirectory + '/normalize-css/normalize.css');

  return app.toTree();
};
