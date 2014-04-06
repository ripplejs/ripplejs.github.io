---
layout: guide
title: "Getting Started"
---

<p class="Copy-lead">
Ripple is similar to other view libraries like React, Ractive, and Vue in that
it handles automatically updating the DOM when the state of the view changes.
</p>

The main difference with ripple is that it has an nice API, free from global
objects, and can easily be extended with custom functionality. Ripple just provides
the foundation, you build and customize it from there.

## Creating Views

When using ripple, you will create views that represent a single DOM element on the
page. These views have a template and data. When we render views, the template is
transformed into a DOM element using the data. Whenever that data changes, the DOM
is automatically updated. Ideally, you should never have to touch the DOM.

Let's create a `View` using the `ripple` function:

<pre class="Code" data-language="js">
var View = ripple('&lt;div>&#123;&#123;name}}&lt;/div>');
</pre>

This is creating a new class for this template. Each
view in ripple has it's own compiler and set of bindings. This means we can safely
[extend the view](/guides/plugins) with new functionality without affecting other views. This encapsulation
means you can also share your created views with people not even using ripple.

You can also pass in a DOM selector or an element as a template:

<pre class="Code" data-language="js">
var View = ripple('#template');
var View = ripple(document.querySelector('#element'));
</pre>

This will use the innerHTML of the element as a template. This makes it easy to use `<script>` tags on your page for the templates.

Now we want to create an instance of that view. This will create the element we
can add to the DOM:

<pre class="Code" data-language="js">
var person = new View({
  data: {
    name: 'Fred'
  }
});

person.appendTo(document.body);
</pre>

When creating a view it takes an options object. The important option here is
`data`. This is the data we want to render in the template.

You can change the name of this property by using `View.parse`. This lets you customize the
options that can be passed into the view and where it gets the data from.

<pre class="Code" data-language="js">
View.parse(functon(options){
  return {
    size: 50,
    time: options.startTime || new Date()
  };
});
</pre>

You can use this method to set the intial state of the view and set defaults. You can
only add one parse function per view. The `options` passed in are whatever was passed
to the constructor - `new View(options)`. By default, this just returns `options.data`.

## Data-binding

The `data` on the view is what is bound to the DOM and is what you can use in
the [expressions](/guide/interpolation.html) within the templates.

The DOM will automatically update it whenever a property changes:

<pre class="Code" data-language="js">
person.set('name', 'Barry');
</pre>