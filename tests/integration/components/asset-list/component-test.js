import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | asset-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const assets = [
      {
        svg: {
          content: '<circle cx="12" cy="12" r="6" fill="red" />',
          attrs: { class: 'svg-1', viewBox: '0 0 24 24' }
        },
        width: 24,
        height: 24
      },
      {
        svg: {
          content: '<circle cx="12" cy="12" r="6" fill="red" />',
          attrs: { class: 'svg-2', viewBox: '0 0 24 24' }
        },
        width: 24,
        height: 24
      }
    ];
    this.set('assets', assets);
  });

  test('it renders items properly', async function(assert) {
    await render(hbs`{{asset-list assets=assets}}`);
    assert.dom('[data-test-asset-item]').exists({ count: 2 });
    assert.dom('svg.svg-1 circle').exists();
    assert.dom('svg.svg-2 circle').exists();
  });

  test('asset items are inactive by default', async function(assert) {
    await render(hbs`{{asset-list assets=assets}}`);
    assert.dom('.is-active').doesNotExist();
  });

  test('there is only one active item at a time', async function(assert) {
    await render(hbs`{{asset-list assets=assets}}`);
    const [firstItem, secondItem] = this.element.querySelectorAll('[data-test-asset-item]');

    await click(firstItem);
    assert.dom('.is-active').exists({ count: 1 });
    assert.dom(firstItem).hasClass('is-active');
    assert.dom(secondItem).hasNoClass('is-active');

    await click(secondItem);
    assert.dom('.is-active').exists({ count: 1 });
    assert.dom(firstItem).hasNoClass('is-active');
    assert.dom(secondItem).hasClass('is-active');
  });
});
