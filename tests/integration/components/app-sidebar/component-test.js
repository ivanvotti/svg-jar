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
    const router = this.owner.lookup('router:main');
    router.setupRouter();

    await render(hbs`
      {{app-sidebar
        sidebarFilters=filters
        externalLinks=links
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('[data-test-logo-dropdown-trigger]').exists({ count: 1 });
    assert.dom('[data-test-logo-dropdown-content]').doesNotExist('logo dropdown is not open initially');

    assert.dom('[data-test-sidebar-filter="default"]').exists({ count: 1 });
    assert.dom('[data-test-sidebar-filter]').exists({ count: 3 });
    assert.dom('[data-test-sidebar-filter-title]').exists({ count: 2 });
    assert.dom('[data-test-sidebar-filter-item]').exists({ count: 4 });

    const defaultFilter = this.element.querySelector('[data-test-sidebar-filter="default"]');
    const [secondFilter, thirdFilter] = this.element
      .querySelectorAll('[data-test-sidebar-filter]:not([data-test-sidebar-filter="default"])');

    assert.dom('[data-test-sidebar-filter-title]', defaultFilter).doesNotExist('default filter has no title');
    assert.dom('[data-test-sidebar-filter-item]', defaultFilter).exists({ count: 1 });
    assert.dom('[data-test-sidebar-filter-item]', defaultFilter).hasAttribute('href', '#/');
    assert.dom('[data-test-sidebar-filter-name]', defaultFilter).hasText('All assets');
    assert.dom('[data-test-sidebar-filter-count]', defaultFilter).doesNotExist('default filter has no counter');

    assert.dom('[data-test-sidebar-filter-title]', secondFilter).hasText('by Directory');
    assert.dom('[data-test-sidebar-filter-item]', secondFilter).exists({ count: 2 });
    assert.dom('[data-test-sidebar-filter-item="0"]', secondFilter).hasAttribute('href', '#/?filterBy=fileDir%3Aicons');
    assert.dom('[data-test-sidebar-filter-item="0"] [data-test-sidebar-filter-name]', secondFilter).hasText('icons');
    assert.dom('[data-test-sidebar-filter-item="1"]', secondFilter).hasAttribute('href', '#/?filterBy=fileDir%3Aimages');
    assert.dom('[data-test-sidebar-filter-item="1"] [data-test-sidebar-filter-name]', secondFilter).hasText('images');

    assert.dom('[data-test-sidebar-filter-title]', thirdFilter).hasText('by Base size');
    assert.dom('[data-test-sidebar-filter-item]', thirdFilter).exists({ count: 1 });
    assert.dom('[data-test-sidebar-filter-item]', thirdFilter).hasAttribute('href', '#/?filterBy=baseSize%3A24px');
    assert.dom('[data-test-sidebar-filter-name]', thirdFilter).hasText('24px');
  });
});
