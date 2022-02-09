
define('shared-components/modal', ["require", "exports", "tslib", "dcgview", "jquery", "keys", "lib/evt-delegator", "lib/restrict-focus", "./tooltip", "loadcss!./modal", "loadcss!./dcg-shared-icons"], function(require, e, t, s, o, n, r, i, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Modal = void 0;
    var l = s.Components.If
      , a = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.init = function() {
            this.i18n = this.props.i18n(),
            this.isMounted = !1
        }
        ,
        a.prototype.template = function() {
            var e = this;
            return s.createElement("div", {
                class: function() {
                    var t;
                    return (t = {
                        "dcg-shared-modal-container": !0
                    })[e.props.class ? e.props.class() : ""] = !!e.props.class,
                    t
                },
                didMount: this.bindFn(this.didMount),
                didUnmount: this.bindFn(this.didUnmount)
            }, s.createElement("div", {
                class: function() {
                    return {
                        "dcg-shared-modal-cover": !0,
                        "dcg-shared-has-close-button": e.showX(),
                        "dcg-shared-modal-fullscreen": "fullscreen" === e.props.size(),
                        "dcg-shared-modal-wide": "wide" === e.props.size(),
                        "dcg-shared-modal-medium": "medium" === e.props.size(),
                        "dcg-shared-modal-narrow": "narrow" === e.props.size()
                    }
                }
            }, s.createElement("div", {
                class: s.const("dcg-shared-modal-background"),
                onTap: this.props.onClose
            }), s.createElement("div", {
                class: s.const("dcg-shared-modal-transition-container")
            }, s.createElement("div", {
                class: s.const("dcg-shared-modal"),
                role: s.const("dialog"),
                "aria-label": function() {
                    var t = "";
                    return e.props.ariaLabel ? t = e.props.ariaLabel() : e.props.title && (t = e.props.title()),
                    t
                }
            }, s.createElement(l, {
                predicate: function() {
                    return e.showX()
                }
            }, function() {
                return s.createElement("div", {
                    class: s.const("dcg-shared-close-cross-container")
                }, s.createElement(c.Tooltip, {
                    tooltip: function() {
                        return e.i18n.s("shared-button-close-dialog")
                    }
                }, s.createElement("div", {
                    role: s.const("link"),
                    tabindex: s.const("0"),
                    "aria-label": function() {
                        return e.i18n.s("shared-button-close-dialog")
                    },
                    class: s.const("dcg-shared-close-cross"),
                    onTap: e.props.onClose
                }, s.createElement("i", {
                    class: s.const("dcg-shared-icon-remove"),
                    "aria-hidden": s.const("true")
                }))))
            }), s.createElement("div", {
                class: s.const("dcg-shared-modal-contents-wrapper")
            }, s.createElement(l, {
                predicate: function() {
                    return !!e.props.title && !!e.props.title()
                }
            }, function() {
                return s.createElement("h1", {
                    class: function() {
                        return {
                            "dcg-shared-modal-title": !0,
                            "dcg-shared-left-align-title": e.leftAlignTitle()
                        }
                    }
                }, function() {
                    return e.props.title()
                })
            }), s.createElement("div", {
                class: s.const("dcg-shared-modal-scrollable-content")
            }, this.children))))))
        }
        ,
        a.prototype.showX = function() {
            return !!this.props.showX && this.props.showX()
        }
        ,
        a.prototype.leftAlignTitle = function() {
            return !!this.props.leftAlignTitle && this.props.leftAlignTitle()
        }
        ,
        a.prototype.didMount = function() {
            var e = this;
            if (!this.isMounted) {
                this.isMounted = !0;
                var t = i.createRestrictFocusHandler(".dcg-shared-modal-container:visible");
                this.unsub = r.Delegator.push(function(s, o) {
                    n.lookup(s) == n.ESCAPE && (e.onClose(),
                    o()),
                    t(s)
                })
            }
        }
        ,
        a.prototype.didUpdate = function() {
            !this.handledCloseFocus && this.showX() && this.props.focusCloseLink && this.props.focusCloseLink() && o(".dcg-shared-modal-container:visible").find(".dcg-shared-close-cross").trigger("focus"),
            this.handledCloseFocus = !0
        }
        ,
        a.prototype.onClose = function() {
            this.props.onClose && this.props.onClose()
        }
        ,
        a.prototype.didUnmount = function() {
            this.isMounted && (this.isMounted = !1,
            this.unsub())
        }
        ,
        a
    }(s.Class);
    e.Modal = a
});