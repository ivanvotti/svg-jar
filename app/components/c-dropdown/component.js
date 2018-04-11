import Component from '@ember/component';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: '',
  triggerClass: null,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  offset: '-4px 0',

  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  constraints: [{ to: 'window', attachment: 'target' }],

  didInsertElement() {
    this._super(...arguments);
    this.initClickToClose();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.offClickToClose();
  },

  initClickToClose() {
    run.next(() => {
      this._onDocumentClick = () => get(this, 'close')();
      document.addEventListener('click', this._onDocumentClick);
    });
  },

  offClickToClose() {
    document.removeEventListener('click', this._onDocumentClick);
  }
});
