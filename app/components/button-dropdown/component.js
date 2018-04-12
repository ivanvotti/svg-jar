import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({
  alignment: 'left',
  isOpen: false,
  hasArrow: true,

  attachment: computed('alignment', function() {
    return `top ${this.alignment}`;
  }),

  targetAttachment: computed('alignment', function() {
    return `bottom ${this.alignment}`;
  }),

  actions: {
    toggleDropdown() {
      set(this, 'isOpen', !this.isOpen);
    }
  }
});
