import {
  EKMixin,
  EKFirstResponderOnFocusMixin
} from 'ember-keyboard';
import OneWayInput from 'ember-one-way-controls/components/one-way-input';

export function initialize() {
  OneWayInput.reopen(EKMixin, EKFirstResponderOnFocusMixin);
}

export default {
  name: 'first-responder-inputs',
  initialize
};
