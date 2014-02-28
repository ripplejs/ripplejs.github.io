---
layout: guide
title: "Interpolation"
---

<p class="Copy-lead">Interpolation gives you the ability to write expressions within your HTML to display data. It can be used with attribute values or in text nodes.</p>

Let's say you have some HTML that looks like this:

<pre class="Code" data-language="html">
<code>&lt;div class="user" hidden="&#123;&#123;inactive}}">
  &lt;img src="&#123;&#123;avatar}}" />
  &lt;span class="user-name">&#123;&#123;name}}&lt;/span>
&lt;/div></code></pre>

You can create a view to render this as `template`:

<pre class="Code" data-language="js">
<code>var template = require('./template.html');
var Person = ripple(template);

var person = new Person({
  name: 'Tom',
  inactive: false,
  avatar: 'http://placecage.com/100/100'
});
</code></pre>

Now `person.el` will render as this when mounted:

<pre class="Code" data-language="html">
<code>&lt;div class="user">
  &lt;img src="http://placecage.com/100/100" />
  &lt;span class="user-name">Tom&lt;/span>
&lt;/div></code></pre>

## Complex Expressions

You can perform complex expressions within the bindings. Within the expression you have access to every property on the view.

<pre class="Code" data-language="html">
<code>&#123;&#123; 30 * now.getHours() + now.getMinutes() / 2 }}</code></pre>

Whatever is returned from the expression will be what replaced the interpolation string. You can imagine this being:

<pre class="Code" data-language="js">
<code>return 30 * now.getHours() + now.getMinutes() / 2;</code></pre>

## Automatic Updates

Whenever a property used in an expression changes, the expression will be re-evaluated and rendered.

<pre class="Code" data-language="js"><code>person.set('name', 'Fred');</code></pre>

<pre class="Code" data-language="html">
<code>&lt;div class="user">
  &lt;img src="http://placecage.com/100/100" />
  &lt;span class="user-name"><mark>Fred</mark>&lt;/span>
&lt;/div></code></pre>

## Attribute Bindings

You can use interpolation within attribute values as well.

<pre class="Code" data-language="html">
<code>&lt;img src="&#123;&#123;avatar}}" /></code></pre>

These will also be automatically updated. You can also use full strings with expressions in them:

<pre class="Code" data-language="html">
<code>&lt;img title="Avatar for &#123;&#123;user}}" /></code></pre>

## Boolean Attributes

Boolean attributes are special HTML in that their value is true of false depending on whether the attribute exists. For example, these two examples will both consider `hidden` to be true.

<pre class="Code" data-language="html">
<code>&lt;img hidden />
&lt;img hidden="false" /></code></pre>

The interpolator will know if the attribute is a boolean attribute and add or remove it as needed. For example, using this template:

<pre class="Code" data-language="html">
<code>&lt;img hidden="&#123;&#123;inactive}}" /></code></pre>

If `inactive` is `false`:

<pre class="Code" data-language="html">
<code>&lt;img /></code></pre>

If `inactive` is `true`:

<pre class="Code" data-language="html">
<code>&lt;img hidden /></code></pre>


## Filters

Expressions can also have filters applied to them:

<pre class="Code Code--small"><code>&lt;div>&#123;&#123; title | uppercase | red }}&lt;/div></code></pre>

See the [filters guide](/guide/filters) for more information.