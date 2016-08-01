import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-list', 'Integration | Component | asset list', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    assets: [],
    currentAsset: null,
    setCurrentAsset: () => null,
  });

  this.render(hbs`
    {{asset-list
        assets=group.items
        currentAsset=currentAsset
        setCurrentAsset=(action setCurrentAsset)
    }}
  `);

  assert.equal(this.$().text().trim(), '');
});
