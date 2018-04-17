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

    assert.dom('.c-dropdown__trigger').exists();
    assert.dom('.c-dropdown__trigger [data-test-logo]').exists();
    assert.dom('.c-dropdown__item').doesNotExist();
  });

  test('it shows dropdown on click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    assert.dom('.c-dropdown__item').doesNotExist('dropdown is hidden before click');

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').exists({ count: 3 }, 'dropdown is shown after click');
  });

  test('it renders dropdown items properly', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.c-dropdown__trigger');
    const shortcutsToggle = this.element.querySelector('[data-test-shortcuts-toggle].c-dropdown__item');
    const [firstLink, secondLink] = this.element.querySelectorAll('a.c-dropdown__item');

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

    await click('.c-dropdown__trigger');
    await click('[data-test-shortcuts-toggle]');
  });

  test('it closes dropdown on shortcuts toggle click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').exists('dropdown is shown');

    await click('[data-test-shortcuts-toggle]');
    assert.dom('.c-dropdown__item').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on the second dropdown trigger click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').exists('dropdown is shown');

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').doesNotExist('dropdown is hidden');
  });

  test('it closes dropdown on document click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').exists('dropdown is shown');

    await click(this.element.parentNode);
    assert.dom('.c-dropdown__item').doesNotExist('dropdown is hidden');
  });

  test('it does not close dropdown on link click', async function(assert) {
    await render(hbs`
      {{logo-dropdown
        externalLinks=externalLinks
        showShortcutBar=showShortcutBar
      }}
    `);

    await click('.c-dropdown__trigger');
    assert.dom('.c-dropdown__item').exists('dropdown is shown');

    await click('a.c-dropdown__item');
    assert.dom('.c-dropdown__item').exists('dropdown is still shown');
  });
});
