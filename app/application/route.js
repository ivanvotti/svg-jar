import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNotFoundError } from 'ember-ajax/errors';
import config from '../config/environment';

export default Route.extend({
  ajax: service(),

  model() {
    return this.get('ajax').request(config.modelURL)
      .catch((error) => {
        if (isNotFoundError(error)) {
          return { assets: [] };
        }

        throw error;
      });
  }
});
