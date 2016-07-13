import Ember from 'ember';
import FirstResponderInputsInitializer from 'svg-jar/initializers/first-responder-inputs';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | first responder inputs', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FirstResponderInputsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
