import Ember from "ember";

const get = Ember.get;

export default Ember.Object.extend({
  report(errors, model) {
    errors.clearModelErrors(model);
    var modelProperties = get(model, 'errors');
    Ember.keys(modelProperties).forEach(function(key) {
      var modelErrors = modelProperties.get(key);
      modelErrors.forEach(function(modelError) {
        errors.addModelError(model, key, modelError);
      });
    });
  }
});
