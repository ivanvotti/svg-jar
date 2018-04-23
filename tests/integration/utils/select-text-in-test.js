import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import selectTextIn from 'svg-jar/utils/select-text-in';

module('Integration | Util | select-text-in', function(hooks) {
  setupRenderingTest(hooks);

  test('it works for textarea element', async function(assert) {
    const targetElement = document.createElement('textarea');
    targetElement.value = 'select me';
    document.body.appendChild(targetElement);

    assert.equal(selectTextIn(targetElement), 'select me');
    assert.equal(window.getSelection(), 'select me');
  });

  test('it works for input element', async function(assert) {
    const targetElement = document.createElement('input');
    targetElement.value = 'select me';
    document.body.appendChild(targetElement);

    assert.equal(selectTextIn(targetElement), 'select me');
    assert.equal(window.getSelection(), 'select me');
  });

  test('it works for div element', async function(assert) {
    const targetElement = document.createElement('div');
    targetElement.textContent = 'select me';
    document.body.appendChild(targetElement);

    assert.equal(selectTextIn(targetElement), 'select me');
    assert.equal(window.getSelection(), 'select me');
  });
});
