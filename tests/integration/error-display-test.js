import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

moduleForComponent('error-display', 'Integration | Component | error display', {
  integration: true
});

test('it renders', function(assert) {
  var errorDisplay = this.container.lookup('service:error-display');
  var errorMessage = 'some message';
  var error = new Error(errorMessage);
  errorDisplay.report('error', error);
  this.render(hbs`{{error-display for="base"}}`);
  assert.ok(this.$().text().match(errorMessage), 'error message is displayed');
});

test('it clears', function(assert) {
  var errorDisplay = this.container.lookup('service:error-display');
  var errorMessage = 'some message';
  var error = new Error(errorMessage);
  errorDisplay.report('error', error);
  this.render(hbs`{{error-display for="base"}}`);
  assert.ok(this.$().text().match(errorMessage), 'error message is displayed');

  Ember.run(function() {
    errorDisplay.clear();
  });

  assert.ok(!this.$().text().match(errorMessage), 'error message is not displayed');
});

test('it renders new errors', function(assert) {
  var errorDisplay = this.container.lookup('service:error-display');
  var errorMessage = 'some message';
  var error = new Error(errorMessage);
  errorDisplay.report('error', error);
  this.render(hbs`{{error-display for="base"}}`);
  assert.ok(this.$().text().match(errorMessage), 'error message is displayed');

  var newErrorMessage = 'other message';
  var newError = new Error(newErrorMessage);
  Ember.run(function() {
    errorDisplay.report('error', newError);
  });

  assert.ok(this.$().text().match(newErrorMessage), 'new error message is displayed');
  assert.ok(!this.$().text().match(errorMessage), 'error message is not displayed');
});

test('it renders base errors on models', function(assert) {
  DS._setupContainer(this.container);
  var store = this.container.lookup('store:main');
  var errorDisplay = this.container.lookup('service:error-display');
  var errorMessage = 'some message';
  var model;
  Ember.run(function() {
    model = store.createRecord('thing');
    model.get('errors').add('base', errorMessage);
  });
  errorDisplay.report('model', model);
  this.render(hbs`{{error-display for="base"}}`);
  assert.ok(this.$().text().match(errorMessage), 'error message is displayed');
});
