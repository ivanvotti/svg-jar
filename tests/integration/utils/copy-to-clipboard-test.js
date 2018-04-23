import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import copyToClipboard from 'svg-jar/utils/copy-to-clipboard';
import { stub } from 'sinon';

module('Integration | Util | copy-to-clipboard', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.execCommandStub = stub(document, 'execCommand');
  });

  hooks.afterEach(function() {
    this.execCommandStub.restore();
  });

  test('it works properly', async function(assert) {
    assert.expect(2);

    this.execCommandStub.callsFake(() => {
      assert.equal(window.getSelection(), 'copy me', 'correct text is selected when execCommand is called');
    });

    copyToClipboard('copy me');
    assert.ok(this.execCommandStub.calledOnceWith('copy'));
  });

  test('it returns true if document#execCommand call succeeds', async function(assert) {
    this.execCommandStub.returns(true);
    assert.ok(copyToClipboard('copy me'));
  });

  test('it returns false if document#execCommand call fails', async function(assert) {
    this.execCommandStub.returns(false);
    assert.notOk(copyToClipboard('copy me'));
  });

  test('it returns false if document#execCommand call throws', async function(assert) {
    this.execCommandStub.throws();
    assert.notOk(copyToClipboard('copy me'));
  });
});
