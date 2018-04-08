import { helper } from '@ember/component/helper';

export function toItems([obj], { keyName = 'key', valueName = 'value' }) {
  return Object.keys(obj)
    .map((key) => ({ [keyName]: key, [valueName]: obj[key] }));
}

export default helper(toItems);
