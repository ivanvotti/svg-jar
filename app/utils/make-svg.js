import { copy } from '@ember/object/internals';
import { merge } from '@ember/polyfills';
import { isNone } from '@ember/utils';

export function formatAttrs(attrs) {
  return Object.keys(attrs)
    .map((key) => !isNone(attrs[key]) && `${key}="${attrs[key]}"`)
    .filter((attr) => attr)
    .join(' ');
}

export default function makeSvg(svg, customAttrs = {}) {
  let svgAttrs = merge(copy(svg.attrs), customAttrs);
  return `<svg ${formatAttrs(svgAttrs)}>${svg.content}</svg>`;
}
