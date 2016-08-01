import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('asset-details', 'Integration | Component | asset details', {
  integration: true
});

test('it renders', function(assert) {
  this.setProperties({
    asset: { size: '42px' },
    detailsItems: [{ name: 'Size', key: 'size' }]
  });

  this.render(hbs`
    {{asset-details
        asset=currentAsset
        detailsItems=detailsItems
    }}
  `);

  assert.ok(this.$().text().trim());
});
