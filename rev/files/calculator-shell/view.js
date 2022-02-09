
define('calculator-shell/view', ["require", "exports", "tslib", "dcgview", "jquery", "lib/i18n", "shared-header/hamburger", "shared-header/accounts", "shared-header/header-toast", "./header-icon", "./graph-title", "../shared-components/tooltip", "frontpage/desmos-svg-logo", "loadcss!shared-header/header-bar", "loadcss!./calculator-shell", "loadcss!spinner"], function(require, e, t, n, r, o, c, l, a, s, i, u, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.HeaderBar = void 0;
    var p = n.Components.If
      , h = function(e) {
        function h() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(h, e),
        h.prototype.init = function() {
            this.controller = this.props.controller(),
            this.userController = this.controller.userController
        }
        ,
        h.prototype.template = function() {
            var e = this
              , t = this.controller.isInMaintenanceMode()
              , r = this.controller.getPreviewParams();
            return n.createElement("div", {
                class: n.const("dcg-header")
            }, n.createElement("div", {
                class: n.const("dcg-header-desktop")
            }, n.createElement("div", {
                class: n.const("align-left-container")
            }, n.createElement(c.Hamburger, {
                controller: this.props.controller,
                tooltip: n.const(!0)
            }), n.createElement(i.GraphTitle, {
                controller: this.props.controller
            })), n.createElement("div", {
                class: n.const("align-center-container")
            }, n.createElement("a", {
                href: n.const("/"),
                target: n.const("_blank"),
                class: n.const("dcg-home-link"),
                "aria-label": n.const("Home")
            }, n.createElement(d.DesmosSVGLogo, null))), n.createElement(a.HeaderToast, {
                controller: this.props.controller
            }), n.createElement(p, {
                predicate: function() {
                    return e.userController.didLogoutFail()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-toast-container")
                }, n.createElement("div", {
                    class: n.const("dcg-toast")
                }, function() {
                    return e.controller.s("account-shell-error-logging-out")
                }))
            }), n.createElement("div", {
                class: n.const("align-right-container")
            }, n.createElement(l.Accounts, {
                controller: this.props.controller,
                disableAccounts: function() {
                    return null != r || t
                }
            }), n.createElement(p, {
                predicate: function() {
                    return e.controller.isArtContestEnabled()
                }
            }, function() {
                return n.createElement(u.Tooltip, {
                    tooltip: function() {
                        return o.s("account-shell-label-math-art-contest")
                    },
                    gravity: e.const("s"),
                    offset: function() {
                        return {
                            top: 12
                        }
                    }
                }, n.createElement("span", {
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-haspopup": n.const("true"),
                    "aria-label": function() {
                        return o.s("account-shell-label-math-art-contest")
                    },
                    class: n.const("dcg-header-btn dcg-action-contest dcg-tooltip"),
                    onTap: function(t) {
                        return e.controller.dispatch({
                            type: "show-modal",
                            modal: "contest-submission",
                            device: t.device
                        })
                    }
                }, n.const("🏆")))
            }), n.createElement(s.HeaderIcon, {
                controller: this.props.controller,
                label: function() {
                    return o.s("account-shell-label-share")
                },
                tooltip: function() {
                    return e.controller.s("account-shell-label-share-graph")
                },
                icon: n.const("dcg-icon-share"),
                name: function() {
                    return "share"
                },
                onTap: function(t) {
                    if (e.controller.dispatch({
                        type: "toggle-menu",
                        payload: "share"
                    }),
                    t && "keyboard" === t.device && "share" !== e.controller.getOpenMenu())
                        return e.focusElement(".dcg-action-share")
                }
            }), n.createElement(s.HeaderIcon, {
                controller: this.props.controller,
                label: function() {
                    return o.s("account-shell-label-help")
                },
                tooltip: function() {
                    return e.controller.s("account-shell-label-help")
                },
                icon: n.const("dcg-icon-question-sign"),
                name: n.const("help"),
                onTap: function(t) {
                    if (e.controller.dispatch({
                        type: "toggle-menu",
                        payload: "help"
                    }),
                    "keyboard" === t.device) {
                        var n = "help" === e.controller.getOpenMenu() ? '.dcg-feature[href="/calculator?tour=sliders"]' : ".dcg-action-help";
                        return e.focusElement(n)
                    }
                }
            }), n.createElement(s.HeaderIcon, {
                controller: this.props.controller,
                gravity: this.const("sw"),
                label: function() {
                    return o.s("account-shell-label-language")
                },
                tooltip: function() {
                    return e.controller.s("account-shell-label-language")
                },
                icon: n.const("dcg-icon-world"),
                name: n.const("language"),
                onTap: function(t) {
                    if (e.controller.dispatch({
                        type: "toggle-menu",
                        payload: "language"
                    }),
                    "keyboard" === t.device) {
                        var n = "language" === e.controller.getOpenMenu() ? ".dcg-language-option.dcg-selected" : ".dcg-action-language";
                        return e.focusElement(n)
                    }
                }
            }))), n.createElement(p, {
                predicate: function() {
                    return null != r || t
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-toast-container")
                }, n.createElement("span", {
                    class: n.const("dcg-toast dcg-maintenance-toast")
                }, n.createElement("span", {
                    class: n.const("dcg-msg")
                }, n.createElement(p, {
                    predicate: function() {
                        return t
                    }
                }, function() {
                    return n.createElement("span", null, function() {
                        return e.controller.s("account-shell-text-maintenance-mode")
                    })
                }), n.createElement(p, {
                    predicate: function() {
                        return null != r
                    }
                }, function() {
                    return n.createElement("span", null, function() {
                        return null != r ? r.message : void 0
                    })
                })), n.createElement(p, {
                    predicate: function() {
                        return t
                    }
                }, function() {
                    return n.createElement("a", {
                        class: n.const("undo"),
                        target: n.const("_blank"),
                        href: n.const("http://desmos.zendesk.com/entries/25429616-What-is-Maintenance-Mode-/")
                    }, function() {
                        return e.controller.s("account-shell-link-learn-more")
                    })
                }), n.createElement(p, {
                    predicate: function() {
                        return null != r
                    }
                }, function() {
                    return n.createElement("a", {
                        class: n.const("undo"),
                        target: n.const("_blank"),
                        href: function() {
                            return null != r ? r.url : void 0
                        }
                    }, function() {
                        return e.controller.s("account-shell-link-share-thoughts")
                    })
                })))
            }))
        }
        ,
        h.prototype.focusElement = function(e) {
            r(e).trigger("focus")
        }
        ,
        h
    }(n.Class);
    e.HeaderBar = h
});