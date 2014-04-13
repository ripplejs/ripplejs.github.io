---
layout: guide
title: "Introduction"
---
<p class="Copy-lead">Ripple is a framework for writing composable components with interpolation, directives, and one-way data-binding. It's tiny, modular, extendable and has no global API.</p>

<pre class="Code" data-language="js">
<code>var Person = ripple('&lt;div>&#123;&#123;name}}&lt;/div>')
  .use(events)
  .use(each)
  .use(dispatch);

var person = new Person({
  name: 'Tom'
});

person.appendTo(document.body);</code></pre>

## Features

 * Batched DOM updates
 * Plain object models
 * Data-binding with mustache-style templates
 * Customize features with plugins
 * ~8kb in size
 * Directives like [Reactive](https://github.com/component/reactive) and [Vue.js](http://vuejs.org)
 * Composition for re-usabe views

## Browser Support

Supports real browsers and IE9+.

## Why another one?

Ripple is similar to other binding frameworks out there. The problem I had with those frameworks is that their code is often large and difficult to contribute to. One of the goals with Ripple was to write a library that was simple.

It borrows many concepts from React, but it doesn't use a virtual DOM, instead it just uses change events to update the DOM where needed in batches.

Instead of mixins and overriding methods like `componentWillUpdate`, you just listen for events on the view. It makes the assumption that you know how to write event-based programs.

The main difference between Ripple and every other library is that for every view that is created using Ripple, it has it's own unique compiler.

Because each view is independant and encapsulated, you can extend it with plugins without affecting other views. This allows you to share components created with Ripple with other users who may or may not be using Ripple. To the consumer, they just see a plain constructor function.

Ripple comes with just the functionality needed to start creating reactive views. From this foundation you can build more complex views and bindings using plugins.