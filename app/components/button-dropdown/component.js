import Component from '@ember/component';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  alignment: 'left',
  isOpen: false,
  hasArrow: true,

  attachment: computed('alignment', function() {
    return `top ${get(this, 'alignment')}`;
  }),

  targetAttachment: computed('alignment', function() {
    return `bottom ${get(this, 'alignment')}`;
  }),

  actions: {
    toggleDropdown() {
      let isOpen = get(this, 'isOpen');
      set(this, 'isOpen', !isOpen);
    }
  }
});
