import { helper } from '@ember/component/helper';

export function queryPair([paramName, paramValue]) {
  return { [paramName]: paramValue };
}

export default helper(queryPair);
