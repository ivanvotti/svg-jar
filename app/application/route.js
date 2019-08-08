import Route from '@ember/routing/route';
import fetch from 'fetch';
import config from '../config/environment';

export default Route.extend({
  model() {
    return fetch(config.modelURL).then((response) => {
      let isNotFoundError = response.status === 404;

      if (response.ok) {
        return response.json();
      }

      if (isNotFoundError) {
        return { error: `Can't find asset viewer model at ${config.modelURL}` };
      }

      throw Error(response.statusText);
    });
  }
});
