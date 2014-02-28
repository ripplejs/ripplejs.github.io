---
layout: guide
title: "Directives"
---

Directives are custom attributes that a hooks for special functionality. If you've used Angular they're similar to things like `ng-click`, `ng-controller` etc.

You can define your own directives that can easily be re-used across views. A directive looks like this:

<pre class="Code" data-language="html"><code>&lt;button <mark>on-click="save"</mark>>Submit&lt;/button></code></pre>

This isn't a real attribute, it's a custom one that will trigger some functionality added to the `View`.

## Creating Directives

The `View` has a `directive` method for adding directives:

<pre class="Code" data-language="js"><code>View.directive('on-click', function(view, el, attr, value){
  el.addEventListener('click', function(e){
    view[value](e);
  });
});</code></pre>

Within the binding you have access to the `view` instance, the element the attribute is on, the attribute name (you can select attributes with a regex) and the attribute value.