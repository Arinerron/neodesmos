define('dcgview-helpers/searchable-dropdown', ["require", "exports", "tslib", "dcgview", "keys", "lib/aria", "loadcss!./searchable-dropdown"], function(require, t, e, o, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = o.Components
      , r = s.If
      , c = s.For
      , u = s.Input
      , a = function(t) {
        function s() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.filter = void 0,
            e.focusLocation = void 0,
            e.lastResultCount = 0,
            e
        }
        return e.__extends(s, t),
        s.prototype.template = function() {
            var t = this;
            return o.createElement("div", {
                class: o.const("dcg-search-container"),
                onKeydown: this.bindFn(this.onKeydown)
            }, o.createElement(r, {
                predicate: this.props.renderWithInput
            }, function() {
                return o.createElement("div", {
                    role: o.const("search"),
                    class: o.const("dcg-searchable-dropdown")
                }, o.createElement(u, {
                    didMount: t.bindFn(t.didMountInput),
                    onInput: t.bindFn(t.onInputChange),
                    value: t.bindFn(t.getFilterString),
                    placeholder: function() {
                        return t.props.placeholder()
                    },
                    manageFocus: t.const({
                        shouldBeFocused: t.bindFn(t.shouldFilterBeFocused),
                        onFocusedChanged: t.bindFn(t.onFilterFocusChange)
                    })
                }), o.createElement(r, {
                    predicate: function() {
                        return t.shouldShowDeleteX()
                    }
                }, function() {
                    return o.createElement("div", {
                        class: o.const("dcg-remove-x dcg-do-not-blur")
                    }, o.createElement("span", {
                        class: o.const("dcg-icon-remove"),
                        onTap: t.bindFn(t.onDeleteXTapped)
                    }))
                }))
            }), o.createElement(r, {
                predicate: function() {
                    return t.getFilteredOptions().length > 0
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-searchable-dropdown-list-container")
                }, o.createElement(c, {
                    each: function() {
                        return t.getFilteredOptions()
                    },
                    key: function(t) {
                        return t.id + "-" + t.label
                    }
                }, o.createElement("div", {
                    class: function() {
                        return {
                            "dcg-searchable-dropdown-list": !0,
                            "dcg-do-not-blur": !0,
                            "dcg-no-input": !t.props.renderWithInput()
                        }
                    },
                    role: o.const("listbox"),
                    "aria-label": o.const("Results")
                }, function(e) {
                    return o.createElement("div", {
                        class: o.const("dcg-searchable-dropdown-option"),
                        role: o.const("option"),
                        onTap: function(o) {
                            return t.selectOption(e, "keyboard" === o.device)
                        },
                        manageFocus: t.const({
                            shouldBeFocused: function() {
                                return t.shouldOptionBeFocused(e)
                            },
                            onFocusedChanged: function(o) {
                                return t.onOptionFocusChange(e, o)
                            }
                        }),
                        tabindex: o.const(0)
                    }, t.const(e.label))
                })))
            }), o.createElement(r, {
                predicate: function() {
                    return 0 === t.getFilteredOptions().length
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-searchable-dropdown-list dcg-no-search-results")
                }, o.const("No results."))
            }))
        }
        ,
        s.prototype.didMountInput = function() {
            this.focusFilter()
        }
        ,
        s.prototype.shouldShowDeleteX = function() {
            return !!this.getFilterString()
        }
        ,
        s.prototype.onDeleteXTapped = function() {
            this.filter = void 0,
            this.focusFilter(),
            this.update()
        }
        ,
        s.prototype.shouldFilterBeFocused = function() {
            return this.focusLocation && "filter" === this.focusLocation.type
        }
        ,
        s.prototype.onFilterFocusChange = function(t) {
            t ? this.focusFilter() : (this.filter = void 0,
            this.focusLocation = void 0,
            this.update())
        }
        ,
        s.prototype.shouldOptionBeFocused = function(t) {
            return this.focusLocation && "option" === this.focusLocation.type && this.focusLocation.id === t.id
        }
        ,
        s.prototype.focusFilter = function() {
            this.focusLocation = {
                type: "filter"
            },
            this.update()
        }
        ,
        s.prototype.focusOption = function(t) {
            this.focusLocation = {
                type: "option",
                id: t.id
            },
            this.update()
        }
        ,
        s.prototype.getFocusedOptionIndex = function() {
            if (!this.focusLocation)
                return -1;
            if ("option" !== this.focusLocation.type)
                return -1;
            for (var t = this.focusLocation.id, e = this.getFilteredOptions(), o = 0; o < e.length; o++) {
                if (e[o].id === t)
                    return o
            }
            return -1
        }
        ,
        s.prototype.onOptionFocusChange = function(t, e) {
            e ? this.focusOption(t) : (this.focusLocation = void 0,
            this.update())
        }
        ,
        s.prototype.onKeydown = function(t) {
            switch (n.lookup(t)) {
            case n.ENTER:
                if (this.shouldFilterBeFocused()) {
                    var e = this.getFilteredOptions();
                    1 === e.length && this.selectOption(e[0], !0)
                }
                break;
            case n.UP:
                this.moveFocusInDirection(-1) && t.preventDefault();
                break;
            case n.DOWN:
                this.moveFocusInDirection(1) && t.preventDefault();
                break;
            case n.HOME:
                t.preventDefault(),
                this.focusFirstOption();
                break;
            case n.END:
                t.preventDefault(),
                this.focusLastOption();
                break;
            case n.ESCAPE:
                this.props.onCancel();
                break;
            case n.TAB:
                t.shiftKey ? this.moveFocusInDirection(-1) && t.preventDefault() : this.moveFocusInDirection(1) && t.preventDefault()
            }
        }
        ,
        s.prototype.moveFocusInDirection = function(t) {
            var e = this.getFilteredOptions()
              , o = this.getFocusedOptionIndex() + t;
            if (-1 == o && this.props.renderWithInput())
                return this.focusFilter(),
                !0;
            var n = e[o];
            return !!n && (this.focusOption(n),
            !0)
        }
        ,
        s.prototype.focusFirstOption = function() {
            var t = this.getFilteredOptions();
            0 !== t.length && this.focusOption(t[0])
        }
        ,
        s.prototype.focusLastOption = function() {
            var t = this.getFilteredOptions();
            0 !== t.length && this.focusOption(t[t.length - 1])
        }
        ,
        s.prototype.onInputChange = function(t) {
            this.filter = t,
            this.update()
        }
        ,
        s.prototype.getFilterString = function() {
            return this.filter || ""
        }
        ,
        s.prototype.selectOption = function(t, e) {
            this.filter = void 0,
            this.focusLocation = void 0,
            this.update(),
            this.props.onChange({
                value: t.id,
                fromKeyboard: e
            })
        }
        ,
        s.prototype.getFilteredOptions = function() {
            var t = this.props.options()
              , e = (this.filter || "").toLowerCase().trim();
            return e && (t = t.filter(function(t) {
                return -1 !== t.label.toLowerCase().indexOf(e)
            })),
            t
        }
        ,
        s.prototype.onUpdate = function() {
            var t = this.getFilteredOptions().length;
            if (this.focusLocation && "filter" === this.focusLocation.type && t !== this.lastResultCount)
                switch (t) {
                case 0:
                    i.alert("No results");
                    break;
                case 1:
                    i.alert("1 result");
                    break;
                default:
                    i.alert(t + " results")
                }
            this.lastResultCount = t
        }
        ,
        s
    }(o.Class);
    t.default = a
});