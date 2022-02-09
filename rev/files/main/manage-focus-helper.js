define('main/manage-focus-helper', ["require", "exports", "underscore"], function(require, o, e) {
    "use strict";
    function n(o) {
        var n = o.controller.getFocusLocation();
        return n && e.isEqual(n, o.location)
    }
    function t(o, e) {
        e ? o.controller.dispatch({
            type: "set-focus-location",
            location: o.location
        }) : o.controller.dispatch({
            type: "blur-focus-location",
            location: o.location
        })
    }
    Object.defineProperty(o, "__esModule", {
        value: !0
    }),
    o.defaultOnFocusChanged = o.defaultShouldBeFocused = o.manageFocusHelper = void 0,
    o.manageFocusHelper = function(o) {
        return {
            shouldBeFocused: function() {
                return n(o)
            },
            onFocusedChanged: function(e) {
                t(o, e)
            }
        }
    }
    ,
    o.defaultShouldBeFocused = n,
    o.defaultOnFocusChanged = t
});
