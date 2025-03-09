!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.WebflowTools = t())
    : (e.WebflowTools = t());
})(self, function () {
  return (function () {
    "use strict";
    var e = "r-automatic-tabs";
    function t(e) {
      var t = e.querySelector(":scope > .w--current");
      if (t && e) {
        var o = document.body.getAttribute("r-automatic-tabs-loop"),
          n = t.nextElementSibling;
        if ((n || (o && !parseInt(o)) || (n = e.firstChild), n)) {
          var r = t.nextElementSibling || e.firstChild;
          null == r || r.click();
        }
      }
    }
    var o = document.querySelectorAll("[r-automatic-tabs]"),
      n = {},
      r = { threshold: 0.1 };
    return (
      o.forEach(function (o, i) {
        var u = o.querySelectorAll(":scope > *"),
          c = u[0],
          f = 1e3 * Number(o.getAttribute(e)),
          s = o.getAttribute("pause-on-hover");
        s &&
          (o.addEventListener("mouseover", function (e) {
            !(function (e) {
              clearTimeout(n[e]);
            })(i);
          }),
          o.addEventListener("mouseout", function (e) {
            !(function (e, o, r) {
              n[e] = setTimeout(function () {
                return t(o);
              }, r);
            })(i, o, f);
          })),
          u.forEach(function (e) {
            e.addEventListener("click", function (e) {
              e.stopPropagation(),
                (s && o.matches(":hover")) ||
                  (clearTimeout(n[i]),
                  (n[i] = setTimeout(function () {
                    return t(o);
                  }, f)));
            });
          }),
          new IntersectionObserver(function (e) {
            return (function (e, t, o) {
              e.map(function (e) {
                e.isIntersecting ? t.click() : clearTimeout(n[o]);
              });
            })(e, c, i);
          }, r).observe(o);
      }),
      {}
    );
  })();
});
