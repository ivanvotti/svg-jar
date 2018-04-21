import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'svg-jar/tests/helpers/stubService';
import { spy } from 'sinon';

module('Integration | Component | asset-item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const asset = {
      svg: {
        content: '<circle cx="12" cy="12" r="6" fill="red" />',
        attrs: { viewBox: '0 0 24 24' }
      },
      width: 24,
      height: 24
    };
    this.set('asset', asset);
  });

  test('it renders correct SVG image', async function(assert) {
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    const actualSVG = this.element.querySelector('svg').outerHTML;
    const expectedSVG = '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="6" fill="red"></circle></svg>';

    assert.equal(actualSVG, expectedSVG);
  });

  test('it is inactive by default', async function(assert) {
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    assert.dom('[data-test-asset-item]').hasNoClass('is-active');
  });

  test('it is active after click', async function(assert) {
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    await click('[data-test-asset-item]');

    assert.dom('[data-test-asset-item]').hasClass('is-active');
  });

  test('it gets inactive when asset-selector#currentAsset changes to anohter asset', async function(assert) {
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    await click('[data-test-asset-item]');

    assert.dom('[data-test-asset-item]').hasClass('is-active');

    this.owner.lookup('service:asset-selector').setCurrentAsset({});
    await settled();

    assert.dom('[data-test-asset-item]').hasNoClass('is-active');
  });

  test('it calls asset-selector#isCurrent on render', async function(assert) {
    const isCurrent = spy();
    stubService('asset-selector', { isCurrent });
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);

    assert.ok(isCurrent.calledOnceWith(this.asset), 'isCurrent is called with asset');
  });

  test('it is active if asset-selector#isCurrent returns true', async function(assert) {
    stubService('asset-selector', { isCurrent: () => true });
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);

    assert.dom('[data-test-asset-item]').hasClass('is-active');
  });

  test('it is not active if asset-selector#isCurrent returns false', async function(assert) {
    stubService('asset-selector', { isCurrent: () => false });
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);

    assert.dom('[data-test-asset-item]').hasNoClass('is-active');
  });

  test('it calls setCurrentAsset on click', async function(assert) {
    const setCurrentAsset = spy();
    stubService('asset-selector', { setCurrentAsset, isCurrent: () => false });
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    await click('[data-test-asset-item]');

    assert.ok(setCurrentAsset.calledOnceWith(this.asset), 'setCurrentAsset is called with asset');
  });

  test('it does not call setCurrentAsset on click when it is active', async function(assert) {
    const setCurrentAsset = spy();
    stubService('asset-selector', { setCurrentAsset, isCurrent: () => true });
    await render(hbs`{{asset-item asset=asset data-test-asset-item="true"}}`);
    await click('[data-test-asset-item]');

    assert.ok(setCurrentAsset.notCalled, 'setCurrentAsset should not be called');
  });
});
