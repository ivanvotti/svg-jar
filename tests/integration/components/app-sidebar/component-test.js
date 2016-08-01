import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-sidebar', 'Integration | Component | app sidebar', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    sidebarFilters: null,
    externalLinks: null,
    showShortcutsBar: () => null
  });

  this.render(hbs`
    {{app-sidebar
        sidebarFilters=model.filters
        externalLinks=model.links
        showShortcutsBar=(action showShortcutsBar)
    }}
  `);

  assert.ok(this.$().text().trim());
});
