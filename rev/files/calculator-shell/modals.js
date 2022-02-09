define('calculator-shell/modals', ["require", "exports", "tslib", "dcgview", "./save-dialog", "shared-components/shared-signup-modal", "shared-components/shared-login-modal", "shared-components/shared-recover-password-modal", "./hotkeys-dialog", "./unsupported-browser", "shared-components/shared-account-settings-modal", "shared-components/shared-change-email-modal", "./export-image-dialog", "shared-components/shared-consent-modal", "./contest-submission-dialog", "shared-components/modal", "shared-components/shared-account-reenabled-modal", "./advanced-settings", "./delete-modal", "loadcss!modals"], function(require, e, o, t, n, r, l, c, a, s, i, d, p, u, m, h, g, f, E) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Modals = void 0;
    var v = t.Components
      , b = v.If
      , y = v.SwitchUnion
      , M = function(e) {
        function v() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(v, e),
        v.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        v.prototype.template = function() {
            var e = this;
            return y("modal", function() {
                return e.controller.getModalState()
            })({
                save: function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(n.SaveDialog, {
                        controller: e.props.controller
                    }))
                },
                rename: function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(n.SaveDialog, {
                        controller: e.props.controller
                    }))
                },
                duplicate: function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(n.SaveDialog, {
                        controller: e.props.controller
                    }))
                },
                "export-image": function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(p.default, {
                        controller: e.props.controller
                    }))
                },
                login: function() {
                    return t.createElement(l.SharedLoginModal, {
                        controller: e.props.controller
                    })
                },
                signup: function() {
                    return t.createElement(r.SharedSignupModal, {
                        controller: e.props.controller,
                        teacher: e.const(!1)
                    })
                },
                "recover-password": function() {
                    return t.createElement(c.SharedRecoverPasswordModal, {
                        controller: e.props.controller
                    })
                },
                hotkeys: function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(a.HotkeysDialog, {
                        controller: e.props.controller
                    }), t.const(";"))
                },
                "unsupported-browser": function() {
                    return t.createElement(x, {
                        controller: e.props.controller
                    }, t.createElement(s.UnsupportedBrowserDialog, {
                        controller: e.props.controller
                    }))
                },
                "account-settings": function(o) {
                    return t.createElement(i.SharedAccountSettingsModal, {
                        controller: e.props.controller,
                        extraTabs: e.bindFn(e.getAccountSettingsExtraTabs),
                        initialTab: function() {
                            return o().initialTab
                        }
                    })
                },
                "change-email": function() {
                    return t.createElement(d.SharedChangeEmailModal, {
                        controller: e.props.controller
                    })
                },
                "account-reenabled": function() {
                    return t.createElement(g.SharedAccountReenabledModal, {
                        controller: e.props.controller
                    })
                },
                consent: function() {
                    return t.createElement(u.SharedConsentModal, {
                        controller: e.props.controller
                    })
                },
                "contest-submission": function() {
                    return t.createElement(h.Modal, {
                        title: function() {
                            return ""
                        },
                        size: e.const("wide"),
                        showX: e.const(!0),
                        onClose: function() {
                            return e.controller.dispatch({
                                type: "close-modal"
                            })
                        },
                        i18n: e.props.controller
                    }, t.createElement(m.default, {
                        controller: e.props.controller
                    }))
                },
                delete: function() {
                    return t.createElement(E.DeleteModal, {
                        controller: e.props.controller
                    })
                },
                "teacher-signup": function() {
                    return t.createElement("div", null)
                },
                none: function() {
                    return t.createElement("div", null)
                }
            })
        }
        ,
        v.prototype.getAccountSettingsExtraTabs = function() {
            var e = this;
            return {
                tabs: [{
                    key: "advanced",
                    wideLabel: function() {
                        return e.props.controller().s("account-shell-label-advanced-preferences")
                    },
                    narrowLabel: function() {
                        return e.props.controller().s("account-shell-label-advanced-preferences")
                    },
                    class: "advanced"
                }],
                createView: function(o) {
                    return o ? "advanced" == o ? t.createElement(f.AdvancedSettings, {
                        controller: e.props.controller
                    }) : o : t.createElement("span", null)
                }
            }
        }
        ,
        v
    }(t.Class);
    e.Modals = M;
    var x = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(n, e),
        n.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return t.createElement("div", {
                role: t.const("dialog"),
                class: function() {
                    return {
                        "dcg-modal-container": !0,
                        "dcg-wide-modal": "hotkeys" === e.controller.getOpenModal(),
                        "dcg-fixed-width-height": e.shouldBeFixedWidthHeight(),
                        "dcg-export-modal": "export-image" === e.controller.getOpenModal()
                    }
                }
            }, t.createElement("div", {
                class: t.const("dcg-modal-background"),
                onTap: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                }
            }), t.createElement("div", {
                class: t.const("modal dcg-state-modals")
            }, t.createElement(b, {
                predicate: function() {
                    return "consent" !== e.controller.getOpenModal()
                }
            }, function() {
                return t.createElement("span", {
                    role: t.const("link"),
                    tabindex: t.const(0),
                    "aria-label": t.const("Close Dialog"),
                    class: t.const("action-close-modal close-modal internal-close"),
                    onTap: function() {
                        return e.controller.dispatch({
                            type: "close-modal"
                        })
                    },
                    didMount: function(o) {
                        if ("hotkeys" === e.controller.getOpenModal())
                            return o.focus()
                    }
                }, t.createElement("i", {
                    class: t.const("dcg-icon-remove")
                }))
            }), this.children), t.createElement("span", {
                role: t.const("link"),
                tabindex: t.const(0),
                onTap: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                "aria-label": t.const("Close Dialog"),
                class: t.const("action-close-modal close-modal external-close")
            }, t.createElement("i", {
                class: t.const("dcg-icon-remove")
            })))
        }
        ,
        n.prototype.shouldBeFixedWidthHeight = function() {
            var e = this.controller.getOpenModal();
            return "export-image" === e || "contest-submission" === e
        }
        ,
        n
    }(t.Class)
});