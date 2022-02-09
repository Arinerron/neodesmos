
define('mygraphs/save-btn', ["require", "exports", "tslib", "dcgview", "loadcss!./save-btn"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SaveBtn = void 0;
    var s = n.Components.If
      , r = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.shouldShowSaveButton = function() {
            return !this.props.isSaving() && !this.props.didSaveRecentlySucceed() && !this.props.didSaveRecentlyFail()
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("save-btn-container")
            }, n.createElement(s, {
                predicate: function() {
                    return e.shouldShowSaveButton()
                }
            }, function() {
                return n.createElement("div", {
                    role: n.const("button"),
                    onTap: e.props.onTap,
                    class: function() {
                        return {
                            "dcg-action-save": !0,
                            "dcg-btn-green": e.props.enabled(),
                            "dcg-disabled": !e.props.enabled()
                        }
                    },
                    "aria-disabled": function() {
                        return !e.props.enabled()
                    },
                    tabindex: function() {
                        return e.props.enabled() ? 0 : -1
                    }
                }, function() {
                    return e.props.s("account-shell-button-mygraphs-save")
                })
            }), n.createElement(s, {
                predicate: this.props.isSaving
            }, function() {
                return n.createElement("div", {
                    class: n.const("save-saving")
                }, n.createElement("span", {
                    class: n.const("dcg-spinner-dark")
                }))
            }), n.createElement(s, {
                predicate: this.props.didSaveRecentlyFail
            }, function() {
                return n.createElement("div", {
                    class: n.const("save-error"),
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-remove")
                }), n.const(" "), function() {
                    return e.props.s("account-shell-text-error")
                })
            }), n.createElement(s, {
                predicate: this.props.didSaveRecentlySucceed
            }, function() {
                return n.createElement("div", {
                    class: n.const("save-success")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-check")
                }), n.const(" "), function() {
                    return e.props.s("account-shell-text-saved")
                })
            }))
        }
        ,
        r
    }(n.Class);
    e.SaveBtn = r
});