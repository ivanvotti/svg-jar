import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';
import makeSVG from '../utils/make-svg';

export default helper(([svg], attrs) => htmlSafe(makeSVG(svg, attrs)));
