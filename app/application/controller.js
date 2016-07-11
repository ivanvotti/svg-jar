import Controller from 'ember-controller';
import set from 'ember-metal/set';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy', 'filterBy', 'query'],
  arrangeBy: null,
  sortBy: null,
  filterBy: null,
  query: '',

  actions: {
    setSearchQuery(query) {
      set(this, 'query', query);
    }
  }
});
