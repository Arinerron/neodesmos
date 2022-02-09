
define('expressions/table-view', ["require", "exports", "tslib", "keys", "lib/aria", "./abstract-item-view", "dcgview", "./tables/header-view", "./tables/cell-view", "graphing-calc/models/table", "vendor/mathquill", "jquery", "./expression-edit-actions", "expressions/measure-expressions", "./suggested-zoom-view", "main/manage-focus-helper", "loadcss!./table-view", "jquery.handleevent"], function(require, e, t, o, n, l, r, i, s, c, a, d, u, p, h, g) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var m = r.Components.For
      , f = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(l, e),
        l.prototype.didMount = function() {
            this.onItemViewMounted()
        }
        ,
        l.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        l.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-expressionitem": !0,
                        "dcg-expressiontable": !0,
                        "dcg-inFolder": !!e.model.folderId,
                        "dcg-selected": !!e.controller.isItemSelected(e.id),
                        "dcg-dragging": !!e.controller.isItemBeingDragged(e.id),
                        "dcg-no-faded-h": e.isRightFocused(),
                        "dcg-no-faded-v": e.isBottomFocused()
                    }
                },
                "expr-id": function() {
                    return e.model.id
                },
                didMount: this.bindFn(this.didMountContainer),
                onKeydown: this.bindFn(this.onKeydown)
            }, r.createElement("div", {
                class: r.const("dcg-fade-container dcg-disable-horizontal-scroll-to-cursor")
            }, r.createElement("div", {
                class: r.const("dcg-main")
            }, r.createElement("div", {
                class: r.const("dcg-table-container"),
                tabindex: function() {
                    return e.controller.isInEditListMode() ? 0 : -1
                },
                "aria-label": function() {
                    return e.controller.getBrailleMode(),
                    e.controller.s("graphing-calculator-narration-expression-index-table", {
                        index: e.model.displayIndex
                    })
                },
                didMount: this.bindFn(this.didMountContainer),
                manageFocus: this.const({
                    shouldBeFocused: this.shouldBeFocused.bind(this),
                    onFocusedChanged: this.onFocusedChanged.bind(this)
                })
            }, r.createElement("div", {
                class: r.const("dcg-table-sliding-container"),
                style: function() {
                    return {
                        transform: "translateX(" + e.computeScrolledX() + "px)"
                    }
                }
            }, r.createElement(m, {
                each: function() {
                    return e.getVisibleRowModels()
                },
                key: function(t) {
                    return "blank-row" === t.type ? "blank-row-" + t.guid + "-" + t.rows + "-" + e.getCols() : t.guid
                }
            }, r.createElement("div", {
                role: r.const("grid"),
                class: function() {
                    return {
                        "dcg-tabledata": !0,
                        "dcg-focus-in-bottom-row": e.isBottomFocused(),
                        "dcg-focus-in-right-column": e.isRightFocused()
                    }
                }
            }, function(t) {
                return "show-more" === t.type ? r.createElement("tr", {
                    role: r.const("row"),
                    class: r.const("dcg-show-more-row")
                }, r.createElement("td", {
                    colspan: e.bindFn(e.getCols)
                }, e.bindFn(e.missingRowMessage), r.createElement("div", {
                    tabindex: r.const(0),
                    role: r.const("button"),
                    class: r.const("dcg-show-more"),
                    onTap: function() {
                        return e.controller.dispatch({
                            type: "table-show-more-rows",
                            id: e.id
                        })
                    }
                }, function() {
                    return e.controller.s("graphing-calculator-button-show-all-table-rows")
                }))) : "blank-row" === t.type ? r.createElement("tr", {
                    role: r.const("row"),
                    class: r.const("dcg-blank-row")
                }, r.createElement("td", {
                    colspan: e.bindFn(e.getCols),
                    style: function() {
                        return {
                            height: t.rows * e.getRowHeight() + "px"
                        }
                    }
                })) : r.createElement(m, {
                    each: function() {
                        return t.cells
                    },
                    key: function(e) {
                        return e.guid
                    }
                }, r.createElement("tr", {
                    role: r.const("row"),
                    "aria-rowindex": function() {
                        return t.index
                    },
                    class: function() {
                        return {
                            "dcg-row": t,
                            "dcg-braille-row": "none" !== e.controller.getBrailleMode()
                        }
                    }
                }, function(t) {
                    return "header" === t.type ? r.createElement(i.default, {
                        controller: e.props.controller,
                        model: e.const(t)
                    }) : r.createElement(s.default, {
                        controller: e.props.controller,
                        model: e.const(t)
                    })
                }))
            }))))), r.createElement("i", {
                class: r.const("dcg-icon-remove dcg-top-level-delete"),
                handleEvent: r.const("true"),
                onTap: this.bindFn(this.onDelete)
            })), r.createElement("span", {
                class: r.const("dcg-tab dcg-action-drag"),
                handleevent: r.const("true"),
                tapboundary: r.const("true"),
                disablescroll: r.const("true"),
                style: r.const("touch-action:none"),
                onTapStart: this.bindFn(this.onDragPending)
            }, r.createElement("span", {
                class: r.const("dcg-num")
            }, function() {
                return e.model.displayIndex
            }), r.createElement("div", {
                class: r.const("dcg-tab-interior")
            }), r.createElement(h.SuggestedZoomView, {
                model: this.props.model,
                controller: this.props.controller
            })), r.createElement(u.ExpressionEditActions, {
                controller: this.props.controller,
                id: function() {
                    return e.model.id
                }
            }))
        }
        ,
        l.prototype.getCols = function() {
            return this.model.rowModels[0].cells.length - 1
        }
        ,
        l.prototype.getRowHeight = function() {
            return this.controller.getGraphSettings().config.projectorMode ? 38 : 33
        }
        ,
        l.prototype.getVisibleRowModels = function() {
            var e = this.model.rowModels;
            if (e.length <= 25)
                return e;
            var t = c.getCollapsedRange(this.model);
            if (void 0 !== t) {
                var o = e.slice(0, t.min);
                return (o = o.concat({
                    type: "show-more",
                    guid: "show-more"
                })).concat(e.slice(t.max))
            }
            var n = p.getExppanelRect(this.controller)
              , l = n ? n.height : 0
              , r = d(this.node).offset()
              , i = (r ? r.top : 0) - (n ? n.top : 0)
              , s = d(this.node).find(".dcg-row:eq(0)").height()
              , a = this.getRowHeight();
            if (l / a > e.length)
                return e;
            for (var u = [], h = (-i - s) / a, g = (l - i) / a, m = 0; m < e.length; m++) {
                var f = c.getSelectedCell(this.model);
                if (0 === m || m === e.length - 2 || f && f.row === m)
                    u.push(e[m]);
                else if (m > g || m < h) {
                    var w = u[u.length - 1];
                    w && "blank-row" === w.type ? w.rows++ : u.push({
                        type: "blank-row",
                        guid: e[m].guid,
                        rows: 1
                    })
                } else
                    u.push(e[m])
            }
            return u
        }
        ,
        l.prototype.missingRowMessage = function() {
            var e = c.getCollapsedRange(this.model);
            return void 0 === e ? "" : this.controller.s("graphing-calculator-text-table-more-rows", {
                rowCount: e.max - e.min
            })
        }
        ,
        l.prototype.didMountContainer = function(e) {
            this.node = e,
            d(e).on("scroll", function() {
                return e.scrollLeft = 0
            })
        }
        ,
        l.prototype.getSelectedCell = function() {
            return c.getSelectedCell(this.model)
        }
        ,
        l.prototype.computeScrolledX = function() {
            if (!this.getSelectedCell() || !this.node)
                return 0;
            var e = this.node.children[0]
              , t = this.node.querySelector(".dcg-selected");
            if (null === e || null === t)
                return 0;
            var o = this.node.getBoundingClientRect()
              , n = t.getBoundingClientRect()
              , l = n.left - e.getBoundingClientRect().left
              , r = o.width - l - n.width - 80
              , i = Math.min(0, o.width - e.scrollWidth - 30);
            return r = Math.max(r, i),
            Math.min(0, r)
        }
        ,
        l.prototype.isBottomFocused = function() {
            var e = this.getSelectedCell();
            return !!e && e.row === this.model.columnModels[0].cells.length
        }
        ,
        l.prototype.isRightFocused = function() {
            var e = this.getSelectedCell();
            return !!e && e.column === this.model.columnModels.length - 1
        }
        ,
        l.prototype.isFocused = function() {
            return !!this.getSelectedCell()
        }
        ,
        l.prototype.onKeydown = function(e) {
            this.controller.isInEditListMode() || !e.ctrlKey || e.shiftKey || e.altKey || e.metaKey || ("Up" === o.lookup(e) ? (e.preventDefault(),
            e.stopPropagation(),
            this.moveToFirstCellInColumn()) : "Down" === o.lookup(e) ? (e.preventDefault(),
            e.stopPropagation(),
            this.moveToLastCellInColumn()) : "Left" === o.lookup(e) ? (e.preventDefault(),
            e.stopPropagation(),
            this.moveToFirstCellInRow()) : "Right" === o.lookup(e) ? (e.preventDefault(),
            e.stopPropagation(),
            this.moveToLastCellInRow()) : "H" === o.lookupChar(e) && (e.preventDefault(),
            e.stopPropagation(),
            this.speakColumnHeader()))
        }
        ,
        l.prototype.moveToFirstCellInColumn = function() {
            var e = this.getSelectedCell();
            e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.id,
                    location: {
                        row: 0,
                        column: e.column
                    }
                }
            })
        }
        ,
        l.prototype.moveToLastCellInColumn = function() {
            var e = this.getSelectedCell();
            e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.id,
                    location: {
                        row: this.model.rowModels.length - 1,
                        column: e.column
                    }
                }
            })
        }
        ,
        l.prototype.moveToFirstCellInRow = function() {
            var e = this.getSelectedCell();
            e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.id,
                    location: {
                        row: e.row,
                        column: 0
                    }
                }
            })
        }
        ,
        l.prototype.moveToLastCellInRow = function() {
            var e = this.getSelectedCell();
            e && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table",
                    id: this.id,
                    location: {
                        row: e.row,
                        column: this.model.columnModels[0].cells.length - 1
                    }
                }
            })
        }
        ,
        l.prototype.speakColumnHeader = function() {
            var e = this.controller.s("graphing-calculator-narration-table-no-column-header")
              , t = this.getSelectedCell();
            if (t) {
                var o = this.model.rowModels[0].cells[t.column];
                if (o && "header" === o.type && o.latex && "" !== o.latex)
                    e = a.MQ.StaticMath(d("<span>" + o.latex + "</span>")[0]).mathspeak()
            }
            n.alert(e)
        }
        ,
        l.prototype.focusHelperOptions = function() {
            return {
                controller: this.controller,
                location: {
                    type: "table-container",
                    id: this.model.id
                }
            }
        }
        ,
        l.prototype.shouldBeFocused = function() {
            return g.defaultShouldBeFocused(this.focusHelperOptions())
        }
        ,
        l.prototype.onFocusedChanged = function(e) {
            if (this.controller.isInEditListMode())
                return g.defaultOnFocusChanged(this.focusHelperOptions(), e)
        }
        ,
        l
    }(l.default);
    e.default = f
});
