import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import on from 'ember-evented/on';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import copyToClipboard from 'svg-jar/utils/copy-to-clipboard';

export default Component.extend(EKMixin, EKOnInsertMixin, {
  classNames: ['c-app-container'],
  assets: null,
  currentAsset: null,

  onEnter: on(keyDown('Enter'), function(event) {
    let assetCopypasta = get(this, 'currentAsset.copypasta');

    if (assetCopypasta) {
      event.preventDefault();
      copyToClipboard(assetCopypasta);
    }
  }),

  actions: {
    setCurrentAsset(asset) {
      set(this, 'currentAsset', asset);
    }
  }
});
