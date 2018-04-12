import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const ASSET = {
  svg: {
    content: '<circle cx="12" cy="12" r="6" fill="red" />',
    attrs: { viewBox: '0 0 24 24' }
  },
  width: 24,
  height: 24
};

module('Integration | Component | asset-item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('asset', ASSET);
  });

  test('it renders correct SVG image', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    const actualSVG = this.element.querySelector('svg').parentNode.innerHTML;
    const expectedSVG = '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="6" fill="red"></circle></svg>';
    assert.equal(actualSVG, expectedSVG);
  });

  test('it is not active by default', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    assert.dom('.c-asset-item').hasNoClass('is-active');
  });

  test('it is active after click', async function(assert) {
    await render(hbs`{{asset-item asset=asset}}`);
    await click('.c-asset-item');
    assert.dom('.c-asset-item').hasClass('is-active');
  });
});
