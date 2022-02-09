define('pillow-keypad/main', ["require", "exports", "tslib", "dcgview", "./dcgview-pillow-keypad", "./main-keypad", "./qwerty-keypad", "./capital-qwerty-keypad", "./functions-keypad", "./fourfunction-keypad", "./control-bar", "touchtracking", "loadcss!./main"], function(require, e, t, n, r, o, i, l, c, a, u, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var p = n.Components
      , d = p.Switch
      , f = p.SwitchUnion
      , y = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            return n.createElement("div", {
                class: n.const("dcg-calculator-api-container"),
                style: n.const("width: 100%; height: 100%; position: relative;")
            }, n.createElement("div", {
                class: n.const("dcg-do-not-blur dcg-container dcg-api-shared-keypad-root"),
                didMount: this.bindFn(this.didMountRoot)
            }, this.children))
        }
        ,
        r.prototype.didMountRoot = function(e) {
            s.monitor(e)
        }
        ,
        r
    }(r.DCGViewPillowKeypad)
      , h = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return n.createElement(y, t.__assign({}, this.props), n.createElement("div", {
                class: n.const("dcg-fourfunction-keypad-container"),
                role: n.const("group"),
                "aria-label": function() {
                    return e.s("shared-calculator-narration-keypad")
                }
            }, n.createElement(a.default, {
                controller: this.props.controller
            })))
        }
        ,
        r
    }(r.DCGViewPillowKeypad)
      , m = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return n.createElement(y, t.__assign({}, this.props), n.createElement(u.default, {
                controller: this.props.controller
            }), n.createElement("div", {
                role: n.const("group"),
                "aria-label": function() {
                    return e.s("shared-calculator-narration-keypad")
                }
            }, n.createElement(d, {
                key: function() {
                    return e.controller.getScientificKeyboardMode()
                }
            }, function(t) {
                switch (t) {
                case "qwerty":
                    return n.createElement(i.default, {
                        controller: e.props.controller
                    });
                case "capitalQwerty":
                    return n.createElement(l.default, {
                        controller: e.props.controller
                    });
                case "functions":
                    return n.createElement(c.default, {
                        controller: e.props.controller
                    });
                default:
                    return n.createElement(o.default, {
                        controller: e.props.controller
                    })
                }
            })))
        }
        ,
        r
    }(r.DCGViewPillowKeypad)
      , w = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.template = function() {
            var e = this;
            return f(function() {
                return e.controller.getKeypadType()
            }, {
                fourfunction: function() {
                    return n.createElement(h, t.__assign({}, e.props))
                },
                scientific: function() {
                    return n.createElement(m, t.__assign({}, e.props))
                }
            })
        }
        ,
        r
    }(r.DCGViewPillowKeypad);
    e.default = w
});