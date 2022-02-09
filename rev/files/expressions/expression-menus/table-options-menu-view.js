
define('expressions/expression-menus/table-options-menu-view', ["require", "exports", "tslib", "dcgview", "lib/aria", "./lines", "./points", "./drag", "core/lib/dragmode", "loadcss!./expression-options-menu-view", "loadcss!./expression-options-menu-view"], function(require, n, e, t, i, o, r, s, c) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.TableOptionsMenuView = void 0;
    var a = t.Components.For
      , l = function(n) {
        function l() {
            return null !== n && n.apply(this, arguments) || this
        }
        return e.__extends(l, n),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        l.prototype.template = function() {
            var n = this;
            return t.createElement("div", {
                class: function() {
                    return {
                        "dcg-table-column-menu": !0,
                        "dcg-options-menu": !0
                    }
                },
                role: t.const("group"),
                "aria-label": function() {
                    return n.controller.s("graphing-calculator-narration-options-menu")
                },
                didMount: function() {
                    i.alert(n.controller.s("graphing-calculator-narration-options-menu-open"))
                },
                didUnmount: function() {
                    i.alert(n.controller.s("graphing-calculator-narration-options-menu-closed"))
                }
            }, t.createElement(a, {
                each: this.bindFn(this.getSections)
            }, t.createElement("div", null, function(i) {
                switch (i) {
                case "points":
                    return t.createElement(r.PointsMenu, e.__assign({}, n.props, {
                        isOpen: function() {
                            return n.isSectionOpen("points")
                        },
                        isFirstOpenSection: function() {
                            return n.isFirstOpenSection("points")
                        }
                    }));
                case "drag":
                    return t.createElement(s.DragMenu, e.__assign({}, n.props, {
                        isOpen: function() {
                            return n.isSectionOpen("drag")
                        },
                        isFirstOpenSection: function() {
                            return n.isFirstOpenSection("drag")
                        }
                    }));
                case "lines":
                    return t.createElement(o.LineMenu, e.__assign({}, n.props, {
                        isOpen: function() {
                            return n.isSectionOpen("lines")
                        },
                        isFirstOpenSection: function() {
                            return n.isFirstOpenSection("lines")
                        }
                    }))
                }
            })), t.createElement("div", {
                class: t.const("dcg-triangle")
            }))
        }
        ,
        l.prototype.getSections = function() {
            return this.model.draggable ? ["points", "lines", "drag"] : ["points", "lines"]
        }
        ,
        l.prototype.isFirstOpenSection = function(n) {
            for (var e = 0, t = this.getSections(); e < t.length; e++) {
                var i = t[e];
                if (i === n)
                    return this.isSectionOpen(n);
                if (this.isSectionOpen(i))
                    return !1
            }
            return !1
        }
        ,
        l.prototype.isSectionOpen = function(n) {
            switch (n) {
            case "drag":
                return this.model.dragMode !== c.DragMode.NONE;
            case "lines":
                return !!this.model.lines;
            case "points":
                return !!this.model.points
            }
        }
        ,
        l
    }(t.Class);
    n.TableOptionsMenuView = l
});