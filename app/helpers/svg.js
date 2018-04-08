import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import makeSvg from '../utils/make-svg';

export default helper(([svg], attrs) => htmlSafe(makeSvg(svg, attrs)));
