import { queryPair } from 'svg-jar/helpers/query-pair';
import { module, test } from 'qunit';

module('Unit | Helper | query pair');

test('it works', function(assert) {
  let result = queryPair(['paramName', 'paramValue']);

  assert.deepEqual(result, {
    isQueryParams: true,

    values: {
      paramName: 'paramValue'
    }
  });
});
