import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { stub } from 'sinon';

module('Unit | Service | file-saver', function(hooks) {
  setupTest(hooks);

  test('saveSVG works properly', function(assert) {
    let service = this.owner.factoryFor('service:file-saver').create({ saveAs: stub() });
    service.saveSVG('test', 'icon.svg');

    assert.ok(service.saveAs.calledOnce);

    let [blob, filename] = service.saveAs.getCall(0).args;
    assert.equal(blob.type, 'image/svg+xml');
    assert.equal(blob.size, 4);
    assert.equal(filename, 'icon.svg');
  });
});
