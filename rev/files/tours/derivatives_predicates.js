
define('tours/derivatives_predicates', ['require', 'predicates/common'], function(require) {
    "use strict";
    var E = require("predicates/common")
      , n = function(E, n) {
        return E.latex.indexOf("\\frac{d}{dx}") >= 0
    };
    return {
        DEFINE_F: function(n, r) {
            return !!E.DEFINES("f")(n, r) && !!E.COMPLEX_EXP(n, r)
        },
        DEFINE_G: function(r, t) {
            return !!E.DEFINES("g")(r, t) && (!!E.DEPENDS_ON("f")(r, t) && (!!E.GRAPHABLE_EXP(r, t) && n(r)))
        },
        INLINE_DERIVATIVE: function(r, t) {
            return !!E.COMPLEX_EXP(r, t) && (!E.DEPENDS_ON("f")(r, t) && n(r))
        }
    }
});