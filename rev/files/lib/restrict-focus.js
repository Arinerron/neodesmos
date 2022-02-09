
define('lib/restrict-focus', ["require", "exports", "keys", "jquery"], function(require, e, t, r) {
    "use strict";
    function i(e) {
        return e.find(':input:enabled, [tabindex="0"], a[href]').filter(":visible:not([aria-hidden=true]):not([aria-disabled=true])")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.createRestrictFocusHandler = e.getFocusableElements = void 0,
    e.getFocusableElements = i,
    e.createRestrictFocusHandler = function(e) {
        return function(n) {
            if (t.lookup(n) == t.TAB) {
                var u = i(r(e));
                if (0 === u.length)
                    return;
                var s = u.first()
                  , o = u.last();
                n.shiftKey && s.is(":focus") ? (n.preventDefault(),
                o.trigger("focus")) : (!n.shiftKey && o.is(":focus") || document.activeElement && !u.is(":focus")) && (n.preventDefault(),
                s.trigger("focus"))
            }
        }
    }
});
