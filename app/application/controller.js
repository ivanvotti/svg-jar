import Controller from 'ember-controller';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy', 'filterBy', 'query'],
  arrangeBy: null,
  sortBy: null,
  filterBy: null,
  query: '',
  isShortcutsShown: false,

  actions: {
    setSearchQuery(query) {
      set(this, 'query', query);
    },

    toggleShortcutsBar() {
      let isShortcutsShown = get(this, 'isShortcutsShown');
      set(this, 'isShortcutsShown', !isShortcutsShown);
    }
  }
});
