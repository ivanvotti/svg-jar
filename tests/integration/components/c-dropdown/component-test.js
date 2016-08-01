import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('c-dropdown', 'Integration | Component | c dropdown', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    toggleDropdown: () => null
  });

  this.render(hbs`
    <div class="js-dropdown-trigger"></div>
    {{#c-dropdown
        triggerClass="js-dropdown-trigger"
        targetAttachment=targetAttachment
        close=(action toggleDropdown)
    }}
      Dropdown
    {{/c-dropdown}}
  `);

  assert.equal(this.$().text().trim(), '');
});
