import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content-header', 'Integration | Component | content header', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    arrangeDropdownItems: null,
    sortDropdownItems: null,
    searchQuery: null,
    setSearchQuery: () => null
  });

  this.render(hbs`
    {{content-header
        arrangeDropdownItems=model.arrangeBy
        sortDropdownItems=model.sortBy
        searchQuery=searchQuery
        setSearchQuery=(action setSearchQuery)
    }}
  `);

  assert.equal(this.$().text().trim(), '');
});
