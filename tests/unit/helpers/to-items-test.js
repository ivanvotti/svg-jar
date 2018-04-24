import { toItems } from 'svg-jar/helpers/to-items';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | to-items', function(hooks) {
  setupTest(hooks);

  test('it works', function(assert) {
    let groups = {
      odd: [1, 3, 5],
      even: [2, 4]
    };

    assert.deepEqual(
      toItems([groups], { keyName: 'name', valueName: 'items' }),
      [{ name: 'odd', items: [1, 3, 5] }, { name: 'even', items: [2, 4] }],
      'custom keyName and valueName'
    );

    assert.deepEqual(
      toItems([groups], { valueName: 'items' }),
      [{ key: 'odd', items: [1, 3, 5] }, { key: 'even', items: [2, 4] }],
      'default keyName'
    );

    assert.deepEqual(
      toItems([groups], {}),
      [{ key: 'odd', value: [1, 3, 5] }, { key: 'even', value: [2, 4] }],
      'default keyName and valueName'
    );
  });
});
