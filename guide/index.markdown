---
layout: guide
title: "Introduction"
---
<p class="Copy-lead">Ripple is a framework for writing composable components with interpolation, directives, and one-way data-binding. It's tiny, modular, extendable and has no global API.</p>

Yep, Ripple is yet another library for data-binding.

<pre class="Code" data-language="js">
<code>var Person = ripple('&lt;div>&#123;&#123;name}}&lt;/div>')
  .use(events)
  .use(each)
  .use(dispatch);

var person = new Person({
  name: 'Tom'
});

person.mount(document.body);</code></pre>

## Features

* ~8kb gzipped
* Built with [Component](https://github.com/ripplejs)
* No global objects
* Event-based API
* Composable views
* Extendable via plugins
* Batched DOM rendering
* Interpolation and filters
* Computed properties
* Directives

Most importantly, Ripple comes with no directives or other functionality except for interpolation. This is what keeps it small and fast.

Each view has it's own Ripple instance that is completely independant of every other view. So there is no global object to manipulate or add plugins to.

This means that components created with Ripple don't even need Ripple to be used.

## Browser Support

Supports real browsers and IE9+.

## Why another one?

It was built because none of the other solutions are built for module systems like Component and expect global objects. They provide complex APIs with huge options objects, bloated and unnecessary utility functions, global objects, and don't use an event-based system.

Ripple is similar to other binding frameworks out there. The problem I had with those frameworks is that their code is often large and difficult to contribute to. One of the goals with Ripple was to write a library that was simple, modular, and easy to contribute to.

It borrows many concepts from React for it's views. Each view has a lifecycle, manages a single element and can have a single parent view. However, instead of mixins and overriding methods like `componentWillUpdate`, you just listen for events on the view (eg. `view.on('update')`) which is a much more "JavaScript" way of doing things.

However, main difference between Ripple and every other library is that for every view that is created using Ripple, it has it's own unique compiler. By default, Ripple comes with no functionality other than interpolation and instead relies on plugins.

It's like having a brand-new version of Ractive or Vue for each view you create, meaning they are entirely encapsulated. You can extend it with plugins without affecting other views. This feature is also vital for composing views and being able to share components.

The goal of Ripple is to be able to build components that can be re-used even if the consumer isn't using Ripple.