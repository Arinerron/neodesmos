define('calculator-shell/export-image-size-options', ["require", "exports", "tslib", "dcgview", "jquery", "./export-image-dialog", "loadcss!./export-image-size-options"], function(require, e, t, n, o, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n.Components.If
      , r = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-pressed": function() {
                    return e.isSelected()
                },
                class: function() {
                    return {
                        "dcg-option": !0,
                        "dcg-selected": e.isSelected()
                    }
                },
                onTap: function() {
                    return e.selectSize()
                }
            }, function() {
                return s.sizes[e.props.size()].name(e.props.controller())
            })
        }
        ,
        o.prototype.isSelected = function() {
            this.props.selectedSize(),
            this.props.size()
        }
        ,
        o.prototype.selectSize = function() {
            this.props.onSelectSize(this.props.size())
        }
        ,
        o
    }(n.Class)
      , c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.menuOpen = !1,
            this.unmounted = !1
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-export-image-size-options")
            }, n.createElement("div", {
                role: n.const("button"),
                tabindex: n.const("0"),
                "aria-haspopup": n.const("true"),
                "aria-expanded": function() {
                    return e.menuOpen
                },
                class: n.const("dcg-selected-option"),
                didMount: function(t) {
                    e.menuElement = t,
                    "keyboard" === e.props.controller().getModalDevice() && setTimeout(function() {
                        e.menuElement.focus()
                    }, 0)
                },
                onTap: this.bindFn(this.toggleMenu)
            }, function() {
                return e.selected().name(e.props.controller())
            }, n.createElement("i", {
                class: n.const("dcg-icon-caret-down")
            })), n.createElement(i, {
                predicate: function() {
                    return e.menuOpen
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-options-positioning-container")
                }, n.createElement("div", {
                    class: n.const("dcg-options-container"),
                    role: n.const("group"),
                    "aria-label": function() {
                        return e.props.controller().s("account-shell-narration-size-options")
                    }
                }, n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("small_square"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("medium_square"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("large_square"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("medium_rectangle"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("large_rectangle"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement("h3", {
                    class: n.const("dcg-embosser-title")
                }, function() {
                    return e.props.controller().s("account-shell-heading-embossers")
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("vpmax8"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("vpmax11"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("etc8"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                }), n.createElement(r, {
                    controller: e.props.controller,
                    size: e.const("etc11"),
                    selectedSize: e.props.selectedSize,
                    onSelectSize: e.bindFn(e.selectSize)
                })))
            }))
        }
        ,
        c.prototype.closeMenu = function() {
            o(document).off(".export-image-size-options"),
            this.menuOpen = !1,
            this.unmounted || this.update()
        }
        ,
        c.prototype.didUnmount = function() {
            o(document).off(".export-image-size-options"),
            this.unmounted = !0
        }
        ,
        c.prototype.toggleMenu = function() {
            var e = this;
            this.menuOpen ? this.closeMenu() : (this.menuOpen = !0,
            o(document).on("dcg-tap.export-image-size-options", function(t) {
                o(t.target).closest(".dcg-export-image-size-options").length || e.closeMenu()
            }),
            this.unmounted || this.update())
        }
        ,
        c.prototype.selectSize = function(e) {
            this.menuOpen = !1,
            this.props.selectSize(e),
            void 0 !== this.menuElement && "keyboard" === this.props.controller().getModalDevice() && this.menuElement.focus()
        }
        ,
        c.prototype.selected = function() {
            return s.sizes[this.props.selectedSize()]
        }
        ,
        c
    }(n.Class);
    e.default = c
});
