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

    assert.dom('.c-app-sidebar__logo .c-dropdown__trigger [data-test-logo]').exists({ count: 1 });
    assert.dom('.c-dropdown__item').doesNotExist('logo dropdown is not open initially');

    assert.dom('.c-sidebar-filter').exists({ count: 3 });
    assert.dom('.c-sidebar-filter__title').exists({ count: 2 });
    assert.dom('.c-sidebar-filter__item').exists({ count: 4 });

    const [defaultFilter, secondFilter, thirdFilter] = this.element.querySelectorAll('.c-sidebar-filter');

    assert.dom('.c-sidebar-filter__title', defaultFilter).doesNotExist('default filter has no title');
    assert.dom('.c-sidebar-filter__item', defaultFilter).exists({ count: 1 }, 'default filter has only one item');
    assert.dom('.c-sidebar-filter__name', defaultFilter).hasText('All assets');
    assert.dom('.c-sidebar-filter__count', defaultFilter).doesNotExist('default filter has no counter');

    assert.dom('.c-sidebar-filter__title', secondFilter).hasText('by Directory');
    assert.dom('.c-sidebar-filter__item', secondFilter).exists({ count: 2 });
    assert.dom('.c-sidebar-filter__item:nth-of-type(1) .c-sidebar-filter__name', secondFilter).hasText('icons');
    assert.dom('.c-sidebar-filter__item:nth-of-type(2) .c-sidebar-filter__name', secondFilter).hasText('images');

    assert.dom('.c-sidebar-filter__title', thirdFilter).hasText('by Base size');
    assert.dom('.c-sidebar-filter__item', thirdFilter).exists({ count: 1 });
    assert.dom('.c-sidebar-filter__name', thirdFilter).hasText('24px');
  });
});
