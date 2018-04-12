import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['c-asset-item'],
  classNameBindings: ['isActive', 'isActive:js-active-asset'],
  assetSelector: service('asset-selector'),
  asset: null,

  isActive: computed('assetSelector.currentAsset', function() {
    return this.assetSelector.isCurrent(this.asset);
  }),

  click() {
    if (!this.isActive) {
      this.assetSelector.setCurrentAsset(this.asset);
    }
  }
});
