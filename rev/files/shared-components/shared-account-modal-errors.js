define('shared-components/shared-account-modal-errors', ["require", "exports", "tslib", "dcgview", "loadcss!./shared-account-modal-errors"], function(require, e, r, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.SharedAccountModalErrors = void 0;
    var n = t.Components
      , o = n.If
      , c = n.For
      , s = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(n, e),
        n.prototype.init = function() {
            this.controller = this.props.controller(),
            this.i18n = this.controller
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return t.createElement(o, {
                predicate: function() {
                    return !!e.props.errors().length
                }
            }, function() {
                return t.createElement(c, {
                    each: e.props.errors
                }, t.createElement("span", null, function(r) {
                    return t.createElement("div", {
                        class: t.const("dcg-shared-account-modal-errors"),
                        role: t.const("alert")
                    }, t.createElement("span", null, function() {
                        return e.i18n.raw(r)
                    }))
                }))
            })
        }
        ,
        n
    }(t.Class);
    e.SharedAccountModalErrors = s
});
