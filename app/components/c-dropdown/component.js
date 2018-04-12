import Component from '@ember/component';
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
    this._bindClickToClose();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unbindClickToClose();
  },

  _bindClickToClose() {
    run.next(() => {
      this._onDocumentClick = () => this.close();
      document.addEventListener('click', this._onDocumentClick);
    });
  },

  _unbindClickToClose() {
    document.removeEventListener('click', this._onDocumentClick);
  }
});
