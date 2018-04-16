import Component from '@ember/component';
import { computed, get } from '@ember/object';

const MAX_ASSET_SIZE = 50;

export default Component.extend({
  classNames: ['c-pane-preview'],
  asset: null,

  isScaleUpNeeded: computed('asset', function() {
    const { width, height } = this.asset;
    const isAssetSmall = Math.max(width, height) <= MAX_ASSET_SIZE;
    const isAssetScalable = !!get(this, 'asset.svg.attrs.viewBox');
    return isAssetSmall && isAssetScalable;
  })
});
