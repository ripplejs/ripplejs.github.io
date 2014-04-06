---
layout: guide
title: "Installation"
---

Ripple was made to be used by Component. This is so that you are able to load in plugins and templates when you need them. However, you can include a standalone version on your page and you'll have access to the `ripple` global function.

Ripple is roughly 8kb compressed and supports good browsers (and IE9+).

### Standalone

Use this if you don't use a package manager and still just include scripts on your page.

[Download]({{ site.github.repository_url }}) from Github.

### Component

Component is the preferred way to use Ripple. This will make it extremely simple to share componenets and use plugins, including the associated styles and other assets.

<pre class="Code"><code>component install ripplejs/ripple</code></pre>

### npm

For use with Browserify and similar tools. There isn't any support for server-side rendering.

<pre class="Code"><code>npm install ripplejs/ripple</code></pre>