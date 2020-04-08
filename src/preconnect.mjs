const preconnect = (function (win, doc) {
  let timeout, getDns, l = "link", p = "preconnect", ap = "appendChild", ce = "createElement", ric = "requestIdleCallback";

  const injectLinkEl = (linkEl, hint, origin) => {
    linkEl.rel = hint;
    linkEl.href = origin;

    if (hint == p && origin.indexOf(doc.location.href) != 0) {
      linkEl.crossOrigin = "anonymous";
    }

    if (win[ric] && timeout) {
      win[ric](() => {
        doc.head[ap](linkEl);
      }, {
        timeout
      });

      return;
    }

    doc.head[ap](linkEl);
  };

  function preconnect (options) {
    options = options || {};
    timeout = options.timeout || 0;
    getDns = options.getDns || false;
  }

  preconnect.prototype.add = origin => {
    injectLinkEl(doc[ce](l), p, origin);

    if (getDns) {
      injectLinkEl(doc[ce](l), "dns-prefetch", origin);
    }
  };

  return preconnect;
})(window, document);

export default preconnect;
