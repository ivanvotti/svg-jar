import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  alignment: 'left',

  attachment: computed('alignment', function() {
    return `top ${get(this, 'alignment')}`;
  }),

  targetAttachment: computed('alignment', function() {
    return `bottom ${get(this, 'alignment')}`;
  })
});
