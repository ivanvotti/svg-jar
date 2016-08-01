import Ember from 'ember';
import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';
import { isNone } from 'ember-utils';

const { copy, merge } = Ember;

export function formatAttrs(attrs) {
  return Object.keys(attrs)
    .map((key) => !isNone(attrs[key]) && `${key}="${attrs[key]}"`)
    .filter((attr) => attr)
    .join(' ');
}

export function svg([svgData], helperAttrs) {
  let svgAttrs = merge(copy(svgData.attrs), helperAttrs);
  return htmlSafe(`<svg ${formatAttrs(svgAttrs)}>${svgData.content}</svg>`);
}

export default helper(svg);
