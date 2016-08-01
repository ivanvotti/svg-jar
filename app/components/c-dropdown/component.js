import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import run from 'ember-runloop';
import $ from 'jquery';

export default Component.extend({
  tagName: '',
  triggerClass: null,
  attachment: 'top left',
  targetAttachment: 'bottom left',
  offset: '-4px 0',
  clickOutsideToClose: true,
  clickInsideToClose: true,
  constraints: [{ to: 'window', attachment: 'target' }],

  clickToClose: computed.or('clickOutsideToClose', 'clickInsideToClose'),

  clickEventName: computed(function() {
    let triggerClass = get(this, 'triggerClass');
    return `click.${triggerClass}`;
  }),

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'clickToClose')) {
      this.initClickToClose();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (get(this, 'clickToClose')) {
      this.offClickToClose();
    }
  },

  initClickToClose() {
    run.next(() => {
      $(document).on(get(this, 'clickEventName'), (event) => {
        let triggerClass = get(this, 'triggerClass');
        let $target = $(event.target);
        let isTriggerClick = $target.hasClass(triggerClass);

        if (isTriggerClick) {
          return;
        }

        let clickOutsideToClose = get(this, 'clickOutsideToClose');
        let clickInsideToClose = get(this, 'clickInsideToClose');
        let isInsideClick = !!$target.closest('.c-dropdown').length;
        let needToClose = (isInsideClick && clickInsideToClose) ||
                          (!isInsideClick && clickOutsideToClose);

        if (needToClose) {
          this.attrs.close();
        }
      });
    });
  },

  offClickToClose() {
    $(document).off(get(this, 'clickEventName'));
  }
});
