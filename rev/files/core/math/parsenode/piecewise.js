define('core/math/parsenode/piecewise', ['require', 'pjs', './expression', './constant', 'core/math/maybe-rational'], function(require) {
    "use strict";
    var n = require("pjs")
      , t = require("./expression")
      , e = require("./constant")
      , r = require("core/math/maybe-rational").maybeRational
      , a = n(t, {});
    return a.chain = function(n, t) {
        for (var e, r = t; n.length; )
            e = n.pop(),
            r = a([e.condition, e.if_expr, r]);
        return r
    }
    ,
    a.empty = function() {
        return a([e(!0), e(r(1, 1)), e(NaN)])
    }
    ,
    a
});