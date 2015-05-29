import Ember from 'ember';
import layout from '../templates/components/error-display';

export default Ember.Component.extend({
  layout: layout,
  errorDisplay: Ember.inject.service(),
  init() {
    this._super(...arguments);

    var errorDisplay = this.get('errorDisplay');
    this._setErrors = () => {
      var model = this.get('model');
      var forProp = this.get('for');
      var errors;
      if (model) {
        errors = errorDisplay.for(model, forProp);
      } else {
        errors = errorDisplay.for(forProp);
      }
      this.set('errors', Ember.A(errors));
    };
    errorDisplay.on('didReport', this._setErrors);
    this._setErrors();
  }
});
