
define('shared-components/shared-profile-info', ["require", "exports", "tslib", "dcgview", "./shared-delete-account", "./shared-email-settings", "loadcss!./shared-profile-info"], function(require, e, t, n, o, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedProfileInfo = void 0;
    var i = n.Components
      , r = i.If
      , s = i.Input
      , c = i.Switch
      , l = i.SwitchUnion
      , u = function(e) {
        function i() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(i, e),
        i.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.deleteAccount = 0
        }
        ,
        i.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-profile-info dcg-shared-account-settings-section")
            }, n.createElement(c, {
                key: function() {
                    return e.deleteAccount
                }
            }, function(t) {
                switch (t) {
                case 0:
                    return n.createElement("div", null, n.createElement("div", {
                        class: n.const("dcg-shared-email-form-container")
                    }, n.createElement(d, {
                        controller: e.props.controller
                    })), n.createElement(a.SharedEmailSettings, {
                        controller: e.props.controller
                    }), n.createElement("div", {
                        role: n.const("link"),
                        tabindex: n.const(0),
                        class: n.const("dcg-shared-dark-gray-link dcg-shared-delete-link"),
                        onTap: function() {
                            return e.confirmDeletion()
                        }
                    }, function() {
                        return e.i18n.s("shared-button-delete-account-question")
                    }));
                case 1:
                    return n.createElement(o.SharedDeleteAccount, {
                        hideForm: function() {
                            return e.setDeleteAccount(0)
                        },
                        submitForm: function() {
                            return e.setDeleteAccount(2)
                        },
                        controller: e.props.controller
                    });
                case 2:
                    return n.createElement("div", {
                        "aria-live": n.const("assertive"),
                        "aria-atomic": n.const("true"),
                        class: n.const("dcg-shared-confirmation-message-container")
                    }, n.createElement("div", {
                        class: n.const("dcg-shared-confirmation-message")
                    }, n.createElement("i", {
                        class: function() {
                            return {
                                "dcg-shared-icon-check": !0,
                                "dcg-success-marker": !0
                            }
                        },
                        "aria-hidden": n.const("true")
                    }), function() {
                        return e.i18n.s("shared-message-email-sent")
                    }), n.createElement("div", null, function() {
                        return e.i18n.s("shared-message-check-email-for-delete-link", {
                            emailAddress: e.i18n.raw(e.controller.userController.getEmail())
                        })
                    }))
                }
            }))
        }
        ,
        i.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        i.prototype.setDeleteAccount = function(e) {
            var t = this;
            this.deleteAccount = e,
            2 === e && setTimeout(function() {
                t.controller.userController.logout().done(function() {
                    return t.controller.dispatch({
                        type: "close-modal"
                    })
                })
            }, 5e3),
            this.unmounted || this.update()
        }
        ,
        i.prototype.confirmDeletion = function() {
            this.controller.logJSON("shared-profile-info", {
                action: "delete-account"
            }),
            this.setDeleteAccount(1),
            this.unmounted || this.update()
        }
        ,
        i
    }(n.Class);
    e.SharedProfileInfo = u;
    var d = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.init = function() {
            this.controller = this.props.controller();
            var e = this.controller.userController.getNameDetail();
            "legacy" == e.source ? this.state = {
                state: "legacy",
                name: e.given,
                previousName: e.given
            } : "parsed" == e.source ? this.state = {
                state: "name-detail",
                confirm: !0,
                given: e.given,
                family: e.family || "",
                previousGiven: "",
                previousFamily: ""
            } : this.state = {
                state: "name-detail",
                confirm: !1,
                given: e.given,
                family: e.family || "",
                previousGiven: e.given,
                previousFamily: e.family || ""
            }
        }
        ,
        o.prototype.template = function() {
            var e = this;
            return l("state", function() {
                return e.state
            })({
                legacy: function(o) {
                    return n.createElement(p, {
                        state: o,
                        controller: e.props.controller,
                        wasModalOpenedWithKeyboard: function() {
                            return e.controller.wasModalOpenedWithKeyboard()
                        },
                        onSaveName: e.bindFn(e.onSaveName),
                        showSavedNotice: function() {
                            return e.showSavedNotice
                        },
                        updateState: function(n) {
                            "legacy" == e.state.state && (e.state = t.__assign(t.__assign({}, e.state), n),
                            e.unmounted || e.update())
                        }
                    })
                },
                "name-detail": function(o) {
                    return n.createElement(m, {
                        state: o,
                        controller: e.props.controller,
                        wasModalOpenedWithKeyboard: function() {
                            return e.controller.wasModalOpenedWithKeyboard()
                        },
                        showSavedNotice: function() {
                            return e.showSavedNotice
                        },
                        onSaveName: e.bindFn(e.onSaveName),
                        updateState: function(n) {
                            "name-detail" == e.state.state && (e.state = t.__assign(t.__assign({}, e.state), n),
                            e.unmounted || e.update())
                        }
                    })
                }
            })
        }
        ,
        o.prototype.onSaveName = function() {
            switch (this.state.state) {
            case "legacy":
                this.controller.userController.setNameLegacy({
                    name: this.state.name,
                    lang: this.controller.getLanguage()
                }).done(this.bindFn(this.onSaved));
                break;
            case "name-detail":
                this.controller.userController.setNameDetail({
                    given: this.state.given,
                    family: this.state.family,
                    lang: this.controller.getLanguage()
                }).done(this.bindFn(this.onSaved))
            }
        }
        ,
        o.prototype.maybeUpdate = function() {
            this.unmounted || this.update()
        }
        ,
        o.prototype.onSaved = function() {
            var e = this;
            switch (this.state.state) {
            case "legacy":
                this.state.previousName = this.state.name;
                break;
            case "name-detail":
                this.state.previousGiven = this.state.given,
                this.state.previousFamily = this.state.family,
                this.state.confirm = !1
            }
            this.showSavedNotice = !0,
            this.maybeUpdate(),
            setTimeout(function() {
                e.showSavedNotice = !1,
                e.maybeUpdate()
            }, 3e3)
        }
        ,
        o.prototype.willUnmount = function() {
            this.unmounted = !0
        }
        ,
        o.prototype.didMount = function() {
            this.unmounted = !1
        }
        ,
        o
    }(n.Class)
      , p = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller
        }
        ,
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-name-field")
            }, n.createElement("div", {
                class: n.const("dcg-shared-profile-info-container")
            }, n.createElement("span", {
                class: n.const("dcg-shared-profile-info-title"),
                role: n.const("heading"),
                "aria-level": n.const("1")
            }, function() {
                return e.i18n.s("shared-label-name")
            }), n.createElement(s, {
                type: n.const("text"),
                name: n.const("name"),
                class: n.const("dcg-shared-input-blue-outline dcg-shared-profile-info-content"),
                didMount: this.bindFn(this.didMountName),
                onInput: this.bindFn(this.onNameInput),
                "aria-label": function() {
                    return e.i18n.s("shared-label-name")
                },
                value: function() {
                    return e.props.state().name
                },
                autocomplete: n.const("off")
            })), n.createElement("div", {
                class: n.const("dcg-shared-modal-actions-container")
            }, n.createElement(h, {
                showSavedNotice: this.props.showSavedNotice,
                i18n: this.props.controller
            }), n.createElement("div", {
                role: n.const("button"),
                "aria-disabled": this.bindFn(this.nameFieldDisabled),
                tabindex: function() {
                    return e.nameFieldDisabled() ? "-1" : "0"
                },
                class: function() {
                    return {
                        "dcg-shared-btn-blue": !0,
                        "dcg-disabled": e.nameFieldDisabled()
                    }
                },
                onTap: this.bindFn(this.onSaveName)
            }, function() {
                return e.i18n.s("shared-button-save")
            })))
        }
        ,
        o.prototype.onNameInput = function(e) {
            this.props.updateState({
                name: e
            })
        }
        ,
        o.prototype.didMountName = function(e) {
            this.props.wasModalOpenedWithKeyboard() && e.focus()
        }
        ,
        o.prototype.onSaveName = function() {
            this.nameFieldDisabled() || this.props.onSaveName()
        }
        ,
        o.prototype.nameFieldDisabled = function() {
            var e = this.props.state();
            return !e.name || e.name === e.previousName
        }
        ,
        o
    }(n.Class)
      , m = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller
        }
        ,
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-shared-name-field")
            }, n.createElement("div", {
                class: function() {
                    return {
                        "dcg-shared-confirm-name": e.props.state().confirm
                    }
                }
            }, n.createElement(r, {
                predicate: function() {
                    return e.props.state().confirm
                }
            }, function() {
                return n.createElement("span", null, function() {
                    return e.i18n.s("shared-message-please-review-name")
                })
            }), n.createElement("div", {
                class: n.const("dcg-shared-profile-info-container")
            }, n.createElement("div", {
                class: n.const("dcg-shared-name-input")
            }, n.createElement("span", {
                class: n.const("dcg-shared-profile-info-title"),
                role: n.const("heading"),
                "aria-level": n.const("1")
            }, function() {
                return e.i18n.s("shared-label-given-name-or-nickname")
            }), n.createElement(s, {
                type: n.const("text"),
                name: n.const("given-name"),
                class: n.const("dcg-shared-input-blue-outline dcg-shared-profile-info-content"),
                didMount: this.bindFn(this.didMountName),
                onInput: function(t) {
                    return e.props.updateState({
                        given: t
                    })
                },
                "aria-label": function() {
                    return e.i18n.s("shared-label-given-name-or-nickname")
                },
                value: function() {
                    return e.props.state().given
                },
                autocomplete: n.const("off")
            })), n.createElement("div", {
                class: n.const("dcg-shared-name-input")
            }, n.createElement("span", {
                class: n.const("dcg-shared-profile-info-title"),
                role: n.const("heading"),
                "aria-level": n.const("1")
            }, function() {
                return e.i18n.s("shared-label-family-name")
            }), n.createElement(s, {
                type: n.const("text"),
                name: n.const("family-name"),
                class: n.const("dcg-shared-input-blue-outline dcg-shared-profile-info-content"),
                onInput: function(t) {
                    return e.props.updateState({
                        family: t
                    })
                },
                "aria-label": function() {
                    return e.i18n.s("shared-label-family-name")
                },
                value: function() {
                    return e.props.state().family
                },
                autocomplete: n.const("off")
            }))), n.createElement("div", {
                class: n.const("dcg-shared-modal-actions-container")
            }, n.createElement(h, {
                i18n: this.props.controller,
                showSavedNotice: this.props.showSavedNotice
            }), n.createElement("div", {
                role: n.const("button"),
                "aria-disabled": function() {
                    return !e.canSubmit()
                },
                tabindex: function() {
                    return e.canSubmit() ? "0" : "-1"
                },
                class: function() {
                    return {
                        "dcg-shared-btn-blue": !0,
                        "dcg-disabled": !e.canSubmit()
                    }
                },
                onTap: this.bindFn(this.onSaveName)
            }, function() {
                return e.props.state().confirm ? e.i18n.s("shared-button-confirm-name") : e.i18n.s("shared-button-save")
            }))))
        }
        ,
        o.prototype.didMountName = function(e) {
            this.props.wasModalOpenedWithKeyboard() && e.focus()
        }
        ,
        o.prototype.onSaveName = function() {
            this.canSubmit() && this.props.onSaveName()
        }
        ,
        o.prototype.canSubmit = function() {
            var e = this.props.state();
            return !!e.given && (!!e.confirm || !(e.given === e.previousGiven && e.family === e.previousFamily))
        }
        ,
        o
    }(n.Class)
      , h = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement(r, {
                predicate: function() {
                    return e.props.showSavedNotice()
                }
            }, function() {
                return n.createElement("span", {
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true"),
                    class: n.const("dcg-shared-confirmation-message")
                }, n.createElement("i", {
                    class: function() {
                        return {
                            "dcg-shared-icon-check": !0,
                            "dcg-success-marker": !0
                        }
                    },
                    "aria-hidden": n.const("true")
                }), function() {
                    return e.props.i18n().s("shared-message-information-saved")
                })
            })
        }
        ,
        o
    }(n.Class)
});