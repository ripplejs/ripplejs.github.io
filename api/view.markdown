---
layout: guide
title: "View API"
---

### ripple(template)

```js
var View = ripple(template);
```

The ripple function takes a template and returns a View object.

### View

```js
var view = new View(data);
```

A constructor function that takes an object with the properties of the view.

#### Class Properties

##### use

```
View.use(fn, options);
```

Add a plugin to the view. Takes a function that is called with the View object and returns `this` for chaining.

##### filter

```js
View.filter('uppercase', function(val){
  return val.toUpperCase();
});
```

Add a filter to be used in interpolation.

##### computed

```js
View.computed('fullname', ['first', 'last'], function(first, last){
  return first + ' ' + last;
});
```

Add a computed property that will automatically update when the dependencies change. Then when you create a view you'll be able to get that property:

```js
var view = new View({
  first: 'Homer',
  last: 'Simpson'
});

view.get('fullname'); // Homer Simpson
view.set('first', 'Bart');
view.get('fullname'); // Bart Simpson
```

#### Instance Properties

##### state

```js
view.state
```

A [ripplejs/model](https://github.com/ripplejs/model) instance.

The contains the state of the view. Whenever the state changes it will emit events so that the DOM will be automatically updated.

##### el

```js
view.el
```

The **DOM element** that the view represents. A view can only ever manage a single element and should never touch elements outside of it.

##### owner

```js
view.owner
```

A view can have a single **owner**. This is generally a view higher up in the DOM tree. When a views owner is destroyed, the child is also destroyed.

##### set

```js
view.set('selected', true);
```

Set a property on the view. Triggers changes events that
will automatically re-render dependant elements.

##### get

```js
view.get('selected');
```

Get a property from the view

##### change

```js
var change = view.change('selected', function(newVal, oldVal){
  console.log(newVal);
});

change(); // removed the binding
```

Watch for changes to a property. Returns a function for
unbinding.

##### mount

Mount the view inside of `el`. The second parameter is a boolean
that will replace the element instead of append to it.

Emits a `mount` event with the `el`.

```js
view.mount(document.body);
```

##### unmount

```js
view.unmount();
```

Remove the view from the DOM. Emits an `unmount` event.

#### on

```js
view.on('update', function(){
  console.log('triggered');
});
```

Bind a function to an event.

#### emit

```js
view.emit('update', user, id);
```

Emit an event and pass through values.

```js
view.on('update', function(user, id){

});
```

#### off

Unbind a function from an event. If a function isn't passed, all functions
for the event will be removed. If no parameters are passed in then all events
will be removed.

#### once

The same as `on` except it will only be called once.