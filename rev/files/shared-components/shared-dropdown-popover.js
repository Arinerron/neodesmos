define('shared-components/shared-dropdown-popover', ["require", "exports", "tslib", "dcgview", "jquery", "lib/i18n", "underscore", "loadcss!./shared-dropdown-popover"], function(require, o, n, t, e, i, r) {
    "use strict";
    Object.defineProperty(o, "__esModule", {
        value: !0
    }),
    o.DropdownPopover = void 0;
    var p = t.Components.If
      , s = function(o) {
        function s() {
            return null !== o && o.apply(this, arguments) || this
        }
        return n.__extends(s, o),
        s.prototype.init = function() {
            if (this.showDropdown = !1,
            !this.children || 1 !== this.children.length || "function" != typeof this.children[0])
                throw new Error("<DropdownPopover> expects a single child that is a function")
        }
        ,
        s.prototype.template = function() {
            var o = this;
            return t.createElement("div", {
                class: function() {
                    var n;
                    return (n = {
                        "dcg-shared-dropdown-popover-container": !0
                    })[void 0 === o.props.class ? "" : o.props.class()] = void 0 !== o.props.class,
                    n
                },
                didMount: this.bindFn(this.didMountDropdown),
                didUnmount: this.bindFn(this.didUnmountDropdown)
            }, t.createElement("div", {
                role: t.const("link"),
                tabindex: t.const(0),
                "aria-label": this.bindFn(this.getTitle),
                "aria-expanded": this.bindFn(this.isDropdownOpen),
                class: function() {
                    return {
                        "anchor-container": !0,
                        isOpen: o.isDropdownOpen()
                    }
                },
                onTap: function(n) {
                    o.openedFromKeyboard = "keyboard" === n.device,
                    o.setDropdownOpen(!o.isDropdownOpen())
                }
            }, this.props.anchor()), t.createElement(p, {
                predicate: this.bindFn(this.isDropdownOpen)
            }, function() {
                return t.createElement("div", {
                    class: function() {
                        return {
                            "dropdown-container": !0,
                            "dropdown-pops-up": o.props.popUp && o.props.popUp(),
                            "dropdown-pops-right": o.props.popRight && o.props.popRight()
                        }
                    },
                    style: function() {
                        var n = o.props.rightPosition && o.props.rightPosition();
                        return n ? {
                            right: n + "px"
                        } : {}
                    },
                    didMount: function(n) {
                        o.props.dropdownDidMount && o.props.dropdownDidMount(n)
                    }
                }, o.children[0]())
            }))
        }
        ,
        s.prototype.didMountDropdown = function(o) {
            var n = this;
            this.listenerId = r.uniqueId("dropdown-container"),
            e(document.body).on("dcg-tap." + this.listenerId, function(t) {
                if (t.target !== o && !e.contains(o, t.target))
                    if (n.isDropdownOpen()) {
                        var i = e(o).find(".dropdown-container")[0];
                        if (e.contains(i, t.target))
                            return;
                        var r = i.getBoundingClientRect();
                        if (void 0 !== t.clientX && void 0 !== t.clientY && t.clientX > r.left && t.clientX < r.right && t.clientY > r.top && t.clientY < r.bottom)
                            return;
                        n.setDropdownOpen(!1)
                    } else
                        ;
            }),
            e(document).on("scroll." + this.listenerId, function() {
                !n.openedFromKeyboard && n.isDropdownOpen() && n.setDropdownOpen(!1)
            })
        }
        ,
        s.prototype.didUnmountDropdown = function() {
            this.showDropdown = !1,
            e(document.body).off("." + this.listenerId),
            e(document).off("." + this.listenerId)
        }
        ,
        s.prototype.getTitle = function() {
            return this.props.title ? this.props.title() : i.s("shared-button-more-options-menu")
        }
        ,
        s.prototype.isDropdownOpen = function() {
            return this.props.controlled ? this.props.controlled().isOpen : this.showDropdown
        }
        ,
        s.prototype.setDropdownOpen = function(o) {
            this.props.disabled && this.props.disabled() || (this.props.controlled ? this.props.controlled().setDropdownOpen(o) : (this.showDropdown = o,
            this.update()))
        }
        ,
        s
    }(t.Class);
    o.DropdownPopover = s
});
