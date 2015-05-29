import { moduleForComponent, test } from 'ember-qunit';
import Ember from "ember";

var MockErrorDisplay = Ember.Service.extend(Ember.Evented, {
  for() {
    return [];
  }
});

moduleForComponent('error-display', 'Unit | Component | error display', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject({
    errorDisplay: MockErrorDisplay.create()
  });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
