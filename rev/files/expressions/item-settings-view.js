define('expressions/item-settings-view', ["require", "exports", "tslib", "dcgview", "keys", "underscore", "jquery", "./expression-menus/expression-options-menu-view", "./expression-menus/table-options-menu-view", "./image_options_view", "./slider-options-view", "loadcss!./item-settings-view"], function(require, t, e, o, i, n, s, r, c, p, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ItemSettingsView = void 0;
    var u = o.Components.Switch
      , d = ':input, [role="textbox"], [tabindex="0"]:visible'
      , a = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(a, t),
        a.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        a.prototype.template = function() {
            var t = this;
            return o.createElement(u, {
                key: this.bindFn(this.getActiveGuid)
            }, function() {
                var e = t.controller.getOpenItemMenu();
                return t.registeredChildRepositionCb = void 0,
                e ? "expression" === e.type ? o.createElement("div", {
                    class: o.const("dcg-options-menu-container"),
                    didMount: t.bindFn(t.didMountView),
                    didUnmount: t.bindFn(t.didUnmountView)
                }, o.createElement(r.ExpressionOptionsMenuView, {
                    controller: t.props.controller,
                    model: function() {
                        return e.model
                    },
                    registerRepositionCb: function(e) {
                        t.registeredChildRepositionCb = e
                    }
                })) : "image" === e.type ? o.createElement("div", {
                    class: o.const("dcg-options-menu-container"),
                    didMount: t.bindFn(t.didMountView),
                    didUnmount: t.bindFn(t.didUnmountView)
                }, o.createElement(p.ImageOptionsView, {
                    controller: t.props.controller,
                    model: function() {
                        return e.model
                    }
                })) : "table-column" === e.type ? o.createElement("div", {
                    class: o.const("dcg-options-menu-container"),
                    didMount: t.bindFn(t.didMountView),
                    didUnmount: t.bindFn(t.didUnmountView)
                }, o.createElement(c.TableOptionsMenuView, {
                    controller: t.props.controller,
                    model: function() {
                        return e.model
                    }
                })) : "slider" === e.type ? o.createElement("div", {
                    class: o.const("dcg-options-menu-container"),
                    didMount: t.bindFn(t.didMountView),
                    didUnmount: t.bindFn(t.didUnmountView)
                }, o.createElement(l.SliderOptionsView, {
                    controller: t.props.controller,
                    model: function() {
                        return e.model
                    }
                })) : e : o.createElement("span", null)
            })
        }
        ,
        a.prototype.getActiveGuid = function() {
            var t = this.controller.getOpenItemMenu();
            if (t)
                return t.model.guid
        }
        ,
        a.prototype.didMountView = function(t) {
            var e = this;
            this.guid = n.uniqueId("dcg-item-settings-view"),
            this.openView = t,
            this.positionMenu(),
            this.moveFocusIfAppropriate(),
            s(document.body).on("keydown." + this.guid, function(t) {
                var o = i.lookup(t);
                "Esc" === o ? e.hideOptions() : "Tab" !== o || t.altKey || t.ctrlKey || t.metaKey || (t.shiftKey ? t.shiftKey && (e.isIconModelFocused() ? (t.preventDefault(),
                t.stopPropagation(),
                e.focusLastOption()) : e.isFirstOptionViewFocused() ? (t.preventDefault(),
                t.stopPropagation(),
                e.focusIcon()) : e.focusAnywhere()) : e.isIconModelFocused() ? (t.preventDefault(),
                t.stopPropagation(),
                e.focusFirstOption()) : e.isLastOptionViewFocused() ? (t.preventDefault(),
                t.stopPropagation(),
                e.focusIcon()) : e.focusAnywhere())
            }),
            requestAnimationFrame(function() {
                e.openView && e.controller.getExppanelSelectorOrThrow().on("scroll." + e.guid, function() {
                    e.hideOptions()
                })
            }),
            s(document.body).on("dcg-tapstart." + this.guid, function(t) {
                if (e.openView) {
                    var o = s(t.target)
                      , i = e.controller.getActiveIcon();
                    if (!i || !o.closest(i).length)
                        if (o.closest(e.openView).length) {
                            if (!o.is(d))
                                return;
                            var n = e.getDOMTabStops()
                              , r = n.$first
                              , c = n.$last;
                            void 0 !== r && r.is(o) ? e.focusFirstOption() : void 0 !== c && c.is(o) ? e.focusLastOption() : t.target.hasAttribute("dataLabelAttributeValue") || "fill-opacity" === t.target.getAttribute("dataLabelAttributeValue") || e.focusAnywhere()
                        } else
                            o.closest(".dcg-keypad,.dcg-show-keypad-container").length || e.hideOptions()
                }
            })
        }
        ,
        a.prototype.didUnmountView = function() {
            s(document.body).off("." + this.guid),
            this.openView = void 0
        }
        ,
        a.prototype.didUpdate = function() {
            this.positionMenu(),
            this.moveFocusIfAppropriate()
        }
        ,
        a.prototype.moveFocusIfAppropriate = function() {
            var t = this.getDOMTabStops()
              , e = t.$first
              , o = t.$last;
            void 0 !== e && void 0 !== o && (this.shouldMoveFocusToFirstOption() ? e.trigger("focus") : this.shouldMoveFocusToLastOption() && o.trigger("focus"))
        }
        ,
        a.prototype.open = function() {
            return !!this.controller.getOpenItemMenu()
        }
        ,
        a.prototype.hideOptions = function() {
            this.open() && this.controller.dispatch({
                type: "close-item-settings-menu"
            })
        }
        ,
        a.prototype.positionMenu = function() {
            var t = this.controller.getActiveIcon();
            if (t && this.openView) {
                var e = this.controller.getExppanelSelectorOrThrow().closest(".dcg-container")[0].getBoundingClientRect()
                  , o = t[0].getBoundingClientRect()
                  , i = o.top - e.top
                  , n = o.left - e.left
                  , r = this.controller.computeMajorLayout()
                  , c = r.list.top + r.list.height
                  , p = r.keypad.top
                  , l = Math.min(c, p) + e.top - o.top;
                s(this.openView).css({
                    top: i + "px",
                    left: n + "px",
                    display: "block"
                }),
                this.registeredChildRepositionCb && this.registeredChildRepositionCb(l)
            }
        }
        ,
        a.prototype.isIconModelFocused = function() {
            var t = this.controller.getOpenItemMenu();
            return void 0 !== t && ("slider" === t.type ? this.controller.isFocusLocationFocused({
                type: "slider-animation-properties-icon",
                id: t.model.id
            }) : "image" === t.type ? this.controller.isFocusLocationFocused({
                type: "image-icon",
                id: t.model.id
            }) : "table-column" === t.type ? this.controller.isFocusLocationFocused({
                type: "table-icon",
                id: t.model.table.id,
                columnId: t.model.id
            }) : this.controller.isFocusLocationFocused({
                type: "expression-icon",
                id: t.model.id
            }))
        }
        ,
        a.prototype.focusIcon = function() {
            this.controller.focusOpenMenuIcon()
        }
        ,
        a.prototype.isFirstOptionViewFocused = function() {
            var t = this.getDOMTabStops().$first;
            return void 0 !== t && t.is(":focus")
        }
        ,
        a.prototype.shouldMoveFocusToFirstOption = function() {
            var t = this.controller.getOpenItemMenu();
            return void 0 !== t && !this.isFirstOptionViewFocused() && this.controller.isFocusLocationFocused({
                type: "expression-menu",
                id: t.model.id,
                location: "start"
            })
        }
        ,
        a.prototype.focusFirstOption = function() {
            var t = this.controller.getOpenItemMenu();
            t && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression-menu",
                    id: t.model.id,
                    location: "start"
                }
            })
        }
        ,
        a.prototype.isLastOptionViewFocused = function() {
            var t = this.getDOMTabStops().$last;
            return void 0 !== t && t.is(":focus")
        }
        ,
        a.prototype.shouldMoveFocusToLastOption = function() {
            var t = this.controller.getOpenItemMenu();
            return void 0 !== t && !this.isLastOptionViewFocused() && this.controller.isFocusLocationFocused({
                type: "expression-menu",
                id: t.model.id,
                location: "end"
            })
        }
        ,
        a.prototype.focusLastOption = function() {
            var t = this.controller.getOpenItemMenu();
            t && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression-menu",
                    id: t.model.id,
                    location: "end"
                }
            })
        }
        ,
        a.prototype.focusAnywhere = function() {
            var t = this.controller.getOpenItemMenu();
            t && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression-menu",
                    id: t.model.id,
                    location: "anywhere"
                }
            })
        }
        ,
        a.prototype.getDOMTabStops = function() {
            if (void 0 === this.openView)
                return {};
            var t = s(this.openView).find(d);
            return {
                $first: t.first(),
                $last: t.last()
            }
        }
        ,
        a
    }(o.Class);
    t.ItemSettingsView = a
});
