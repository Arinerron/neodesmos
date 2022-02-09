
define('mygraphs/syncing-status-bar', ["require", "exports", "tslib", "dcgview", "loadcss!./syncing-status-bar"], function(require, t, e, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SyncingStatusBar = void 0;
    var s = n.Components.If
      , r = function(t) {
        function r() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(r, t),
        r.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "syncing-status-bar": !0,
                        visible: t.props.isSyncingGraphs() || t.props.didSyncFail()
                    }
                }
            }, n.createElement(s, {
                predicate: this.props.isSyncingGraphs
            }, function() {
                return n.createElement("div", {
                    class: n.const("syncing-status-text")
                }, n.createElement("span", {
                    class: n.const("dcg-pulse")
                }, function() {
                    return t.props.s("account-shell-text-mygraphs-updating-graphs")
                }))
            }), n.createElement(s, {
                predicate: function() {
                    return !t.props.isSyncingGraphs() && !t.props.didSyncFail()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("success-status-text")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-check")
                }), n.const(" "), function() {
                    return t.props.s("account-shell-text-mygraphs-synced")
                })
            }), n.createElement(s, {
                predicate: this.props.didSyncFail
            }, function() {
                return n.createElement("div", {
                    class: n.const("error-status-text"),
                    onTap: t.props.requestSyncGraphs
                }, function() {
                    return t.props.s("account-shell-button-mygraphs-offline-try-again")
                })
            }))
        }
        ,
        r
    }(n.Class);
    t.SyncingStatusBar = r
});
