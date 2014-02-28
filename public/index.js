var Highlight = require('highlight');
var js = require('highlight-javascript');
var html = require('highlight-xml');

var highlight = new Highlight()
  .use(js)
  .use(html);

var els = document.querySelectorAll('.Code');

[].forEach.call(els, function(el){
  highlight.element(el);
})
