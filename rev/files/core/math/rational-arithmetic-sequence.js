define('core/math/rational-arithmetic-sequence', ['require', 'core/math/distance', 'core/math/builtin'], function(require) {
    "use strict";
    var n = require("core/math/distance")
      , t = require("core/math/builtin");
    return function(r, a) {
        var c = t.toFraction(r)
          , i = t.toFraction(a);
        if (n.approx(c.n / c.d, r) && n.approx(i.n / i.d, a)) {
            var o = t.lcm(c.d, i.d)
              , e = c.n * (o / c.d);
            return {
                nstart: e,
                nstep: i.n * (o / i.d) - e,
                lcm: o
            }
        }
    }
});