
define('submodules/dcgview/build-amd/dcg-view', ["./create-element", "./create-class", "./mounting", "./spread", "./const", "./custom-attributes", "./attr-style", "./attr-class", "./attr-lifecycle", "./components", "./warnings", "./bind-text", "./class"], function(t, e, d, a, u, n, o, l, r, i, s, m, f) {
    "use strict";
    function c(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var C = c(t)
      , b = c(e)
      , p = c(d)
      , A = c(a)
      , U = c(u)
      , w = c(n)
      , g = c(o)
      , M = c(l)
      , W = c(r)
      , y = c(i)
      , H = c(s)
      , N = c(m)
      , v = c(f)
      , F = N.default.enableSpanWrapping
      , S = {
        createElement: C.default,
        createClass: b.default,
        mountToNode: p.default.mountToNode,
        unmountFromNode: p.default.unmountFromNode,
        spread: A.default,
        const: U.default.makeConst,
        isConst: U.default.isConst,
        addCustomAttribute: w.default.add,
        Components: y.default,
        addWarningHandler: H.default.addWarningHandler,
        removeWarningHandler: H.default.removeWarningHandler,
        _warn: H.default.warn,
        enableSpanWrapping: F,
        Class: v.default
    };
    return S.addCustomAttribute("style", g.default),
    S.addCustomAttribute("class", M.default),
    S.addCustomAttribute("willMount", W.default("willMount")),
    S.addCustomAttribute("onMount", W.default("onMount")),
    S.addCustomAttribute("didMount", W.default("didMount")),
    S.addCustomAttribute("willUnmount", W.default("willUnmount")),
    S.addCustomAttribute("onUnmount", W.default("onUnmount")),
    S.addCustomAttribute("didUnmount", W.default("didUnmount")),
    S.addCustomAttribute("willUpdate", W.default("willUpdate")),
    S.addCustomAttribute("onUpdate", W.default("onUpdate")),
    S.addCustomAttribute("didUpdate", W.default("didUpdate")),
    S
});