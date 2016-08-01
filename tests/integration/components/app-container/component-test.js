import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-container', 'Integration | Component | app container', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    model: {},
    arrangeBy: null,
    sortBy: null,
    filterBy: null,
    searchQuery: null,
    setSearchQuery: () => null,
    showShortcutsBar: () => null,
    toggleShortcutsBar: () => null
  });

  this.render(hbs`
    {{app-container
        model=model
        arrangeBy=arrangeBy
        sortBy=sortBy
        filterBy=filterBy
        searchQuery=query
        setSearchQuery=(action setSearchQuery)
        showShortcutsBar=(action showShortcutsBar)
        toggleShortcutsBar=(action toggleShortcutsBar)
    }}
  `);

  assert.ok(this.$().text().trim());
});
