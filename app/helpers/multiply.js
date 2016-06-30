import { helper } from 'ember-helper';

export function multiply(params) {
  return params.reduce((acc, value) => value * acc, 1);
}

export default helper(multiply);
