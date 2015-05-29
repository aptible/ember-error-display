import Ember from "ember";

export default Ember.Object.extend({
  report(errors, error) {
    errors.clearBaseErrors();
    errors.addBaseError(error.message);
  }
});
