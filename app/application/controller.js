import Controller from 'ember-controller';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy', 'filterBy', 'query'],
  arrangeBy: null,
  sortBy: null,
  filterBy: null,
  query: '',
  isShortcutsBarShown: false,

  actions: {
    setSearchQuery(query) {
      set(this, 'query', query);
    },

    showShortcutsBar() {
      set(this, 'isShortcutsBarShown', true);
    },

    toggleShortcutsBar() {
      let isShortcutsBarShown = get(this, 'isShortcutsBarShown');
      set(this, 'isShortcutsBarShown', !isShortcutsBarShown);
    }
  }
});
