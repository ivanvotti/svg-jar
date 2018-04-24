import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const ASSETS = [
  {
    svg: {
      content: '<circle cx="12" cy="12" r="6" fill="red" />',
      attrs: { class: 'svg-1', viewBox: '0 0 24 24' }
    },
    width: 24,
    height: 24,
    name: 'icon circle',
    category: 'icon',
    id: 3
  },
  {
    svg: {
      content: '<circle cx="12" cy="12" r="6" fill="red" />',
      attrs: { class: 'svg-2', viewBox: '0 0 24 24' }
    },
    width: 24,
    height: 24,
    name: 'image square',
    category: 'image',
    id: 1
  },
  {
    svg: {
      content: '<circle cx="12" cy="12" r="6" fill="red" />',
      attrs: { class: 'svg-2', viewBox: '0 0 24 24' }
    },
    width: 24,
    height: 24,
    name: 'icon square',
    category: 'icon',
    id: 2
  }
];

module('Integration | Component | app-main', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    this.model = { assets: ASSETS, searchKeys: ['name'] };
    this.arrangeBy = null;
    this.sortBy = null;
    this.filterBy = null;
    this.searchQuery = null;
    this.setSearchQuery = () => null;

    await render(hbs`
      {{app-main
          model=model
          arrangeBy=arrangeBy
          sortBy=sortBy
          filterBy=filterBy
          searchQuery=searchQuery
          setSearchQuery=setSearchQuery
      }}
    `);
  });

  test('it renders all unsorted assets', async function(assert) {
    assert.dom('[data-test-svg-name]').exists({ count: 3 });

    let [firstSVG, secondSVG, thirdSVG] = this.element.querySelectorAll('[data-test-svg-name]');
    assert.dom(firstSVG).hasAttribute('data-test-svg-name', 'icon circle');
    assert.dom(secondSVG).hasAttribute('data-test-svg-name', 'image square');
    assert.dom(thirdSVG).hasAttribute('data-test-svg-name', 'icon square');
  });

  test('it renders sorted assets', async function(assert) {
    this.set('sortBy', 'id');

    let [firstSVG, secondSVG, thirdSVG] = this.element.querySelectorAll('[data-test-svg-name]');
    assert.dom(firstSVG).hasAttribute('data-test-svg-name', 'image square');
    assert.dom(secondSVG).hasAttribute('data-test-svg-name', 'icon square');
    assert.dom(thirdSVG).hasAttribute('data-test-svg-name', 'icon circle');
  });

  test('it renders filtered assets', async function(assert) {
    this.set('filterBy', 'category:icon');

    assert.dom('[data-test-svg-name]').exists({ count: 2 });
    assert.dom('[data-test-svg-name="icon circle"]').exists();
    assert.dom('[data-test-svg-name="icon square"]').exists();
  });

  test('it renders found assets', async function(assert) {
    this.set('searchQuery', 'square');

    assert.dom('[data-test-svg-name]').exists({ count: 2 });
    assert.dom('[data-test-svg-name="icon square"]').exists();
    assert.dom('[data-test-svg-name="image square"]').exists();
  });

  test('it ignores searchQuery when it is only one character long', async function(assert) {
    this.set('searchQuery', 'w');
    assert.dom('[data-test-svg-name]').exists({ count: 3 });
  });

  test('it renders found filtered assets', async function(assert) {
    this.setProperties({
      filterBy: 'category:icon',
      searchQuery: 'square'
    });

    assert.dom('[data-test-svg-name]').exists({ count: 1 });
    assert.dom('[data-test-svg-name="icon square"]').exists();
  });

  test('it renders arranged assets', async function(assert) {
    this.set('arrangeBy', 'category');

    assert.dom('[data-test-svg-name]').exists({ count: 3 });
    assert.dom('[data-test-asset-group]').exists({ count: 2 });

    let [firstGroup, secondGroup] = this.element.querySelectorAll('[data-test-asset-group]');

    assert.dom('[data-test-asset-group-title]', firstGroup).hasText('icon');
    assert.dom('[data-test-svg-name="icon circle"]', firstGroup).exists();
    assert.dom('[data-test-svg-name="icon square"]', firstGroup).exists();
    assert.dom('[data-test-svg-name="image square"]', firstGroup).doesNotExist();

    assert.dom('[data-test-asset-group-title]', secondGroup).hasText('image');
    assert.dom('[data-test-svg-name="image square"]', secondGroup).exists();
  });

  test('it shows placeholder when there are no assets at all', async function(assert) {
    this.set('model.assets', []);

    assert.dom('[data-test-svg-name]').doesNotExist();
    assert.dom('[data-test-content-placeholder]')
      .hasText('No assets found');
  });

  test('it shows placeholder when there are no filtered assets', async function(assert) {
    this.set('filterBy', 'category:wrong');

    assert.dom('[data-test-svg-name]').doesNotExist();
    assert.dom('[data-test-content-placeholder]')
      .hasText('No assets found in wrong');
  });

  test('it shows placeholder when there are no found assets', async function(assert) {
    this.set('searchQuery', 'wrong');

    assert.dom('[data-test-svg-name]').doesNotExist();
    assert.dom('[data-test-content-placeholder]')
      .hasText('We couldn’t find any assets matching wrong');
  });

  test('it shows placeholder when there are no found filtered assets', async function(assert) {
    this.setProperties({
      filterBy: 'category:icon',
      searchQuery: 'wrong'
    });

    assert.dom('[data-test-svg-name]').doesNotExist();
    assert.dom('[data-test-content-placeholder]')
      .hasText('We couldn’t find any assets matching wrong in icon');
  });
});
