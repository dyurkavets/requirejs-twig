# Require.js Twig Plugin

## Installation

Use `bower` or `npm` to add `requirejs-text` plugin to your project:

`bower install requirejs-text`

or

`npm install requirejs-text`

## Config

Make sure you tell `requirejs` about new `twigjs` plugin by editing your requirejs config file. In addition you can
redefine extension which is appended to template files.

```js
require.config({
    paths: {
        twig: 'path/to/libs/twig.js/twig',
        twigjs: 'path/to/libs/require-twig/twig'
    },
    // optional
    twigjs: {
        extension: 'html' // default: twig
    }
});
```

## Usage

Write a template (path: `templates/profile.twig`):

```html
<a href="{{ profileUrl }}">
    <img src="{{ avatarUrl }}" alt="" class="avatar">
</a>
<h1 class="names">
    <span class="fullname">{{ firstName }} {{ lastName }}</span>
    <span class="username">{{ userName }}</span>
</h1>
```

Then require your template like so:

```js
require(['twigjs!templates/profile'], function(template) {
    document.body.innerHTML = template({
        avatarUrl: 'http://avatars.example.com/users/jdoe?v=1',
        profileUrl: 'http://example.com/jdoe',
        userName: 'jdoe',
        firstName: 'John',
        lastName: 'Doe'
    });
});
```

And the output into document's body would be as follows:

```html
<a href="http://example.com/jdoe">
    <img src="http://avatars.example.com/users/jdoe?v=1" alt="" class="avatar">
</a>
<h1 class="names">
    <span class="fullname">John Doe</span>
    <span class="username">jdoe</span>
</h1>
```

## Usage with Backbone/Marionette

```js
define(['twigjs!templates/profile'], function(template) {
    return Marionette.ItemView.extend({
        template: template
    });
});
```
