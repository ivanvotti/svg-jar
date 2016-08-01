import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-groups', 'Integration | Component | asset groups', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    assets: [],
    currentAsset: null,
    arrangeBy: 'size',
    setCurrentAsset: () => null
  });

  this.render(hbs`
    {{asset-groups
        assets=assets
        currentAsset=currentAsset
        arrangeBy=arrangeBy
        setCurrentAsset=(action setCurrentAsset)
    }}
  `);

  assert.equal(this.$().text().trim(), '');
});
