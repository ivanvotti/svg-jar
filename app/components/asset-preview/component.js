import Component from '@ember/component';
import { computed, get } from '@ember/object';

const MAX_ASSET_SIZE = 50;

export default Component.extend({
  classNames: ['c-asset-preview'],
  asset: null,

  isScaleUpNeeded: computed('asset', function() {
    let { width, height } = this.asset;
    let isAssetSmall = Math.max(width, height) <= MAX_ASSET_SIZE;
    let isAssetScalable = !!get(this, 'asset.svg.attrs.viewBox');
    return isAssetSmall && isAssetScalable;
  })
});
