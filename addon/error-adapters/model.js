import Ember from "ember";

const get = Ember.get;

export default Ember.Object.extend({
  report(errors, model) {
    errors.clearBaseErrors();
    var modelErrors = get(model, 'errors');

    var baseErrors = get(modelErrors, 'base');
    if (baseErrors) {
      baseErrors.forEach(function(baseError) {
        errors.addBaseError(get(baseError, 'message'));
      });
    }

    errors.clearModelErrors(model);
    modelErrors.forEach(function(modelError) {
      if (modelError.attribute !== 'base') {
        errors.addModelError(model, modelError.attribute, modelError.message);
      }
    });
  }
});
