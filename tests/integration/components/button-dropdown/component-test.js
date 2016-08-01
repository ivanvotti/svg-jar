import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('button-dropdown', 'Integration | Component | button dropdown', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#button-dropdown as |section|}}
      {{#if section.isButton}}
        Dropdown
      {{else if section.isDropdown}}
        Item
      {{/if}}
    {{/button-dropdown}}
  `);

  assert.ok(this.$().text().trim());
});
