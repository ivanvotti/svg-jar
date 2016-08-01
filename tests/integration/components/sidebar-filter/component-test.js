import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sidebar-filter', 'Integration | Component | sidebar filter', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{sidebar-filter filter=sidebarFilter}}`);
  assert.equal(this.$().text().trim(), '');
});
