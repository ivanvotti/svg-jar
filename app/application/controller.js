import Controller from 'ember-controller';

export default Controller.extend({
  queryParams: ['arrangeBy', 'sortBy'],
  arrangeBy: null,
  sortBy: null
});
