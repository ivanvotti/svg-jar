import Controller from 'ember-controller';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy', 'filterBy', 'query'],
  arrangeBy: null,
  sortBy: null,
  filterBy: null,
  query: '',
  isShortcutBarOpen: false,

  actions: {
    setSearchQuery(query) {
      set(this, 'query', query);
    },

    showShortcutBar() {
      set(this, 'isShortcutBarOpen', true);
    },

    toggleShortcutBar() {
      let isShortcutBarOpen = get(this, 'isShortcutBarOpen');
      set(this, 'isShortcutBarOpen', !isShortcutBarOpen);
    }
  }
});
