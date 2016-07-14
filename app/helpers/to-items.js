import Ember from 'ember';

export function otItems([obj], { keyName = 'key', valueName = 'value' }) {
  let items = [];

  Object.keys(obj).forEach((key) => {
    items.push({
      [keyName]: key,
      [valueName]: obj[key]
    });
  });

  return items;
}

export default Ember.Helper.helper(otItems);
