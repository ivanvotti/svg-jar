import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  assetSelector: service('asset-selector'),
  classNames: ['c-asset-item test-asset-item'],
  classNameBindings: ['isActive', 'isActive:js-active-asset'],
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
