import { queryPair } from 'svg-jar/helpers/query-pair';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | query-pair', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let result = queryPair(['paramName', 'paramValue']);
    assert.deepEqual(result, { paramName: 'paramValue' });
  });
});
