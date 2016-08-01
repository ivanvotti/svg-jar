import { copy } from 'ember-metal/utils';
import { module, test } from 'qunit';
import makeSvg from 'svg-jar/utils/make-svg';

module('Unit | Utility | make svg');

test('it works', function(assert) {
  let svgData = { content: 'icon', attrs: { class: 'original' } };

  assert.equal(
    makeSvg(svgData),
    '<svg class="original">icon</svg>',
    'it renders original attrs'
  );

  let passedSvgData = copy(svgData, true);
  let customAttrs = { class: 'custom' };
  assert.equal(
    makeSvg(passedSvgData, customAttrs),
    '<svg class="custom">icon</svg>',
    'it rewrites original attrs'
  );

  assert.deepEqual(svgData, passedSvgData,
    'it does not change the original SVG object'
  );
});
