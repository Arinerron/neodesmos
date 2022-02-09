define('core/math/features/getgraphinfo', ['require', 'parsenodes', 'core/math/domaintypes', 'core/math/types', 'core/lib/color-helpers'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/math/domaintypes")
      , n = require("core/math/types")
      , a = require("core/lib/color-helpers").getDisplayColor;
    function r(e) {
        switch (e.valueType) {
        case n.Number:
            return o(e);
        case n.Point:
            var t = o(e.elementAt(0))
              , a = o(e.elementAt(1));
            if (!t || !a)
                return;
            return [t, a];
        default:
            return
        }
    }
    function o(e) {
        var t = e.getDependencies();
        switch (t.length) {
        case 0:
            return [+e.asValue(), 0];
        case 1:
            if (e.polynomialOrder(t[0]) > 1)
                return;
            var n = e.getPolynomialCoefficients(t[0]);
            return [n[0] ? +n[0].asValue() : 0, n[1] ? +n[1].asValue() : 0];
        default:
            return
        }
    }
    e.Base.prototype.getGraphInfo = function(e, n) {
        var o, i, s = n.getDependencies();
        switch (s.length) {
        case 0:
            o = r(n),
            i = n.boundDomain("x");
            break;
        case 1:
            "known" === (i = n.boundDomain(s[0])).type && (o = r(n));
            break;
        case 2:
            i = t.unknownDomain()
        }
        return {
            graphMode: this.getGraphMode(e, n),
            color: a(this.userData, this.metaData),
            pointStyle: this.userData.pointStyle,
            lineStyle: this.userData.lineStyle,
            operator: this.getOperator(),
            isLinear: !!o,
            linearCoefficients: o,
            domainBound: i
        }
    }
});