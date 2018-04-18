import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'svg-jar/tests/helpers/stubService';

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
    await render(hbs`{{asset-item asset=asset}}`);
    const actualSVG = this.element.querySelector('svg').outerHTML;
    const expectedSVG = '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="6" fill="red"></circle></svg>';
    assert.equal(actualSVG, expectedSVG);
  });

  test('it is inactive by default', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    assert.dom('.test-asset-item').hasNoClass('is-active');
  });

  test('it is active after click', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    await click('.test-asset-item');
    assert.dom('.test-asset-item').hasClass('is-active');
  });

  test('it gets inactive when asset-selector#currentAsset changes to anohter asset', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    await click('.test-asset-item');
    assert.dom('.test-asset-item').hasClass('is-active');

    this.owner.lookup('service:asset-selector').setCurrentAsset({});
    await settled();
    assert.dom('.test-asset-item').hasNoClass('is-active');
  });

  test('it calls asset-selector#isCurrent on render', async function(assert) {
    assert.expect(1);

    const expectedAsset = this.asset;
    stubService('asset-selector', {
      isCurrent(asset) {
        assert.equal(asset, expectedAsset, 'isCurrent is called with asset');
      }
    });
    await render(hbs`{{asset-item asset=asset}}`);
  });

  test('it is active if asset-selector#isCurrent returns true', async function(assert) {
    stubService('asset-selector', {
      isCurrent() {
        return true;
      }
    });
    await render(hbs`{{asset-item asset=asset}}`);
    assert.dom('.test-asset-item').hasClass('is-active');
  });

  test('it is not active if asset-selector#isCurrent returns false', async function(assert) {
    stubService('asset-selector', {
      isCurrent() {
        return false;
      }
    });
    await render(hbs`{{asset-item asset=asset}}`);
    assert.dom('.test-asset-item').hasNoClass('is-active');
  });

  test('it calls setCurrentAsset on click', async function(assert) {
    assert.expect(1);

    const expectedAsset = this.asset;
    stubService('asset-selector', {
      isCurrent() {
        return false;
      },

      setCurrentAsset(asset) {
        assert.equal(asset, expectedAsset, 'setCurrentAsset is called with asset');
      }
    });
    await render(hbs`{{asset-item asset=asset}}`);
    await click('.test-asset-item');
  });

  test('it does not call setCurrentAsset on click when it is active', async function(assert) {
    assert.expect(0);

    stubService('asset-selector', {
      isCurrent() {
        return true;
      },

      setCurrentAsset() {
        assert.notOk(true, 'setCurrentAsset should not be called');
      }
    });
    await render(hbs`{{asset-item asset=asset}}`);
    await click('.test-asset-item');
  });
});
