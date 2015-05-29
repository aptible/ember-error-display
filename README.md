# ember-error-display

[![Build Status](https://travis-ci.org/aptible/ember-error-display.svg)](https://travis-ci.org/aptible/ember-error-display)

Provides a service responsible for managing displayed errors, compatible with
native `Error` objects, invalid Ember-Data models, and invalid ember-validations
targets.

```js
// app/components/edit-thing/component.js
export default Ember.Component.extend({
  errorDisplay: Ember.inject.service(),
  actions: {
    save(model) {
      model.save().then(() => {
        this.transitionTo('index');
      }, (e) => {
        this.get('errorDisplay').report('error', e);
        this.get('errorDisplay').report('model', model);
      });
    }
  }
});
```

```hbs
// app/components/edit-thing/template.hbs
<h1>Edit this thing</h1>
{{error-display for="base"}}

<label>
  {{error-display model=model for="name"}}
  {{input type="text" value=model.name}}
</label>

<button {{action 'save' model}}>Save</button>
```

## Installation

```
ember install ember-error-display
```

## error-adapters

Out of the box, errors from these three systems are supported:

* Native JavaScript `Error` objects will be make base errors.
* Invalid [Ember-Data](https://github.com/emberjs/data) models will add to base
  errors, and will also populate model errors.
* Invalid objects with the
  [ember-validations](https://github.com/dockyard/ember-validations) mixin will
  populate model errors.

When reporting an error, the adapter is always specified:

```js
errorDisplay.report('error', new Error('Some failure'));
errorDisplay.report('model', emberDataModel);
errorDisplay.report('validated', emberValidationsHasValidated);
```

Custom adapters should be created in the `error-adapters` namespace. For
example:

```js
// app/error-adapters/custom.js
export default Ember.Object.extend({
  // * `errors` is a manager for displayed errors.
  // * `error` is the model or subject passed to `report()`.
  report(errors, error) {
    errors.clearBaseErrors();
    errors.addBaseError(error.somePropWithError);
  }
});
```

To use this adapter:

```
var errorThing = {
  somePropWithError: 'oh my!';
};
errorDisplay.report('custom', errorThing);
```

The full API available to custom adapters (the `errors` object above) is
available [here in the error-display service code](https://github.com/aptible/ember-error-display/blob/636ef95d449decbedc77c5f701474f7401e9f86a/addon/services/error-display.js#L3).
