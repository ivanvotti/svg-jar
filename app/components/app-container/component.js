import Component from 'ember-component';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['c-app-container'],
  assets: null,
  currentAsset: null,

  actions: {
    setCurrentAsset(asset) {
      set(this, 'currentAsset', asset);
    }
  }
});
