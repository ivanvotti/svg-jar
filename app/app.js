import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import VelocityUI from 'velocity-ui'; // eslint-disable-line no-unused-vars
import Resolver from './resolver';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
