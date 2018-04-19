import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { spy } from 'sinon';

module('Integration | Component | app-pane', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.currentAsset = {
      svg: {
        content: '<circle cx="12" cy="12" r="6" fill="red" />',
        attrs: { viewBox: '0 0 24 24' }
      },
      width: 24,
      height: 24,
      copypasta: '{{svg-jar "circle"}}',
      fileName: 'circle.svg',
      fileDir: 'images'
    };

    this.detailsItems = [
      { name: 'File name', key: 'fileName' },
      { name: 'Directory', key: 'fileDir' }
    ];

    this.downloadCurrentAsset = () => null;
  });

  test('it shows "No Selection" placeholder if there is no asset', async function(assert) {
    await render(hbs`
      {{app-pane
        currentAsset=null
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom().hasText('No Selection');
  });

  test('it renders SVG preview properly', async function(assert) {
    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom('[class*="test-pane-svg"]').exists({ count: 2 });

    const expectedSVGContent = '<circle cx="12" cy="12" r="6" fill="red"></circle>';
    const normalSVG = this.element.querySelector('.test-pane-svg-normal');

    assert.dom(normalSVG).hasAttribute('width', '24');
    assert.dom(normalSVG).hasAttribute('height', '24');
    assert.equal(normalSVG.innerHTML, expectedSVGContent);

    const bigSVG = this.element.querySelector('.test-pane-svg-big');

    assert.dom(bigSVG).hasAttribute('width', '48');
    assert.dom(bigSVG).hasAttribute('height', '48');
    assert.equal(bigSVG.innerHTML, expectedSVGContent);
  });

  test('it renders copypasta properly', async function(assert) {
    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom('.test-pane-copypasta-title').hasText('Copypasta');
    assert.dom('.test-pane-copypasta-code').hasText('{{svg-jar "circle"}}');
  });

  test('it renders asset details properly', async function(assert) {
    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom('.test-pane-details-title').hasText('Details');
    assert.dom('.test-pane-details-item').exists({ count: 2 });

    const [firstItem, secondItem] = this.element.querySelectorAll('.test-pane-details-item');

    assert.dom('.test-pane-details-name', firstItem).hasText('File name');
    assert.dom('.test-pane-details-value', firstItem).hasText('circle.svg');

    assert.dom('.test-pane-details-name', secondItem).hasText('Directory');
    assert.dom('.test-pane-details-value', secondItem).hasText('images');
  });

  test('it shows warning if SVG has no viewBox', async function(assert) {
    this.set('currentAsset.svg.attrs.viewBox', null);

    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom('.test-pane-warning').exists({ count: 1 });
    assert.dom('.test-pane-warning-title').hasText('Warning');
    assert.dom('.test-pane-warning-text').hasText('The SVG is not scalable as it has no "viewBox" attribute.');
  });

  test('it does not show warning if SVG has viewBox', async function(assert) {
    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    assert.dom('.test-pane-warning').doesNotExist();
  });

  test('it calls downloadCurrentAsset on "Download" click', async function(assert) {
    this.downloadCurrentAsset = spy();

    await render(hbs`
      {{app-pane
        currentAsset=currentAsset
        detailsItems=detailsItems
        downloadCurrentAsset=downloadCurrentAsset
      }}
    `);

    await click('.test-pane-download-button');
    assert.ok(this.downloadCurrentAsset.calledOnce, 'downloadCurrentAsset is called');
  });
});
