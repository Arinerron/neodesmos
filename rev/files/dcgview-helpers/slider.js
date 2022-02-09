
define('dcgview-helpers/slider', ["require", "exports", "lib/rounding", "tslib", "keys", "dcgview", "jquery", "lib/conditional_blur", "./dragdrop", "loadcss!./slider"], function(require, t, e, r, o, s, n, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = s.Components.If;
    function c(t, e, r) {
        return Math.min(Math.max(t, e), r)
    }
    var d = function(t) {
        function d() {
            return null !== t && t.apply(this, arguments) || this
        }
        return r.__extends(d, t),
        d.prototype.template = function() {
            var t = this;
            return s.createElement("div", {
                class: function() {
                    return {
                        "dcg-slider-interior": !0,
                        "dcg-disable-slider": t.shouldDisableSlider()
                    }
                },
                didMount: this.bindFn(this.didMountRoot),
                onTapStart: this.bindFn(this.onStartDrag),
                style: s.const({
                    "touch-action": "none"
                })
            }, s.createElement("div", {
                class: s.const("dcg-track")
            }, s.createElement("div", {
                class: s.const("dcg-ticks"),
                onMount: this.bindFn(this.didMountTickMarks)
            }), s.createElement("div", {
                class: s.const("dcg-graphic")
            })), s.createElement(p, {
                predicate: this.bindFn(this.shouldShowZeroMarker)
            }, function() {
                return s.createElement("div", {
                    class: s.const("dcg-zeroMarker"),
                    style: function() {
                        return {
                            left: t.getZeroMarkerPercent() + "%"
                        }
                    }
                })
            }), s.createElement("div", {
                class: function() {
                    return {
                        "dcg-thumb": !0,
                        "dcg-down": t.isDragging
                    }
                },
                role: s.const("slider"),
                tabindex: s.const("0"),
                disablescroll: s.const("true"),
                style: function() {
                    return {
                        left: t.getThumbPercent() + "%"
                    }
                },
                onKeyDown: this.bindFn(this.onKeyDown),
                "aria-label": this.props.ariaLabel,
                "aria-valuemin": this.props.min,
                "aria-valuemax": this.props.max,
                "aria-valuenow": this.props.value,
                manageFocus: this.buildFocusManager()
            }, s.createElement("div", {
                class: s.const("dcg-graphic")
            }), s.createElement("div", {
                class: s.const("dcg-center")
            })))
        }
        ,
        d.prototype.willUnmount = function() {
            this.dragDrop.destroy()
        }
        ,
        d.prototype.didMountRoot = function(t) {
            var e = this;
            this.rootNode = t,
            this.dragDrop = new a.DragDrop,
            this.isMounted = !0,
            this.dragDrop.observeEvent("onDrop", function() {
                e.isDragging = !1,
                e.update(),
                e.props.onDrop && e.props.onDrop()
            }),
            this.dragDrop.observeEvent("onGrab", function() {
                e.isDragging = !0,
                e.update(),
                e.props.onGrab && e.props.onGrab()
            }),
            this.dragDrop.observeEvent("onDrag", function(t, r) {
                e.props.onDragUpdate(e.valueFromPixels(r.x))
            })
        }
        ,
        d.prototype.didMountTickMarks = function(t) {
            this.tickMarksNode = t,
            this.renderTickMarks()
        }
        ,
        d.prototype.didUpdate = function() {
            this.renderTickMarks()
        }
        ,
        d.prototype.shouldDisableSlider = function() {
            return this.props.min() === this.props.max()
        }
        ,
        d.prototype.renderTickMarks = function() {
            if (this.tickMarksNode) {
                var t, e = this.props.step(), r = this.props.min(), o = this.props.max();
                if ((t = void 0 === e ? 0 : 100 * e / (o - r)) < 3 && (t = 0),
                t > 100 && (t = 0),
                isNaN(t) && (t = 0),
                this.lastTickMarksPercent !== t) {
                    this.lastTickMarksPercent = t;
                    var s = "";
                    if (t > 0 && t < 100)
                        for (var n = t; n < 100; n += t)
                            s += '<div class="dcg-tick" style="left:' + n + '%"></div>';
                    this.tickMarksNode.innerHTML = s
                }
            }
        }
        ,
        d.prototype.shouldShowZeroMarker = function() {
            return this.props.min() <= 0 && this.props.max() >= 0
        }
        ,
        d.prototype.getZeroMarkerPercent = function() {
            var t = this.props.min();
            return 100 * (0 - t) / (this.props.max() - t)
        }
        ,
        d.prototype.getThumbPercent = function() {
            return 100 * this.percentFromValue(this.props.value())
        }
        ,
        d.prototype.valueFromPixels = function(t) {
            if (!this.isMounted)
                return 0;
            var r = this.props.min()
              , o = this.props.max()
              , s = this.rootNode.getBoundingClientRect().width
              , n = r + (o - r) * c(t / s, 0, 1)
              , i = (o - r) / s;
            return e.shortestDecimalBetween(n - i, n + i)
        }
        ,
        d.prototype.percentFromValue = function(t) {
            var e = this.props.min();
            return c((t - e) / (this.props.max() - e), 0, 1)
        }
        ,
        d.prototype.pixelsFromValue = function(t) {
            if (!this.isMounted)
                return 0;
            var e = this.percentFromValue(t);
            return this.rootNode.getBoundingClientRect().width * e
        }
        ,
        d.prototype.onKeyDown = function(t) {
            switch (o.lookup(t)) {
            case o.UP:
                this.props.onUpPress && (this.props.onUpPress(),
                t.preventDefault());
                break;
            case o.DOWN:
                this.props.onDownPress && (this.props.onDownPress(),
                t.preventDefault());
                break;
            case o.ENTER:
                this.props.onEnterPress && (this.props.onEnterPress(),
                t.preventDefault());
                break;
            case o.ESCAPE:
                document.activeElement && n(document.activeElement).trigger("blur");
                break;
            case o.LEFT:
                this.props.onKeyboardUpdate("down"),
                t.preventDefault();
                break;
            case o.RIGHT:
                this.props.onKeyboardUpdate("up"),
                t.preventDefault();
                break;
            case o.PAGEDOWN:
                this.props.onKeyboardUpdate("bigdown"),
                t.preventDefault();
                break;
            case o.PAGEUP:
                this.props.onKeyboardUpdate("bigup"),
                t.preventDefault();
                break;
            case o.HOME:
                this.props.onKeyboardUpdate("min"),
                t.preventDefault();
                break;
            case o.END:
                this.props.onKeyboardUpdate("max"),
                t.preventDefault()
            }
        }
        ,
        d.prototype.onStartDrag = function(t) {
            if ("keyboard" !== t.device && t.target) {
                t.preventDefault(),
                i.default();
                var e = {
                    x: 0,
                    y: 0
                };
                1 === n(t.target).closest(".dcg-thumb").length ? e.x = this.pixelsFromValue(this.props.value()) : e.x = t.changedTouches[0].clientX - this.rootNode.getBoundingClientRect().left,
                this.dragDrop.startDrag(t, {
                    origin: e
                })
            }
        }
        ,
        d.prototype.buildFocusManager = function() {
            return this.props.onFocusedChanged && this.props.isFocused ? this.const({
                shouldBeFocused: this.props.isFocused,
                onFocusedChanged: this.props.onFocusedChanged
            }) : this.const(void 0)
        }
        ,
        d
    }(s.Class);
    t.default = d
});