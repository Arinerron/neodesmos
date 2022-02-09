
define('shared-components/shared-options-dropdown', ["require", "exports", "tslib", "lib/i18n", "dcgview", "./shared-dropdown-popover", "loadcss!./shared-options-dropdown"], function(require, n, t, e, o, r) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.OptionsDropdown = n.OptionsDropdownList = void 0;
    var i = o.Components
      , s = i.For
      , c = i.If
      , a = i.IfDefined
      , p = i.Switch
      , l = function(n) {
        function r() {
            return null !== n && n.apply(this, arguments) || this
        }
        return t.__extends(r, n),
        r.prototype.template = function() {
            var n = this;
            return o.createElement(s, {
                each: this.props.options,
                key: function(n) {
                    return (n.key ? n.key : n.title()) + (n.disabled ? "-disabled" : "")
                }
            }, o.createElement("div", {
                role: o.const("list"),
                class: function() {
                    var t;
                    return (t = {
                        "dcg-shared-options-dropdown": !0
                    })[void 0 === n.props.class ? "" : n.props.class()] = void 0 !== n.props.class,
                    t
                }
            }, function(t) {
                return o.createElement("div", {
                    role: o.const("listitem"),
                    class: o.const("dropdown-option-container")
                }, o.createElement(p, {
                    key: function() {
                        return t
                    }
                }, function(t) {
                    return "href"in t ? o.createElement("a", {
                        "aria-disabled": function() {
                            return t.disabled
                        },
                        class: function() {
                            var n;
                            return (n = {})[t.class || ""] = !!t.class,
                            n["dropdown-choice"] = !0,
                            n["dropdown-choice-disabled"] = t.disabled,
                            n
                        },
                        onTap: function() {
                            return !t.disabled && n.props.onTap(t)
                        },
                        href: function() {
                            return t.href
                        },
                        target: function() {
                            return void 0 !== t.target ? t.target : ""
                        },
                        rel: function() {
                            return t.noreferrer ? "noreferrer noopener" : ""
                        }
                    }, o.createElement(c, {
                        predicate: function() {
                            return null != t.icon
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("option-icon-container")
                        }, o.createElement("i", {
                            "aria-hidden": o.const("true"),
                            class: function() {
                                return t.icon + " option-icon"
                            }
                        }))
                    }), t.title) : o.createElement("div", {
                        role: o.const("link"),
                        tabindex: o.const(0),
                        "aria-disabled": function() {
                            return t.disabled
                        },
                        class: function() {
                            var n;
                            return (n = {})[t.class || ""] = !!t.class,
                            n["dropdown-choice"] = !0,
                            n["dropdown-choice-disabled"] = t.disabled,
                            n
                        },
                        onTap: function() {
                            return !t.disabled && n.props.onTap(t)
                        }
                    }, o.createElement(c, {
                        predicate: function() {
                            return null != t.icon
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("option-icon-container")
                        }, o.createElement("i", {
                            "aria-hidden": o.const("true"),
                            class: function() {
                                return t.icon + " option-icon"
                            }
                        }))
                    }), o.createElement("span", {
                        class: o.const("option-title")
                    }, t.title), a(function() {
                        return t.subtitle && t.subtitle()
                    }, function(n) {
                        return o.createElement("span", {
                            class: o.const("option-subtitle")
                        }, n)
                    }))
                }), o.createElement(c, {
                    predicate: function() {
                        return !!t.explanations
                    }
                }, function() {
                    return o.createElement(s, {
                        each: function() {
                            return t.explanations || []
                        },
                        key: function(n) {
                            return n.flag
                        }
                    }, o.createElement("div", {
                        class: o.const("dropdown-explanations")
                    }, function(n) {
                        return o.createElement("div", {
                            class: o.const("explanation")
                        }, function() {
                            return n.explanation
                        }, o.const(" "), o.createElement(c, {
                            predicate: function() {
                                return !!n.link
                            }
                        }, function() {
                            return o.createElement("a", {
                                class: o.const("learn-more"),
                                href: function() {
                                    return void 0 !== n.link ? n.link : ""
                                },
                                target: o.const("_blank")
                            }, function() {
                                return n.linkText ? n.linkText : e.s("shared-button-learn-more-capitalized")
                            })
                        }))
                    }))
                }))
            }))
        }
        ,
        r
    }(o.Class);
    n.OptionsDropdownList = l;
    var d = function(n) {
        function e() {
            return null !== n && n.apply(this, arguments) || this
        }
        return t.__extends(e, n),
        e.prototype.init = function() {
            this.showDropdown = !1
        }
        ,
        e.prototype.template = function() {
            var n = this;
            return o.createElement(r.DropdownPopover, {
                dropdownDidMount: this.props.dropdownDidMount,
                anchor: this.props.anchor,
                class: this.props.class,
                controlled: this.props.controlled || function() {
                    return {
                        isOpen: n.showDropdown,
                        setDropdownOpen: n.bindFn(n.setDropdownOpen)
                    }
                }
                ,
                title: this.props.title,
                disabled: this.props.disabled
            }, function() {
                return o.createElement(l, t.__assign({}, n.props, {
                    onTap: n.bindFn(n.tapOption)
                }))
            })
        }
        ,
        e.prototype.tapOption = function(n) {
            var t = this;
            void 0 !== n.action && n.action(),
            n.preventClose || ("href"in n ? n.isDeepLink && setTimeout(function() {
                return t.setDropdownOpen(!1)
            }, 0) : this.setDropdownOpen(!1))
        }
        ,
        e.prototype.setDropdownOpen = function(n) {
            this.props.controlled ? this.props.controlled().setDropdownOpen(n) : (this.showDropdown = n,
            this.update())
        }
        ,
        e
    }(o.Class);
    n.OptionsDropdown = d
});
