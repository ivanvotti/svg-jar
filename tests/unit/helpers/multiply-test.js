import { multiply } from 'svg-jar/helpers/multiply';
import { module, test } from 'qunit';

module('Unit | Helper | multiply');

test('it works', function(assert) {
  assert.equal(multiply([2, 3]), 6);
  assert.equal(multiply([2, 2, 2]), 8);
});
