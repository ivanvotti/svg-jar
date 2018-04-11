import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['c-asset-item'],
  classNameBindings: ['isActive', 'isActive:js-active-asset'],
  assetSelector: service('asset-selector'),
  asset: null,

  isActive: computed('assetSelector.currentAsset', function() {
    return get(this, 'asset') === get(this, 'assetSelector.currentAsset');
  }),

  click() {
    if (get(this, 'isActive')) {
      return;
    }

    let asset = get(this, 'asset');
    get(this, 'assetSelector').setCurrentAsset(asset);
  }
});
