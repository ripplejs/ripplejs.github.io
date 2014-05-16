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

## Package Managers

It's highly recommended that you use [Component](https://github.com/component/component/) when
using ripple. This gives you ability to require templates as strings and easily include plugins.
Ripple is built on the idea that it provides a small base for creating reactive views and then
you extend each view with plugins.

If you're using Component, you'll be requiring `ripple` in your module:

<pre class="Code" data-language="js">
var ripple = require('ripple');
</pre>

If you're not using Component, you'll have to include the [standalone version](https://github.com/ripplejs/ripple/releases)
and you'll be working with a global variable:

<pre class="Code" data-language="js">
window.ripple
</pre>

## Templates

Templates in ripple are just plain HTML. They use special expressions within curly braces,
a little bit like Handlebars.

<pre class="Code" data-language="html">
&lt;div class="&#123;&#123;type}}">
  &lt;img src="&#123;&#123;avatar}}" />
  &#123;&#123; firstName + " " + lastName }}
&lt;/div>
</pre>

Within these braces you have access to properties on the view. Each view has a set of properties
stored as a plain object that is observed for changes. For example, the above template might
have a view with the data:

<pre class="Code" data-language="json">
{
  "type": "winner",
  "avatar": "http://ragefaces.io/rage.png",
  "firstName": "Nicolas",
  "lastName": "Cage"
}
</pre>

When we set this object and the template on the view, they will be bound together by ripple
and any changes you make to this data will be automatically updated in the DOM. Within the braces in
the templates you are able to write any JavaScript you want and it will be re-rendered when data changes.

To add templates to your views when using Component, you can just add the template to your `component.json`
file and you are able to require it:

<pre class="Code" data-language="json">
{
  "name": "my-component",
  ...
  "templates": ["template.html"]
  ...
}
</pre>

And then require it:

<pre class="Code" data-language="js">
var template = require('/template.html');
var View = ripple(template);
</pre>

If you're not using Component, you can add templates to your page in script tags and reference
them using CSS selectors:

<pre class="Code" data-language="html">
&lt;script type="text/template" id="template">
  &lt;div>&#123;&#123;name}}&lt;/div>
&lt;/script>
</pre>

And then create a view:

<pre class="Code" data-language="js">
var View = ripple('#template');
</pre>

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
View.parse(function(options){
  return {
    size: 50,
    time: options.startTime || new Date()
  };
});
</pre>

You can use this method to set the intial state of the view and set defaults. You can
only add one parse function per view. The `options` passed in are whatever was passed
to the constructor - `new View(options)`. By default, this just returns `options.data`.

## Working with the DOM

Now that you've got your view you'll want to add it to the DOM. There are a couple of helper
methods that can be used:

* `appendTo`
* `replace`
* `before`
* `after`

<pre class="Code" data-language="js">
var person = new View();
person.appendTo(document.body);
person.replace('.replace-this');
person.before('#something');
</pre>

As you can see, each method takes an element as the first parameter. This can also be a
CSS selector to make things easy.

These will fire the `mounted` event on the view. If you add the view to the DOM manually,
like this:

<pre class="Code" data-language="js">
document.body.appendChild(view.el);
</pre>

It won't fire the event. So if you're doing this, make sure you know what you're doing.

It's worth noting that with ripple you should almost never need to touch the DOM itself.
This should all be handled through bindings. This makes it extremely easy to test views
in isolation without needing the DOM at all.

## Lifecycle Events

Views have a number of lifecycle events that you can hook into to modify it's state
and add other logic. These lifecycle events are loosely based on [Polymer](http://www.polymer-project.org/)
and the [Web Components spec](http://www.w3.org/TR/components-intro/#lifecycle-callbacks).

They are:

* `construct` - When the view is first created and nothing has been setup
* `created` - The view has been setup but hasn't been rendered
* `ready` - The view is rendered and the data is being watched
* `mounted` - Any time the view enters the DOM
* `unmounted` - Any time the view leaves the DOM
* `destroyed` - The view is removed and all bindings are destroyed

All views, even outside of ripple, have these various states. Normally you code build the logic
for these events manually each time. The majority of view logic will occur during these events.

To hook into them, you can use the `.on` method:

<pre class="Code" data-language="js">
View.on('created', function(view){
  console.log(view);
});

var myView = new View();
</pre>

This event will be fired and passed the view that was just created. In this example, `view` will
be the `myView` instance. From here you can do things like setting up validation, creating intervals,
or updating the state.

Just like any other event emitter, you can do `.off` to remove listeners or `.once` to only fire
a listener once.

## Data-binding

The `data` object on the view is what is bound to the DOM. You can use in
the [expressions](/guide/interpolation.html) within the templates to render
this data and it will be automatically updated when it changes.

<pre class="Code" data-language="js">
person.set('name', 'Barry');
</pre>

This sets the `name` attribute on the view and will automatically update any part
of the template that is using `name`. Actually, it updates any expression that
contains the `name` attribute, like:

<pre class="Code" data-language="html">
  &#123;&#123; name + " " + lastName }}
</pre>

You can use these expressions within your templates in attributes or in text:

<pre class="Code" data-language="html">
&lt;div class="&#123;&#123;type}}">
  &lt;img src="&#123;&#123;avatar}}" />
  &#123;&#123; firstName + " " + lastName }}
&lt;/div>
</pre>

You can also use them to pass data to [child views](/guide/composing-views).

Behind the scenes ripple creates attribute and text bindings for these expressions
and listens for changes to the properties that are used inside of them.

The expressions are called in the context of the view itself. So you have access
to view methods and properties. For example, the [event plugin](https://github.com/ripplejs/events)
adds an `on-click` [directive](/guide/directives.html).

<pre class="Code" data-language="html">
&lt;button on-click="&#123;&#123; this.save }}">Save&lt;/button>
</pre>

## Getting and setting values

You can get a value from the view by using `.get` and set it using `.set`:

<pre class="Code" data-language="js">
person.get('name');
</pre>

These also allow you to get and set nested properties:

<pre class="Code" data-language="js">
person.get('links.facebook.url');
person.set('links.facebook.username', 'nicolascage');
</pre>

You can also get values directly from the data object:

<pre class="Code" data-language="js">
person.data.name
</pre>

There are a couple of catches when accessing it from the `data` object directly:

* You can't set values because the changes won't be reflected in the DOM
* It won't look up values from it's scope

Generally, these limitations aren't too much of a problem. Here is an example
of where you might use it from within your view:

<pre class="Code" data-language="js">
Person.prototype.toggle = function(){
  this.set('open', !this.data.open);
};
</pre>
