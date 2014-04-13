---
layout: guide
title: "Composing Views"
---

<p class="Copy-lead">One of the best things about Views created with Ripple is that you can compose them within each other to create custom elements.</p>

This allows you to export Views for standalone use, like a `List`, but then also dynamically render this list within other views.

## Custom Elements

Composing views allows you to create custom elements to reference these views. You use the elements attributes to set data on the child view. Here is the example from [React](http://facebook.github.io/react/docs/multiple-components.html) using ripple instead.

<pre class="Code" data-language="js">
  var Avatar = ripple('&lt;img src="http://graph.facebook.com/&#123;&#123;username}}/profile" />');
  var Link = ripple('&lt;a href="http://www.facebook.com/&#123;&#123;username}}">&#123;&#123;username}}&lt;/a>');
</pre>

<pre class="Code" data-language="js">
  var Profile = ripple(template)
    .compose('profile-avatar', Avatar);
    .compose('profile-link', Link);
</pre>

This creates custom elements named `avatar` and `link` that we can use within the template. These views are just any other view created with `ripple()`.

<pre class="Code" data-language="html">
  &lt;div class="Profile">
    &lt;profile-avatar username="&#123;&#123;username}}">&lt;/profile-avatar>
    &lt;profile-link username="&#123;&#123;username}}">&lt;/profile-link>
  &lt;/div>
</pre>

This dynamically creates a view and replaces the custom element. Now we can create a `Profile` view and render it:

<pre class="Code" data-language="js">
  var profile = new Profile({
    data: {
      username: 'anthonyshort'
    }
  });
  profile.appendTo(document.body);
</pre>

Which will render:

<pre class="Code" data-language="html">
  &lt;div class="Profile">
    &lt;img src="http://graph.facebook.com/anthonyshort/profile" />
    &lt;a href="http://www.facebook.com/anthonyshort">anthonyshort&lt;/a>
  &lt;/div>
</pre>

We can then update the values by setting data on the parent view:

<pre class="Code" data-language="js">
  profile.set('username', 'ianstormtaylor');
</pre>

## Sharing Data

Since we used interpolation in the custom elements `username` attribute, the views will automatically have this value updated whenever the parent changes. This allows you to pass values down the chain of views and have everything in sync and updated automatically.

You can also use static values if you don't need the value to change:

<pre class="Code" data-language="html">
  &lt;profile-avatar username="anthonyshort">&lt;/profile-avatar>
</pre>

