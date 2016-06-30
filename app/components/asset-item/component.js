import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-asset-item'],
  classNameBindings: ['isActive'],
  asset: null,
  currentAsset: null,

  isActive: computed('currentAsset', function() {
    return get(this, 'asset') === get(this, 'currentAsset');
  }),

  click() {
    if (get(this, 'isActive')) {
      return;
    }

    this.attrs.setCurrentAsset(get(this, 'asset'));
  }
});
