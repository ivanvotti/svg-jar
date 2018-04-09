import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  classNames: ['c-search-bar'],
  searchQuery: null,

  _blurInput() {
    this.$('.js-search-bar-input').blur();
  },

  _resetQuery() {
    get(this, 'setSearchQuery')('');
  },

  actions: {
    onEnter() {
      this._blurInput();
    },

    onEscape() {
      // Reset search query or blur if it's already empty.
      if (!get(this, 'searchQuery')) {
        this._blurInput();
      }

      this._resetQuery();
    },

    resetQuery() {
      this._resetQuery();
    }
  }
});
