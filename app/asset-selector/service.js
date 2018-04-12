import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  currentAsset: null,

  setCurrentAsset(asset) {
    set(this, 'currentAsset', asset);
  },

  isCurrent(asset) {
    return asset === this.currentAsset;
  }
});
