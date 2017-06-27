# modular-web
A boilerplate project for a modular web build for static sites using CSS Modules &amp; Webpack

# Getting Started
This project requires Node & NPM, which you can [download and install here][1].

Once Node is installed, you must also install Gulp:

`npm i gulp -g`

Once installed, install the deps from `package.json` by running the following command from the root of the repo:

`npm i`

Alternatively with [Yarn][2]:

`yarn install`

Once this is done, you can run the project using Gulp:

`gulp build`

# Why does this exist?
Writing CSS at scale sucks. In fact, building websites at scale sucks.

In a modern app development environment, such as with React.js, developers work with tight components that are locally-scoped.

This means their CSS, their Javascript, and their HTML are highly-coupled, and don't interfere with other components. 

This makes maintaining code easier and more efficient.

For example, with scoped CSS & JS, I can create two components with the same JS functions and CSS classes, without worrying about them affecting one another.

With modularization, you can `.red` class on a button that makes the button's background color red, while having a seperate `.red` class on an alert that makes it's font color red. Neither will affect the other, meaning the button text wont be red and the alert backround wont be white.

It's a better way to build for the web.

# How it works
This workflow uses Gulp to parse your `/src/` folder for HTML, CSS, and JS files, and processes them using [PostHTML][3], [PostCSS][4], and [Webpack][5].

## CSS
Your CSS files are parsed by PostCSS, and a corresponding `*.css.json` file is generated alongside each `.css` file in your `/src/` folders.

This JSON file contains unique hashed versions of your css classes, or "css modules".

## HTML
Your HTML is then parsed by PostHTML, and any element with the `css-module="some-class"` attribute will look for the matching classes, and apply the locally-scoped hashed CSS classes.

## JS
Your JS is parsed by Webpack, allowing ES2016, and JSX, and then is output to the public directory in a minified format with the original name.

The `require` syntax can be used in all JS files, allowing you to create "bundles" that can be put together to be used for specific pages, components, and more.

### Using CSS
To use your CSS modules, all you have to do is require the generated `.css.json` file that lives alongside your HTML and JS files.

Then you can use the imported objects to call the hashed class name. E.g,

```js
let styles = require('./styles.css.json')

let exampleClass = styles['example-class'];
```

### Example bundle
Let's walk through an example of bundling.

Let's assume we want to create a main js bundle used by the site, as well as small nav component with javascript functionality that  will be used everywhere on the site.

It looks something like this:

```
.
|-- src/
|---- index.html
|---- bundle.js
|---- nav/
|------ nav.css
|------ nav.html
|------ nav.js
```

This will render out the bundle to `public/bundle.min.js` and the nav component to `public/nav`.

In our `index.html` file, we could include a script for both the main bundle, and the nav bundle, but that would get annoying as we add more and more components.

We could move the scripts for the nav into the main bundle, but that ruins our modularization. Plus, what if we have a component whose scripts *don't* need to be included on every page?

So instead, we use Webpack's `require` to only include what we need, where we need it. 

So in this case, we'll require the nav scripts in `bundle.js`:

```js
let nav = require('./nav/script.js')

function getCookie(id) { // some fxn code }}

function handleLogin(id) { // some fxn code }}
```

[1]: https://nodejs.org/en/download/
[2]: https://yarnpkg.com/en/
[3]: https://github.com/posthtml/posthtml
[4]: https://github.com/postcss/postcss
[5]: https://webpack.github.io/
