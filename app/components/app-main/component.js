import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { get, set, computed } from '@ember/object';
import { run } from '@ember/runloop';
import Velocity from 'velocity';

function doesMatch(target, query) {
  if (!target) {
    return false;
  }

  return target.toLowerCase().indexOf(query.toLowerCase()) !== -1;
}

export default Component.extend({
  classNames: ['c-app-main'],
  classNameBindings: ['isContentScrolled'],
  model: null,
  sortBy: null,
  filterBy: null,
  searchQuery: null,
  isContentScrolled: false,
  assets: alias('sortedAssets'),

  filterName: computed('filterBy', function() {
    return this.filterBy && this.filterBy.split(':')[1];
  }),

  filteredAssets: computed('filterBy', function() {
    const assets = get(this, 'model.assets');

    return this.filterBy
      ? assets.filterBy(...this.filterBy.split(':'))
      : assets;
  }),

  foundAssets: computed('filteredAssets', 'searchQuery', function() {
    const { searchQuery, filteredAssets } = this;
    const searchKeys = get(this, 'model.searchKeys');

    if (searchQuery && searchQuery.length > 1 && searchKeys) {
      return filteredAssets.filter((asset) => (
        searchKeys.some((searchKey) => doesMatch(asset[searchKey], searchQuery))
      ));
    }

    return filteredAssets;
  }),

  sortedAssets: computed('foundAssets', 'sortBy', function() {
    return this.sortBy
      ? this.foundAssets.sortBy(this.sortBy)
      : this.foundAssets;
  }),

  didInsertElement() {
    this._super(...arguments);
    this._animateAssetListItems();
    this._bindContentScrolling();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unbindContentScrolling();
  },

  _bindContentScrolling() {
    // It's used to show the content header shadow
    // whenever the content is scrolling.

    const scrollingTimeout = 10;
    const scrollingEl = this.element.querySelector('.js-content');

    const eventHandler = () => (
      set(this, 'isContentScrolled', scrollingEl.scrollTop !== 0)
    );

    this._onContentScrolled = () => {
      run.debounce(this, eventHandler, scrollingTimeout);
    };

    scrollingEl.addEventListener('scroll', this._onContentScrolled);
  },

  _unbindContentScrolling() {
    const scrollingEl = this.element.querySelector('.js-content');
    scrollingEl.removeEventListener('scroll', this._onContentScrolled);
  },

  _animateAssetListItems() {
    const assetItemEls = this.element.querySelectorAll('.js-asset-item');

    Velocity(assetItemEls, 'transition.expandIn', {
      duration: 500,

      // Cleanup Velocity inline styles.
      complete(targets) {
        targets.forEach((target) => target.removeAttribute('style'));
      }
    });
  }
});
