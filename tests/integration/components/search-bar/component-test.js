import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  triggerKeyEvent,
  fillIn
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { spy } from 'sinon';

const ESCAPE = 27;
const ENTER = 13;

module('Integration | Component | search-bar', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.searchQuery = 'icon';
    this.setSearchQuery = spy();
  });

  test('it renders with empty query properly', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=''
        setSearchQuery=setSearchQuery
      }}
    `);

    assert.dom('[data-test-search-bar-input]').hasValue('');
    assert.dom('[data-test-search-bar-reset]').doesNotExist();
  });

  test('it renders with defined query properly', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=searchQuery
        setSearchQuery=setSearchQuery
      }}
    `);

    assert.dom('[data-test-search-bar-input]').hasValue('icon');
    assert.dom('[data-test-search-bar-reset]').exists();
  });

  test('it updates searchQuery on input', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=searchQuery
        setSearchQuery=setSearchQuery
      }}
    `);

    assert.equal(this.searchQuery, 'icon');

    await fillIn('[data-test-search-bar-input]', 'new value');
    assert.equal(this.searchQuery, 'new value');
  });

  test('it updates input value on searchQuery change', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=searchQuery
        setSearchQuery=setSearchQuery
      }}
    `);

    assert.dom('[data-test-search-bar-input]').hasValue('icon');

    this.set('searchQuery', '');
    assert.dom('[data-test-search-bar-input]').hasValue('');
  });

  test('it blurs input on Enter', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=searchQuery
        setSearchQuery=setSearchQuery
      }}
    `);

    await click('[data-test-search-bar-input]');
    assert.dom('[data-test-search-bar-input]').isFocused();

    await triggerKeyEvent('[data-test-search-bar-input]', 'keyup', ENTER);
    assert.dom('[data-test-search-bar-input]').isNotFocused();
  });

  test('it blurs input on Escape when searchQuery is empty', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=''
        setSearchQuery=setSearchQuery
      }}
    `);

    await click('[data-test-search-bar-input]');
    assert.dom('[data-test-search-bar-input]').isFocused();

    await triggerKeyEvent('[data-test-search-bar-input]', 'keyup', ESCAPE);
    assert.dom('[data-test-search-bar-input]').isNotFocused();
    assert.ok(this.setSearchQuery.notCalled, 'setSearchQuery is not called');
  });

  test('it calls setSearchQuery action on Escape when searchQuery is set', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery='icon'
        setSearchQuery=setSearchQuery
      }}
    `);

    await click('[data-test-search-bar-input]');
    assert.dom('[data-test-search-bar-input]').isFocused();

    await triggerKeyEvent('[data-test-search-bar-input]', 'keyup', ESCAPE);
    assert.dom('[data-test-search-bar-input]').isFocused('input is still in focus');
    assert.ok(this.setSearchQuery.calledOnce, 'setSearchQuery is called');
  });

  test('it calls setSearchQuery external action on reset click', async function(assert) {
    await render(hbs`
      {{search-bar
        searchQuery=searchQuery
        setSearchQuery=setSearchQuery
      }}
    `);

    await click('[data-test-search-bar-reset]');
    assert.ok(this.setSearchQuery.calledOnce, 'setSearchQuery is called');
  });
});
