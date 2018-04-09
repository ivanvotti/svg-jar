import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Pretender from 'pretender';
import config from 'svg-jar/config/environment';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.server = new Pretender();
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('it loads the model from modelURL', async function(assert) {
    const expectedModel = { assets: ['asset'] };
    this.server.get(config.modelURL, () => [200, {}, JSON.stringify(expectedModel)]);
    const route = this.owner.lookup('route:application');
    const model = await route.model();

    assert.deepEqual(model, expectedModel);
  });

  test('it sets an error message if modelURL is not found', async function(assert) {
    const expectedModel = { error: `Can't find asset viewer model at ${config.modelURL}` };
    this.server.get(config.modelURL, () => [404, {}, '']);
    const route = this.owner.lookup('route:application');
    const model = await route.model();

    assert.deepEqual(model, expectedModel);
  });

  test('it rejects if there was any other network error', async function(assert) {
    this.server.get(config.modelURL, () => [503, {}, '']);
    const route = this.owner.lookup('route:application');

    assert.rejects(route.model());
  });
});
