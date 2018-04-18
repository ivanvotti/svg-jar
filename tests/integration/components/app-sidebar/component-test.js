import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | app-sidebar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.filters = [
      {
        name: 'Directory',
        key: 'fileDir',
        items: [
          { name: 'icons', count: 1 },
          { name: 'images', count: 2 }
        ]
      },
      {
        name: 'Base size',
        key: 'baseSize',
        items: [
          { name: '24px', count: 3 }
        ]
      }
    ];

    this.externalLinks = [
      { url: 'first-url', text: 'first link' },
      { url: 'second-url', text: 'second link' }
    ];

    this.showShortcutBar = () => null;
  });

  test('it renders sidebar and its children properly', async function(assert) {
    await render(hbs`
      {{app-sidebar
        sidebarFilters=filters
        externalLinks=links
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('.test-logo-dropdown-trigger').exists({ count: 1 });
    assert.dom('.test-logo-dropdown-content').doesNotExist('logo dropdown is not open initially');

    assert.dom('.test-sidebar-default-filter').exists({ count: 1 });
    assert.dom('.test-sidebar-filter').exists({ count: 2 });
    assert.dom('.test-sidebar-filter-title').exists({ count: 2 });
    assert.dom('.test-sidebar-filter-item').exists({ count: 4 });

    const defaultFilter = this.element.querySelector('.test-sidebar-default-filter');
    const [secondFilter, thirdFilter] = this.element.querySelectorAll('.test-sidebar-filter');

    assert.dom('.test-sidebar-filter-title', defaultFilter).doesNotExist('default filter has no title');
    assert.dom('.test-sidebar-filter-item', defaultFilter).exists({ count: 1 }, 'default filter has only one item');
    assert.dom('.test-sidebar-filter-name', defaultFilter).hasText('All assets');
    assert.dom('.test-sidebar-filter-count', defaultFilter).doesNotExist('default filter has no counter');

    assert.dom('.test-sidebar-filter-title', secondFilter).hasText('by Directory');
    assert.dom('.test-sidebar-filter-item', secondFilter).exists({ count: 2 });
    assert.dom('.test-sidebar-filter-item:nth-of-type(1) .test-sidebar-filter-name', secondFilter).hasText('icons');
    assert.dom('.test-sidebar-filter-item:nth-of-type(2) .test-sidebar-filter-name', secondFilter).hasText('images');

    assert.dom('.test-sidebar-filter-title', thirdFilter).hasText('by Base size');
    assert.dom('.test-sidebar-filter-item', thirdFilter).exists({ count: 1 });
    assert.dom('.test-sidebar-filter-name', thirdFilter).hasText('24px');
  });
});
