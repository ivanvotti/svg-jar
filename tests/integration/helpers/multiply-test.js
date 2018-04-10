import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | multiply', function(hooks) {
  setupRenderingTest(hooks);

  test('it multiplies two args', async function(assert) {
    this.set('four', '4');
    await render(hbs`{{multiply four 2}}`);
    assert.equal(this.element.textContent, '8');
  });

  test('it multiplies unlimited args', async function(assert) {
    await render(hbs`{{multiply 2 3 4 5}}`);
    assert.equal(this.element.textContent, '120');
  });
});
