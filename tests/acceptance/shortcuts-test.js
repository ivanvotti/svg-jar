import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { triggerKeyDown } from 'ember-keyboard';
import Pretender from 'pretender';
import { stub } from 'sinon';
import config from 'svg-jar/config/environment';
import stubService from 'svg-jar/tests/helpers/stubService';
import shortcutsModel from 'svg-jar/tests/fixtures/shortcuts-model';

const MODEL_FIXTURE = JSON.stringify(shortcutsModel);
const ORIGINAL_SVG = shortcutsModel.assets[0].originalSvg;
const COMPRESSED_SVG = shortcutsModel.assets[0].compressedSvg;

module('Acceptance | global shortcuts', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    stubService('clipboard', {});
    stubService('file-saver', {});

    this.server = new Pretender();
    this.server.get(config.modelURL, () => [200, {}, MODEL_FIXTURE]);

    await visit('/');
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('Slash works properly', async function(assert) {
    assert.dom('[data-test-search-bar-input]').isNotFocused();
    await triggerKeyDown('Slash');
    assert.dom('[data-test-search-bar-input]').isFocused();
  });

  test('shift+Slash works properly', async function(assert) {
    assert.dom('[data-test-shortcut-bar]').doesNotHaveClass('is-open');
    await triggerKeyDown('shift+Slash');
    assert.dom('[data-test-shortcut-bar]').hasClass('is-open');
    await triggerKeyDown('shift+Slash');
    assert.dom('[data-test-shortcut-bar]').doesNotHaveClass('is-open');
  });

  test('Enter works properly', async function(assert) {
    const clipboardStub = this.owner.lookup('service:clipboard');
    clipboardStub.set('copy', stub().returns(true));

    await triggerKeyDown('Enter');
    assert.ok(clipboardStub.copy.notCalled, 'clipboard#copy is not called if there is no active asset');

    await click('[data-test-asset-item]');
    await triggerKeyDown('Enter');
    assert.ok(clipboardStub.copy.calledOnceWith('{{svg-jar "arrow-down"}}'));
  });

  test('KeyS works properly', async function(assert) {
    const clipboardStub = this.owner.lookup('service:clipboard');
    clipboardStub.set('copy', stub().returns(true));

    await triggerKeyDown('KeyS');
    assert.ok(clipboardStub.copy.notCalled, 'clipboard#copy is not called if there is no active asset');

    await click('[data-test-asset-item]');
    await triggerKeyDown('KeyS');
    assert.ok(clipboardStub.copy.calledOnceWith(COMPRESSED_SVG));
  });

  test('KeyD works properly', async function(assert) {
    const fileSaverStub = this.owner.lookup('service:file-saver');
    fileSaverStub.set('saveSVG', stub());

    await triggerKeyDown('KeyD');
    assert.ok(fileSaverStub.saveSVG.notCalled, 'fileSaver#saveSVG is not called if there is no active asset');

    await click('[data-test-asset-item]');
    await triggerKeyDown('KeyD');
    assert.ok(fileSaverStub.saveSVG.calledOnceWith(ORIGINAL_SVG, 'arrow-down.svg'));
  });
});
