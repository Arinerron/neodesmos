
define('expressions/expression-edit-actions', ["require", "exports", "parser", "tslib", "dcgview", "core/lib/dragmode", "core/types/styles", "graphing-calc/models/expression", "graphing-calc/models/abstract-item", "lib/aria", "../shared-components/tooltip", "loadcss!./expression-edit-actions"], function(require, e, t, n, o, i, r, l, a, s, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ExpressionEditActions = void 0;
    var d = o.Components.If
      , p = function(e) {
        function p() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(p, e),
        p.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        p.prototype.template = function() {
            var e = this;
            return o.createElement(d, {
                predicate: function() {
                    return e.controller.isInEditListMode()
                }
            }, function() {
                return o.createElement("span", {
                    class: function() {
                        return {
                            "dcg-expression-edit-actions": !0,
                            "dcg-limited-height": e.limitedHeight()
                        }
                    },
                    style: function() {
                        return {
                            background: e.controller.getBackgroundColor()
                        }
                    },
                    didMount: function() {
                        e.controller.isInEditListMode() && s.alert(e.controller.s("graphing-calculator-narration-edit-list-mode-on"))
                    },
                    didUnmount: function() {
                        e.controller.isInEditListMode() || s.alert(e.controller.s("graphing-calculator-narration-edit-list-mode-off"))
                    }
                }, o.createElement(d, {
                    predicate: function() {
                        return !e.controller.hasBackgroundColor()
                    }
                }, function() {
                    return o.createElement("span", {
                        class: o.const("dcg-graphic"),
                        handleEvent: o.const("true ")
                    })
                }), o.createElement(d, {
                    predicate: e.bindFn(e.canConvertToTable)
                }, function() {
                    return o.createElement(c.Tooltip, {
                        tooltip: function() {
                            return e.controller.s("graphing-calculator-label-convert-to-table-tooltip")
                        },
                        gravity: e.const("s")
                    }, o.createElement("span", {
                        class: o.const("dcg-action-createtable dcg-exp-action-button"),
                        handleEvent: o.const("true"),
                        role: o.const("button"),
                        tabindex: o.const("0"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-label-convert-to-table-tooltip")
                        },
                        onTap: e.bindFn(e.onCreateTable)
                    }, o.createElement("i", {
                        class: o.const("dcg-icon-table")
                    })))
                }), o.createElement(c.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-duplicate-expression-tooltip")
                    },
                    gravity: e.const("s")
                }, o.createElement("span", {
                    class: o.const("dcg-duplicate-btn dcg-exp-action-button"),
                    handleEvent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-label-duplicate-expression-tooltip")
                    },
                    onTap: e.bindFn(e.onDuplicateWithoutFocus)
                }, o.createElement("i", {
                    class: o.const("dcg-icon-duplicate")
                }))), o.createElement(c.Tooltip, {
                    tooltip: function() {
                        return e.controller.s("graphing-calculator-label-expression-delete-tooltip")
                    },
                    gravity: e.const("sw")
                }, o.createElement("span", {
                    class: o.const("dcg-delete-btn dcg-exp-action-button"),
                    handleEvent: o.const("true"),
                    role: o.const("button"),
                    tabindex: o.const("0"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-label-expression-delete-tooltip")
                    },
                    onTap: e.bindFn(e.onDelete)
                }, o.createElement("i", {
                    class: o.const("dcg-icon-remove")
                }))))
            })
        }
        ,
        p.prototype.model = function() {
            return this.controller.getItemModel(this.props.id())
        }
        ,
        p.prototype.canConvertToTable = function() {
            var e = this.model();
            return !(!e || "expression" !== e.type || !e.formula.is_tableable)
        }
        ,
        p.prototype.limitedHeight = function() {
            var e = this.model();
            return e && ("image" === e.type || this.isSlider())
        }
        ,
        p.prototype.isSlider = function() {
            var e = this.model();
            return e && "expression" === e.type && e.sliderExists
        }
        ,
        p.prototype.generateSubscriptedTableColumns = function(e, n, o) {
            var i = {
                independent: n,
                dependent: o
            };
            if ("x" === n)
                return i;
            if ("Identifier" !== t.parse(n).type)
                return i;
            var r = t.parse(o);
            if ("FunctionCall" !== r.type)
                return i;
            if (1 !== r.args.length)
                return i;
            var l = r.args[0];
            if ("Identifier" !== l.type)
                return i;
            if (l._symbol !== n)
                return i;
            var a = r.getInputString()
              , s = l.getInputSpan()
              , c = a.substr(0, s.start)
              , d = a.substr(s.end);
            return i.independent = "x_{" + e + "}",
            i.dependent = c + i.independent + d,
            i
        }
        ,
        p.prototype.onCreateTable = function() {
            var e = this.model();
            if (e && "expression" === e.type) {
                var t = e.formula;
                if (t.is_tableable && t.table_info) {
                    var n, o = t.table_info, s = e.index, c = o.independent_variable, d = o.dependent_column;
                    if (o.by_reference) {
                        var p = this.generateSubscriptedTableColumns(this.controller.generateTableXSubscript(), c, d);
                        c = p.independent,
                        d = p.dependent
                    }
                    var u = []
                      , h = [];
                    if (o.values)
                        for (n = 0; n < o.values.length; n++) {
                            var g = o.values[n][0];
                            u.push(isNaN(g) ? "" : g + "");
                            var f = o.values[n][1];
                            h.push(isNaN(f) ? "" : f + "")
                        }
                    else
                        for (n = -2; n <= 2; n++)
                            u.push(n + ""),
                            h.push("");
                    var b = {
                        id: this.controller.generateId(),
                        type: "table",
                        columns: [{
                            id: this.controller.generateId(),
                            latex: c,
                            color: this.controller.getNextColor(),
                            hidden: !1,
                            values: u,
                            points: !0,
                            lines: !1,
                            dragMode: i.DragMode.NONE,
                            pointStyle: r.PointStyle.POINT,
                            lineStyle: r.LineStyle.SOLID,
                            colorLatex: "",
                            lineOpacity: "",
                            lineWidth: "",
                            pointOpacity: "",
                            pointSize: ""
                        }, {
                            id: this.controller.generateId(),
                            latex: d,
                            color: a.getDisplayColor(e),
                            hidden: !1,
                            values: h,
                            points: !0,
                            lines: !(l.isPointOrPointList(e) || e.hidden),
                            dragMode: i.DragMode.NONE,
                            pointStyle: r.PointStyle.POINT,
                            lineStyle: r.LineStyle.SOLID,
                            colorLatex: "",
                            lineOpacity: "",
                            lineWidth: "",
                            pointOpacity: "",
                            pointSize: ""
                        }]
                    }
                      , y = this.controller;
                    this.controller.dispatch({
                        type: "set-edit-list-mode",
                        isEditListMode: !1,
                        focusExpressionList: !1
                    }),
                    o.by_reference ? this.controller.dispatch({
                        type: "insert-item-at-index",
                        index: s + 1,
                        state: b,
                        folderId: e.folderId,
                        focus: !0
                    }) : this.controller.dispatch({
                        type: "replace-item-at-index",
                        index: s,
                        state: b,
                        focus: !0
                    });
                    this.controller.dispatch({
                        type: "toast/show",
                        toast: {
                            message: this.controller.s("graphing-calculator-text-table-created"),
                            undoCallback: function() {
                                y.dispatch({
                                    type: "undo"
                                }),
                                y.dispatch({
                                    type: "set-edit-list-mode",
                                    isEditListMode: !0,
                                    focusExpressionList: !1
                                })
                            }
                        }
                    })
                }
            }
        }
        ,
        p.prototype.onDelete = function(e) {
            this.controller.dispatch({
                type: "delete-item-and-animate-out",
                id: this.props.id(),
                setFocusAfterDelete: "keyboard" === e.device
            })
        }
        ,
        p.prototype.onDuplicateWithoutFocus = function() {
            var e = this.model();
            e && ("folder" === e.type ? this.controller.dispatch({
                type: "duplicate-folder",
                id: this.props.id()
            }) : this.controller.dispatch({
                type: "duplicate-expression",
                id: this.props.id()
            }))
        }
        ,
        p
    }(o.Class);
    e.ExpressionEditActions = p
});
