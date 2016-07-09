import Controller from 'ember-controller';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy', 'filterBy'],
  arrangeBy: null,
  sortBy: null,
  filterBy: null
});
