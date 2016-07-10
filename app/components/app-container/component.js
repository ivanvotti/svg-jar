import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import on from 'ember-evented/on';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import copyToClipboard from 'svg-jar/utils/copy-to-clipboard';

export default Component.extend(EKMixin, EKOnInsertMixin, {
  classNames: ['c-app-container'],
  model: null,
  sortBy: null,
  filterBy: null,
  currentAsset: null,

  filteredAssets: computed('filterBy', function() {
    let assets = get(this, 'model.assets');
    let filterBy = get(this, 'filterBy');

    return filterBy ? assets.filterBy(...filterBy.split(':')) : assets;
  }),

  assets: computed('filteredAssets', 'sortBy', function() {
    let assets = get(this, 'filteredAssets');
    let sortBy = get(this, 'sortBy');

    return sortBy ? assets.sortBy(sortBy) : assets;
  }),

  onEnter: on(keyDown('Enter'), function(event) {
    let assetCopypasta = get(this, 'currentAsset.copypasta');

    if (assetCopypasta) {
      event.preventDefault();
      copyToClipboard(assetCopypasta);
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.animateAssetListItems();
  },

  /**
    ExpandIn transition for asset list items.
    It's used for initial application redner only.
  */
  animateAssetListItems() {
    this.$('.js-asset-item').velocity(
      {
        opacity: [1, 0],
        transformOriginX: ['50%', '50%'],
        transformOriginY: ['50%', '50%'],
        scaleX: [1, 0.625],
        scaleY: [1, 0.625],
        translateZ: 0
      },
      {
        duration: 500,

        // Cleanup Velocity inline styles.
        complete(targets) {
          targets.forEach((target) => target.removeAttribute('style'));
        }
      }
    );
  },

  actions: {
    setCurrentAsset(asset) {
      set(this, 'currentAsset', asset);
    }
  }
});
