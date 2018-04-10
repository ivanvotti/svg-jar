import { module, test } from 'qunit';
import makeSvg from 'svg-jar/utils/make-svg';

const ORIGINAL_SVG_DATA = {
  content: '<path d=""/>',
  attrs: { height: '20', width: '16' }
};

module('Unit | Utility | make-svg', function() {
  test('it sets original SVG attrs', function(assert) {
    assert.equal(
      makeSvg(ORIGINAL_SVG_DATA),
      '<svg height="20" width="16"><path d=""/></svg>'
    );
  });

  test('it sets custom SVG attrs', function(assert) {
    let customAttrs = { class: 'custom', 'data-custom': 'custom' };

    assert.equal(
      makeSvg(ORIGINAL_SVG_DATA, customAttrs),
      '<svg height="20" width="16" class="custom" data-custom="custom"><path d=""/></svg>'
    );
  });

  test('it rewrites original attrs with custom ones', function(assert) {
    let customAttrs = { height: '30', width: '36' };

    assert.equal(
      makeSvg(ORIGINAL_SVG_DATA, customAttrs),
      '<svg height="30" width="36"><path d=""/></svg>'
    );
  });
});
