import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['c-asset-preview'],

  isScaleUpNeeded: computed('asset', function() {
    let height = get(this, 'asset.svg.height');
    let width = get(this, 'asset.svg.width');

    return Math.max(height, width) <= 50;
  })
});
