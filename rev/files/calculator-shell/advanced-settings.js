define('calculator-shell/advanced-settings', ["require", "exports", "tslib", "dcgview", "../shared-components/shared-checkbox", "../shared-components/shared-account-modal-errors", "bugsnag", "underscore", "loadcss!./advanced-settings"], function(require, e, t, r, n, o, s, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.AdvancedSettings = void 0;
    var c = r.Components
      , i = c.IfDefined
      , l = c.For
      , u = {
        "dcg-actions": {
            label: "account-shell-label-feature-flag-actions",
            description: "account-shell-text-feature-flag-actions-description",
            learnMoreLink: "https://help.desmos.com/hc/en-us/articles/4407725009165"
        }
    }
      , d = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.formErrors = []
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: r.const("dcg-advanced-settings")
            }, r.createElement("div", {
                class: r.const("dcg-shared-account-paragraph")
            }, function() {
                return e.props.controller().s("account-shell-text-advanced-preferences-instructions")
            }), r.createElement(l, {
                each: function() {
                    return a.keys(u)
                }
            }, r.createElement("div", {
                class: r.const("dcg-feature-flag-list")
            }, function(t) {
                return r.createElement("div", null, r.createElement(n.SharedCheckbox, {
                    ariaLabel: function() {
                        return e.label(t)
                    },
                    checked: function() {
                        return e.isFeatureFlagEnabled(t)
                    },
                    disabled: function() {
                        return !!e.updateInFlight
                    },
                    onChange: function(r) {
                        return e.toggleFeatureFlag(t, r)
                    }
                }, r.createElement("span", {
                    class: r.const("dcg-feature-flag-label")
                }, function() {
                    return e.label(t)
                })), r.createElement("div", {
                    class: r.const("dcg-feature-flag-description")
                }, function() {
                    return e.description(t)
                }, r.const(" "), r.createElement("a", {
                    href: function() {
                        return e.learnMoreLink(t)
                    },
                    class: r.const("dcg-shared-blue-link"),
                    target: r.const("_blank")
                }, function() {
                    return e.props.controller().s("graphing-calculator-link-learn-more")
                })))
            })), r.createElement(o.SharedAccountModalErrors, {
                controller: this.props.controller,
                errors: function() {
                    return e.formErrors
                }
            }), i(this.bindFn(this.getSaveProgress), function(t) {
                return r.createElement("span", {
                    "aria-live": r.const("assertive"),
                    "aria-atomic": r.const("true"),
                    class: r.const("dcg-shared-confirmation-message")
                }, r.createElement("i", {
                    class: function() {
                        return {
                            "dcg-shared-icon-check": !0,
                            "dcg-success-marker": !0,
                            "dcg-saving": "saving" === t()
                        }
                    },
                    "aria-hidden": r.const("true")
                }), function() {
                    return "saving" === t() ? e.props.controller().s("shared-calculator-label-saving") : e.props.controller().s("shared-message-information-saved")
                })
            }))
        }
        ,
        c.prototype.getSaveProgress = function() {
            return this.updateInFlight ? "saving" : this.showSuccessConfirmation ? "saved" : void 0
        }
        ,
        c.prototype.isFeatureFlagEnabled = function(e) {
            return this.updateInFlight && e in this.updateInFlight ? this.updateInFlight[e] : -1 !== this.props.controller().userController.getFeatureFlags().indexOf(e)
        }
        ,
        c.prototype.toggleFeatureFlag = function(e, t) {
            var r, n = this;
            this.updateInFlight = ((r = {})[e] = t,
            r),
            this.props.controller().dispatch({
                type: "render"
            }),
            this.props.controller().userController.updateFeatureFlags({
                featureFlagsUpdate: this.updateInFlight,
                lang: this.props.controller().getLanguage()
            }).then(function() {
                n.showSuccessConfirmation = !0,
                setTimeout(function() {
                    n.showSuccessConfirmation = !1,
                    n.props.controller().dispatch({
                        type: "render"
                    })
                }, 3e3)
            }).fail(function(e) {
                s.notify(e),
                n.formErrors = [n.props.controller().s("account-shell-error-unknown")]
            }).always(function() {
                n.updateInFlight = void 0,
                n.props.controller().dispatch({
                    type: "render"
                })
            })
        }
        ,
        c.prototype.learnMoreLink = function(e) {
            return u[e].learnMoreLink
        }
        ,
        c.prototype.label = function(e) {
            return this.props.controller().s(u[e].label)
        }
        ,
        c.prototype.description = function(e) {
            return this.props.controller().s(u[e].description)
        }
        ,
        c
    }(r.Class);
    e.AdvancedSettings = d
});
