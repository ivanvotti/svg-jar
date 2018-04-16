import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | asset-groups', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const assets = [
      {
        svg: {
          content: '<circle cx="12" cy="12" r="6" fill="red" />',
          attrs: { class: 'svg-1', viewBox: '0 0 24 24' }
        },
        width: 24,
        height: 24
      },
      {
        svg: {
          content: '<circle cx="12" cy="12" r="6" fill="red" />',
          attrs: { class: 'svg-2', viewBox: '0 0 24 24' }
        },
        width: 24,
        height: 24
      },
      {
        svg: {
          content: '<circle cx="12" cy="12" r="6" fill="red" />',
          attrs: { class: 'svg-3', viewBox: '0 0 24 24' }
        },
        width: 24,
        height: 24
      }
    ];
    this.set('assets', assets);
  });

  test('it renders group children nodes properly', async function(assert) {
    this.set('arrangeBy', 'width');
    await render(hbs`{{asset-groups assets=assets arrangeBy=arrangeBy}}`);
    assert.dom('.c-asset-group .c-asset-list .c-asset-item svg circle').exists({ count: 3 });
  });

  test('it renders 1 group with three items', async function(assert) {
    this.assets[0].folder = 'onlyGroup';
    this.assets[1].folder = 'onlyGroup';
    this.assets[2].folder = 'onlyGroup';
    this.set('arrangeBy', 'folder');
    await render(hbs`{{asset-groups assets=assets arrangeBy=arrangeBy}}`);

    assert.dom('.c-asset-group').exists({ count: 1 });
    assert.dom('.c-asset-group__title').hasText('onlyGroup');
    assert.dom('.c-asset-group__count').hasText('3 Items');
    assert.dom('.c-asset-group .c-asset-item').exists({ count: 3 });
  });

  test('it renders 2 groups with one and two items', async function(assert) {
    this.assets[0].folder = 'firstGroup';
    this.assets[1].folder = 'secondGroup';
    this.assets[2].folder = 'secondGroup';
    this.set('arrangeBy', 'folder');
    await render(hbs`{{asset-groups assets=assets arrangeBy=arrangeBy}}`);

    assert.dom('.c-asset-group').exists({ count: 2 });

    const [firstGroup, secondGroup] = this.element.querySelectorAll('.c-asset-group');

    assert.dom('.c-asset-group__title', firstGroup).hasText('firstGroup');
    assert.dom('.c-asset-group__count', firstGroup).hasText('1 Items');
    assert.dom('.c-asset-item', firstGroup).exists('first group has 1 item', { count: 1 });

    assert.dom('.c-asset-group__title', secondGroup).hasText('secondGroup');
    assert.dom('.c-asset-group__count', secondGroup).hasText('2 Items');
    assert.dom('.c-asset-item', secondGroup).exists('second group has 2 items', { count: 2 });
  });

  test('it renders 3 groups with one item in each', async function(assert) {
    this.assets[0].folder = 'firstGroup';
    this.assets[1].folder = 'secondGroup';
    this.assets[2].folder = 'thirdGroup';
    this.set('arrangeBy', 'folder');
    await render(hbs`{{asset-groups assets=assets arrangeBy=arrangeBy}}`);

    assert.dom('.c-asset-group').exists({ count: 3 });

    const [firstGroup, secondGroup, thirdGroup] = this.element.querySelectorAll('.c-asset-group');

    assert.dom('.c-asset-group__title', firstGroup).hasText('firstGroup');
    assert.dom('.c-asset-group__count', firstGroup).hasText('1 Items');
    assert.dom('.c-asset-item', firstGroup).exists('first group has 1 item', { count: 1 });

    assert.dom('.c-asset-group__title', secondGroup).hasText('secondGroup');
    assert.dom('.c-asset-group__count', secondGroup).hasText('1 Items');
    assert.dom('.c-asset-item', secondGroup).exists('second group has 1 item', { count: 1 });

    assert.dom('.c-asset-group__title', thirdGroup).hasText('thirdGroup');
    assert.dom('.c-asset-group__count', thirdGroup).hasText('1 Items');
    assert.dom('.c-asset-item', thirdGroup).exists('third group has 1 item', { count: 1 });
  });

  test('it updates when arrangeBy changes', async function(assert) {
    this.assets[0].firstCriterion = 'onlyGroup';
    this.assets[1].firstCriterion = 'onlyGroup';
    this.assets[2].firstCriterion = 'onlyGroup';
    this.set('arrangeBy', 'firstCriterion');
    await render(hbs`{{asset-groups assets=assets arrangeBy=arrangeBy}}`);

    assert.dom('.c-asset-group').exists({ count: 1 });

    this.assets[0].secondCriterion = 'firstGroup';
    this.assets[1].secondCriterion = 'secondGroup';
    this.assets[2].secondCriterion = 'thirdGroup';
    this.set('arrangeBy', 'secondCriterion');

    assert.dom('.c-asset-group').exists({ count: 3 });
  });
});
