define('expressions/abstract-item-view', ["require", "exports", "tslib", "jquery", "dcgview", "jquery.handleevent"], function(require, t, e, i, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            this._isFirstRender = !0,
            this._isDragCopy = this.props.isDragCopy()
        }
        ,
        o.prototype.onItemViewMounted = function() {
            this._isDragCopy || (this.model.dcgView = this),
            this._isFirstRender = !1
        }
        ,
        o.prototype.onItemViewUnmounted = function() {
            this._isDragCopy || (this.model.dcgView = void 0)
        }
        ,
        o.prototype.isFirstRender = function() {
            return this._isFirstRender
        }
        ,
        o.prototype.onMouseSelect = function(t) {
            !this.controller.isInEditListMode() || function(t) {
                var e = i(t.target);
                return e.hasClass("dcg-exp-action-button") || e.hasClass("dcg-icon-duplicate") || e.hasClass("dcg-icon-remove")
            }(t) ? "dcg-tap" === t.type && "mouse" === t.device || "dcg-tapstart" === t.type && "touch" === t.device || t.wasHandled() || (t.handle(),
            this.controller.dispatch({
                type: "set-selected-id",
                id: this.id
            })) : this.exitEditListMode()
        }
        ,
        o.prototype.onDelete = function() {
            this.controller.dispatch({
                type: "delete-item-and-animate-out",
                id: this.id,
                setFocusAfterDelete: !this.controller.isInEditListMode()
            })
        }
        ,
        o.prototype.onDragPending = function(t) {
            this.props.onDragPending(t)
        }
        ,
        o.prototype.exitEditListMode = function() {
            this.controller.dispatch({
                type: "set-edit-list-mode",
                isEditListMode: !1,
                focusExpressionList: !0
            })
        }
        ,
        o
    }(o.Class);
    t.default = s
});
