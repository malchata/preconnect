'use strict';

function preconnect (options) {
  this.options = options || {};
  this.timeout = "timeout" in this.options ? this.options.timeout : 0;
}

preconnect.prototype.injectLinkEl = function (linkEl, hint, origin) {
  linkEl.rel = hint;
  linkEl.href = origin;

  if (hint == "preconnect" && origin.indexOf(document.location.href) != 0) {
    linkEl.crossOrigin = "anonymous";
  }

  if ("requestIdleCallback" in window && this.timeout > 0) {
    requestIdleCallback(() => {
      document.head.appendChild(linkEl);
    }, {
      timeout: this.timeout
    });
  } else {
    document.head.appendChild(linkEl);
  }
};

preconnect.prototype.add = function (origin) {
  this.injectLinkEl(document.createElement("link"), "preconnect", origin);

  if (this.options.getDns || false) {
    this.injectLinkEl(document.createElement("link"), "dns-prefetch", origin);
  }
};

module.exports = preconnect;
