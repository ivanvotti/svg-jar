import { helper } from '@ember/component/helper';

export function queryPair([paramName, paramValue]) {
  return {
    isQueryParams: true,
    values: { [paramName]: paramValue }
  };
}

export default helper(queryPair);
