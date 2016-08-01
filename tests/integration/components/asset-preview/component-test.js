import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-preview', 'Integration | Component | asset preview', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    currentAsset: { svg: { attrs: {} } }
  });

  this.render(hbs`{{asset-preview asset=currentAsset}}`);

  assert.ok(this.$().text().trim());
});
