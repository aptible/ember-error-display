import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";
import EmberValidations from 'ember-validations';

moduleForComponent('error-display', 'Integration | Component | error display w/ validation', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  var validated = Ember.Object.extend(EmberValidations.Mixin).create({
    container: this.container,
    validations: {
      name: {
        length: { minimum: 5 }
      }
    }
  });
  var errorDisplay = this.container.lookup('service:error-display');

  Ember.run(() => {
    validated.validate().catch(() => {
      // Silence failure
    }).finally(() => {
      errorDisplay.report('validated', validated);
      this.set('model', validated);
      this.render(hbs`{{error-display model=model for="name"}}`);
      var errorMessage = /is too short \(minimum is 5 characters\)/;
      assert.ok(this.$().text().match(errorMessage), 'error message is displayed');
    });
  });
});
