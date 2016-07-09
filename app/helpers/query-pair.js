import Ember from 'ember';

export function queryPair([paramName, paramValue]) {
  return {
    isQueryParams: true,
    values: { [paramName]: paramValue }
  };
}

export default Ember.Helper.helper(queryPair);
