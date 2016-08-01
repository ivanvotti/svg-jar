import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

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
