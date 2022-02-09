define('calculator-shell/save-dialog', ["require", "exports", "tslib", "dcgview", "./modal", "jquery"], function(require, t, e, n, l, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SaveDialog = void 0;
    var o = n.Components
      , a = o.Input
      , i = o.Checkbox
      , c = o.If
      , s = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController,
            this.lastSavedTitle = this.graphsController.getCurrentGraphTitle(),
            "duplicate" === this.controller.getOpenModal() ? this.newSaveTitle = this.controller.s("account-shell-text-copy-of-title", {
                originalTitle: this.lastSavedTitle
            }) : this.newSaveTitle = this.lastSavedTitle || this.graphsController.getUntitledString(),
            null == this.controller.state.saveDialog && (this.controller.state.saveDialog = {
                copyOnSave: !0
            })
        }
        ,
        o.prototype.template = function() {
            var t = this;
            return n.createElement(l.Modal, {
                controller: this.props.controller
            }, n.createElement("div", {
                id: n.const("save-dialog")
            }, n.createElement("h1", null, function() {
                return t.getTitle()
            }), n.createElement("div", {
                class: n.const("dcg-clear")
            }), n.createElement("form", {
                didMount: this.didMountForm.bind(this)
            }, n.createElement("label", {
                class: n.const("input-label")
            }, n.createElement("div", {
                class: n.const("graph-title-title")
            }, function() {
                return t.controller.s("account-shell-label-graph-title")
            }, n.const(" ")), n.createElement(a, {
                class: n.const("title-input dcg-shared-input-blue-outline"),
                name: n.const("title"),
                placeholder: function() {
                    return t.graphsController.getUntitledString()
                },
                value: function() {
                    return t.newSaveTitle
                },
                maxlength: n.const("140"),
                onInput: function(e) {
                    return t.newSaveTitle = e
                },
                didMount: function(t) {
                    return r(t).trigger("focus").trigger("select")
                }
            })), n.createElement("div", null, n.createElement("button", {
                type: n.const("submit"),
                class: n.const("dcg-btn dcg-btn-green pull-right dcg-action-save")
            }, function() {
                return t.controller.s("account-shell-button-save")
            }), n.createElement(c, {
                predicate: function() {
                    return t.shouldShowDuplicateOption() && t.graphsController.wasCurrentGraphEverSaved()
                }
            }, function() {
                return n.createElement("label", {
                    class: n.const("dcg-new-copy pull-right")
                }, n.createElement(i, {
                    checked: function() {
                        return t.controller.state.saveDialog.copyOnSave
                    },
                    onChange: function(e) {
                        if (t.controller.state.saveDialog.copyOnSave = e,
                        !t.unmounted)
                            return t.update()
                    }
                }), n.createElement("span", {
                    class: n.const("duplicate-label")
                }, function() {
                    return t.getDuplicateLabel()
                }))
            })))))
        }
        ,
        o.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        o.prototype.didMountForm = function(t) {
            var e = this;
            r(t).on("submit", function(t) {
                var n;
                t.preventDefault(),
                "" === e.newSaveTitle && (e.newSaveTitle = "Untitled Graph"),
                n = e.shouldShowDuplicateOption() ? e.controller.state.saveDialog.copyOnSave : "rename" !== e.controller.getOpenModal(),
                e.controller.dispatch({
                    type: "save-graph",
                    payload: {
                        title: e.newSaveTitle,
                        saveAs: n
                    },
                    device: "mouse"
                })
            })
        }
        ,
        o.prototype.getTitle = function() {
            if ("geometry" === this.controller.product)
                return this.controller.s("account-shell-heading-save-construction");
            switch (this.controller.getOpenModal()) {
            case "rename":
                return this.controller.s("account-shell-heading-rename-graph");
            case "save":
                return this.controller.s("account-shell-heading-save-graph");
            case "duplicate":
                return this.controller.s("account-shell-heading-duplicate-graph");
            default:
                return ""
            }
        }
        ,
        o.prototype.getDuplicateLabel = function() {
            return "geometry" === this.controller.product ? this.controller.s("account-shell-heading-duplicate-construction") : this.controller.s("account-shell-heading-duplicate-graph")
        }
        ,
        o.prototype.shouldShowDuplicateOption = function() {
            if ("geometry" === this.controller.product)
                return !0;
            var t = this.controller.getModalState();
            return !("save" !== t.modal || !t.fromSaveInProgress)
        }
        ,
        o
    }(n.Class);
    t.SaveDialog = s
});