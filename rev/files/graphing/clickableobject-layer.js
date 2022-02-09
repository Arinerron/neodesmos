define('graphing/clickableobject-layer', ["require", "exports", "tslib", "dcgview", "core/types/graphmode", "jquery", "graphing-calc/models/expression", "graphing-calc/models/image", "lib/mathspeak"], function(require, e, t, r, i, s, n, o, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = r.Components.For;
    function a(e, t) {
        return void 0 === t && (t = 0),
        e + "i" + t
    }
    var h = function(e) {
        function h() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(h, e),
        h.prototype.init = function() {
            this.grapher = this.props.grapher(),
            this.controller = this.grapher.controller,
            this.renderedTabTargetOrder = [],
            this.renderedTabTargets = {}
        }
        ,
        h.prototype.template = function() {
            var e = this;
            return r.createElement(c, {
                each: function() {
                    return e.renderedTabTargetOrder
                }
            }, r.createElement("div", {
                class: r.const("dcg-graph-outer"),
                style: this.const({
                    "z-index": 0
                }),
                onFocusin: this.bindFn(this.handleFocusChange),
                onFocusout: this.bindFn(this.handleFocusChange),
                didMount: function(t) {
                    return e.rootNode = t
                }
            }, function(t) {
                return r.createElement("div", {
                    class: r.const("dcg-tabbable-clickableobject"),
                    role: r.const("button"),
                    "aria-roledescription": function() {
                        return e.controller.s("graphing-calculator-narration-clickable-object-description")
                    },
                    "dcg-clickableobject-id": function() {
                        return e.getModelId(t)
                    },
                    tabindex: function() {
                        return e.getTabIndex(t)
                    },
                    "aria-hidden": e.bindFn(e.getAriaHidden),
                    "aria-label": function() {
                        return e.getCachedDescription(t)
                    },
                    onTap: function() {
                        e.controller.dispatch({
                            type: "clickable-item-clicked",
                            id: e.getModelId(t),
                            listIndex: e.getListIndex(t)
                        })
                    }
                })
            }))
        }
        ,
        h.prototype.redraw = function() {
            var e = this;
            this.renderedTabTargets = {},
            this.renderedTabTargetOrder = [];
            for (var t = this.grapher.getSketchOrder(), r = function(t) {
                var r = s.controller.getItemModel(t);
                if (!r)
                    return "continue";
                var d = s.grapher.getGraphSketch(t)
                  , c = s.grapher.getGraphImage(t);
                if (d && d.visible && "expression" === r.type && n.isClickableObject(r))
                    for (var a = function(t) {
                        var n = d.branches[t];
                        if (!n.segments || 0 === n.segments.length)
                            return "continue";
                        var o = 0;
                        n.graphMode === i.XYPOINT || n.graphMode === i.XYPOINT_MOVABLE ? d.getBranchPOI(t).forEach(function(t) {
                            o = t.pointIdxOnBranch || 0,
                            isFinite(t.x) && isFinite(t.y) && e.addClickableObjectToDom(r, o)
                        }) : (o = "listIndex"in n && void 0 !== n.listIndex ? n.listIndex : 0,
                        n.segments.length > 0 && s.addClickableObjectToDom(r, o))
                    }, h = 0; h < d.branches.length; h++)
                        a(h);
                else if (c && c.shouldGraph && "image" === r.type && o.isClickableObject(r)) {
                    var p = r.formula && r.formula.dimensions;
                    if (!(p && p.x && p.y && p.width && p.height && p.radianAngle))
                        return "continue";
                    for (h = 0; h < p.x.length; h++)
                        isFinite(p.x[h]) && isFinite(p.y[h]) && isFinite(p.width[h]) && isFinite(p.height[h]) && isFinite(p.radianAngle[h]) && s.addClickableObjectToDom(r, h)
                }
            }, s = this, d = 0, c = t; d < c.length; d++) {
                r(c[d])
            }
            this.hoveredObject && !this.renderedTabTargets[a(this.hoveredObject.id, this.hoveredObject.listIndex)] && this.setHoveredObject(void 0),
            this.pressedObject && !this.renderedTabTargets[a(this.pressedObject.id, this.pressedObject.listIndex)] && this.setPressedObject(void 0),
            this.hoveredObject || this.pressedObject ? this.grapher.setLayerClass("clickableObjects", "dcg-mouse-over-clickable-object") : this.grapher.setLayerClass("clickableObjects", void 0),
            this.update()
        }
        ,
        h.prototype.addClickableObjectToDom = function(e, t) {
            var r = a(e.id, t);
            -1 === this.renderedTabTargetOrder.indexOf(r) && void 0 === this.renderedTabTargets[r] && (this.renderedTabTargetOrder.push(r),
            this.renderedTabTargets[r] = {
                type: e.type,
                id: e.id,
                listIndex: t,
                description: this.getComputedDescription(e, t)
            })
        }
        ,
        h.prototype.getTabIndex = function(e) {
            if (!this.renderedTabTargets[e])
                return -1;
            var t = this.grapher.settings;
            return t.config.graphpaper && t.config.enableTabindex ? 0 : -1
        }
        ,
        h.prototype.getAriaHidden = function() {
            return !this.grapher.settings.config.graphpaper
        }
        ,
        h.prototype.getCachedDescription = function(e) {
            return this.renderedTabTargets[e].description
        }
        ,
        h.prototype.getComputedDescription = function(e, t) {
            var r = e.formula && e.formula.computed_description && e.formula.computed_description[t];
            return r && "" !== r ? d.getMathspeakFromText(r) : this.grapher.getAudioTrace().getExpressionAriaLabel(e.id)
        }
        ,
        h.prototype.getModelId = function(e) {
            var t = this.renderedTabTargets[e];
            return t ? t.id : ""
        }
        ,
        h.prototype.getListIndex = function(e) {
            var t = this.renderedTabTargets[e];
            return t ? t.listIndex : 0
        }
        ,
        h.prototype.shouldDrawHovered = function(e) {
            return e === this.focusedId || !(this.isAnObjectPressed() && !this.isObjectPressed(e)) && this.isObjectHovered(e)
        }
        ,
        h.prototype.isObjectHovered = function(e) {
            return void 0 !== e && !(!this.hoveredObject || this.hoveredObject.id !== e)
        }
        ,
        h.prototype.setHoveredObject = function(e) {
            e && this.hoveredObject && e.id === this.hoveredObject.id && e.listIndex === this.hoveredObject.listIndex || (this.hoveredObject = e,
            this.requestRedrawNextFrame())
        }
        ,
        h.prototype.getHoveredObject = function() {
            return this.hoveredObject
        }
        ,
        h.prototype.shouldDrawPressed = function(e) {
            return this.isObjectPressed(e)
        }
        ,
        h.prototype.isObjectPressed = function(e) {
            return void 0 !== e && !(!this.pressedObject || this.pressedObject.id !== e)
        }
        ,
        h.prototype.setPressedObject = function(e) {
            e && this.pressedObject && e.id === this.pressedObject.id && e.listIndex === this.pressedObject.listIndex || (this.pressedObject = e,
            this.requestRedrawNextFrame())
        }
        ,
        h.prototype.getPressedObject = function() {
            return this.pressedObject
        }
        ,
        h.prototype.isAnObjectPressed = function() {
            return !!this.pressedObject
        }
        ,
        h.prototype.handleFocusChange = function() {
            var e = void 0;
            document.activeElement && s.contains(this.rootNode, document.activeElement) && (e = s(document.activeElement).attr("dcg-clickableobject-id"));
            this.focusedId !== e && (this.focusedId = e,
            this.requestRedrawNextFrame())
        }
        ,
        h.prototype.requestRedrawNextFrame = function() {
            this.grapher.redrawAllLayers()
        }
        ,
        h
    }(r.Class);
    e.default = h
});