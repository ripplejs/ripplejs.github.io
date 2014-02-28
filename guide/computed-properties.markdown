---
layout: guide
title: "Computed Properties"
---

<p class="Copy-lead">Computed properties are like any other property on the view, except that their value is dependant on other properties.</p>

The simplest example is a property named `fullname` depending on `name` and `surname`.

<pre class="Code" data-language="js">
<code>var Person = ripple('&lt;div>&#123;&#123;fullname}}&lt;/div>');

Person.computed('fullname', ['firstname', 'lastname'], function(first, last){
  return [first, last].join(' ');
});

var person = new Person({
  firstname: 'Tom',
  lastname: 'Hanks'
});</code></pre>

Now you'll be able to access `fullname` like any other property and it will be automatically updated whenever `firstname` or `lastname` are changed.

<pre class="Code" data-language="js">
<code>person.get('fullname'); // Tom Hanks</code></pre>

The value of a computed property is cached and only re-evaluated when one of the dependencies changes.

You can also depend on nested properties just as easily:

<pre class="Code" data-language="js">
<code>Person.computed('fullname', ['names.first', 'names.last'], function(first, last){
  return [first, last].join(' ');
});</code></pre>

Computed properties are all one-way evaluated. This means that you can't set `fullname` and expect `first` and `last` to be updated. This rarely comes up in practice and shouldn't be a problem.