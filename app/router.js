import EmberRouter from 'ember-router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
});

Router.reopen({
  location: 'hash'
});

export default Router;
