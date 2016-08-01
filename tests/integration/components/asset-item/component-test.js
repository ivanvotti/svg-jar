import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-item', 'Integration | Component | asset item', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    asset: { svg: { attrs: {} } },
    currentAsset: null,
    setCurrentAsset: () => null,
  });

  this.render(hbs`
    {{asset-item
        asset=asset
        currentAsset=currentAsset
        setCurrentAsset=(action setCurrentAsset)
    }}
  `);

  assert.ok(this.$().text().trim());
});
