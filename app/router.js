import EmberRouter from 'ember-router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
});

Router.reopen({
  location: 'hash'
});

export default Router;
