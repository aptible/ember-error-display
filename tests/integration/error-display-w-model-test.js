import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";
import DS from "ember-data";

moduleForComponent('error-display', 'Integration | Component | error display w/ model', {
  integration: true
});

test('it renders', function(assert) {
  DS._setupContainer(this.container);
  var store = this.container.lookup('store:main');
  var errorDisplay = this.container.lookup('service:error-display');
  var errorMessage = 'some message';
  var model;
  Ember.run(function() {
    model = store.createRecord('thing');
    model.get('errors').add('name', errorMessage);
  });
  errorDisplay.report('model', model);
  this.set('model', model);
  this.render(hbs`{{error-display model=model for="name"}}`);
  assert.ok(this.$().text().match(errorMessage), 'error message is displayed');
});
