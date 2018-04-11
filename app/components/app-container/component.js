/* eslint-disable ember/no-on-calls-in-components */

import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import copyToClipboard from 'svg-jar/utils/copy-to-clipboard';
import makeSvg from 'svg-jar/utils/make-svg';
import Velocity from 'velocity';

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
    let scrollingEl = this.element.querySelector('.js-content');

    scrollingEl.addEventListener('scroll', () => (
      run.debounce(this, this.onContentScrolled, scrollingTimeout)
    ));
  },

  unbindContentScrolling() {
    let scrollingEl = this.element.querySelector('.js-content');
    scrollingEl.removeEventListener('scroll');
  },

  onContentScrolled() {
    let scrollingEl = this.element.querySelector('.js-content');
    let isContentScrolled = scrollingEl.scrollTop !== 0;
    set(this, 'isContentScrolled', isContentScrolled);
  },

  animateAssetListItems() {
    let assetItemsEl = this.element.querySelectorAll('.js-asset-item');

    Velocity(assetItemsEl, 'transition.expandIn', {
      duration: 500,

      // Cleanup Velocity inline styles.
      complete(targets) {
        targets.forEach((target) => target.removeAttribute('style'));
      }
    });
  },

  animateShortcutedAsset() {
    let activeAssetEl = this.element.querySelector('.js-active-asset');
    Velocity(activeAssetEl, 'callout.pulse', { duration: 300 });
  },

  downloadAsset(asset) {
    let svgFile = new Blob([asset.originalSvg], { type: 'image/svg+xml' });
    window.saveAs(svgFile, asset.fileName);
  },

  showClipboardError() {
    // eslint-disable-next-line no-alert
    window.alert("Your browser doesn't support copy to clipboard feature.\n" +
      'Use the asset viewer with a modern browser, such as Chrome or Firefox.');
  },

  shortcutFocusSearchBar: on(keyDown('Slash'), function(event) {
    let searchInputEl = this.element.querySelector('.js-search-bar-input');
    searchInputEl.focus();
    event.preventDefault();
  }),

  shortcutToggleShortcutBar: on(keyDown('shift+Slash'), function(event) {
    get(this, 'toggleShortcutBar')();
    event.preventDefault();
  }),

  shortcutCopyCurrentCopypasta: on(keyDown('Enter'), function(event) {
    let currentAsset = get(this, 'currentAsset');

    if (!currentAsset) {
      return;
    }

    if (copyToClipboard(currentAsset.copypasta)) {
      this.animateShortcutedAsset();
      event.preventDefault();
    } else {
      this.showClipboardError();
    }
  }),

  shortcutCopyCurrentSource: on(keyDown('KeyS'), function(event) {
    let currentAsset = get(this, 'currentAsset');

    if (!currentAsset) {
      return;
    }

    if (copyToClipboard(makeSvg(currentAsset.svg))) {
      this.animateShortcutedAsset();
      event.preventDefault();
    } else {
      this.showClipboardError();
    }
  }),

  shortcutDownloadCurrent: on(keyDown('KeyD'), function(event) {
    let currentAsset = get(this, 'currentAsset');

    if (!currentAsset) {
      return;
    }

    this.downloadAsset(currentAsset);
    this.animateShortcutedAsset();
    event.preventDefault();
  }),

  actions: {
    setCurrentAsset(asset) {
      set(this, 'currentAsset', asset);
    },

    downloadCurrentAsset() {
      let currentAsset = get(this, 'currentAsset');

      if (currentAsset) {
        this.downloadAsset(currentAsset);
      }
    }
  }
});
