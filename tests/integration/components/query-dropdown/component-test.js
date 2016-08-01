import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('query-dropdown', 'Integration | Component | query dropdown', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{query-dropdown
        buttonName="Sort by"
        queryParamName="sortBy"
        dropdownItems=sortDropdownItems
    }}
  `);

  assert.equal(this.$().text().trim(), '');
});
