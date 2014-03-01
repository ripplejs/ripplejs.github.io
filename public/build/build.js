;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};










require.register("component-escape-html/index.js", Function("exports, require, module",
"/**\n\
 * Escape special characters in the given string of html.\n\
 *\n\
 * @param  {String} html\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
module.exports = function(html) {\n\
  return String(html)\n\
    .replace(/&/g, '&amp;')\n\
    .replace(/\"/g, '&quot;')\n\
    .replace(/'/g, '&#39;')\n\
    .replace(/</g, '&lt;')\n\
    .replace(/>/g, '&gt;');\n\
}\n\
//@ sourceURL=component-escape-html/index.js"
));
require.register("segmentio-highlight/lib/index.js", Function("exports, require, module",
"\n\
var escape = require('escape-html');\n\
\n\
/**\n\
 * Expose `Highlight`.\n\
 */\n\
\n\
module.exports = Highlight;\n\
\n\
/**\n\
 * Initialize a new `Highlight` instance.\n\
 */\n\
\n\
function Highlight(){\n\
  if (!(this instanceof Highlight)) return new Highlight();\n\
  this.languages = {};\n\
  this.prefix('Highlight-');\n\
}\n\
\n\
/**\n\
 * Use a `plugin` function.\n\
 *\n\
 * @param {Function} plugin\n\
 * @return {Highlight}\n\
 */\n\
\n\
Highlight.prototype.use = function(plugin){\n\
  plugin(this);\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Get or set the highlighted class `prefix`.\n\
 *\n\
 * @param {String} prefix\n\
 * @return {Highlight or String}\n\
 */\n\
\n\
Highlight.prototype.prefix = function(prefix){\n\
  if (!arguments.length) return this._prefix;\n\
  this._prefix = prefix;\n\
  return this;\n\
}\n\
\n\
/**\n\
 * Define a new `language` with a `grammar`.\n\
 *\n\
 * @param {String} language\n\
 * @param {Object} grammar\n\
 * @return {Highlight}\n\
 */\n\
\n\
Highlight.prototype.language = function(language, grammar){\n\
  this.languages[language] = grammar;\n\
  return this;\n\
};\n\
\n\
/**\n\
 * Highlight an HTML `string` of a given `language`.\n\
 *\n\
 * @param {String} string\n\
 * @param {String} language\n\
 * @return {String}\n\
 */\n\
\n\
Highlight.prototype.string = function(string, language){\n\
  var ast = this.parse(string, language);\n\
  var str = this.stringify(ast);\n\
  return str;\n\
};\n\
\n\
/**\n\
 * Highlight an `el`, with optional `language`.\n\
 *\n\
 * @param {Element or String} el\n\
 * @param {String} language (optional)\n\
 */\n\
\n\
Highlight.prototype.element = function(el, language){\n\
  if ('string' == typeof el) el = document.querySelector(el);\n\
  var str = this.string(el.textContent, language || lang(el));\n\
  el.innerHTML = str;\n\
};\n\
\n\
/**\n\
 * Highlight an array of `els`, with optional `language`.\n\
 *\n\
 * @param {Array or String} els\n\
 * @param {String} language (optional)\n\
 */\n\
\n\
Highlight.prototype.elements = function(els, language){\n\
  if ('string' == typeof els) els = document.querySelectorAll(els);\n\
  for (var i = 0, el; el = els[i]; i++) this.element(el, language);\n\
};\n\
\n\
/**\n\
 * Highlight all elements in the DOM with language attributes.\n\
 */\n\
\n\
Highlight.prototype.all = function(){\n\
  var els = [];\n\
  els.concat(document.querySelectorAll('[data-language]'));\n\
  els.concat(document.querySelectorAll('[class*=language-]'));\n\
  this.elements(els);\n\
};\n\
\n\
/**\n\
 * Parse a `string` with a given language's `grammar`, returning an AST.\n\
 *\n\
 * @param {String} string\n\
 * @param {String or Object} grammar\n\
 * @return {Array}\n\
 */\n\
\n\
Highlight.prototype.parse = function(string, grammar){\n\
  if ('string' == typeof grammar) {\n\
    var lang = grammar;\n\
    grammar = this.languages[lang];\n\
    if (!grammar) throw new Error('unknown language \"' + lang + '\"');\n\
  }\n\
\n\
  if (!grammar) throw new Error('must provide a grammar');\n\
  if (!string) return [];\n\
  var ret = [string];\n\
\n\
  for (var key in grammar) {\n\
    var rule = grammar[key];\n\
    var regexp = rule.pattern || rule;\n\
\n\
    for (var i = 0; i < ret.length; i++) {\n\
      var str = ret[i];\n\
      if ('object' == typeof str) continue;\n\
      var m = regexp.exec(str);\n\
      if (!m) continue;\n\
\n\
      var contents = m[0];\n\
      var before = str.slice(0, m.index);\n\
      var after = str.slice(m.index + contents.length);\n\
      var args = [i, 1];\n\
      var token = {\n\
        type: key,\n\
        value: rule.children ? this.parse(contents, rule.children) : contents\n\
      };\n\
\n\
      if (before) args.push(before);\n\
      args.push(token);\n\
      if (after) args.push(after);\n\
      ret.splice.apply(ret, args);\n\
    }\n\
  }\n\
\n\
  return ret;\n\
}\n\
\n\
/**\n\
 * Stringify a given `ast`.\n\
 *\n\
 * @param {Array} ast\n\
 * @return {String}\n\
 */\n\
\n\
Highlight.prototype.stringify = function(ast){\n\
  var prefix = this.prefix();\n\
  var self = this;\n\
\n\
  return ast.map(function(t){\n\
    if ('string' == typeof t) return escape(t);\n\
    var type = t.type;\n\
    var value = 'object' == typeof t.value\n\
      ? self.stringify(t.value)\n\
      : escape(t.value);\n\
    return '<span class=\"' + prefix + type + '\">' + value + '</span>';\n\
  }).join('');\n\
};\n\
\n\
/**\n\
 * Language class matcher.\n\
 */\n\
\n\
var matcher = /\\blang(?:uage)?-(\\w+)\\b/i;\n\
\n\
/**\n\
 * Get the code language for a given `el`. First look for a `data-language`\n\
 * attribute, then a `language-*` class, then search up the DOM tree for them.\n\
 *\n\
 * @param {Element} el\n\
 * @return {String}\n\
 */\n\
\n\
function lang(el){\n\
  if (!el) return;\n\
  var m;\n\
  if (el.hasAttribute('data-language')) return el.getAttribute('data-language');\n\
  if (m = matcher.exec(el.className)) return m[1];\n\
  return language(el.parentNode);\n\
}//@ sourceURL=segmentio-highlight/lib/index.js"
));
require.register("segmentio-highlight-javascript/lib/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `plugin`.\n\
 */\n\
\n\
module.exports = plugin;\n\
\n\
/**\n\
 * Plugin to highlight Javascript code.\n\
 *\n\
 * @param {Highlight} highlight\n\
 */\n\
\n\
function plugin(highlight){\n\
  highlight\n\
    .language('javascript', grammar)\n\
    .language('js', grammar);\n\
}\n\
\n\
/**\n\
 * Grammar.\n\
 */\n\
\n\
var grammar = {};\n\
\n\
/**\n\
 * Booleans.\n\
 */\n\
\n\
grammar.boolean = /\\b(true|false)\\b/;\n\
\n\
/**\n\
 * Booleans.\n\
 */\n\
\n\
grammar.comment = /(?!\\\\{2})(\\/\\*[\\w\\W]*?\\*\\/|\\/\\/.*?$)/m;\n\
\n\
/**\n\
 * Functions.\n\
 */\n\
\n\
grammar.function = {\n\
  pattern: /(\\w+)\\(/,\n\
  children: {\n\
    punctuation: /\\(/\n\
  }\n\
};\n\
\n\
/**\n\
 * Numbers.\n\
 */\n\
\n\
grammar.number = /\\b-?(0x[\\dA-Fa-f]+|\\d*\\.?\\d+([Ee]-?\\d+)?|NaN|-?Infinity)\\b/;\n\
\n\
/**\n\
 * Strings.\n\
 */\n\
\n\
grammar.string = /((\"|')(\\\\?.)*?\\2)/;\n\
\n\
/**\n\
 * Keywords.\n\
 */\n\
\n\
grammar.keyword = /\\b(break|catch|continue|do|else|finally|for|function|if|in|instanceof|let|new|null|return|this|self|throw|try|typeof|var|while|with|yield)\\b/;\n\
\n\
/**\n\
 * Operators.\n\
 */\n\
\n\
grammar.operator = /([-+]{1,2}|!|&lt;=?|>=?|={1,3}|&lt;{1,2}|>{1,2}|(&amp;){1,2}|\\|{1,2}|\\?|\\*|\\/|\\~|\\^|\\%)/;\n\
\n\
/**\n\
 * Punctuation.\n\
 */\n\
\n\
grammar.punctuation = /[{}[\\];(),.:]/;//@ sourceURL=segmentio-highlight-javascript/lib/index.js"
));
require.register("segmentio-highlight-xml/lib/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `plugin`.\n\
 */\n\
\n\
module.exports = plugin;\n\
\n\
/**\n\
 * Plugin to highlight XML code.\n\
 *\n\
 * @param {Highlight} highlight\n\
 */\n\
\n\
function plugin(highlight){\n\
  highlight\n\
    .language('xml', grammar)\n\
    .language('html', grammar);\n\
}\n\
\n\
/**\n\
 * Grammar.\n\
 */\n\
\n\
var grammar = {};\n\
\n\
/**\n\
 * Comments.\n\
 */\n\
\n\
grammar.comment = /<!--[\\w\\W]*?-->/m;\n\
\n\
/**\n\
 * Entities.\n\
 */\n\
\n\
grammar.entity = /&#?[\\dA-Za-z]{1,8};/;\n\
\n\
/**\n\
 * Doctypes.\n\
 */\n\
\n\
grammar.doctype = /<!DOCTYPE.+?>/i;\n\
\n\
/**\n\
 * CDATA.\n\
 */\n\
\n\
grammar.cdata = /<!\\[CDATA\\[[\\w\\W]*?]]>/i;\n\
\n\
/**\n\
 * Prologs.\n\
 */\n\
\n\
grammar.prolog = /<\\?.+?\\?>/;\n\
\n\
/**\n\
 * Tags. Children declared separately to maintain order.\n\
 */\n\
\n\
var children = {\n\
  string: /('|\")[\\w\\W]*?\\1/,\n\
  punctuation: /(^<\\/?|\\/?>$|=)/,\n\
  name: /^[\\w:-]+/,\n\
  attribute: /[\\w:-]+/\n\
};\n\
\n\
grammar.tag = {\n\
  pattern: /<\\/?[\\w:-]+\\s*(\\s+[\\w:-]+(=((\"|')[\\w\\W]*\\4|[^\\s'\">=]+))?\\s*)*\\/?>/,\n\
  children: children\n\
};//@ sourceURL=segmentio-highlight-xml/lib/index.js"
));










