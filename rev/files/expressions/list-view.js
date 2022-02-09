define('expressions/list-view', ["require", "exports", "tslib", "touchtracking", "keys", "dcgview", "jquery", "underscore", "lib/conditional_blur", "./expression_view", "./text_view", "./table-view", "./folder-view", "./image-view", "./shell_view", "./drag_container_view", "main/data_helpers", "./new_expression_view", "./expressions-header", "main/load-graph-from-link", "lib/get-clipboard-data", "graphing-calc/models/abstract-item", "graphing-calc/models/list", "graphing-calc/models/expression", "./exp-list-resizer", "./item-settings-view", "./expression-search-bar", "./ticker", "loadcss!./list-view", "loadcss!expressions", "jquery.handleevent"], function(require, e, t, n, o, r, i, l, s, a, c, p, d, u, f, h, g, m, y, v, x, E, b, D, w, k, P, L) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var F = r.Components
      , S = F.If
      , T = F.For
      , M = F.Switch
      , C = F.SwitchUnion
      , I = function(e) {
        function F() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.guid = l.uniqueId("listView"),
            t
        }
        return t.__extends(F, e),
        F.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        F.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                didMount: this.bindFn(this.didMountContainer)
            }, r.createElement("div", {
                class: r.const("dcg-exppanel-outer"),
                onDrop: this.bindFn(this.onDrop),
                style: function() {
                    return e.computeExppanelOuterStyle()
                }
            }, r.createElement(S, {
                predicate: function() {
                    return e.controller.isFileDraggedOver()
                }
            }, function() {
                return r.createElement("div", {
                    class: r.const("dcg-drop-image")
                }, r.createElement("span", null, function() {
                    return e.controller.s("graphing-calculator-label-drop-image-here")
                }))
            }), r.createElement("div", {
                class: function() {
                    return {
                        "dcg-exppanel-container": !0,
                        "dcg-add-shadow": e.controller.shouldRenderList()
                    }
                },
                style: function() {
                    return {
                        transform: e.controller.isListVisible() ? void 0 : e.controller.isNarrow() ? "translate(0, 100%)" : "translate(-100%, 0)"
                    }
                }
            }, r.createElement(S, {
                predicate: function() {
                    return e.controller.shouldRenderList()
                }
            }, function() {
                return r.createElement(y.default, {
                    controller: e.props.controller,
                    expsScrolled: function() {
                        return !!e.exppanel && e.exppanel.scrollTop > 0
                    }
                })
            }), r.createElement(S, {
                predicate: function() {
                    return e.controller.getExpressionSearchOpen()
                }
            }, function() {
                return r.createElement(P.ExpressionSearchBar, {
                    controller: e.props.controller,
                    expsScrolled: function() {
                        return !!e.exppanel && e.exppanel.scrollTop > 0
                    }
                })
            }), r.createElement(S, {
                predicate: function() {
                    return e.controller.getTickerOpen()
                }
            }, function() {
                return r.createElement(L.Ticker, {
                    controller: e.props.controller,
                    expsScrolled: function() {
                        return !!e.exppanel && e.exppanel.scrollTop > 0
                    }
                })
            }), r.createElement(S, {
                predicate: function() {
                    return e.controller.shouldRenderList()
                }
            }, function() {
                return r.createElement("div", {
                    class: function() {
                        return {
                            "dcg-exppanel": !0,
                            "dcg-disable-horizontal-scroll-to-cursor": !0,
                            "dcg-isDragging": e.controller.isDragDropActive(),
                            "dcg-has-background-color": e.controller.hasBackgroundColor()
                        }
                    },
                    style: function() {
                        return {
                            background: e.controller.getBackgroundColor()
                        }
                    },
                    onPaste: e.bindFn(e.onPaste),
                    onTapStart: e.bindFn(e.onExppanelTapstart),
                    didMount: e.bindFn(e.didMountExppanel)
                }, r.createElement("div", {
                    class: r.const("dcg-expressionlist"),
                    role: r.const("complementary"),
                    "aria-label": function() {
                        return e.controller.s("graphing-calculator-narration-expression-list")
                    }
                }, r.createElement(T, {
                    each: function() {
                        return e.controller.getAllItemModels()
                    },
                    key: function(e) {
                        return e.guid
                    }
                }, r.createElement("span", {
                    class: r.const("dcg-template-expressioneach")
                }, function(t) {
                    return C(function() {
                        return E.getDisplayState(t)
                    }, {
                        shell: function() {
                            return e.makeShellViewForModel(t)
                        },
                        render: function() {
                            return e.makeViewForModel(t)
                        },
                        none: function() {}
                    })
                })), r.createElement(m.default, {
                    controller: function() {
                        return e.props.controller()
                    }
                }), r.createElement(M, {
                    key: function() {
                        return e.controller.getDraggedItemId()
                    }
                }, function(t) {
                    if (t) {
                        var n = e.controller.getItemModel(t);
                        return r.createElement(h.default, {
                            controller: e.props.controller
                        }, e.makeDragCopyViewForModel(n))
                    }
                }), r.createElement("div", {
                    class: r.const("dcg-expressions-branding"),
                    style: function() {
                        return {
                            opacity: e.controller.isKeypadOpen() ? 0 : 1
                        }
                    }
                }, r.createElement(S, {
                    predicate: function() {
                        return e.controller.canEditOnWeb()
                    }
                }, function() {
                    return r.createElement("span", {
                        role: r.const("link"),
                        tabindex: r.const(0),
                        class: r.const("dcg-edit-branding"),
                        onTap: function() {
                            return e.controller.dispatch({
                                type: "open-on-web"
                            })
                        }
                    }, r.createElement("div", {
                        class: r.const("dcg-powered-by"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-edit-graph-on-desmos")
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-button-edit-graph-on-desmos-logo")
                    }), r.createElement("i", {
                        class: r.const("dcg-icon-desmos")
                    }))
                }), r.createElement(S, {
                    predicate: function() {
                        return !e.controller.canEditOnWeb()
                    }
                }, function() {
                    return r.createElement("span", {
                        class: r.const("dcg-noedit-branding")
                    }, r.createElement("div", {
                        class: r.const("dcg-powered-by"),
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-powered-by-desmos")
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-label-powered-by")
                    }), r.createElement("i", {
                        class: r.const("dcg-icon-desmos")
                    }))
                }))))
            })), r.createElement(w.ExpListResizer, {
                controller: this.props.controller
            })), r.createElement(k.ItemSettingsView, {
                controller: this.props.controller
            }))
        }
        ,
        F.prototype.makeShellViewForModel = function(e) {
            return r.createElement(f.default, {
                controller: this.props.controller,
                model: function() {
                    return e
                },
                onDragPending: function() {},
                isDragCopy: function() {
                    return !1
                }
            })
        }
        ,
        F.prototype.computeExppanelOuterStyle = function() {
            this.getListBottomAndUpdateLastExpressionPadding();
            var e = this.controller.computeMajorLayout().list
              , t = e.top;
            return e.top > 0 && !this.controller.isListVisible() && (t -= e.height),
            {
                position: "absolute",
                left: "0px",
                top: t + "px",
                width: e.width + "px",
                height: e.height + "px"
            }
        }
        ,
        F.prototype.makeDragCopyViewForModel = function(e) {
            return this.makeViewForModel(e, !0)
        }
        ,
        F.prototype.makeViewForModel = function(e, t) {
            var n, o = this;
            if (void 0 === t && (t = !1),
            "table" === e.type)
                n = r.createElement(p.default, {
                    controller: this.props.controller,
                    model: function() {
                        return e
                    },
                    onDragPending: function(t) {
                        return o.onDragPending(t, e.id)
                    },
                    isDragCopy: function() {
                        return t
                    }
                });
            else if ("folder" === e.type)
                n = r.createElement(d.default, {
                    controller: this.props.controller,
                    model: function() {
                        return e
                    },
                    onDragPending: function(t) {
                        return o.onDragPending(t, e.id)
                    },
                    isDragCopy: function() {
                        return t
                    }
                });
            else if ("text" === e.type)
                n = r.createElement(c.default, {
                    controller: this.props.controller,
                    model: function() {
                        return e
                    },
                    onDragPending: function(t) {
                        return o.onDragPending(t, e.id)
                    },
                    isDragCopy: function() {
                        return t
                    }
                });
            else if ("image" === e.type)
                n = r.createElement(u.default, {
                    controller: this.props.controller,
                    model: function() {
                        return e
                    },
                    onDragPending: function(t) {
                        return o.onDragPending(t, e.id)
                    },
                    isDragCopy: function() {
                        return t
                    }
                });
            else {
                if ("expression" !== e.type)
                    return;
                n = r.createElement(a.default, {
                    controller: this.props.controller,
                    model: function() {
                        return e
                    },
                    onDragPending: function(t) {
                        return o.onDragPending(t, e.id)
                    },
                    isDragCopy: function() {
                        return t
                    }
                })
            }
            return n
        }
        ,
        F.prototype.didUnmount = function() {
            i(document.documentElement).off("." + this.guid)
        }
        ,
        F.prototype.didMountContainer = function(e) {
            this.node = e,
            i(document.documentElement).on("keydown." + this.guid, this.bindFn(this.handleKeyDown))
        }
        ,
        F.prototype.didMountExppanel = function(e) {
            this.exppanel = e
        }
        ,
        F.prototype.getListBottomAndUpdateLastExpressionPadding = function() {
            var e = this.controller.getKeypadHeight()
              , t = this.__listBottom || 0;
            return this.__listBottom = e,
            0 === e && 0 !== t && n.isTapActive() && this.padLastExpressionUntilTapEnd(t),
            e
        }
        ,
        F.prototype.padLastExpression = function(e) {
            i(this.node).find(".dcg-expressionitem.dcg-new-expression").css("margin-bottom", e + "px")
        }
        ,
        F.prototype.unpadLastExpression = function() {
            i(this.node).find(".dcg-expressionitem.dcg-new-expression").css("margin-bottom", "0")
        }
        ,
        F.prototype.padLastExpressionUntilTapEnd = function(e) {
            var t = this;
            this.padLastExpression(e),
            i(document).on("dcg-tap.animating-bottom", function() {
                t.unpadLastExpression(),
                i(document).off("dcg-tap.animating-bottom")
            })
        }
        ,
        F.prototype.handleKeyDown = function(e) {
            if (!this.controller.inAudioTraceMode()) {
                var t = o.lookup(e)
                  , n = o.lookupChar(e)
                  , r = this.controller.getSelectedItem();
                if (r) {
                    var l = this.controller.getFocusLocation();
                    if (e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey && void 0 !== l) {
                        if ("O" === n) {
                            e.preventDefault(),
                            e.stopPropagation();
                            var s = void 0;
                            if ("expression" === r.type)
                                r.sliderExists || D.isNonemptyAction(r) ? r.sliderExists && (s = {
                                    type: "slider",
                                    model: r,
                                    focusFirstOption: !0,
                                    previousFocusLocation: l
                                },
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "slider-animation-properties-icon",
                                        id: r.id
                                    }
                                })) : (s = {
                                    type: "expression",
                                    model: r,
                                    focusFirstOption: !0,
                                    previousFocusLocation: l
                                },
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "expression-icon",
                                        id: r.id
                                    }
                                }));
                            else if ("image" === r.type)
                                s = {
                                    type: "image",
                                    model: r,
                                    focusFirstOption: !0,
                                    previousFocusLocation: l
                                },
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "image-icon",
                                        id: r.id
                                    }
                                });
                            else if ("table" === r.type && "table" === l.type) {
                                var a = l.location;
                                if (!a)
                                    return;
                                var c = r.columnModels[a.column];
                                if (!c)
                                    return;
                                if ("" === c.latex)
                                    return;
                                if (!this.controller.getGraphSettings().config.graphpaper)
                                    return;
                                if (c.error)
                                    return;
                                if (0 === c.index)
                                    return;
                                s = {
                                    type: "table-column",
                                    model: c,
                                    focusFirstOption: !0,
                                    previousFocusLocation: l
                                },
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "table-icon",
                                        id: r.id,
                                        columnId: c.id
                                    }
                                })
                            }
                            if (!s)
                                return;
                            return void this.controller.dispatch({
                                type: "toggle-item-settings-menu",
                                menu: s
                            })
                        }
                        if ("D" === n)
                            return e.preventDefault(),
                            e.stopPropagation(),
                            void this.controller.dispatch({
                                type: "delete-item-and-animate-out",
                                id: r.id,
                                setFocusAfterDelete: !0
                            })
                    }
                    if (!this.controller.isInEditListMode() || e.altKey || e.ctrlKey || e.metaKey) {
                        if ((!document.activeElement || !i.contains(document.body, document.activeElement)) && !i(e.target).closest(this.exppanel).length && i.contains(document.documentElement, e.target))
                            switch (t) {
                            case o.UP:
                                e.preventDefault(),
                                this.controller.dispatch({
                                    type: "select-previous-expression"
                                });
                                break;
                            case o.DOWN:
                                e.preventDefault(),
                                this.controller.dispatch({
                                    type: "select-next-expression"
                                });
                                break;
                            case o.ESCAPE:
                                e.preventDefault(),
                                this.controller.dispatch({
                                    type: "set-none-selected"
                                });
                                break;
                            case o.RIGHT:
                                e.preventDefault(),
                                r && ("expression" === r.type && r.sliderExists ? (this.controller.dispatch({
                                    type: "adjust-slider-by-keyboard",
                                    id: r.id,
                                    adjustment: "up"
                                }),
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "slider-thumb",
                                        id: r.id
                                    }
                                })) : this.controller.dispatch({
                                    type: "move-focus-to-item",
                                    id: r.id,
                                    where: "start"
                                }));
                                break;
                            case o.TAB:
                                e.preventDefault(),
                                r && this.controller.dispatch({
                                    type: "move-focus-to-item",
                                    id: r.id,
                                    where: "start"
                                });
                                break;
                            case o.LEFT:
                                e.preventDefault(),
                                r && ("expression" === r.type && r.sliderExists ? (this.controller.dispatch({
                                    type: "adjust-slider-by-keyboard",
                                    id: r.id,
                                    adjustment: "down"
                                }),
                                this.controller.dispatch({
                                    type: "set-focus-location",
                                    location: {
                                        type: "slider-thumb",
                                        id: r.id
                                    }
                                })) : this.controller.dispatch({
                                    type: "move-focus-to-item",
                                    id: r.id,
                                    where: "end"
                                }));
                                break;
                            case o.BACKSPACE:
                                e.preventDefault(),
                                r && this.controller.dispatch({
                                    type: "upward-delete-selected-expression"
                                });
                                break;
                            case o.DELETE:
                                e.preventDefault(),
                                r && this.controller.dispatch({
                                    type: "downward-delete-selected-expression"
                                });
                                break;
                            case o.ENTER:
                                e.wasHandled("create-expression-with-keyboard") || (e.preventDefault(),
                                e.handle("create-expression-with-keyboard"),
                                r && this.controller.dispatch({
                                    type: "on-special-key-pressed",
                                    key: "Enter"
                                }));
                                break;
                            default:
                                if (e.metaKey || e.ctrlKey || t === o.SHIFT || t === o.SPACEBAR)
                                    return;
                                r && ("table" === r.type || this.controller.dispatch({
                                    type: "move-focus-to-item",
                                    id: r.id,
                                    where: "end"
                                }))
                            }
                    } else if (t === o.TAB && void 0 !== l) {
                        var p = this.controller.getItemModelByIndex(0);
                        if (!p)
                            return;
                        var d = ("readonly-expression" === l.type && "expression" === p.type || "table-container" === l.type && "table" === p.type || l.type === p.type) && l.id === p.id
                          , u = {
                            type: "edit-list-toggle"
                        }
                          , f = this.controller.isFocusLocationFocused(u);
                        e.shiftKey && d ? (e.preventDefault(),
                        e.stopPropagation(),
                        this.controller.dispatch({
                            type: "set-focus-location",
                            location: u
                        })) : !e.shiftKey && f && (e.preventDefault(),
                        e.stopPropagation(),
                        this.controller.dispatch({
                            type: "move-focus-to-item",
                            id: p.id,
                            where: "table" === p.type ? "container" : void 0
                        }))
                    } else if (t === o.UP || t === o.DOWN) {
                        var h = this.controller.getListModel()
                          , g = t === o.UP ? b.findPrevSelectableItem(h, r.index) : b.findNextSelectableItem(h, r.index);
                        if (!g)
                            return;
                        this.controller.dispatch({
                            type: "move-focus-to-item",
                            id: g.id,
                            where: "table" === g.type ? "container" : "start"
                        })
                    }
                }
            }
        }
        ,
        F.prototype.onDragPending = function(e, t) {
            var n = this;
            e.preventDefault(),
            s.default();
            var o = e.touches[0].clientY
              , r = o
              , l = setTimeout(function() {
                i(document).off(".dragpending"),
                n.onDragStart(e, t, o, r)
            }, 500);
            i(document).on("dcg-tapmove.dragpending", function(s) {
                r = s.touches[0].clientY,
                Math.abs(r - o) > 3 && (clearTimeout(l),
                i(document).off(".dragpending"),
                n.onDragStart(e, t, o, r))
            }),
            i(document).on("dcg-tapend.dragpending", function() {
                clearTimeout(l),
                i(document).off(".dragpending")
            })
        }
        ,
        F.prototype.onDragStart = function(e, t, n, o) {
            1 === e.touches.length && (e.wasHandled("dcg-longhold") || this.controller.dispatch({
                type: "start-dragdrop",
                id: t,
                grabY: n,
                mouseY: o
            }))
        }
        ,
        F.prototype.onExppanelTapstart = function(e) {
            "mouse" !== e.device && 0 === i(e.target).closest(".dcg-expressionitem").length && s.default()
        }
        ,
        F.prototype.onPaste = function(e) {
            var t = this
              , n = this.controller.getGraphSettings().config
              , o = x.default(e);
            if (o) {
                var r = /^\s*https?:\/\/([a-zA-Z0-9]*\.)?desmos\.com(:[0-9]+)?\/calculator\/./.test(o)
                  , i = this.controller.getSelectedItem();
                if (n.pasteGraphLink && i && "folder" === i.type && r && "" === i.title)
                    return e.stopPropagation(),
                    e.preventDefault(),
                    void v.default(this.controller, o, function(e, t) {
                        return t(null, e)
                    });
                if (!i || "text" !== i.type && "folder" !== i.type)
                    if (n.pasteGraphLink && r) {
                        e.stopPropagation(),
                        e.preventDefault();
                        var l = n.pasteGraphLinkCallback ? n.pasteGraphLinkCallback : function(e, t) {
                            return t(null, e)
                        }
                        ;
                        v.default(this.controller, o, l)
                    } else {
                        if (n.pasteTableData) {
                            var s = g.parse(o);
                            if (void 0 !== s)
                                return e.stopPropagation(),
                                e.preventDefault(),
                                this.controller.dispatch({
                                    type: "paste-table",
                                    data: s
                                })
                        }
                        var a = g.getExpressions(o);
                        if (void 0 === a)
                            ;
                        else {
                            e.stopPropagation(),
                            e.preventDefault();
                            var c = [];
                            1 === a.length && a[0].numberList ? this.controller.dispatch({
                                type: "append-number-list",
                                latex: a[0].content
                            }) : (a.forEach(function(e) {
                                c.push({
                                    type: "expression",
                                    id: t.controller.generateId(),
                                    latex: e.content
                                })
                            }),
                            this.controller.dispatch({
                                type: "insert-several-expressions",
                                expressions: c
                            }))
                        }
                    }
            }
        }
        ,
        F.prototype.onDrop = function(e) {
            if (this.controller.areImagesEnabled()) {
                var t = e.dataTransfer && e.dataTransfer.files;
                t && this.controller.dispatch({
                    type: "new-images",
                    files: t
                })
            }
        }
        ,
        F
    }(r.Class);
    e.default = I
});