import Ember from 'ember';
import { isNone } from 'ember-utils';

const { copy, merge } = Ember;

export function formatAttrs(attrs) {
  return Object.keys(attrs)
    .map((key) => !isNone(attrs[key]) && `${key}="${attrs[key]}"`)
    .filter((attr) => attr)
    .join(' ');
}

export default function makeSVG(svg, customAttrs = {}) {
  let svgAttrs = merge(copy(svg.attrs), customAttrs);
  return `<svg ${formatAttrs(svgAttrs)}>${svg.content}</svg>`;
}
