define('main/graphpaper-branding-view', ["require", "exports", "tslib", "dcgview", "loadcss!pillboxes"], function(require, e, n, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = t.Components.SwitchUnion
      , c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(c, e),
        c.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            r(function() {
                return e.controller.getBrandingMode()
            }, {
                "static-edit-link": function() {
                    return t.createElement("div", {
                        class: t.const("dcg-graphpaper-branding")
                    }, t.createElement("a", {
                        href: function() {
                            return e.controller.getEditLink()
                        },
                        target: t.const("_blank")
                    }, t.createElement("span", {
                        class: t.const("dcg-powered-by"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-edit-on-desmos")
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-link-edit-on-desmos")
                    }), t.createElement("i", {
                        class: t.const("dcg-icon-desmos")
                    })))
                },
                "edit-link": function() {
                    return t.createElement("div", {
                        class: t.const("dcg-graphpaper-branding")
                    }, t.createElement("span", {
                        class: t.const("dcg-edit-branding"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "open-on-web"
                            })
                        }
                    }, t.createElement("span", {
                        class: t.const("dcg-powered-by"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-edit-on-desmos")
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-link-edit-on-desmos")
                    }), t.createElement("i", {
                        class: t.const("dcg-icon-desmos")
                    })))
                },
                "powered-by": function() {
                    return t.createElement("div", {
                        class: t.const("dcg-graphpaper-branding dcg-unclickable")
                    }, t.createElement("span", {
                        class: t.const("dcg-powered-by"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-powered-by-desmos")
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-label-powered-by")
                    }), t.createElement("i", {
                        class: t.const("dcg-icon-desmos")
                    }))
                }
            })
        }
        ,
        c
    }(t.Class);
    e.default = c
});
