/* eslint-disable ember/no-on-calls-in-components */

import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import makeSvg from 'svg-jar/utils/make-svg';
import Velocity from 'velocity';

export default Component.extend(EKMixin, EKOnInsertMixin, {
  assetSelector: service('asset-selector'),
  clipboard: service('clipboard'),
  fileSaver: service('file-saver'),
  classNames: ['c-app-container'],
  currentAsset: alias('assetSelector.currentAsset'),

  shortcutFocusSearchBar: on(keyDown('Slash'), function(event) {
    const searchInputEl = this.element.querySelector('.js-search-bar-input');
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

    if (this.clipboard.copy(this.currentAsset.copypasta)) {
      this._animateShortcutedAsset();
      event.preventDefault();
    } else {
      this._showClipboardError();
    }
  }),

  shortcutCopyCurrentSource: on(keyDown('KeyS'), function(event) {
    if (!this.currentAsset) {
      return;
    }

    if (this.clipboard.copy(makeSvg(this.currentAsset.svg))) {
      this._animateShortcutedAsset();
      event.preventDefault();
    } else {
      this._showClipboardError();
    }
  }),

  shortcutDownloadCurrent: on(keyDown('KeyD'), function(event) {
    if (this.currentAsset) {
      this.fileSaver.saveSVG(this.currentAsset.originalSvg, this.currentAsset.fileName);
      this._animateShortcutedAsset();
      event.preventDefault();
    }
  }),

  actions: {
    downloadCurrentAsset() {
      if (this.currentAsset) {
        this.fileSaver.saveSVG(this.currentAsset.originalSvg, this.currentAsset.fileName);
      }
    }
  },

  _animateShortcutedAsset() {
    const activeAssetEl = this.element.querySelector('.js-active-asset');

    if (activeAssetEl) {
      Velocity(activeAssetEl, 'callout.pulse', { duration: 300 });
    }
  },

  _showClipboardError() {
    // eslint-disable-next-line no-alert
    window.alert("Your browser doesn't support copy to clipboard feature.\n" +
      'Use the asset viewer with a modern browser, such as Chrome or Firefox.');
  }
});
