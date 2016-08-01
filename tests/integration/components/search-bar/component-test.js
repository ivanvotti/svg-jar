import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-bar', 'Integration | Component | search bar', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    searchQuery: null,
    setSearchQuery: () => null
  });

  this.render(hbs`
    {{search-bar
        searchQuery=searchQuery
        setSearchQuery=(action setSearchQuery)
    }}
  `);

  assert.equal(this.$().text().trim(), '');
});
