import Component from 'ember-component';

export default Component.extend({
  classNames: ['c-search-bar'],
  searchQuery: null,

  actions: {
    resetQuery() {
      this.attrs.setSearchQuery('');
    }
  }
});
