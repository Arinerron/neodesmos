
define('calculator-shell/resource-links', ["require", "exports", "tslib", "dcgview", "../lib/enabled-languages"], function(require, e, t, n, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ResourceLinks = void 0;
    var c = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement("a", {
                href: function() {
                    return e.props.href()
                },
                target: n.const("_blank"),
                class: n.const("dcg-resource-link")
            }, n.createElement("i", {
                class: function() {
                    return e.props.icon()
                },
                "aria-hidden": n.const("true")
            }), n.createElement("span", null, function() {
                return e.props.title()
            }, n.const(" ")))
        }
        ,
        o
    }(n.Class)
      , r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-popover-content dcg-resources-content"),
                role: n.const("group"),
                "aria-label": n.const("Resources")
            }, n.createElement(c, {
                href: n.const("https://help.desmos.com/hc/en-us/articles/4406040715149-Getting-Started-Desmos-Graphing-Calculator"),
                icon: n.const("dcg-icon-rocket"),
                title: function() {
                    return e.controller.s("account-shell-link-getting-started")
                }
            }), n.createElement(c, {
                href: n.const("https://www.youtube.com/playlist?list=PLfM6zMGnbgOGLZc-_Yj3QVK3Vz_L4Cw59"),
                icon: n.const("dcg-icon-film"),
                title: function() {
                    return e.controller.s("account-shell-link-video-tutorials")
                }
            }), n.createElement(c, {
                href: function() {
                    var t = e.controller.languageController.getLanguage();
                    return o.ENABLED_LANGUAGES[t] ? o.ENABLED_LANGUAGES[t].userGuideURL : o.ENABLED_LANGUAGES.en.userGuideURL
                },
                icon: n.const("dcg-icon-book"),
                title: function() {
                    return e.controller.s("account-shell-link-user-guide")
                }
            }), n.createElement(c, {
                href: n.const("https://help.desmos.com/"),
                icon: n.const("dcg-icon-comments"),
                title: function() {
                    return e.controller.s("account-shell-link-help-center")
                }
            }), n.createElement("div", {
                class: n.const("dcg-resource-link dcg-action-show-hotkeys"),
                role: n.const("link"),
                tabindex: n.const(0),
                onTap: function(t) {
                    return e.controller.dispatch({
                        type: "show-modal",
                        modal: "hotkeys",
                        device: t.device
                    })
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-keyboard")
            }), n.createElement("span", null, function() {
                return e.controller.s("account-shell-link-keyboard-shortcuts")
            })))
        }
        ,
        r
    }(n.Class);
    e.ResourceLinks = r
});