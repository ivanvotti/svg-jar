import Component from 'ember-component';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['c-app-container'],
  currentItem: null,

  actions: {
    setCurrentItem(item) {
      set(this, 'currentItem', item);
    }
  }
});
