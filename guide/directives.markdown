---
layout: guide
title: "Directives"
---

Directives are custom attributes that a hooks for special functionality. If you've used Angular they're similar to things like `ng-click`, `ng-controller` etc.

You can define your own directives that can easily be re-used across views. A directive looks like this:

<pre class="Code" data-language="html">
  &lt;button <mark>on-click="save"</mark>>Submit&lt;/button>
</pre>

This isn't a real attribute, it's a custom one that will trigger some functionality added to the `View`.

## Creating Directives

The `View` has a `directive` method for adding directives:

<pre class="Code" data-language="js">
View.directive('on-click', function(value, el, view){
  el.addEventListener('click', value);
});
</pre>

Within the binding you have access to the `view` instance, the element the attribute is on, the attribute name and the current value.

You can also use the longer verson of this for more complex directives:

<pre class="Code" data-language="js">
View.directive('on-click', {
  bind: function(el, view) {
    // This is called once when the binding is created.
    // Use this to setup any event listeners.
  },
  update: function(value, el, view) {
    // This is called whenever the value of the directive changes.
    // If the value passed to it is an expression, this function
    // will be called whenever that expression changes.
  },
  unbind: function(el, view){
    // This is called once when the binding is removed.
    // Cleanup any listeners here.
  }
});
</pre>

## Dynamic values

When passing data to directives, you can use expressions to pass dynamic data
to them.

<pre class="Code" data-language="html">
&lt;div my-binding="&#123;&#123;name}}">&lt;/div>
</pre>