import Component from 'ember-component';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-search-bar'],
  searchQuery: null,

  blurInput() {
    this.$('.js-search-bar-input').blur();
  },

  actions: {
    onEnter() {
      this.blurInput();
    },

    onEscape() {
      // Reset search query or blur if it's already empty.
      if (!get(this, 'searchQuery')) {
        this.blurInput();
      }

      this.attrs.setSearchQuery('');
    },

    resetQuery() {
      this.attrs.setSearchQuery('');
    }
  }
});
