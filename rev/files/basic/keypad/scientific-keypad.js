
define('basic/keypad/scientific-keypad', ["require", "exports", "tslib", "dcgview", "basic/dcgview-basic", "./sci-keypad", "./sci-qwerty-keypad", "./sci-letters-keypad", "./sci-capital-qwerty-keypad", "./sci-capital-letters-keypad", "./sci-functions-keypad"], function(require, e, t, r, n, o, l, c, a, i, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = r.Components.SwitchUnion
      , p = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                role: r.const("group"),
                "aria-label": function() {
                    return e.s("basic-calculator-narration-keypad")
                }
            }, s(function() {
                return e.controller.getKeyboardMode()
            }, {
                qwerty: function() {
                    return r.createElement(l.default, {
                        controller: e.props.controller
                    })
                },
                letters: function() {
                    return r.createElement(c.default, {
                        controller: e.props.controller
                    })
                },
                capitalQwerty: function() {
                    return r.createElement(a.default, {
                        controller: e.props.controller
                    })
                },
                capitalLetters: function() {
                    return r.createElement(i.default, {
                        controller: e.props.controller
                    })
                },
                functions: function() {
                    return r.createElement(u.default, {
                        controller: e.props.controller
                    })
                },
                main: function() {
                    return r.createElement(o.default, {
                        controller: e.props.controller
                    })
                }
            }))
        }
        ,
        n
    }(n.DCGViewBasic);
    e.default = p
});
