import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  alignment: 'left',
  isOpen: false,

  actions: {
    toggleDropdown() {
      set(this, 'isOpen', !this.isOpen);
    }
  }
});
