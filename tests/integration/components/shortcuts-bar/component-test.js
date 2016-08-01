import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shortcuts-bar', 'Integration | Component | shortcuts bar', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    isOpen: false,
    toggleShortcutsBar: () => null
  });

  this.render(hbs`
    {{shortcuts-bar
        isOpen=isShortcutsBarOpen
        close=(action toggleShortcutsBar)
    }}
  `);

  assert.ok(this.$().text().trim());
});
