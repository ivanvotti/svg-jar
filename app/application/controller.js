import Controller from '@ember/controller';
import { set } from '@ember/object';

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
      set(this, 'isShortcutBarOpen', !this.isShortcutBarOpen);
    }
  }
});
