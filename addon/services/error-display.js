import Ember from 'ember';

var Errors = Ember.Object.extend({
  init() {
    this.base = [];
    this.errorModels = {};
  },
  addBaseError(error) {
    this.base.push(error);
  },
  addModelError(model, prop, error) {
    var key = Ember.guidFor(model);
    var errorModel = this.errorModels[key] = this.errorModels[key] || {};
    var errorModelProp = errorModel[prop] = errorModel[prop] || [];
    errorModelProp.push(error);
  },
  clearBaseErrors() {
    this.base = [];
  },
  clearModelErrors(model) {
    this.errorModels[Ember.guidFor(model)] = {};
  },
  for(model, prop) {
    if (!prop) {
      prop = model;
      model = null;
    }

    if (model) {
      return this.errorModels[Ember.guidFor(model)][prop];
    } else if (prop === 'base') {
      return this.base;
    } else {
      throw new Error('FIXME, why do this? base should probably not be special');
    }
  }
});

export default Ember.Service.extend(Ember.Evented, {
  init() {
    this._super(...arguments);
    this.clear();
  },
  report(adapterName, subject) {
    var adapter = this.lookupAdapter(adapterName);
    if (!adapter) {
      throw new Error(
        'errorDisplay#report must be passed a valid adapterName and subject. '+
        `Could not find error-adapter for "${adapterName}", "${subject}".`
      );
    }
    var errors = this.errors;

    adapter.report(errors, subject);
    // FIXME defer this on the runloop
    this.trigger('didReport');
  },
  clear() {
    this.errors = new Errors();
    // FIXME defer this on the runloop
    this.trigger('didReport');
  },
  lookupAdapter(name) {
    return this.container.lookup(`error-adapter:${name}`);
  },
  for(model, prop) {
    var errors = this.errors;
    return errors.for(model, prop);
  }
});
