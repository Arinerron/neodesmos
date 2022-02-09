define('calculator-shell/wrapper', ["require", "exports", "tslib", "dcgview", "./view", "./language-menu", "./help-menu", "./share-menu", "./account-menu", "./graph-actions-menu"], function(require, e, n, r, t, o, l, c, u, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ViewWrapper = void 0;
    var i = r.Components.SwitchUnion
      , a = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(a, e),
        a.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        a.prototype.template = function() {
            var e = this;
            return r.createElement("div", null, r.createElement(t.HeaderBar, {
                controller: this.props.controller
            }), i(function() {
                return e.getMenu()
            }, {
                language: function() {
                    return r.createElement(o.LanguageMenu, {
                        controller: e.props.controller
                    })
                },
                help: function() {
                    return r.createElement(l.HelpMenu, {
                        controller: e.props.controller
                    })
                },
                share: function() {
                    return r.createElement(c.ShareMenu, {
                        controller: e.props.controller
                    })
                },
                account: function() {
                    return r.createElement(u.AccountMenu, {
                        controller: e.props.controller
                    })
                },
                "graph-actions": function() {
                    return r.createElement(p.GraphActionsMenu, {
                        controller: e.props.controller
                    })
                },
                none: function() {
                    return r.createElement("span", null)
                }
            }))
        }
        ,
        a.prototype.getMenu = function() {
            return this.controller.mygraphsController.isMygraphsOpen() ? "none" : this.controller.getOpenMenu()
        }
        ,
        a
    }(r.Class);
    e.ViewWrapper = a
});