import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['c-asset-item'],
  classNameBindings: ['isActive', 'isActive:js-active-asset'],
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
