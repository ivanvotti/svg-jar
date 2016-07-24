import Ember from 'ember';

const { copy, merge, isNone } = Ember;
const { htmlSafe } = Ember.String;

export function svg([svgData], helperHash) {
  let svgContent = svgData.content;
  let svgAttrsHash = copy(svgData);

  delete svgAttrsHash.content;
  svgAttrsHash = merge(svgAttrsHash, helperHash);

  let svgAttrs = [];
  Object.keys(svgAttrsHash).forEach((attrName) => {
    let attrValue = svgAttrsHash[attrName];

    if (!isNone(attrValue)) {
      svgAttrs.push(`${attrName}="${attrValue}"`);
    }
  });

  return htmlSafe(`<svg ${svgAttrs.join(' ')}>${svgContent}</svg>`);
}

export default Ember.Helper.helper(svg);
