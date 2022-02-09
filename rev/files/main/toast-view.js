define('main/toast-view', ["require", "exports", "tslib", "dcgview", "loadcss!./toast-view"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ToastView = void 0;
    var r = n.Components.If
      , o = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement("span", {
                class: n.const("dcg-toast")
            }, n.createElement("i", {
                class: n.const("dcg-icon-error")
            }), n.createElement(r, {
                predicate: function() {
                    return !e.props.showUndo() && (!e.props.showClose || e.props.showClose())
                }
            }, function() {
                return n.createElement("i", {
                    class: n.const("dcg-icon-remove"),
                    onTap: function() {
                        return e.props.onClose && e.props.onClose()
                    },
                    role: n.const("link"),
                    tabindex: n.const(0),
                    "aria-label": n.const("Dismiss Notice")
                })
            }), n.createElement("span", {
                class: n.const("dcg-msg"),
                "aria-atomic": function() {
                    return !e.props.noAria()
                },
                "aria-live": function() {
                    return e.props.noAria() ? "" : "assertive"
                }
            }, function() {
                return e.props.message()
            }), n.createElement(r, {
                predicate: this.props.showUndo
            }, function() {
                return n.createElement("a", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: n.const("dcg-undo"),
                    onTap: function() {
                        return e.props.onUndo && e.props.onUndo()
                    }
                }, function() {
                    return e.props.s("shared-calculator-label-toast-undo")
                })
            }), n.createElement(r, {
                predicate: this.props.showLearnMore
            }, function() {
                return n.createElement("a", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: n.const("dcg-learn-more-link"),
                    target: n.const("_blank"),
                    onTap: function() {
                        return e.props.onLearnMore && e.props.onLearnMore()
                    }
                }, function() {
                    return e.props.s("shared-calculator-label-toast-learn-more")
                })
            }), n.createElement(r, {
                predicate: function() {
                    return !!e.props.link && !!e.props.link()
                }
            }, function() {
                return n.createElement("a", {
                    role: n.const("link"),
                    tabindex: n.const(0),
                    class: n.const("dcg-learn-more-link"),
                    target: n.const("_blank"),
                    href: function() {
                        return e.props.link().url
                    }
                }, function() {
                    return e.props.link().text
                })
            }))
        }
        ,
        o.prototype.shouldUpdate = function() {
            return !!this.props.message()
        }
        ,
        o
    }(n.Class)
      , s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "dcg-toast-view": !0,
                        "dcg-visible": !!e.props.message()
                    }
                },
                "toast-style": function() {
                    return e.props.toastStyle && e.props.toastStyle()
                }
            }, n.createElement(r, {
                predicate: function() {
                    return !!e.props.message()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-toast-wrapper")
                }, n.createElement("div", {
                    class: n.const("dcg-toast-cover")
                }), n.createElement(o, t.__assign({}, e.props)))
            }))
        }
        ,
        s
    }(n.Class);
    e.ToastView = s
});