require.register("site/index.js", Function("exports, require, module",
"var Highlight = require('highlight');\n\
var js = require('highlight-javascript');\n\
var html = require('highlight-xml');\n\
\n\
var highlight = new Highlight()\n\
  .use(js)\n\
  .use(html);\n\
\n\
var els = document.querySelectorAll('.Code');\n\
\n\
[].forEach.call(els, function(el){\n\
  highlight.element(el);\n\
})\n\
//@ sourceURL=site/index.js"
));

















































require.alias("segmentio-highlight/lib/index.js", "site/deps/highlight/lib/index.js");
require.alias("segmentio-highlight/lib/index.js", "site/deps/highlight/index.js");
require.alias("segmentio-highlight/lib/index.js", "highlight/index.js");
require.alias("component-escape-html/index.js", "segmentio-highlight/deps/escape-html/index.js");

require.alias("segmentio-highlight/lib/index.js", "segmentio-highlight/index.js");
require.alias("segmentio-highlight-javascript/lib/index.js", "site/deps/highlight-javascript/lib/index.js");
require.alias("segmentio-highlight-javascript/lib/index.js", "site/deps/highlight-javascript/index.js");
require.alias("segmentio-highlight-javascript/lib/index.js", "highlight-javascript/index.js");
require.alias("segmentio-highlight-javascript/lib/index.js", "segmentio-highlight-javascript/index.js");
require.alias("segmentio-highlight-xml/lib/index.js", "site/deps/highlight-xml/lib/index.js");
require.alias("segmentio-highlight-xml/lib/index.js", "site/deps/highlight-xml/index.js");
require.alias("segmentio-highlight-xml/lib/index.js", "highlight-xml/index.js");
require.alias("segmentio-highlight-xml/lib/index.js", "segmentio-highlight-xml/index.js");



if (typeof exports == "object") {
  module.exports = require("site");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("site"); });
} else {
  this["site"] = require("site");
}})();