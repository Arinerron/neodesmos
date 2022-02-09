
define('shared-components/shared-account-settings-modal', ["require", "exports", "tslib", "dcgview", "shared-components/modal", "./shared-profile-info", "./shared-change-password", "jquery", "underscore", "loadcss!./shared-account-settings-modal", "loadcss!shared-components/btn-styles"], function(require, t, e, n, i, s, o, r, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SharedAccountSettingsModal = t.CHANGE_PASS = t.PROFILE_INFO = void 0;
    var c = n.Components
      , l = c.For
      , d = c.Switch;
    t.PROFILE_INFO = "profile-info",
    t.CHANGE_PASS = "change-password";
    var u = function(c) {
        function u() {
            return null !== c && c.apply(this, arguments) || this
        }
        return e.__extends(u, c),
        u.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller,
            this.settingsView = this.props.initialTab && this.props.initialTab() || t.PROFILE_INFO,
            this.breakPoint = 660,
            this.measureWindow()
        }
        ,
        u.prototype.template = function() {
            var e = this;
            return n.createElement(i.Modal, {
                title: function() {
                    return e.i18n.s("shared-title-account-settings")
                },
                size: this.const("wide"),
                showX: this.const(!0),
                leftAlignTitle: this.const(!0),
                onClose: function() {
                    return e.controller.dispatch({
                        type: "close-modal"
                    })
                },
                i18n: this.props.controller
            }, n.createElement("div", {
                class: n.const("dcg-shared-account-settings-dialog dcg-shared-account-dialog")
            }, n.createElement(l, {
                each: function() {
                    return e.getTabs()
                },
                key: function(t) {
                    return "" + t.key
                }
            }, n.createElement("div", {
                class: n.const("dcg-shared-navigation-tabs"),
                role: n.const("tablist")
            }, function(t) {
                return n.createElement("div", {
                    role: n.const("tab"),
                    tabindex: n.const("0"),
                    "aria-selected": function() {
                        return e.settingsView === t.key
                    },
                    didMount: function(n) {
                        e.controller.wasModalOpenedWithKeyboard() && e.settingsView === t.key && n.focus()
                    },
                    class: function() {
                        var n;
                        return (n = {
                            "dcg-shared-tab-gray-underline": !0
                        })[t.class] = !0,
                        n["dcg-selected"] = e.settingsView === t.key,
                        n
                    },
                    onTap: function() {
                        return e.updateSettingsView(t.key)
                    }
                }, t.label)
            })), n.createElement("div", {
                class: n.const("dcg-shared-content-container")
            }, n.createElement(d, {
                key: function() {
                    return e.settingsView
                }
            }, function(i) {
                return i === t.PROFILE_INFO ? n.createElement(s.SharedProfileInfo, {
                    controller: e.props.controller
                }) : i === t.CHANGE_PASS ? n.createElement(o.SharedChangePassword, {
                    controller: e.props.controller
                }) : e.props.extraTabs ? n.createElement("div", {
                    class: n.const("dcg-shared-profile-info dcg-shared-account-settings-section")
                }, e.props.extraTabs().createView(i)) : n.createElement("span", null)
            }))))
        }
        ,
        u.prototype.getTabs = function() {
            var n = this
              , i = [{
                key: t.PROFILE_INFO,
                label: this.bindFn(this.profileTitle),
                class: "profile-view-button"
            }, {
                key: t.CHANGE_PASS,
                label: this.bindFn(this.passwordTitle),
                class: "change-password-view-button"
            }];
            return this.props.extraTabs ? e.__spreadArray(e.__spreadArray([], i), this.props.extraTabs().tabs.map(function(t) {
                var e = t.key
                  , i = t.narrowLabel
                  , s = t.wideLabel;
                return {
                    key: e,
                    label: function() {
                        return n.windowWidth > n.breakPoint ? i() : s()
                    },
                    class: t.class + "-button"
                }
            })) : i
        }
        ,
        u.prototype.updateSettingsView = function(t) {
            this.settingsView = t,
            this.unmounted || this.update()
        }
        ,
        u.prototype.profileTitle = function() {
            return this.windowWidth > this.breakPoint ? this.i18n.s("shared-title-profile-information-wide") : this.i18n.s("shared-title-profile-information-narrow")
        }
        ,
        u.prototype.passwordTitle = function() {
            return this.windowWidth > this.breakPoint ? this.i18n.s("shared-title-change-password-wide") : this.i18n.s("shared-title-change-password-narrow")
        }
        ,
        u.prototype.measureWindow = function() {
            return this.windowWidth = r(window).width()
        }
        ,
        u.prototype.didMount = function() {
            var t = this;
            r(window).on("resize.account-dialog", a.throttle(function() {
                t.measureWindow(),
                t.unmounted || t.update()
            }, 200))
        }
        ,
        u.prototype.didUnmount = function() {
            r(window).off("resize.account-dialog"),
            this.unmounted = !0
        }
        ,
        u.prototype.isProfileSelected = function() {
            return this.settingsView === t.PROFILE_INFO
        }
        ,
        u.prototype.isChangePasswordSelected = function() {
            return this.settingsView === t.CHANGE_PASS
        }
        ,
        u
    }(n.Class);
    t.SharedAccountSettingsModal = u
});