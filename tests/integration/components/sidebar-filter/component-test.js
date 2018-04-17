import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sidebar-filter', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('filter', {
      name: 'Directory',
      key: 'fileDir',
      items: [
        { name: 'icons', count: 1 },
        { name: 'images', count: 2 }
      ]
    });
  });

  test('it renders a filter with 2 items properly', async function(assert) {
    await render(hbs`{{sidebar-filter filter=filter}}`);

    assert.dom('.c-sidebar-filter').exists({ count: 1 });
    assert.dom('.c-sidebar-filter__title').hasText('by Directory');
    assert.dom('.c-sidebar-filter__item').exists({ count: 2 });

    const [firstItem, secondItem] = this.element.querySelectorAll('.c-sidebar-filter__item');

    assert.dom('.c-sidebar-filter__name', firstItem).hasText('icons');
    assert.dom('.c-sidebar-filter__count', firstItem).hasText('1');

    assert.dom('.c-sidebar-filter__name', secondItem).hasText('images');
    assert.dom('.c-sidebar-filter__count', secondItem).hasText('2');
  });
});
