import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | query-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.dropdownItems = [
      { name: 'Directory', key: 'fileDir' },
      { name: 'Base size', key: 'baseSize' }
    ];
  });

  test('it only renders dropdown triger initially', async function(assert) {
    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    assert.dom('.test-query-dropdown-trigger').exists();
    assert.dom('.test-query-dropdown-trigger-text').hasText('Arrange by');
    assert.dom('.test-query-dropdown-content').doesNotExist();
  });

  test('it shows dropdown on click', async function(assert) {
    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    assert.dom('.test-query-dropdown-content').doesNotExist('dropdown is hidden before click');

    await click('.test-query-dropdown-trigger');

    assert.dom('.test-query-dropdown-content').exists('dropdown is shown after click');
  });

  test('it renders dropdown content properly', async function(assert) {
    const router = this.owner.lookup('router:main');
    router.setupRouter();

    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    await click('.test-query-dropdown-trigger');

    assert.dom('.test-query-dropdown-content a.test-query-dropdown-item').exists({ count: 3 });

    const [firstLink, secondLink, thirdLink] = this.element.querySelectorAll('.test-query-dropdown-item');

    assert.dom(firstLink).hasText('Directory');
    assert.dom(firstLink).hasAttribute('href', '#/?arrangeBy=fileDir');

    assert.dom(secondLink).hasText('Base size');
    assert.dom(secondLink).hasAttribute('href', '#/?arrangeBy=baseSize');

    assert.dom(thirdLink).hasText('None');
    assert.dom(thirdLink).hasAttribute('href', '#/');
  });

  test('it closes dropdown on any dropdown item click', async function(assert) {
    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    await click('.test-query-dropdown-trigger');
    assert.dom('.test-query-dropdown-content').exists('dropdown is shown');

    await click('.test-query-dropdown-items');
    assert.dom('.test-query-dropdown-content').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on the second dropdown trigger click', async function(assert) {
    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    await click('.test-query-dropdown-trigger');
    assert.dom('.test-query-dropdown-content').exists('dropdown is shown');

    await click('.test-query-dropdown-trigger');
    assert.dom('.test-query-dropdown-content').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on document click', async function(assert) {
    await render(hbs`
      {{query-dropdown
        buttonName="Arrange by"
        queryParamName="arrangeBy"
        dropdownItems=dropdownItems
      }}
    `);

    await click('.test-query-dropdown-trigger');
    assert.dom('.test-query-dropdown-content').exists('dropdown is shown');

    await click(this.element.parentNode);
    assert.dom('.test-query-dropdown-content').doesNotExist('dropdown is hidden');
  });
});
