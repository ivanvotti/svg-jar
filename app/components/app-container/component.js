import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import run from 'ember-runloop';
import on from 'ember-evented/on';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import copyToClipboard from 'svg-jar/utils/copy-to-clipboard';

function doesMatch(target, query) {
  if (!target) {
    return false;
  }

  return target.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

export default Component.extend(EKMixin, EKOnInsertMixin, {
  classNames: ['c-app-container'],
  classNameBindings: ['isContentScrolled'],
  model: null,
  sortBy: null,
  filterBy: null,
  searchQuery: null,
  currentAsset: null,
  isContentScrolled: false,

  assets: computed.alias('sortedAssets'),

  filterName: computed('filterBy', function() {
    let filter = get(this, 'filterBy');
    return filter && filter.split(':')[1];
  }),

  filteredAssets: computed('filterBy', function() {
    let assets = get(this, 'model.assets');
    let filterBy = get(this, 'filterBy');

    return filterBy ? assets.filterBy(...filterBy.split(':')) : assets;
  }),

  foundAssets: computed('filteredAssets', 'searchQuery', function() {
    let assets = get(this, 'filteredAssets');
    let query = get(this, 'searchQuery');
    let searchKeys = get(this, 'model.searchKeys');

    if (query && query.length > 1 && searchKeys) {
      assets = assets.filter((asset) => (
        searchKeys.some((searchKey) => doesMatch(asset[searchKey], query))
      ));
    }

    return assets;
  }),

  sortedAssets: computed('foundAssets', 'sortBy', function() {
    let assets = get(this, 'foundAssets');
    let sortBy = get(this, 'sortBy');

    return sortBy ? assets.sortBy(sortBy) : assets;
  }),

  didInsertElement() {
    this._super(...arguments);
    this.animateAssetListItems();
    this.bindContentScrolling();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unbindContentScrolling();
  },

  bindContentScrolling() {
    let scrollingTimeout = 10;

    this.$('.js-content').on('scroll.scrolling', () => (
      run.debounce(this, this.onContentScrolled, scrollingTimeout)
    ));
  },

  unbindContentScrolling() {
    this.$('.js-content').off('.scrolling');
  },

  onContentScrolled() {
    let isContentScrolled = this.$('.js-content').scrollTop() !== 0;
    set(this, 'isContentScrolled', isContentScrolled);
  },

  animateAssetListItems() {
    this.$('.js-asset-item').velocity('transition.expandIn', {
      duration: 500,

      // Cleanup Velocity inline styles.
      complete(targets) {
        targets.forEach((target) => target.removeAttribute('style'));
      }
    });
  },

  animateCopiedAsset() {
    this.$('.js-active-asset')
      .velocity('callout.pulse', { duration: 300 });
  },

  copyCurrentAsset: on(keyDown('Enter'), function(event) {
    let assetCopypasta = get(this, 'currentAsset.copypasta');

    if (assetCopypasta && copyToClipboard(assetCopypasta)) {
      this.animateCopiedAsset();
      event.preventDefault();
    }
  }),

  focusSearchBar: on(keyDown('Slash'), function(event) {
    this.$('.js-search-bar-input').focus();
    event.preventDefault();
  }),

  _toggleShortcutsBar: on(keyDown('shift+Slash'), function(event) {
    this.attrs.toggleShortcutsBar();
    event.preventDefault();
  }),

  actions: {
    setCurrentAsset(asset) {
      set(this, 'currentAsset', asset);
    }
  }
});
