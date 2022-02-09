define('mygraphs/graph-in-progress', ["require", "exports", "tslib", "dcgview", "./save-btn", "loadcss!./item"], function(require, e, s, t, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.GraphInProgress = void 0;
    var n = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return s.__extends(n, e),
        n.prototype.template = function() {
            var e = this;
            return t.createElement("div", {
                class: t.const("graph-link-container graph-in-progress")
            }, t.createElement("div", {
                role: t.const("link"),
                "aria-label": function() {
                    return e.props.s("account-shell-button-mygraphs-save")
                },
                class: t.const("graph-link dcg-action-preview-graph"),
                onTap: this.props.openSaveDialog
            }, t.createElement("span", {
                class: t.const("dcg-thumb"),
                style: function() {
                    return {
                        "background-image": "url(" + e.props.getThumbnail() + ")"
                    }
                }
            }), t.createElement("div", {
                class: t.const("dcg-graph-details")
            }, t.createElement("div", {
                class: t.const("dcg-title")
            }, this.props.getTitle), t.createElement("div", {
                class: t.const("dcg-subtitle dcg-save-status")
            }, function() {
                return e.props.isSaveEnabled() ? e.props.wasCurrentGraphEverSaved() ? e.props.s("account-shell-label-mygraphs-last-saved", {
                    date: e.props.getDisplayDate()
                }) : e.props.s("account-shell-label-mygraphs-unsaved-graph") : e.props.s("account-shell-label-mygraphs-no-unsaved-changes")
            })), t.createElement(a.SaveBtn, {
                enabled: this.props.isSaveEnabled,
                isSaving: this.props.isSaving,
                didSaveRecentlySucceed: this.props.didSaveRecentlySucceed,
                didSaveRecentlyFail: this.props.didSaveRecentlyFail,
                onTap: function() {},
                s: this.props.s
            })))
        }
        ,
        n.prototype.shouldUpdate = function() {
            return this.props.isOpen()
        }
        ,
        n
    }(t.Class);
    e.GraphInProgress = n
});
