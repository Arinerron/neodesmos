define('calculator-shell/save-button', ["require", "exports", "tslib", "dcgview", "browser", "../shared-components/tooltip"], function(require, e, t, n, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SaveButton = void 0;
    var s = n.Components.IfElse
      , l = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(l, e),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController
        }
        ,
        l.prototype.template = function() {
            var e = this;
            return s(function() {
                return e.graphsController.isSaving()
            }, {
                true: function() {
                    return n.createElement("span", {
                        class: n.const("dcg-if-user save-btn-container")
                    }, n.createElement("span", {
                        class: n.const("saving-notice")
                    }, n.createElement("span", {
                        class: n.const("dcg-spinner-dark")
                    })))
                },
                false: function() {
                    return n.createElement("span", {
                        class: function() {
                            return {
                                "dcg-if-user save-btn-container": !0
                            }
                        }
                    }, n.createElement(r.Tooltip, {
                        tooltip: function() {
                            return e.controller.isSaveEnabled() ? e.saveChangesText() : e.controller.s("account-shell-label-no-unsaved-changes")
                        },
                        offset: function() {
                            return {
                                top: 7
                            }
                        }
                    }, n.createElement("span", {
                        role: n.const("button"),
                        class: function() {
                            return {
                                "dcg-action-save": !0,
                                "tooltip-offset": !0,
                                "dcg-btn-green": e.controller.isSaveEnabled(),
                                "dcg-disabled": !e.controller.isSaveEnabled()
                            }
                        },
                        onTap: function(t) {
                            e.controller.isSaveEnabled() && e.controller.simpleSave(t.device)
                        }
                    }, function() {
                        return e.controller.s("account-shell-button-save")
                    })))
                }
            })
        }
        ,
        l.prototype.saveChangesText = function() {
            return o.IS_APPLE ? this.controller.s("account-shell-label-save-changes-mac") : this.controller.s("account-shell-label-save-changes-pc")
        }
        ,
        l
    }(n.Class);
    e.SaveButton = l
});