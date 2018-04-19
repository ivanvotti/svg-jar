import Component from '@ember/component';

export default Component.extend({
  classNames: ['c-search-bar'],
  searchQuery: null,

  actions: {
    onEnter() {
      this._blurInput();
    },

    onEscape() {
      // Reset search query or blur if it's already empty.
      if (!this.searchQuery) {
        this._blurInput();
      } else {
        this._resetQuery();
      }
    },

    resetQuery() {
      this._resetQuery();
    }
  },

  _blurInput() {
    this.element.querySelector('.js-search-bar-input').blur();
  },

  _resetQuery() {
    this.setSearchQuery('');
  }
});
