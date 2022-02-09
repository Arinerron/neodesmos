define('mygraphs/load-graph-view', ["require", "exports", "tslib", "dcgview", "loadcss!./load-graph-view"], function(require, t, e, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.LoadGraphView = void 0;
    var r = n.Components.If
      , a = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(a, t),
        a.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-loading-container")
            }, n.createElement(r, {
                predicate: function() {
                    return !t.props.didDataLoadFail()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-graph-loading")
                }, n.createElement("div", {
                    class: n.const("pulsing-message")
                }, function() {
                    return t.props.s("account-shell-text-mygraphs-loading")
                }), n.createElement("div", {
                    role: n.const("link"),
                    tabindex: n.const("0"),
                    class: n.const("cancel-while-loading"),
                    onTap: t.props.onCancel
                }, function() {
                    return t.props.s("account-shell-button-mygraphs-cancel")
                }))
            }), n.createElement(r, {
                predicate: function() {
                    return t.props.didDataLoadFail()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-graph-loading-error"),
                    "aria-live": n.const("assertive"),
                    "aria-atomic": n.const("true")
                }, n.createElement("div", {
                    class: n.const("dcg-graph-loading-error-title")
                }, function() {
                    return t.props.s("account-shell-error-mygraphs-error-loading")
                }), n.createElement("div", {
                    class: n.const("dcg-graph-loading-error-subtitle")
                }, function() {
                    return t.props.s("account-shell-error-mygraphs-check-connection")
                }), n.createElement("div", {
                    class: n.const("dcg-graph-loading-error-options")
                }, n.createElement("span", {
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    class: n.const("dcg-action-try-again dcg-btn-blue dcg-btn-medium"),
                    onTap: t.props.requestLoadGraphData
                }, function() {
                    return t.props.s("account-shell-button-mygraphs-try-again")
                }), function() {
                    return t.props.s("account-shell-text-mygraphs-or")
                }, n.createElement("span", {
                    role: n.const("button"),
                    tabindex: n.const("0"),
                    class: n.const("dcg-action-cancel dcg-btn-light-gray dcg-btn-medium"),
                    onTap: t.props.onCancel
                }, function() {
                    return t.props.s("account-shell-button-mygraphs-cancel")
                })))
            }))
        }
        ,
        a
    }(n.Class);
    t.LoadGraphView = a
});
