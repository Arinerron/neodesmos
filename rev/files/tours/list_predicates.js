define('tours/list_predicates', ['require', 'predicates/common', 'parser', 'graphing-calc/models/expression'], function(require) {
    "use strict";
    var e = require("predicates/common")
      , n = require("parser")
      , t = require("graphing-calc/models/expression")
      , r = function(e) {
        return function(r, i) {
            if (!r.latex)
                return !1;
            var s = n.parse(r.latex);
            if (!s._expression)
                return !1;
            if ("List" !== s._expression.type && "Range" !== s._expression.type)
                return !1;
            if (e.dependent && e.dependent !== t.getAssignment(r))
                return !1;
            var u = s.getConcreteTree();
            return !e.minLength || !(void 0 === u.length || u.length < e.minLength)
        }
    };
    return {
        ANY_LIST: r({}),
        A_LIST: r({
            dependent: "a",
            minLength: 3
        }),
        B_LIST: r({
            dependent: "b",
            minLength: 5
        }),
        C_LIST: r({
            dependent: "c",
            minLength: 10
        }),
        A_DEP: function(n, t) {
            return e.GRAPHABLE_EXP(n, t) && e.DEPENDS_ON("a")(n, t)
        },
        B_DEP: function(n, t) {
            return e.GRAPHABLE_EXP(n, t) && e.DEPENDS_ON("b")(n, t)
        },
        C_DEP: function(n, t) {
            return e.DEPENDS_ON("c")(n, t) && e.EVALUATION(n, t)
        }
    }
});