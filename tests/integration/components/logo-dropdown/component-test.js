import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { spy } from 'sinon';

module('Integration | Component | logo-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.externalLinks = [
      { url: 'first-url', text: 'first link' },
      { url: 'second-url', text: 'second link' }
    ];

    this.showShortcutBar = () => null;
  });

  test('it only renders dropdown trigger & logo initially', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('[data-test-logo-dropdown-trigger]').exists();
    assert.dom('[data-test-logo-dropdown-logo]').exists();
    assert.dom('[data-test-logo-dropdown-content]').doesNotExist();
  });

  test('it shows dropdown on click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('[data-test-logo-dropdown-content]').doesNotExist('dropdown is hidden before click');

    await click('[data-test-logo-dropdown-trigger]');

    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is shown after click');
  });

  test('it renders dropdown content properly', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');

    assert.dom('[data-test-logo-dropdown-content] [data-test-logo-dropdown-shortcuts-toggle]').exists({ count: 1 });
    assert.dom('[data-test-logo-dropdown-content] a[data-test-logo-dropdown-link]').exists({ count: 2 });

    let shortcutsToggle = this.element.querySelector('[data-test-logo-dropdown-shortcuts-toggle]');
    let [firstLink, secondLink] = this.element.querySelectorAll('[data-test-logo-dropdown-link]');

    assert.dom(shortcutsToggle).hasText('Shortcuts');

    assert.dom(firstLink).hasText('first link');
    assert.dom(firstLink).hasAttribute('href', 'first-url');

    assert.dom(secondLink).hasText('second link');
    assert.dom(secondLink).hasAttribute('href', 'second-url');
  });

  test('it calls showShortcutBar action on shortcuts toggle click', async function(assert) {
    this.showShortcutBar = spy();

    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');
    await click('[data-test-logo-dropdown-shortcuts-toggle]');
    assert.ok(this.showShortcutBar.calledOnce, 'showShortcutBar is called');
  });

  test('it closes dropdown on shortcuts toggle click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');
    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is shown');

    await click('[data-test-logo-dropdown-shortcuts-toggle]');
    assert.dom('[data-test-logo-dropdown-content]').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on the second dropdown trigger click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');
    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is shown');

    await click('[data-test-logo-dropdown-trigger]');
    assert.dom('[data-test-logo-dropdown-content]').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on document click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');
    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is shown');

    await click(this.element.parentNode);
    assert.dom('[data-test-logo-dropdown-content]').doesNotExist('dropdown is hidden');
  });

  test('it does not close dropdown on link click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('[data-test-logo-dropdown-trigger]');
    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is shown');

    await click('[data-test-logo-dropdown-link]');
    assert.dom('[data-test-logo-dropdown-content]').exists('dropdown is still shown');
  });
});
