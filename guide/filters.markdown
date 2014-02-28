---
layout: guide
title: "Filters"
---

<p class="Copy-lead">Filters are used in expressions to modify data. It's an easy to separate your display logic from your model data.</p>

Using filters looks like this:

<pre class="Code Code--small"><code>&lt;div>&#123;&#123; title | uppercase }}&lt;/div></code></pre>

In this case, the `title` property will be passed through the `uppercase` filter. Behind the scenes filter functions look like this:

<pre class="Code Code--small" data-language="js"><code>function(value) {
  return value.toUppercase();
}</code></pre>

## Creating filters

Creating new filters is very easy. The `View` object has a `filter` method that takes a name and a function.

<pre class="Code" data-language="js">
<code>var View = ripple('&lt;div>&#123;&#123;name | uppercase}}&lt;/div>');

View.filter('uppercase', function(value){
  return value.toUpperCase();
});</code></pre>

Filters can be re-used and shared as plugins easily. Here's what a plugin that adds this filter might look like:

<pre class="Code" data-language="js">
<code>module.exports = function(View){
  View.filter('uppercase', function(value){
    return value.toUpperCase();
  });
};</code></pre>

Then you can require and use this plugin:

<pre class="Code" data-language="js">
<code>var uppercasePlugin = require('uppercase');
Person.use(uppercasePlugin);</code></pre>

This makes it very easy to create plugins to do things like code highlighting, markdown conversion, and date and number formatting.

## Chaining Filters

You can chain filters to pipe the value through multiple.

<pre class="Code Code--small"><code>&lt;div>&#123;&#123; title | uppercase | lowercase }}&lt;/div></code></pre>

In this case the value will go through the `uppercase` filter and then that value will be passed to the `lowercase` filter.

You can chain as many filters as you like.

## Arguments

You can also pass arguments to filters:

<pre class="Code Code--small"><code>&lt;div>&#123;&#123; posted | date:%B %d, %Y at %I:%M%P }}&lt;/div></code></pre>

Arguments start after `:` and are separated by a `,`. In this case, the function will be passed `%B %d` and `%Y at %I:%M%P`.

The filter function might look something like this:

<pre class="Code Code--small" data-language="js"><code>function(value, date, time) {
  // date === %B %d
  // time === %Y at %I:%M%P
}</code></pre>

Lastly, you can also wrap arguments in quotes if it contains a comma and you don't want two arguments passed in.

<pre class="Code Code--small"><code>&lt;div>&#123;&#123; posted | date:"%B %d, %Y at %I:%M%P" }}&lt;/div></code></pre>