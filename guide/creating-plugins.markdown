---
layout: guide
title: "Using Plugins"
---

Plugins are a core part of ripple. Because we're embracing module systems like Component and npm, adding plugins as dependencies is trivial. Unlike Angular we don't bundle everything in at once. Sorry, guys.

A common plugin is the `events` plugin. This replicates some of the `on-event` things you might be used to in Angular or other libraries, and is similar to doing `onClick={this.method}` in React without needing JSX.

First we need to add the plugin. You can get it at [ripplejs/events](https://github.com/ripplejs/events).

---

If you're not familiar with Component, (or you aren't using it) then you should download the plugin manually and add it to your page.

---

This will allow us to bind methods in the `View` to DOM elements declaratively:

```html
<button on-click="submit">Save</button>
```

Then we use the plugin and give it some methods:

```js
Person.use(events, {
  submit: function(e) {
    // The button was clicked
  }
});
```

## Creating Plugins