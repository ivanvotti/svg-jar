import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | logo-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.externalLinks = [
      { url: 'first-url', text: 'first link' },
      { url: 'second-url', text: 'second link' }
    ];

    this.showShortcutBar = () => null;
  });

  test('it only renders dropdown triger & logo initially', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('.test-logo-dropdown-trigger').exists();
    assert.dom('.test-logo-dropdown-logo').exists();
    assert.dom('.test-logo-dropdown-content').doesNotExist();
  });

  test('it shows dropdown on click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('.test-logo-dropdown-content').doesNotExist('dropdown is hidden before click');

    await click('.test-logo-dropdown-trigger');

    assert.dom('.test-logo-dropdown-content').exists('dropdown is shown after click');
  });

  test('it renders dropdown content properly', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');

    assert.dom('.test-logo-dropdown-content .test-logo-dropdown-shortcuts-toggle').exists({ count: 1 });
    assert.dom('.test-logo-dropdown-content a.test-logo-dropdown-link').exists({ count: 2 });

    const shortcutsToggle = this.element.querySelector('.test-logo-dropdown-shortcuts-toggle');
    const [firstLink, secondLink] = this.element.querySelectorAll('.test-logo-dropdown-link');

    assert.dom(shortcutsToggle).hasText('Shortcuts');

    assert.dom(firstLink).hasText('first link');
    assert.dom(firstLink).hasAttribute('href', 'first-url');

    assert.dom(secondLink).hasText('second link');
    assert.dom(secondLink).hasAttribute('href', 'second-url');
  });

  test('it calls showShortcutBar action on shortcuts toggle click', async function(assert) {
    assert.expect(1);

    this.showShortcutBar = () => assert.ok(true, 'showShortcutBar is called');

    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');
    await click('.test-logo-dropdown-shortcuts-toggle');
  });

  test('it closes dropdown on shortcuts toggle click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');
    assert.dom('.test-logo-dropdown-content').exists('dropdown is shown');

    await click('.test-logo-dropdown-shortcuts-toggle');
    assert.dom('.test-logo-dropdown-content').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on the second dropdown trigger click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');
    assert.dom('.test-logo-dropdown-content').exists('dropdown is shown');

    await click('.test-logo-dropdown-trigger');
    assert.dom('.test-logo-dropdown-content').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on document click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');
    assert.dom('.test-logo-dropdown-content').exists('dropdown is shown');

    await click(this.element.parentNode);
    assert.dom('.test-logo-dropdown-content').doesNotExist('dropdown is hidden');
  });

  test('it does not close dropdown on link click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.test-logo-dropdown-trigger');
    assert.dom('.test-logo-dropdown-content').exists('dropdown is shown');

    await click('.test-logo-dropdown-link');
    assert.dom('.test-logo-dropdown-content').exists('dropdown is still shown');
  });
});
