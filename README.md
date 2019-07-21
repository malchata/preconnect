# preconnect

A nano-sized `preconnect` hint wrapper.

<p align="center">
  <strong>ES5 (.js) version</strong>
</p>
<p align="center">
  <img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.js?label=Uncompressed&v2=v2" alt="Uncompressed">&nbsp;<img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.js?compression=gzip&label=gzip&v2=v2" alt="gzip">&nbsp;<img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.js?compression=brotli&label=brotli&v2=v2" alt="Brotli">
</p>
<p align="center">
  <strong>ES6 (.mjs) version</strong>
</p>
<p align="center">
  <img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.mjs?label=Uncompressed&v2=v2" alt="Uncompressed">&nbsp;<img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.mjs?compression=gzip&label=gzip&v2=v2" alt="gzip">&nbsp;<img src="https://img.badgesize.io/malchata/preconnect/master/dist/preconnect.min.mjs?compression=brotli&label=brotli&v2=v2" alt="Brotli">
</p>

---

preconnect is a very small script that allows you to programmatically invoke a [`preconnect` hint](https://developers.google.com/web/fundamentals/performance/resource-prioritization#preconnect) to any host to mask connection latency. The script is designed so that you can invoke this hint whenever is appropriate for your application.

## Installing

Since preconnect is Just JavaScript&trade;, you can install it with npm as a production dependency:

```
npm i preconnect --save
```

If you're not the npm type, grab one (or both) of the minified versions in [this repo's `dist` folder](https://github.com/malchata/preconnect/tree/master/dist). There are two minified versions:

- [`preconnect.min.js`](https://raw.githubusercontent.com/malchata/preconnect/master/dist/preconnect.min.js) is the Babel-fied ES5 build. It assigns a variable named `preconnect` on the `window`.
- [`preconnect.min.mjs`](https://raw.githubusercontent.com/malchata/preconnect/master/dist/preconnect.min.mjs) is the untransformed minified ES6 build. Its `default` `export` is a single eponymously named function.

## Usage

```javascript
import preconnect from "preconnect";

const preconnecter = new preconnect({
  // Injects `dns-prefetch` hints in addition to `preconnect` hints
  getDns: true
});

// Preconnects to a link as the user hovers over it
document.getElementById("some-link").addEventListener("mouseover", event => {
  preconnecter.add(event.target.href);
}, {
  // Execute this event handler code only once avoid multiple injections of hints
  once: true
});
```

In the above example, an early connection is established to the host specified in an `<a>` element's `href` value. This could potentially speed up navigation to that host for the user, improving the perceived performance of the navigation.

## Options

When you instantiate a new instance of preconnect, you can pass in an options object. There are currently only two options:

- **`getDns`** _(default: `false`)_<br>Inject a [`dns-prefetch` hint](https://developer.mozilla.org/en-US/docs/Learn/Performance/dns-prefetch) in addition to a `preconnect` hint. Some browsers don't support `preconnect`, but some of those browsers _do_ support `dns-prefetch`. Enabling this ensures those browsers still receive some kind of benefit.
- **`timeout`** _(default: `0`)_<br>This script can use [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) to take advantage of idle browser time. This helps to reduce monopolization of the main thread so that the page is more responsive to user input. This option specifies, in milliseconds, the deadline by which `requestIdleCallback` must inject the resource hint elements into the document `<head>`. A value of `0` (also the default value) disables the use of `requestIdleCallback` entirely.

## Contributing

If you'd like to contribute, please file an issue first so we can discuss. Because I'd like to keep this script very small and simple, new features aren't likely to be added unless the weight they add can be justified.

## Author info

My name is Jeremy Wagner. I'm an [independent web performance consultant](https://jeremy.codes/) who works with individuals and businesses to help make their sites faster through auditing and/or engineering services. I also [write about web stuff](https://jeremy.codes/writing/), and sometimes I even get to occasionally [talk about web stuff](https://speaking.jeremy.codes/). I also ramble on Twitter [@malchata](https://twitter.com/malchata).
