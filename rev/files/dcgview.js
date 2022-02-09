define('dcgview', ["require", "exports", "submodules/dcgview/dcgview", "jquery", "bugsnag", "lib/retain-lang", "loadcss!dcgview-shim"], function(require, n, t, o, u, i) {
    "use strict";
    return t.addWarningHandler(function(n) {
        return u.notify(n)
    }),
    t.addCustomAttribute("href", function(n) {
        var t = i.retainLang(n())
          , u = {
            value: "" + i.retainLang(n()),
            bindings: {
                onMount: function(n) {
                    if (!o(n).is("a") && !o(n).is("use"))
                        throw new Error("Cannot have an href on a non-link element.")
                }
            }
        };
        return u.bindings.onUpdate = function(o) {
            var u = i.retainLang(n());
            t !== u && (t = u,
            o.setAttribute("href", u))
        }
        ,
        u
    }),
    t.addCustomAttribute("onTap", function(n) {
        return {
            value: "",
            bindings: {
                onMount: function(t) {
                    o(t).on("dcg-tap", n)
                }
            }
        }
    }),
    t.addCustomAttribute("ignoreRealClick", function(n) {
        return {
            bindings: {
                onMount: function(t) {
                    o(t).on("click", function(t) {
                        n() && t.preventDefault()
                    })
                }
            }
        }
    }),
    t.addCustomAttribute("onTapStart", function(n) {
        return {
            bindings: {
                onMount: function(t) {
                    o(t).on("dcg-tapstart", n)
                }
            }
        }
    }),
    t.addCustomAttribute("onTapMove", function(n) {
        return {
            bindings: {
                onMount: function(t) {
                    o(t).on("dcg-tapmove", n)
                }
            }
        }
    }),
    t.addCustomAttribute("onTapEnd", function(n) {
        return {
            bindings: {
                onMount: function(t) {
                    o(t).on("dcg-tapend", n)
                }
            }
        }
    }),
    t.addCustomAttribute("onLongHold", function(n) {
        return {
            bindings: {
                onMount: function(t) {
                    o(t).on("dcg-longhold", n)
                }
            }
        }
    }),
    t.addCustomAttribute("manageFocus", function(n) {
        return void 0 === n() ? {} : {
            bindings: {
                onMount: function(t) {
                    n().shouldBeFocused() && t.focus(),
                    t.onfocus = function(t) {
                        n().shouldBeFocused() || n().onFocusedChanged(!0, t)
                    }
                    ,
                    t.onblur = function(t) {
                        n().shouldBeFocused() && n().onFocusedChanged(!1, t)
                    }
                },
                onUpdate: function(t) {
                    var o = n().shouldBeFocused()
                      , u = document.activeElement === t;
                    o && !u ? t.focus() : u && !o && t.blur()
                },
                willUnmount: function(n) {
                    n.onfocus = null,
                    n.onblur = null
                }
            }
        }
    }),
    t
});