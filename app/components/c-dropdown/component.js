import Component from 'ember-component';
import get from 'ember-metal/get';
import run from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  tagName: '',
  target: null,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  offset: '-4px 0',
  clickOutsideToClose: false,
  constraints: [{ to: 'window', attachment: 'target' }],

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'clickOutsideToClose')) {
      this.initClickOutsideToClose();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (get(this, 'clickOutsideToClose')) {
      this.offClickOutsideToClose();
    }
  },

  initClickOutsideToClose() {
    run.next(() => {
      $(document).on('click.c-dropdown', (event) => {
        let isInsideClick = $(event.target).closest('.c-dropdown').length;

        if (!isInsideClick) {
          this.attrs.close();
        }
      });
    });
  },

  offClickOutsideToClose() {
    $(document).off('click.c-dropdown');
  }
});
