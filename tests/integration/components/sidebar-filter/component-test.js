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
    const router = this.owner.lookup('router:main');
    router.setupRouter();

    await render(hbs`{{sidebar-filter filter=filter}}`);

    assert.dom('[data-test-sidebar-filter]').exists({ count: 1 });
    assert.dom('[data-test-sidebar-filter-title]').hasText('by Directory');
    assert.dom('a[data-test-sidebar-filter-item]').exists({ count: 2 });

    const [firstItem, secondItem] = this.element.querySelectorAll('[data-test-sidebar-filter-item]');

    assert.dom(firstItem).hasAttribute('href', '#/?filterBy=fileDir%3Aicons');
    assert.dom('[data-test-sidebar-filter-name]', firstItem).hasText('icons');
    assert.dom('[data-test-sidebar-filter-count]', firstItem).hasText('1');

    assert.dom(secondItem).hasAttribute('href', '#/?filterBy=fileDir%3Aimages');
    assert.dom('[data-test-sidebar-filter-name]', secondItem).hasText('images');
    assert.dom('[data-test-sidebar-filter-count]', secondItem).hasText('2');
  });
});
