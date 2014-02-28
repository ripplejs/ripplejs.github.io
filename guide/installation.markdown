---
layout: guide
title: "Installation"
---

<p class="Copy-lead">Ripple was built to be used by package managers. It is available for Component and npm. However, you can still download the standalone build and include it on your page.</p>

### Browser Support

Ripple supports good browsers and IE9+.

### File size

~8kb minified and gzipped.

## Component
<pre class="Code Code--small"><code>component install ripplejs/ripple</code></pre>

This is the preferred way of using Ripple.

## npm
<pre class="Code Code--small"><code>npm install ripplejs</code></pre>

You can use tools like Browserify to use npm modules in the browser.

## Standalone

<pre class="Code Code--small"><code>&lt;script src="ripple/dist/ripple.min.js">&lt;/script></code></pre>

If you include ripple on your page using the standalone build, it will expose the `ripple` variable on the window.
