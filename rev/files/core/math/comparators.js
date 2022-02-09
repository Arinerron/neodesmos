
define('core/math/comparators', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.get = e.table = void 0,
    e.table = {
        "<": {
            inclusive: !1,
            direction: -1
        },
        "!=": {
            inclusive: !1,
            direction: 0
        },
        ">": {
            inclusive: !1,
            direction: 1
        },
        "<=": {
            inclusive: !0,
            direction: -1
        },
        "=": {
            inclusive: !0,
            direction: 0
        },
        ">=": {
            inclusive: !0,
            direction: 1
        }
    },
    e.get = function(e, i) {
        switch (i) {
        case -1:
            return e ? "<=" : "<";
        case 0:
            return e ? "=" : "!=";
        case 1:
            return e ? ">=" : ">";
        default:
            throw "Programming error.  Comparators must have a direction of -1, 0, or 1"
        }
    }
});