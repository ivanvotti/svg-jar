import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-jar-item'],
  classNameBindings: ['isActive'],
  item: null,
  currentItem: null,

  isActive: computed('currentItem', function() {
    return get(this, 'item') === get(this, 'currentItem');
  }),

  click() {
    if (get(this, 'isActive')) {
      return;
    }

    this.attrs.setCurrentItem(get(this, 'item'));
  }
});
