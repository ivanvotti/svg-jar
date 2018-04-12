/* eslint-disable ember/no-on-calls-in-components */

import { alias } from '@ember/object/computed';

import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
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
  assetSelector: service('asset-selector'),
  model: null,
  sortBy: null,
  filterBy: null,
  searchQuery: null,
  isContentScrolled: false,

  currentAsset: alias('assetSelector.currentAsset'),
  assets: alias('sortedAssets'),

  filterName: computed('filterBy', function() {
    let filter = this.filterBy;
    return filter && filter.split(':')[1];
  }),

  filteredAssets: computed('filterBy', function() {
    let assets = get(this, 'model.assets');

    return this.filterBy
      ? assets.filterBy(...this.filterBy.split(':'))
      : assets;
  }),

  foundAssets: computed('filteredAssets', 'searchQuery', function() {
    let assets = this.filteredAssets;
    let query = this.searchQuery;
    let searchKeys = get(this, 'model.searchKeys');

    if (query && query.length > 1 && searchKeys) {
      assets = assets.filter((asset) => (
        searchKeys.some((searchKey) => doesMatch(asset[searchKey], query))
      ));
    }

    return assets;
  }),

  sortedAssets: computed('foundAssets', 'sortBy', function() {
    return this.sortBy
      ? this.foundAssets.sortBy(this.sortBy)
      : this.foundAssets;
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
    let assetItemEls = this.element.querySelectorAll('.js-asset-item');

    Velocity(assetItemEls, 'transition.expandIn', {
      duration: 500,

      // Cleanup Velocity inline styles.
      complete(targets) {
        targets.forEach((target) => target.removeAttribute('style'));
      }
    });
  },

  animateShortcutedAsset() {
    let activeAssetEl = this.element.querySelector('.js-active-asset');

    if (activeAssetEl) {
      Velocity(activeAssetEl, 'callout.pulse', { duration: 300 });
    }
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
    this.toggleShortcutBar();
    event.preventDefault();
  }),

  shortcutCopyCurrentCopypasta: on(keyDown('Enter'), function(event) {
    if (!this.currentAsset) {
      return;
    }

    if (copyToClipboard(this.currentAsset.copypasta)) {
      this.animateShortcutedAsset();
      event.preventDefault();
    } else {
      this.showClipboardError();
    }
  }),

  shortcutCopyCurrentSource: on(keyDown('KeyS'), function(event) {
    if (!this.currentAsset) {
      return;
    }

    if (copyToClipboard(makeSvg(this.currentAsset.svg))) {
      this.animateShortcutedAsset();
      event.preventDefault();
    } else {
      this.showClipboardError();
    }
  }),

  shortcutDownloadCurrent: on(keyDown('KeyD'), function(event) {
    if (!this.currentAsset) {
      return;
    }

    this.downloadAsset(this.currentAsset);
    this.animateShortcutedAsset();
    event.preventDefault();
  }),

  actions: {
    downloadCurrentAsset() {
      if (this.currentAsset) {
        this.downloadAsset(this.currentAsset);
      }
    }
  }
});
