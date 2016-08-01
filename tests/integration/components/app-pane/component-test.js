import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-pane', 'Integration | Component | app pane', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{app-pane
        currentAsset=currentAsset
        detailsItems=model.details
    }}
  `);

  assert.ok(this.$().text().trim());
});
