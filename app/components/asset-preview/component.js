import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-asset-preview'],
  asset: null,

  isScaleUpNeeded: computed('asset', function() {
    let width = get(this, 'asset.width');
    let height = get(this, 'asset.height');
    let hasViewBox = !!get(this, 'asset.svg.attrs.viewBox');

    return Math.max(width, height) <= 50 && hasViewBox;
  })
});
