define('main/controller', ["require", "exports", "main/propagate_selection", "tslib", "scroll_helpers", "graphing/grapher", "browser", "core/lib/label", "underscore", "lib/i18n", "flux", "core/types/opacity", "core/lib/dragmode", "core/types/styles", "lib/conditional_blur", "core/lib/deepCopy", "core/lib/number-to-latex", "lib/state-stack", "graphing/viewport", "core/graphing-calc/migrate-state", "core/math/expression-types", "lib/smart-slider-defaults", "core/lib/color-helpers", "graphing-calc/models/expression", "core/graphing-calc/json/expression", "graphing-calc/models/expression", "graphing-calc/models/table", "graphing-calc/models/image", "graphing-calc/models/folder", "graphing-calc/models/text", "graphing-calc/models/ticker", "graphing-calc/models/list", "graphing-calc/models/abstract-item", "graphing-calc/models/focus", "graphing-calc/actions/keyboard", "main/expression-zoom-helpers", "core/math/evaluate-single-expression", "./layout-model", "./settings-view-model", "jquery", "bugsnag", "expressions/list_move_controller", "./blank_state", "dcgview-helpers/mathquill-view", "expressions/measure-expressions", "expressions/dragdrop_expressions", "keypad/mq-commands", "core/lib/random-seed", "../shared-components/mathquill-braille-wrapper"], function(require, e, t, i, s, o, r, a, n, l, d, p, c, h, u, g, m, y, f, b, I, x, S, M, v, k, _, w, L, A, E, F, D, C, T, O, P, V, R, U, N, B, H, q, z, G, W, j, K) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var Y = function() {
        function e(e) {
            var t = this;
            this.__nextItemId = 0,
            this.__pendingImageUploads = {},
            this.nextSubscription = 0,
            this.subscriptions = {},
            this._queuedCallbacks = [],
            this._hasUnsavedChanges = !1,
            this.shouldScrollSelectedItemIntoViewAfterDispatch = !1,
            this.lastParsableObjects = {},
            this.expressionSearchCount = 0,
            this.expressionSearchOpen = !1,
            this.canShowKeyboardShortcuts = !1,
            this.toastData = {},
            this.s = l.createDictionaryLookupFunction(function() {
                return t.graphSettings.config.language
            }),
            this.raw = function(e, t) {
                return l.raw(e, t)
            }
            ,
            this.hasTranslation = function(e) {
                var i = t.graphSettings.config.language;
                return l.hasTranslation(e, i)
            }
            ,
            this.unpack = function(e) {
                var i = t.graphSettings.config.language;
                return l.unpack(e, i)
            }
            ,
            this.dispatch = function(e) {
                var i;
                if ("blur-focus-location" === e.type && t.dispatcher.isDispatching())
                    t.runAfterDispatch(function() {
                        t.dispatch(e)
                    });
                else if ("set-focus-location" === e.type && t.dispatcher.isDispatching())
                    t.runAfterDispatch(function() {
                        t.dispatch(e)
                    });
                else if ("tick" === e.type && t.dispatcher.isDispatching())
                    t.runAfterDispatch(function() {
                        t.dispatch(e)
                    });
                else
                    for ("tick" === e.type || N.leaveBreadcrumb("dispatch::" + t.bugsnagContext, {
                        type: e.type
                    }),
                    t.dispatcher.isDispatching() && N.leaveBreadcrumb("dispatch-in-dispatch::" + t.bugsnagContext, {
                        type: e.type
                    }),
                    t.dispatcher.dispatch(e),
                    t.onEventsEmitted && t.onEventsEmitted(t.enqueuedEvents); i = t._queuedCallbacks.shift(); )
                        i()
            }
            ,
            this._requiresTickNextFrame = !1,
            this.updateViews = function() {
                for (var e in t.subscriptions)
                    t.subscriptions[e]()
            }
            ,
            this.bugsnagContext = "",
            this.inPrintMode = !1,
            this.lastInfiniteScrollFirstDOM = void 0,
            this.lastInfiniteScrollLastDOM = void 0,
            this.hasDispatchSinceLastInfiniteScrollUpdate = !1,
            this.stateStack = new y.default,
            this.isCurrentlyDoingSetState = !1,
            this.isCurrentlyDoingRestoreState = !1,
            this.graphSettings = e,
            this.listModel = F.init(this),
            this.layoutModel = V.defaultLayoutModel(this.graphSettings.config),
            this.layoutMeasurements = {
                width: 0,
                height: 0
            },
            this.settingsViewModel = R.defaultSettingsViewModel(),
            this.imageRetryState = {
                lastAttemptTime: 0,
                attempts: 0
            },
            this.setupDispatcher()
        }
        return e.prototype.hasUnsavedChanges = function() {
            return this._hasUnsavedChanges
        }
        ,
        e.prototype.getExpressionSearchOpen = function() {
            return this.expressionSearchOpen
        }
        ,
        e.prototype.getTickerOpen = function() {
            return !!this.areActionsEnabled() && this.listModel.ticker.open
        }
        ,
        e.prototype.getTickerPlaying = function() {
            return !!this.areActionsEnabled() && this.listModel.ticker.playing
        }
        ,
        e.prototype.hasVisibleAndUndoableToast = function() {
            return "function" == typeof this.toastData.undoCallback
        }
        ,
        e.prototype.getToastData = function() {
            return this.toastData
        }
        ,
        e.prototype.toastUndo = function() {
            "function" == typeof this.toastData.undoCallback && (this.toastData.undoCallback(),
            this.dispatch({
                type: "toast/close"
            }))
        }
        ,
        e.prototype.runAfterDispatch = function(e) {
            this.dispatcher.isDispatching() ? this._queuedCallbacks.push(e) : e()
        }
        ,
        e.prototype.enqueueEvent = function(e) {
            this.enqueuedEvents[e] = !0
        }
        ,
        e.prototype.setRandomSeed = function(e) {
            this.graphSettings.setProperty("randomSeed", e)
        }
        ,
        e.prototype.getRandomSeed = function() {
            return this.graphSettings.randomSeed
        }
        ,
        e.prototype.shouldDispatchTickNextFrame = function() {
            return !!this._requiresTickNextFrame
        }
        ,
        e.prototype.markTickRequiredNextFrame = function() {
            this._requiresTickNextFrame = !0
        }
        ,
        e.prototype.handleTick = function(e) {
            this.areActionsEnabled() && E.shouldTick(this.listModel.ticker, {
                currentFrameTime: e,
                previousFrameTime: this.lastFrameTime
            }) ? this.dispatch({
                type: "tick-ticker",
                time: e
            }) : this.shouldDispatchTickNextFrame() && this.dispatch({
                type: "tick",
                time: e
            }),
            this.lastFrameTime = e
        }
        ,
        e.prototype.setupDispatcher = function() {
            var e = this;
            this.dispatcher = new d.Dispatcher,
            this.dispatcher.register(function(t) {
                var i, s = e.getSelectedItem(), o = e.getFocusLocation();
                e.shouldScrollSelectedItemIntoViewAfterDispatch = !1,
                e.enqueuedEvents = {
                    change: !1,
                    graphReset: !1,
                    clearUnsavedChanges: !1,
                    openDrawer: !1,
                    showHotkeysModal: !1,
                    userMovedPoint: !1,
                    userClickedObject: !1,
                    userEditedLabel: !1
                },
                "tick" === t.type && (e._requiresTickNextFrame = !1),
                e.isCurrentlyDoingSetState = !1,
                e.isCurrentlyDoingRestoreState = !1,
                e.handleDispatchedAction(t),
                e.updateTheComputedWorld();
                var r = e.getImageToRetry();
                (e.getPlayingSliders().length > 0 || e.hasAnyTableThatRequiresTicks() || e.isDragDropActive() || r) && e.markTickRequiredNextFrame(),
                r && e.retryLoadingFailedImage(r),
                "undo" === t.type || "redo" === t.type || e.isDragDropActive() || e.commitUndoRedoSynchronously(t),
                e.requestParseForAllItems(),
                e.isCurrentlyDoingSetState = !1,
                e.isCurrentlyDoingRestoreState = !1,
                e.enqueuedEvents.change && e.grapher && e.grapher.markLabelsDirty(),
                e.enqueuedEvents.clearUnsavedChanges ? e._hasUnsavedChanges = !1 : e.enqueuedEvents.change && (e._hasUnsavedChanges = !0);
                var a = e.getSelectedItem();
                a ? s && s.guid === a.guid || (e.shouldScrollSelectedItemIntoViewAfterDispatch = !0) : e.shouldScrollSelectedItemIntoViewAfterDispatch = !1;
                var l = e.getFocusLocation();
                l && !n.isEqual(l, o) && (e.getFocusedItem() == a && (e.shouldScrollSelectedItemIntoViewAfterDispatch = !0));
                o && s && "table" === s.type && "table" === o.type && (!l || "table" !== l.type || o.id !== l.id) && s.isExpanded && (_.setExpanded(s, !1),
                l || (i = s)),
                l && a && "table" === a.type && _.updateIsCollapsedByFocusLocation(a),
                e.updateRenderShellsBeforePaint(),
                e.updateViews(),
                i ? e.scrollItemIntoView(i) : e.shouldScrollSelectedItemIntoViewAfterDispatch && e.scrollSelectedItemIntoView(),
                e.updateDragDrop(),
                e.updateRenderShellsAfterDispatch()
            })
        }
        ,
        e.prototype.handleDispatchedAction = function(e) {
            var t = this;
            switch (e.type) {
            case "render":
                break;
            case "undo":
                this.undo();
                break;
            case "redo":
                this.redo();
                break;
            case "clear-undoredo-history":
                this.clearUndoRedoHistory();
                break;
            case "on-special-key-pressed":
                "Enter" === e.key ? T.onEnterPressed(this) : "Up" === e.key ? T.onUpPressed(this) : "Down" === e.key ? T.onDownPressed(this) : "Backspace" === e.key ? T.onBackspacePressed(this) : "Delete" === e.key && T.onDeletePressed(this);
                break;
            case "select-previous-expression":
                F.selectPrevItem(this.listModel);
                break;
            case "select-next-expression":
                F.selectNextItem(this.listModel);
                break;
            case "upward-delete-selected-expression":
                T.upwardDeleteSelectedExpression(this, {
                    moveSelection: !1
                });
                break;
            case "downward-delete-selected-expression":
                T.downwardDeleteSelectedExpression(this, {
                    moveSelection: !1
                });
                break;
            case "table-show-more-rows":
                if (!(X = this.getItemModel(e.id)) || "table" !== X.type)
                    return;
                var s = _.getCollapsedRange(X);
                if (!s)
                    return;
                F.setSelected(this.listModel, X),
                _.setExpanded(X, !0),
                C.setFocusLocation(this, {
                    type: "table",
                    id: X.id,
                    location: {
                        row: s.min,
                        column: 0
                    }
                });
                break;
            case "navigate-table-by-key":
                T.navigateTableByKey(this, e.id, e.key);
                break;
            case "delete-item-and-animate-out":
                this._deleteItemAndAnimateOut(e.id, e.setFocusAfterDelete);
                break;
            case "finish-deleting-item-after-animation":
                this._finishDeletingItemAfterAnimation(e.id, e.setFocusAfterDelete);
                break;
            case "expression-zoom-fit":
                this._expressionZoomFit(e.id);
                break;
            case "set-expression-properties-from-api":
                this._setExpressionPropertiesFromAPI(e.id, e.properties);
                break;
            case "add-item-to-end-from-api":
                this._addItemToEndFromAPI(this.createItemModel(e.state));
                break;
            case "duplicate-expression":
                if (!(m = this.getItemModel(e.id)) || "folder" === m.type)
                    return;
                this.copyExpressionToIndex(m, m.index + 1);
                break;
            case "duplicate-folder":
                var o = e.id
                  , r = this.getItemModel(o);
                if (!r || "folder" !== r.type)
                    return;
                var n = this.createItemModel(i.__assign(i.__assign({}, L.getState(r, {
                    stripDefaults: !1
                })), {
                    id: this.generateId()
                }))
                  , l = this.getNumberOfItemsInFolder(o)
                  , d = l + 1;
                this._toplevelInsertItemAt(r.index + d, n, !1, void 0);
                for (var p = r.index + 1, h = p + l, u = p; u <= h; u++) {
                    var g = F.getItemByIndex(this.listModel, u);
                    if (!g || "folder" === g.type)
                        return;
                    this.copyExpressionToIndex(g, u + d, n.id)
                }
                break;
            case "insert-item-at-index":
                var m = this.createItemModel(e.state);
                this._toplevelInsertItemAt(e.index, m, e.focus, e.folderId);
                break;
            case "new-expression-at-end":
                m = this.createItemModel({
                    type: "expression",
                    id: this.generateId(),
                    color: this.getNextColor()
                });
                this.setEditListMode(!1),
                F.insertItemAtEnd(this.listModel, m),
                C.moveFocusToItem(this, m.id);
                break;
            case "new-expression":
                m = this.createItemModel({
                    type: "expression",
                    id: this.generateId(),
                    color: this.getNextColor()
                });
                this.setEditListMode(!1),
                this._toplevelNewItemAtSelection(m, {
                    shouldFocus: !0
                }),
                this._closeAddExpression();
                break;
            case "new-text":
                m = this.createItemModel({
                    id: this.generateId(),
                    type: "text"
                });
                this._toplevelNewItemAtSelection(m, {
                    shouldFocus: !0
                }),
                this._closeAddExpression();
                break;
            case "new-folder":
                m = this.createItemModel({
                    type: "folder",
                    id: this.generateId()
                });
                this._toplevelNewItemAtSelection(m, {
                    shouldFocus: !0
                }),
                this._closeAddExpression();
                break;
            case "new-images":
                this._uploadImagesAndWaitForThemToLoad({
                    files: e.files
                }),
                this._closeAddExpression();
                break;
            case "change-image":
                this._uploadImagesAndWaitForThemToLoad({
                    files: e.files,
                    id: e.id
                });
                break;
            case "new-table":
                m = this._createTableItem();
                this._toplevelNewItemAtSelection(m, {
                    shouldFocus: !0
                }),
                this._closeAddExpression();
                break;
            case "paste-table":
                this._pasteTable(e.data);
                break;
            case "insert-several-expressions":
                this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                this._insertSeveralExpressions(e.expressions);
                break;
            case "append-number-list":
                this._appendNumberList(e.latex);
                break;
            case "remove-item-by-id":
                F.removeItemById(this.listModel, e.id);
                break;
            case "replace-item-at-index":
                m = this.createItemModel(e.state);
                this._toplevelReplaceItemAt(e.index, m, e.focus);
                break;
            case "create-sliders-for-item":
                this.createSlidersForItem(e.id, e.variables);
                break;
            case "create-sliders-for-ticker":
                this.createSlidersForTicker(e.variables);
                break;
            case "convert-image-to-draggable":
                this.convertImageToDraggable(e.id);
                break;
            case "start-dragdrop":
                if (!(X = this.getItemModel(e.id)))
                    return;
                var y = this.getItemRootNodeById(X.id);
                if (!y)
                    return;
                var f = y.getBoundingClientRect();
                F.setSelected(this.listModel, void 0);
                var b = e.grabY - f.top
                  , I = !1
                  , x = 1;
                "folder" === X.type && (x += this.getNumberOfItemsInFolder(X.id),
                X.collapsed || (I = !0,
                L.setCollapsed(X, !0))),
                F.setDragState(this.listModel, {
                    firstItemId: X.id,
                    numberOfItems: x,
                    expandFolder: I,
                    grabOffset: b,
                    mouseY: e.mouseY,
                    itemTop: 0
                }),
                this.dragdrop_expressions.startDragging(e.mouseY);
                break;
            case "update-dragdrop":
                if (!(S = this.listModel.dragState))
                    return;
                F.setDragState(this.listModel, i.__assign(i.__assign({}, S), {
                    mouseY: e.mouseY
                }));
                break;
            case "stop-dragdrop":
                var S;
                if (!(S = this.listModel.dragState))
                    return;
                var M = this.getItemModel(S.firstItemId);
                if (!M)
                    return;
                F.setSelected(this.listModel, M),
                "folder" === M.type && S.expandFolder && L.setCollapsed(M, !1),
                F.setDragState(this.listModel, void 0);
                break;
            case "set-selected-id":
                m = this.getItemModel(e.id);
                F.setSelected(this.listModel, m);
                break;
            case "set-selected-index":
                m = this.getItemModelByIndex(e.index);
                F.setSelected(this.listModel, m);
                break;
            case "set-none-selected":
                F.setSelected(this.listModel, void 0);
                break;
            case "set-focus-location":
                "table" === (e.location ? e.location.type : "") && (this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    inEditListMode: !1
                })),
                C.setFocusLocation(this, e.location);
                break;
            case "move-focus-to-item":
                C.moveFocusToItem(this, e.id, e.where);
                break;
            case "blur-focus-location":
                this.isFocusLocationFocused(e.location) && C.setFocusLocation(this, void 0);
                break;
            case "set-folder-collapsed":
                if (!(X = this.getItemModel(e.id)) || "folder" !== X.type)
                    return;
                L.setCollapsed(X, e.isCollapsed);
                break;
            case "set-all-folders-collapsed":
                F.collapseAllFolders(this.listModel, e.isCollapsed);
                break;
            case "set-item-secret":
                if (!(m = this.getItemModel(e.id)))
                    return;
                D.setSecret(m, e.isSecret);
                break;
            case "set-tablecolumn-color":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnColor(X, e.columnId, e.color);
                break;
            case "set-tablecolumn-colorlatex":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnColorLatex(X, e.columnId, e.colorLatex);
                break;
            case "set-show-cdf":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setShowCDF(X, e.showCDF);
                break;
            case "set-cdf-min":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setCDFMin(X, e.latex);
                break;
            case "set-cdf-max":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setCDFMax(X, e.latex);
                break;
            case "toggle-item-hidden":
                this._toggleItemHidden(e.id);
                break;
            case "toggle-tablecolumn-hidden":
                this._toggleTableColumnHidden(e.tableId, e.columnId);
                break;
            case "toggle-item-settings-menu":
                this.listModel.openItemMenu && e.menu.model === this.listModel.openItemMenu.model ? this.closeItemSettingsMenu() : (this.listModel.openItemMenu = e.menu,
                e.menu.focusFirstOption && C.setFocusLocation(this, {
                    type: "expression-menu",
                    id: e.menu.model.id,
                    location: "start"
                }));
                break;
            case "close-item-settings-menu":
                this.closeItemSettingsMenu();
                break;
            case "toggle-fraction-evaluation":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                var E = k.shouldEvaluationDisplayAsFraction(X);
                k.setEvaluationAsFraction(X, !E);
                break;
            case "set-item-label":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLabel(X, e.label),
                this.enqueueEvent("userEditedLabel");
                break;
            case "set-item-showlabel":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setShowLabel(X, e.showLabel),
                e.showLabel || (k.setInteractiveLabel(X, !1),
                k.setEditableLabelMode(X, v.EditableLabelMode.None));
                break;
            case "set-item-color":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setColor(X, e.color);
                break;
            case "set-item-fill":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setFill(X, e.fill),
                this._setItemHidden(X.id, k.areAllVisibilityPropsOff(X));
                break;
            case "set-image-opacity":
                if (!(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setOpacity(X, e.opacity),
                this._setItemHidden(X.id, !1);
                break;
            case "set-image-in-foreground":
                if (!(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setForeground(X, e.foreground);
                break;
            case "image-upload-error":
                this.__pendingImageUploads[e.token] && (delete this.__pendingImageUploads[e.token],
                this._showToast({
                    message: this.s("graphing-calculator-text-toast-image-upload-failed")
                }));
                break;
            case "image-upload-success":
                if (this.__pendingImageUploads[e.token])
                    if (delete this.__pendingImageUploads[e.token],
                    e.id) {
                        (X = this.getItemModel(e.id)) && "image" === X.type && w.setImageURL(X, e.url)
                    } else {
                        var O = this.createItemModel({
                            type: "image",
                            id: this.generateId(),
                            width: e.width,
                            height: e.height,
                            image_url: e.url,
                            name: e.name
                        });
                        this._toplevelNewItemAtSelection(O, {
                            shouldFocus: !1
                        })
                    }
                this.isUploadingImages() || (this.toastData = {});
                break;
            case "image-load-success":
                if (!(O = this.getItemModel(e.id)) || "image" !== O.type)
                    return;
                w.setLoadStatus(O, "loaded"),
                this.imageRetryState = {
                    lastAttemptTime: 0,
                    attempts: 0
                };
                break;
            case "image-load-error":
                if (!(O = this.getItemModel(e.id)) || "image" !== O.type)
                    return;
                w.setLoadStatus(O, "failed");
                break;
            case "image-retry-loading":
                if (!(O = this.getItemModel(e.id)) || "image" !== O.type)
                    return;
                w.retryLoading(O);
                break;
            case "set-item-dragmode":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setDragMode(X, e.dragMode);
                break;
            case "set-tablecolumn-dragmode":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnDragMode(X, e.columnId, e.dragMode),
                e.dragMode !== c.DragMode.NONE && this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-points":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnPoints(X, e.columnId, e.bool),
                this._setTableColumnHidden(e.tableId, e.columnId, _.shouldHideColumn(X, e.columnId));
                break;
            case "set-tablecolumn-lines":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnLines(X, e.columnId, e.bool),
                this._setTableColumnHidden(e.tableId, e.columnId, _.shouldHideColumn(X, e.columnId));
                break;
            case "set-tablecolumn-linestyle":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnLineStyle(X, e.columnId, e.lineStyle),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-linewidth":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnLineWidth(X, e.columnId, e.lineWidth),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-lineopacity":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnLineOpacity(X, e.columnId, e.lineOpacity),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-pointsize":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnPointSize(X, e.columnId, e.pointSize),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-pointopacity":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnPointOpacity(X, e.columnId, e.pointOpacity),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-tablecolumn-pointstyle":
                if (!(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setColumnPointStyle(X, e.columnId, e.pointStyle),
                this._setTableColumnHidden(e.tableId, e.columnId, !1);
                break;
            case "set-item-points":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPoints(X, e.points),
                this._setItemHidden(e.id, k.areAllVisibilityPropsOff(X)),
                e.points || X.dragMode === c.DragMode.NONE || k.setDragMode(X, c.DragMode.NONE);
                break;
            case "set-item-pointstyle":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPointStyle(X, e.pointStyle),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-lines":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLines(X, e.lines),
                this._setItemHidden(e.id, k.areAllVisibilityPropsOff(X));
                break;
            case "set-item-linestyle":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLineStyle(X, e.lineStyle),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-label-dropdown-open":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLabelDropdownOpen(X, e.open);
                break;
            case "set-item-fillopacity":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setFillOpacity(X, e.fillOpacity),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-lineopacity":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLineOpacity(X, e.lineOpacity),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-pointopacity":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPointOpacity(X, e.pointOpacity),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-pointsize":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPointSize(X, e.pointSize),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-linewidth":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLineWidth(X, e.lineWidth),
                this._setItemHidden(e.id, !1);
                break;
            case "set-item-colorlatex":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setColorLatex(X, e.colorLatex);
                break;
            case "set-item-labelSize":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLabelSize(X, e.labelSize);
                break;
            case "set-item-labelangle":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLabelAngle(X, e.labelAngle);
                break;
            case "set-item-label-orientation":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setLabelOrientation(X, e.labelOrientation);
                break;
            case "set-suppress-text-outline":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSuppressTextOutline(X, e.suppressTextOutline);
                break;
            case "set-item-interactive-label":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setInteractiveLabel(X, e.interactiveLabel),
                e.interactiveLabel && k.setEditableLabelMode(X, v.EditableLabelMode.None);
                break;
            case "set-item-editable-label-mode":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                X.editableLabelMode !== v.EditableLabelMode.None && e.editableLabelMode !== v.EditableLabelMode.None && X.editableLabelMode !== e.editableLabelMode && k.setLabel(X, ""),
                k.setEditableLabelMode(X, e.editableLabelMode),
                e.editableLabelMode !== v.EditableLabelMode.None && k.setInteractiveLabel(X, !1);
                break;
            case "plot-residuals":
                if (!(m = this.getItemModel(e.id)) || "expression" !== m.type)
                    return;
                var P = m.formula.regression;
                if (!P)
                    return;
                var R = P.residualSuggestionId;
                if (!R)
                    return;
                var U = this.getItemModel(R);
                if (!U)
                    return;
                _.insertBlankColumn(U, U.columnModels.length - 1, {
                    id: this.generateId(),
                    latex: a.identifierToLatex(P.residualVariable),
                    color: this.getNextColor()
                });
                break;
            case "toggle-logmode":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                var N = X.isLogModeRegression;
                k.setLogMode(X, !N);
                break;
            case "set-item-latex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(m = this.getItemModel(e.id)) || "expression" !== m.type)
                    return;
                var H = e.latex;
                if ('"' === H && this.areNotesEnabled()) {
                    var z = this.createItemModel({
                        id: this.generateId(),
                        type: "text"
                    });
                    this._toplevelReplaceItemAt(m.index, z, !0)
                } else if ("" === H)
                    k.blankOutExpressionAfterClearingLatex(m);
                else if ("ticker" === H && this.canAddTicker())
                    this.listModel.ticker.open = !0,
                    this.focusLocation = {
                        type: "ticker",
                        location: "handler"
                    },
                    this._removeExpressionSynchronously(m);
                else if ("folder" === H && this.areFoldersEnabled()) {
                    var G = this.createItemModel({
                        id: this.generateId(),
                        type: "folder"
                    });
                    F.getParentFolderModel(m) ? (this._toplevelNewItemAtSelection(G, {
                        shouldFocus: !0
                    }),
                    k.setLatex(m, "")) : this._toplevelReplaceItemAt(m.index, G, !0)
                } else if ("table" === H) {
                    var K = this._createTableItem();
                    this._toplevelReplaceItemAt(m.index, K, !0)
                } else
                    "betchacant" === H || "pride" === H ? this.runAfterDispatch(function() {
                        t.triggerEasterEgg && t.triggerEasterEgg(H)
                    }) : k.setLatex(m, H);
                break;
            case "set-visualization-prop":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setVizProp(X, e.prop, e.value);
                break;
            case "set-clickableinfo-prop":
                if (!(X = this.getItemModel(e.id)))
                    return;
                "expression" === X.type ? k.setClickableInfoProp(X, e.prop, e.value) : "image" === X.type && w.setClickableInfoProp(X, e.prop, e.value);
                break;
            case "set-clickableinfo-rule-latex":
                if (!(X = this.getItemModel(e.id)))
                    return;
                "expression" === X.type ? k.setClickableInfoRuleLatex(X, e.latex) : "image" === X.type && w.setClickableInfoRuleLatex(X, e.latex);
                break;
            case "set-folder-title":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "folder" !== X.type)
                    return;
                L.setTitle(X, e.title);
                break;
            case "set-image-mq-attribute":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setMQAttribute(X, e.attribute, e.latex);
                break;
            case "set-image-name":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setName(X, e.name);
                break;
            case "set-image-draggable":
                if (!(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                var Y = w.getCenterExternalReferencedModel(X);
                if (!Y)
                    return;
                w.setDraggable(X, e.draggable),
                !e.draggable || Y.reconciledDragMode !== c.DragMode.NONE && Y.dragMode !== c.DragMode.AUTO || k.setDragMode(Y, c.DragMode.XY);
                break;
            case "set-graph-settings":
                for (var J in e)
                    "type" !== J && this.graphSettings.setProperty(J, e[J]);
                break;
            case "set-polar-domain-minlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPolarDomainMin(X, e.latex);
                break;
            case "set-polar-domain-maxlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setPolarDomainMax(X, e.latex);
                break;
            case "set-parametric-domain-minlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setParametricDomainMin(X, e.latex);
                break;
            case "set-parametric-domain-maxlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setParametricDomainMax(X, e.latex);
                break;
            case "set-note-text":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "text" !== X.type)
                    return;
                A.setText(X, e.text);
                break;
            case "set-edit-list-mode":
                var X = F.getSelected(this.listModel);
                if (this.setEditListMode(e.isEditListMode),
                e.focusExpressionList) {
                    if (void 0 === X && (X = this.getItemModelByIndex(0)),
                    !X)
                        return;
                    C.moveFocusToItem(this, X.id, "table" === X.type && e.isEditListMode ? "container" : "start")
                } else
                    F.setSelected(this.listModel, void 0),
                    C.setFocusLocation(this, void 0);
                break;
            case "set-projector-mode":
                this.getGraphSettings().config.setProperty("projectorMode", e.value);
                break;
            case "set-inverted-colors":
                this.getGraphSettings().config.setProperty("invertedColors", e.value);
                break;
            case "set-tablecell-latex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.tableId)) || "table" !== X.type)
                    return;
                _.setCellLatex(X, e.cell, e.latex);
                break;
            case "set-state":
                this.externalSetState(e.state, e.opts);
                break;
            case "set-blank":
                this.externalSetState(this.getBlankState(), e.opts);
                break;
            case "clear-unsaved-changes":
                this.enqueueEvent("clearUnsavedChanges");
                break;
            case "reset-graph":
                var Q = this.getState();
                this.externalSetState(this.graphSettings.defaultState, {
                    allowUndo: !0
                });
                var Z = this.getItemModelByIndex(0);
                Z && C.moveFocusToItem(this, Z.id, "end"),
                this._showToast({
                    message: this.s("graphing-calculator-text-toast-graph-reset"),
                    undoCallback: function() {
                        return t.dispatch({
                            type: "set-state",
                            state: Q,
                            opts: {
                                allowUndo: !0
                            }
                        })
                    }
                }),
                this.enqueueEvent("graphReset");
                break;
            case "clear-graph":
                if (this.triggerClearGraph)
                    return void this.runAfterDispatch(function() {
                        return t.triggerClearGraph()
                    });
                var $ = this.getState();
                this.externalSetState(this.getBlankState(), {
                    allowUndo: !0
                });
                var ee = this.getItemModelByIndex(0);
                ee && C.moveFocusToItem(this, ee.id, "end"),
                this._showToast({
                    message: this.s("graphing-calculator-text-toast-graph-cleared"),
                    undoCallback: function() {
                        return t.dispatch({
                            type: "set-state",
                            state: $,
                            opts: {
                                allowUndo: !0
                            }
                        })
                    }
                }),
                this.enqueueEvent("graphReset");
                break;
            case "on-evaluator-changes":
                if (this.onEvaluatorChangesSpy && this.onEvaluatorChangesSpy(e.changes, e.timingData, e.graphData, e.eventUpdates),
                F.onEvaluatorFormulaUpdates(this.listModel, e.changes),
                !e.graphData)
                    break;
                var te;
                for (te in e.graphData.addedGraphs) {
                    var ie = e.graphData.addedGraphs[te];
                    this.grapher && this.grapher.updateSketch(te, ie),
                    F.onGraphComputed(this.listModel, te, ie)
                }
                for (te in e.graphData.removedGraphs)
                    this.grapher && this.grapher.hide(te);
                for (te in e.graphData.intersections)
                    this.grapher && "2d" === this.grapher.type && this.grapher.updateIntersections(te, e.graphData.intersections[te]);
                if (this.grapher && this.grapher.poiController && this.grapher.poiController.handleTraceUpdate(),
                e.eventUpdates) {
                    var se = !1;
                    for (var oe in e.eventUpdates.updates)
                        if (this.doesIdentifierBlockActionUpdate(oe)) {
                            se = !0;
                            break
                        }
                    if (!se) {
                        for (var oe in e.eventUpdates.updates)
                            this.updateLatexForIdentifier(oe, e.eventUpdates.updates[oe]);
                        e.eventUpdates.objectClicked && this.enqueueEvent("userClickedObject"),
                        this.onActionUpdatesAppliedSpy && this.onActionUpdatesAppliedSpy(e.eventUpdates)
                    }
                }
                break;
            case "add-helper-expression":
                F.addHelperExpression(this.listModel, e.state);
                break;
            case "tick":
                this._tickSliders(e.time);
                break;
            case "tick-ticker":
                this.tickTicker(e.time);
                break;
            case "adjust-slider-by-keyboard":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.adjustSliderByKeyboard(X, e.adjustment);
                break;
            case "adjust-slider-by-dragging-thumb":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.adjustSliderByDraggingThumb(X, e.target);
                break;
            case "set-slider-minlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderMin(X, e.latex);
                break;
            case "set-slider-maxlatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderMax(X, e.latex);
                break;
            case "set-slider-steplatex":
                if (this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                !(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderStep(X, e.latex);
                break;
            case "set-slider-dragging":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderDragging(X, e.dragging);
                break;
            case "play-slider-from-min":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                var re = k.getSliderMin(X);
                if (isNaN(re))
                    return;
                var ae = k.computeNewSliderLatex(X.latex, re);
                k.setSliderIsPlaying(X, !1),
                k.setLatex(X, ae),
                k.setSliderIsPlaying(X, !0);
                break;
            case "set-slider-isplaying":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderIsPlaying(X, e.isPlaying);
                break;
            case "set-slider-loopmode":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderLoopMode(X, e.loopMode);
                break;
            case "set-slider-animationperiod":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                k.setSliderAnimationPeriod(X, e.animationPeriod);
                break;
            case "show-expressions-list":
                this._showExpressions(e.focusHideIcon);
                break;
            case "hide-expressions-list":
                this._hideExpressions(e.focusShowIcon);
                break;
            case "open-drawer":
                this.enqueueEvent("openDrawer");
                break;
            case "re-randomize":
                this.setRandomSeed(j.default());
                break;
            case "resize-exp-list":
                this._setExpListWidth(e.expListWidth);
                break;
            case "toast/show":
                this._showToast(e.toast);
                break;
            case "toast/close":
                this.closeToast();
                break;
            case "toast/undo":
                var ne = this.toastData.undoCallback;
                ne && this.runAfterDispatch(ne),
                this.toastData = {};
                break;
            case "toast/learn-more":
                var le = this.toastData.learnMoreCallback;
                le && this.runAfterDispatch(le),
                this.toastData = {};
                break;
            case "start-moving-point":
                B.onStartMovingPoint(this, this.listModel, e.pointInfo);
                break;
            case "stop-moving-point":
                B.onStopMovingPoint(this, e.pointInfo);
                break;
            case "on-move-point":
                B.onMovePoint(this, e.pointInfo, e.screenPt, e.projection, e.keyboardDirection) && this.enqueueEvent("userMovedPoint");
                break;
            case "commit-user-requested-viewport":
                this._commitUserRequestedViewport(e.viewport);
                break;
            case "set-viewport":
                this._setAxisLimitLatex("xmin", e.viewport.xmin + ""),
                this._setAxisLimitLatex("xmax", e.viewport.xmax + ""),
                this._setAxisLimitLatex("ymin", e.viewport.ymin + ""),
                this._setAxisLimitLatex("ymax", e.viewport.ymax + "");
                break;
            case "set-axis-limit-latex":
                this._setAxisLimitLatex(e.limit, e.latex);
                break;
            case "toggle-graph-settings":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    graphSettingsOpen: !this.layoutModel.graphSettingsOpen
                }),
                F.setSelected(this.listModel, void 0),
                e.focusOnOpen && this.layoutModel.graphSettingsOpen && C.setFocusLocation(this, {
                    type: "settings",
                    location: "projector-mode"
                });
                break;
            case "close-graph-settings":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    graphSettingsOpen: !1
                }),
                e.focusIconAfterClose && C.setFocusLocation(this, {
                    type: "settings",
                    location: "icon"
                });
                break;
            case "toggle-add-expression":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    addExpressionOpen: !this.layoutModel.addExpressionOpen
                }),
                e.focusOnOpen && this.layoutModel.addExpressionOpen && C.setFocusLocation(this, {
                    type: "add-expression-btn"
                });
                break;
            case "close-add-expression":
                this._closeAddExpression(),
                e.focusIconAfterClose && C.setFocusLocation(this, {
                    type: "add-item-btn"
                });
                break;
            case "ui/container-resized":
                this.layoutMeasurements = {
                    width: e.size.width,
                    height: e.size.height
                },
                this.shouldScrollSelectedItemIntoViewAfterDispatch = !0;
                break;
            case "enter-printmode":
                this.inPrintMode = !0;
                break;
            case "exit-printmode":
                this.inPrintMode = !1;
                break;
            case "expression-size-exceeded":
                this._showToast({
                    message: this.s("graphing-calculator-text-toast-expression-size-limit")
                });
                break;
            case "keypad/set-layout":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadLayout: e.layout,
                    keypadFunctionsOpen: !1
                });
                break;
            case "keypad/set-minimized":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadMinimized: e.minimized,
                    keypadLayout: "mainNumbers"
                }),
                this.shouldScrollSelectedItemIntoViewAfterDispatch = !0,
                this.needsFakeKeypad() || C.addFocusForKeypad(this);
                break;
            case "keypad/type-text":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadFunctionsOpen: !1
                }),
                this.runAfterDispatch(function() {
                    var i = q.default.getFocusedMathquill();
                    i && q.default.canAcceptText(i, t.getCapExpressionSize(), e.text) && (i.typedText(e.text),
                    q.default.simulateUserChangedLatex(i))
                });
                break;
            case "keypad/press-key":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadFunctionsOpen: !1
                }),
                this.runAfterDispatch(function() {
                    var t = q.default.getFocusedMathquill();
                    t && q.default.simulateKeypress(t, e.key)
                });
                break;
            case "keypad/audio-trace":
                this.handleAudioTraceCommand(e.command);
                break;
            case "set-audio-trace-speed":
                this.setAudioTraceSpeed(e.speed);
                break;
            case "keypad/custom-command":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadFunctionsOpen: !1
                }),
                this.runAfterDispatch(function() {
                    var t = q.default.getFocusedMathquill();
                    t && (W.execute(t, e.command),
                    q.default.simulateUserChangedLatex(t))
                });
                break;
            case "keypad/shift":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadLayout: V.getShiftedLayoutForCurrentLayout(this.getKeypadLayout()),
                    keypadFunctionsOpen: !1
                });
                break;
            case "keypad/123":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadLayout: "mainNumbers",
                    keypadFunctionsOpen: !1
                });
                break;
            case "keypad/abc":
                this.isQwertyKeyboardEnabled() ? this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadLayout: "letters",
                    keypadFunctionsOpen: !1
                }) : this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadLayout: "noQwertyLetters",
                    keypadFunctionsOpen: !1
                });
                break;
            case "keypad/audio":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadMinimized: !1,
                    keypadLayout: "audio",
                    keypadFunctionsOpen: !1
                });
                break;
            case "keypad/functions":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    keypadFunctionsOpen: !this.isKeypadFunctionsPopoverOpen()
                });
                break;
            case "open-on-web":
                this._openOnWeb();
                break;
            case "file-is-dragged-over":
                this.listModel.openItemMenu = void 0,
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    isFileDraggedOver: !0
                });
                break;
            case "file-is-not-dragged-over":
                this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                    isFileDraggedOver: !1
                });
                break;
            case "zoom":
                this.grapher && this.grapher.viewportController.zoom(e.direction);
                break;
            case "set-hovered-image":
                if (!(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setClickableInfoProp(X, "hoveredImage", e.url);
                break;
            case "set-depressed-image":
                if (!(X = this.getItemModel(e.id)) || "image" !== X.type)
                    return;
                w.setClickableInfoProp(X, "depressedImage", e.url);
                break;
            case "clickable-item-clicked":
                this.handleClickableItemClicked(e.id, e.listIndex);
                break;
            case "action-single-step":
                if (!(X = this.getItemModel(e.id)) || "expression" !== X.type)
                    return;
                if (!X.formula.action_value)
                    return;
                this.evaluator.addActionStepEvent(X.id);
                break;
            case "update-expression-search-str":
                this.updateExpressionSearchStr(e.str);
                break;
            case "update-ticker-handlerlatex":
                this.updateTickerHandlerLatex(e.latex);
                break;
            case "update-ticker-minsteplatex":
                this.updateTickerMinStepLatex(e.latex);
                break;
            case "set-braille-mode":
                this.setBrailleMode(e.mode);
                break;
            case "set-six-key-input":
                this.setSixKeyInput(e.useSixKeyInput);
                break;
            case "close-expression-search":
                this.expressionSearchOpen = !1,
                this.updateExpressionSearchStr("");
                var de = this.getItemModelByIndex(0);
                de && C.moveFocusToItem(this, de.id, "end");
                break;
            case "open-expression-search":
                this.expressionSearchOpen = !0,
                this.focusLocation = {
                    type: "search-expressions"
                };
                break;
            case "open-ticker":
                this.listModel.ticker.open = !0,
                this.focusLocation = {
                    type: "ticker",
                    location: "handler"
                },
                this._closeAddExpression();
                break;
            case "close-ticker":
                this.listModel.ticker.open = !1,
                this.listModel.ticker.playing = !1,
                this.listModel.ticker.minStepLatex = "",
                this.listModel.ticker.handlerLatex = "";
                break;
            case "toggle-ticker":
                this.listModel.ticker.playing = !this.listModel.ticker.playing,
                this.listModel.ticker.lastTickTime = void 0,
                this.pauseAllSliders();
                break;
            default:
                return e
            }
        }
        ,
        e.prototype.pauseAllSliders = function() {
            this.getPlayingSliders().forEach(function(e) {
                k.setSliderIsPlaying(e, !1)
            })
        }
        ,
        e.prototype.handleClickableItemClicked = function(e, t) {
            var i, s = this.getItemModel(e);
            s && ("expression" !== s.type && "image" !== s.type || "maybe-valid" === (null === (i = s.formula.click_handler) || void 0 === i ? void 0 : i.status) && this.evaluator.addClickEvent(s.id, t))
        }
        ,
        e.prototype.canAddTicker = function() {
            return !this.getTickerOpen()
        }
        ,
        e.prototype.doesIdentifierBlockActionUpdate = function(e) {
            for (var t = this.getFocusLocation(), i = 0, s = F.getItemsByIdentifier(this.listModel, e); i < s.length; i++) {
                var o = s[i];
                if ("expression" === (null == t ? void 0 : t.type) && t.id === o.id)
                    return !0;
                if (k.shouldBlockActionUpdate(o))
                    return !0
            }
            return !1
        }
        ,
        e.prototype.updateLatexForIdentifier = function(e, t) {
            var i = F.getItemsByIdentifier(this.listModel, e);
            if (1 === i.length) {
                var s = i[0];
                s.slider.isPlaying ? (k.setSliderIsPlaying(s, !1),
                k.setLatex(s, t),
                k.setSliderIsPlaying(s, !0)) : k.setLatex(s, t)
            }
        }
        ,
        e.prototype.updateExpressionSearchStr = function(e) {
            this.expressionSearchStr = e;
            var t = F.filterItemsBySearch(this.listModel, e);
            this.expressionSearchCount = this.expressionSearchOpen ? t : 0
        }
        ,
        e.prototype.updateTickerHandlerLatex = function(e) {
            this.listModel.ticker.handlerLatex = e
        }
        ,
        e.prototype.updateTickerMinStepLatex = function(e) {
            this.listModel.ticker.minStepLatex = e
        }
        ,
        e.prototype.getExpressionSearchStr = function() {
            return this.expressionSearchStr || ""
        }
        ,
        e.prototype.getExpressionSearchCount = function() {
            return this.expressionSearchCount || 0
        }
        ,
        e.prototype.getTicker = function() {
            return this.listModel.ticker
        }
        ,
        e.prototype.getTickerHandlerLatex = function() {
            return this.listModel.ticker.handlerLatex || ""
        }
        ,
        e.prototype.getTickerMinStepLatex = function() {
            return this.listModel.ticker.minStepLatex || ""
        }
        ,
        e.prototype.getTickerAvgDelta = function() {
            return this.listModel.ticker.avgDelta
        }
        ,
        e.prototype.getBrailleMode = function() {
            return this.graphSettings.config.brailleMode
        }
        ,
        e.prototype.setBrailleMode = function(e) {
            this.graphSettings.config.setProperty("brailleMode", e)
        }
        ,
        e.prototype.getSixKeyInput = function() {
            return this.graphSettings.config.sixKeyInput
        }
        ,
        e.prototype.setSixKeyInput = function(e) {
            this.graphSettings.config.setProperty("sixKeyInput", e)
        }
        ,
        e.prototype.getBrailleControls = function() {
            return this.graphSettings.config.brailleControls
        }
        ,
        e.prototype.setBrailleControls = function(e) {
            this.graphSettings.config.setProperty("brailleControls", e)
        }
        ,
        e.prototype.setEditListMode = function(e) {
            this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                inEditListMode: e
            })
        }
        ,
        e.prototype.generateTableXSubscript = function() {
            return F.findAvailableColumnSubscript(this.listModel)
        }
        ,
        e.prototype._createTableItem = function() {
            var e = this.generateTableXSubscript()
              , t = _.makeTableState(e, [[""], [""]], this);
            return this.createItemModel(t)
        }
        ,
        e.prototype._populateSettingsViewLimitLatex = function() {
            this.grapher && (this.settingsViewModel = i.__assign(i.__assign({}, this.settingsViewModel), {
                limitLatex: R.limitLatex(this.grapher.getCurrentViewport(), this.getGraphSettings().xAxisStep, this.getGraphSettings().yAxisStep)
            }))
        }
        ,
        e.prototype.getSettingsViewModel = function() {
            return this.settingsViewModel
        }
        ,
        e.prototype.getListModel = function() {
            return this.listModel
        }
        ,
        e.prototype.hasBackgroundColor = function() {
            return "#ffffff" !== this.getBackgroundColor()
        }
        ,
        e.prototype.getBackgroundColor = function() {
            return this.getGraphSettings().getBackgroundColor()
        }
        ,
        e.prototype.getTextColor = function() {
            return this.getGraphSettings().getTextColor()
        }
        ,
        e.prototype.getPillboxBackgroundColor = function() {
            return S.shadeColor(this.getBackgroundColor(), -.07)
        }
        ,
        e.prototype.subToChanges = function(e) {
            var t = this
              , i = this.nextSubscription;
            return this.nextSubscription += 1,
            this.subscriptions[i] = e,
            function() {
                delete t.subscriptions[i]
            }
        }
        ,
        e.prototype.updateTheComputedWorld = function() {
            var e = this;
            F.reindex(this.listModel),
            F.updateDrawOrder(this.listModel),
            this.grapher && this.grapher.setSketchOrder(this.listModel.drawOrder);
            for (var t = 0, s = this.getAllItemModels(); t < s.length; t++) {
                var o = s[t];
                switch (o.type) {
                case "expression":
                    k.onControllerUpdate(o);
                    break;
                case "image":
                    w.onControllerUpdate(o);
                    break;
                case "table":
                    _.onControllerUpdate(o);
                    break;
                case "folder":
                    L.onControllerUpdate(o);
                    break;
                case "text":
                    A.onControllerUpdate(o);
                    break;
                default:
                    return o
                }
            }
            if (E.onControllerUpdate(this.listModel.ticker),
            this.isCurrentFocusLocationValid() || C.setFocusLocation(this, void 0),
            this.listModel.openItemMenu) {
                var r = this.getActiveIcon();
                document.body && r && document.body.contains(r[0]) || (this.listModel.openItemMenu = void 0)
            }
            var a = this.getSelectedItem();
            a && !this.getItemModel(a.id) && F.setSelected(this.listModel, void 0),
            this.layoutModel.graphSettingsOpen || this._populateSettingsViewLimitLatex(),
            this.propagateSelection(),
            this.isKeypadOpen() || (this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                keypadFunctionsOpen: !1
            })),
            this.runAfterDispatch(function() {
                e.grapher && "2d" === e.grapher.type && e.grapher.audioGraph.checkIfSelectedItemChanged(a ? a.id : void 0),
                e.grapher && "2d" === e.grapher.type && e.focusLocation && e.grapher.audioGraph.exitAudioTrace()
            })
        }
        ,
        e.prototype.getActiveIcon = function() {
            var e = this.getOpenItemMenu();
            if (e) {
                var t = this.find$('[model-id="' + e.model.id + '"]');
                if (0 !== t.length)
                    return t
            }
        }
        ,
        e.prototype.propagateSelection = function() {
            this.grapher && this.evaluator ? this.__lastSelectedId = t.propagateSelection(this, this.grapher, this.evaluator, this.__lastSelectedId) : this.__lastSelectedId = void 0
        }
        ,
        e.prototype.getIntersectId = function() {
            return this.__lastSelectedId
        }
        ,
        e.prototype.areParsableObjectsEqual = function(e, t) {
            return e === t || n.isEqual(i.__assign(i.__assign({}, e), {
                regressionParameters: void 0
            }), i.__assign(i.__assign({}, t), {
                regressionParameters: void 0
            }))
        }
        ,
        e.prototype.requestParseForAllItems = function() {
            (this.isCurrentlyDoingSetState || this.isCurrentlyDoingRestoreState) && (this.lastParsableObjects = {},
            this.evaluator.clearStatementsAndStartCompleteState(),
            this.isCurrentlyDoingRestoreState && this.evaluator.markUndoRedoState());
            for (var e = {}, t = this.lastParsableObjects, i = 0, s = this.getAllItemModels(); i < s.length; i++) {
                switch ((h = s[i]).type) {
                case "expression":
                case "image":
                case "table":
                    e[h.guid] = h.cachedParsableState;
                    break;
                case "folder":
                case "text":
                    break;
                default:
                    return h
                }
            }
            for (var o = 0, r = F.getAllHelperItemModels(this.listModel); o < r.length; o++) {
                e[(h = r[o]).guid] = h.cachedParsableState
            }
            for (var a in this.listModel.ticker.cachedParsableState && (e[this.listModel.ticker.guid] = this.listModel.ticker.cachedParsableState),
            t) {
                var n = t[a]
                  , l = e[a];
                if ("image" !== n.type || l && l.type === n.type && l.guid === n.guid || this.grapher && this.grapher.removeGraphImage(n.id),
                !l && (this.evaluator.removeStatement(n.id),
                "table" === n.type))
                    for (var d = 0, p = n.columns; d < p.length; d++) {
                        var c = p[d];
                        this.evaluator.removeStatement(c.id)
                    }
            }
            for (var a in e) {
                var h;
                l = e[a],
                n = t[a];
                if ("image" === l.type && (!n || l.type !== n.type || l.guid !== n.guid))
                    if (this.grapher)
                        (h = this.getItemModel(l.id)) && "image" === h.type && this.grapher.addGraphImage(h);
                this.areParsableObjectsEqual(l, n) || (this.grapher && "statement" === l.type && "" === l.latex && this.grapher.removeGraphSketch(l.id),
                this.evaluator.addStatement(l))
            }
            this.lastParsableObjects = e
        }
        ,
        e.prototype.getViewState = function() {
            if (this.grapher) {
                var e = this.grapher.getProjection();
                return {
                    viewport: e.viewport.toObject(),
                    screen: e.screen
                }
            }
        }
        ,
        e.prototype.setEvaluator = function(e) {
            this.evaluator = e
        }
        ,
        e.prototype.setGrapher = function(e) {
            this.grapher = e
        }
        ,
        e.prototype.getGrapher = function() {
            return this.grapher
        }
        ,
        e.prototype.shouldExpressionZoomFit = function(e) {
            return !!this.grapher && (!!this.isZoomFitEnabled() && (("expression" === e.type || "table" === e.type) && (!!("expression" !== e.type || !e.error && e.shouldGraph && e.formula.is_graphable) && (!(!e.boundingBoxes || !e.boundingBoxes.length) && O.shouldExpressionZoomFit(e.boundingBoxes, this.grapher.viewportController.getProjection())))))
        }
        ,
        e.prototype.setBugsnagContext = function(e) {
            this.bugsnagContext = e
        }
        ,
        e.prototype.getItemRootNodeById = function(e) {
            var t = this.getItemModel(e);
            return t && t.dcgView ? t.dcgView.findRootNode() : void 0
        }
        ,
        e.prototype.getItemSelectorById = function(e) {
            var t = this.getItemRootNodeById(e);
            return t ? U(t) : void 0
        }
        ,
        e.prototype.generateId = function() {
            var e = this.__nextItemId;
            return this.__nextItemId += 1,
            e + ""
        }
        ,
        e.prototype.getNextColor = function() {
            return F.getNextColor(this.listModel)
        }
        ,
        e.prototype.getNextDisplayIndex = function() {
            return this.listModel.nextDisplayIndex
        }
        ,
        e.prototype._clearPendingImageUploads = function() {
            this.__pendingImageUploads = {}
        }
        ,
        e.prototype.isUploadingImages = function() {
            return Object.keys(this.__pendingImageUploads).length > 0
        }
        ,
        e.prototype.getExpressionAnalysis = function() {
            return this.listModel.expressionAnalysis
        }
        ,
        e.prototype.createItemModel = function(e) {
            return F.modelFromSpec(this.listModel, e)
        }
        ,
        e.prototype.getItemModel = function(e) {
            return F.getItemById(this.listModel, e)
        }
        ,
        e.prototype.getColorById = function(e) {
            var t = this.getItemModel(e);
            return t && "expression" === t.type ? k.getEvaluationValue(t) : ""
        }
        ,
        e.prototype.getAllColorAssignments = function() {
            for (var e = [], t = 0, i = this.getAllItemModels(); t < i.length; t++) {
                var s = i[t];
                if ("expression" === s.type) {
                    var o = k.getAssignment(s);
                    if (o) {
                        var r = this.getEvaluationValueForItem(s.id);
                        ("string" == typeof r || Array.isArray(r) && "string" == typeof r[0]) && e.push({
                            id: s.id,
                            assignmentLatex: a.identifierToLatex(o)
                        })
                    }
                }
            }
            return e
        }
        ,
        e.prototype.getItemModelByIndex = function(e) {
            return F.getItemByIndex(this.listModel, e)
        }
        ,
        e.prototype.getItemCount = function() {
            return F.getItemCount(this.listModel)
        }
        ,
        e.prototype.getItemEditableLabelMode = function(e) {
            var t = this.getItemModel(e);
            if (t && "expression" === t.type)
                return k.getEditableLabelMode(t)
        }
        ,
        e.prototype.isItemSecret = function(e) {
            var t = this.getItemModel(e);
            return !!t && F.isItemSecret(t)
        }
        ,
        e.prototype.isItemSelected = function(e) {
            var t = this.getItemModel(e);
            return !!t && F.isItemSelected(t)
        }
        ,
        e.prototype.isItemSelectable = function(e) {
            var t = this.getItemModel(e);
            return !!t && F.isItemSelectable(t)
        }
        ,
        e.prototype.anyItemDependsOnRandomSeed = function() {
            return F.anyItemDependsOnRandomSeed(this.listModel)
        }
        ,
        e.prototype.areActionsEnabled = function() {
            return "auto" === this.graphSettings.config.actions ? F.anyItemIsAction(this.listModel) : !!this.graphSettings.config.actions
        }
        ,
        e.prototype.getAllItemModels = function() {
            return F.getAllItemModels(this.listModel)
        }
        ,
        e.prototype.getAllModelsWithSliders = function() {
            return F.getAllModelsWithSliders(this.listModel)
        }
        ,
        e.prototype.getGraphSettings = function() {
            return this.graphSettings
        }
        ,
        e.prototype.getAudioGraph = function() {
            return void 0 !== this.grapher && "2d" === this.grapher.type ? this.grapher.audioGraph : void 0
        }
        ,
        e.prototype.inAudioTraceMode = function() {
            var e = this.getAudioGraph();
            return !(!e || !e.audioTraceActive)
        }
        ,
        e.prototype.canAudioTrace = function() {
            var e = this.getAudioGraph();
            return !!e && e.canAudioTraceCurrentExp()
        }
        ,
        e.prototype.isAudioTracing = function() {
            var e = this.getAudioGraph();
            return !!e && e.getIsTracing()
        }
        ,
        e.prototype.expressionsAreFullWidth = function() {
            return this.isNarrow() || !1 === this.graphSettings.config.graphpaper
        }
        ,
        e.prototype.getExpListWidthString = function() {
            return this.expressionsAreFullWidth() ? "100%" : this.rootElt ? this._getExpListWidth() + "px" : "0"
        }
        ,
        e.prototype.getExpListWidth = function() {
            return this.rootElt ? this._getExpListWidth() : 0
        }
        ,
        e.prototype.findFirstVisibleItem = function() {
            var e = z.getFirstVisibleItemId(this, this._previousFirstVisibleId);
            return this._previousFirstVisibleId = e,
            e ? this.getItemModel(e) : void 0
        }
        ,
        e.prototype.findLastVisibleItem = function() {
            var e = z.getLastVisibleItemId(this, this._previousLastVisibleId);
            return this._previousLastVisibleId = e,
            e ? this.getItemModel(e) : void 0
        }
        ,
        e.prototype.updateRenderShellsAfterDispatch = function() {
            if (this.rootElt && this.isListVisible()) {
                var e = this.findFirstVisibleItem()
                  , t = this.findLastVisibleItem()
                  , i = e && this.getItemRootNodeById(e.id)
                  , s = t && this.getItemRootNodeById(t.id);
                if (i !== this.lastInfiniteScrollFirstDOM || s !== this.lastInfiniteScrollLastDOM || this.hasDispatchSinceLastInfiniteScrollUpdate) {
                    this.lastInfiniteScrollFirstDOM = i,
                    this.lastInfiniteScrollLastDOM = s,
                    this.hasDispatchSinceLastInfiniteScrollUpdate = !1;
                    var o, r = !1, a = e ? e.index : 1 / 0, n = t ? t.index : 1 / 0, l = this.listModel.dragState && this.listModel.dragState.firstItemId, d = this.getOpenItemMenu();
                    d && (o = d.model.id);
                    for (var p = 0, c = this.getAllItemModels(); p < c.length; p++) {
                        var h = c[p]
                          , u = !(h.index >= a && h.index <= n && !h.isHiddenFromUI);
                        if (l == h.id && (u = !1),
                        o === h.id && (u = !1),
                        h.renderShell !== u && (h.renderShell = u,
                        r = !0,
                        u)) {
                            var g = this.getItemRootNodeById(h.id);
                            if (g) {
                                var m = g.getBoundingClientRect().height;
                                m > 0 && (h.cachedRenderHeight = m)
                            }
                        }
                    }
                    r && this.markTickRequiredNextFrame()
                }
            }
        }
        ,
        e.prototype.updateRenderShellsBeforePaint = function() {
            if (this.hasDispatchSinceLastInfiniteScrollUpdate = !0,
            this.inPrintMode)
                for (var e = 0, t = this.getAllItemModels(); e < t.length; e++) {
                    (o = t[e]).renderShell = !1
                }
            else {
                for (var i = 0, s = this.getAllItemModels(); i < s.length; i++) {
                    var o;
                    (o = s[i]).isHiddenFromUI && (o.renderShell = !0)
                }
                var r = this.getSelectedItem();
                r && (r.renderShell = !1)
            }
        }
        ,
        e.prototype.updateDragDrop = function() {
            var e = this.listModel.dragState;
            if (e) {
                var t = this.getItemModel(e.firstItemId);
                if (t) {
                    var i = this.dragdrop_expressions.applyDrag();
                    i && (F.setDragState(this.listModel, i.dragState),
                    D.setFolderId(t, i.folderId),
                    t.index !== i.newIndex && F.moveItemsTo(this.listModel, t.index, i.newIndex, e.numberOfItems))
                }
            }
        }
        ,
        e.prototype._tickSliders = function(e) {
            this.getPlayingSliders().forEach(function(t) {
                k.tickSliderStep(t, e)
            })
        }
        ,
        e.prototype.tickTicker = function(e) {
            var t = void 0 === this.listModel.ticker.lastTickTime;
            this.evaluator.addClockTickEvent(this.listModel.ticker.id, t),
            E.updateLastTickTime(this.listModel.ticker, e)
        }
        ,
        e.prototype.stopAllSliders = function() {
            for (var e = 0, t = this.getAllItemModels(); e < t.length; e++) {
                var i = t[e];
                "expression" === i.type && i.slider.isPlaying && k.setSliderIsPlaying(i, !1)
            }
        }
        ,
        e.prototype.getPlayingSliders = function() {
            for (var e = [], t = 0, i = this.getAllItemModels(); t < i.length; t++) {
                var s = i[t];
                "expression" === s.type && s.sliderExists && s.slider.isPlaying && e.push(s)
            }
            return e
        }
        ,
        e.prototype.hasAnyTableThatRequiresTicks = function() {
            for (var e = 0, t = this.getAllItemModels(); e < t.length; e++) {
                var i = t[e];
                if (!i.renderShell && "table" === i.type && i.rowModels.length >= 25)
                    return !0
            }
            return !1
        }
        ,
        e.prototype.areAnyImagesLoading = function() {
            return F.areAnyImagesLoading(this.listModel)
        }
        ,
        e.prototype._commitUserRequestedViewport = function(e) {
            this.grapher && this.grapher.setUserRequestedViewport(e)
        }
        ,
        e.prototype._setAxisLimitLatex = function(e, t) {
            var s, o;
            this.settingsViewModel = i.__assign(i.__assign({}, this.settingsViewModel), {
                limitLatex: i.__assign(i.__assign({}, this.settingsViewModel.limitLatex), (s = {},
                s[e] = t,
                s))
            });
            var r = "" === t && ("xstep" === e || "ystep" === e) ? 0 : P.default(t, this.graphSettings.degreeMode);
            switch (e) {
            case "xstep":
                if (r < 0 || !isFinite(r))
                    return;
                this.graphSettings.setProperty("xAxisStep", r);
                break;
            case "ystep":
                if (r < 0 || !isFinite(r))
                    return;
                this.graphSettings.setProperty("yAxisStep", r);
                break;
            case "xmin":
            case "xmax":
            case "ymin":
            case "ymax":
                if (!this.grapher)
                    return;
                var a = this.grapher.viewportController.getViewport()
                  , n = "xmin";
                "xmin" === e && (n = "xmax"),
                "ymax" === e && (n = "ymin"),
                "ymin" === e && (n = "ymax");
                var l = P.default(this.settingsViewModel.limitLatex[n], this.graphSettings.degreeMode)
                  , d = f.Viewport.fromObject(i.__assign(i.__assign({}, a.toObject()), ((o = {})[e] = r,
                o[n] = l,
                o)));
                if (!d.isValid())
                    return;
                this.grapher.viewportController.setViewport(d);
                var p = "xmin" === e || "xmax" === e ? "x" : "y";
                this.graphSettings.setProperty("lastChangedAxis", p);
                var c = d.isSquare(this.grapher.getProjection().screen);
                this.graphSettings.setProperty("squareAxes", c)
            }
            if (this.grapher) {
                var h = this.grapher.viewportController.getViewport().toObject();
                this._commitUserRequestedViewport(h)
            }
        }
        ,
        e.prototype.canUserAddExpressions = function() {
            return !!this.graphSettings.config.expressions
        }
        ,
        e.prototype.areNotesEnabled = function() {
            return !!this.graphSettings.config.notes
        }
        ,
        e.prototype.areSlidersEnabled = function() {
            return !!this.graphSettings.config.sliders
        }
        ,
        e.prototype.areLinksEnabled = function() {
            return !!this.graphSettings.config.links
        }
        ,
        e.prototype.areImagesEnabled = function() {
            var e = window.FileReader
              , t = r.IS_IPAD && r.IOS_VERSION && 8 === r.IOS_VERSION[0] && 0 === r.IOS_VERSION[1] && 0 === r.IOS_VERSION[2];
            return !(!this.graphSettings.config.images || !e || t)
        }
        ,
        e.prototype.areFoldersEnabled = function() {
            return !!this.graphSettings.config.folders
        }
        ,
        e.prototype.isDecimalToFractionEnabled = function() {
            return !!this.graphSettings.config.decimalToFraction
        }
        ,
        e.prototype.isTraceEnabled = function() {
            return !!this.graphSettings.config.trace
        }
        ,
        e.prototype.areFunctionsRestricted = function() {
            return !!this.graphSettings.config.restrictedFunctions
        }
        ,
        e.prototype.areGeometryFunctionsForceEnabled = function() {
            return !!this.graphSettings.config.forceEnableGeometryFunctions
        }
        ,
        e.prototype.isQwertyKeyboardEnabled = function() {
            return !!this.graphSettings.config.qwertyKeyboard
        }
        ,
        e.prototype.isZoomFitEnabled = function() {
            return !!this.graphSettings.config.zoomFit
        }
        ,
        e.prototype.canEditOnWeb = function() {
            return !!this.graphSettings.config.editOnWeb
        }
        ,
        e.prototype.hasTransparentBackground = function() {
            return !!this.graphSettings.config.transparentBackground
        }
        ,
        e.prototype.shouldAudioTraceReverseExpressions = function() {
            return !!this.graphSettings.config.audioTraceReverseExpressions
        }
        ,
        e.prototype.hasDefaultState = function() {
            return !!this.graphSettings.defaultState
        }
        ,
        e.prototype.getDefaultStateViewport = function() {
            var e = this.graphSettings.defaultState;
            if (e && e.graph)
                return e.graph.viewport
        }
        ,
        e.prototype.getColors = function() {
            return this.graphSettings.config.colors
        }
        ,
        e.prototype.getImageOpacities = function() {
            return ["0.2", "0.4", "0.6", "0.8", "1"]
        }
        ,
        e.prototype.getUIDragModes = function() {
            return [c.DragMode.X, c.DragMode.Y, c.DragMode.XY]
        }
        ,
        e.prototype.getNumberOfItemsInFolder = function(e) {
            return F.getNumberOfItemsInFolder(this.listModel, e)
        }
        ,
        e.prototype.getEnabledDragModesForItem = function(e) {
            var t = this.getItemModel(e);
            if (!t || "expression" !== t.type)
                return [];
            var i = t.formula
              , s = [];
            if (!i.move_strategy)
                return s;
            var o = "none" !== i.move_strategy[0].type
              , r = "none" !== i.move_strategy[1].type
              , a = o && r;
            return o && s.push(c.DragMode.X),
            r && s.push(c.DragMode.Y),
            a && s.push(c.DragMode.XY),
            s
        }
        ,
        e.prototype.shouldShowEvaluationForItem = function(e) {
            var t = this.getItemModel(e);
            return !!t && ("expression" === t.type && k.shouldShowEvaluation(t))
        }
        ,
        e.prototype.getEvaluationValueForItem = function(e) {
            var t = this.getItemModel(e);
            return t ? "expression" !== t.type ? NaN : k.getEvaluationValue(t) : NaN
        }
        ,
        e.prototype.canDisplayEvaluationForItemAsFraction = function(e) {
            if (!this.isDecimalToFractionEnabled())
                return !1;
            var t = this.getItemModel(e);
            if (!t)
                return !1;
            if ("expression" !== t.type)
                return !1;
            if (k.isGraphable(t))
                return !1;
            var i = this.getEvaluationValueForItem(e);
            return "number" == typeof i && a.canDisplayAsFraction(i)
        }
        ,
        e.prototype.shouldEvaluationForItemDisplayAsFraction = function(e) {
            if (!this.isDecimalToFractionEnabled())
                return !1;
            var t = this.getItemModel(e);
            return !!t && ("expression" === t.type && k.shouldEvaluationDisplayAsFraction(t))
        }
        ,
        e.prototype.getEvaluationLabelOptionsForItem = function(e) {
            return i.__assign(i.__assign({}, M.EvaluationLabelOptions), {
                displayAsFraction: this.shouldEvaluationForItemDisplayAsFraction(e)
            })
        }
        ,
        e.prototype.getPointStyles = function() {
            return [h.PointStyle.POINT, h.PointStyle.OPEN, h.PointStyle.CROSS]
        }
        ,
        e.prototype.getLineStyles = function() {
            return [h.LineStyle.SOLID, h.LineStyle.DASHED, h.LineStyle.DOTTED]
        }
        ,
        e.prototype.getOpacities = function() {
            return [p.LOW, p.DEFAULT, p.HIGH]
        }
        ,
        e.prototype.isInEditListMode = function() {
            return this.layoutModel.inEditListMode
        }
        ,
        e.prototype.canAdministerSecretFolders = function() {
            return this.graphSettings.config.administerSecretFolders
        }
        ,
        e.prototype.getInvertedColors = function() {
            return !!this.graphSettings.config.invertedColors
        }
        ,
        e.prototype.canUseAdvancedStyling = function() {
            return this.graphSettings.config.advancedStyling
        }
        ,
        e.prototype.isDegreeMode = function() {
            return this.graphSettings.degreeMode
        }
        ,
        e.prototype.areLogModeRegressionsForced = function() {
            return this.graphSettings.config.forceLogModeRegressions
        }
        ,
        e.prototype.setAllRegressionsToLogMode = function() {
            for (var e = 0, t = this.getAllItemModels(); e < t.length; e++) {
                var i = t[e];
                "expression" === i.type && i.formula && i.formula.is_regression && k.setLogMode(i, !0)
            }
        }
        ,
        e.prototype.isGraphSettingsOpen = function() {
            return this.layoutModel.graphSettingsOpen
        }
        ,
        e.prototype.isAddExpressionOpen = function() {
            return this.layoutModel.addExpressionOpen
        }
        ,
        e.prototype.shouldRenderList = function() {
            if (this.layoutModel.expressionsVisible)
                return !0;
            var e = this.layoutModel.expressionsHiddenTime;
            return void 0 !== e && Date.now() - e <= 500
        }
        ,
        e.prototype.isListVisible = function() {
            return this.layoutModel.expressionsVisible
        }
        ,
        e.prototype.isGrapherEnabled = function() {
            return !1 !== this.graphSettings.config.graphpaper
        }
        ,
        e.prototype.isListEnabled = function() {
            return !1 !== this.graphSettings.config.expressions
        }
        ,
        e.prototype.areDistributionsEnabled = function() {
            return !0 === this.graphSettings.config.distributions
        }
        ,
        e.prototype.isExpressionListFocused = function() {
            var e = this.getFocusLocation();
            if (!e)
                return !1;
            switch (e.type) {
            case "settings":
            case "expression-menu":
            case "editable-label":
                return !1;
            case "distribution-param":
            case "cdf-limit":
            case "slider-limit":
            case "domain-limit":
            case "expression":
            case "visualization-prop":
            case "search-expressions":
            case "ticker":
            case "table":
            case "image":
            case "readonly-expression":
            case "braille-output":
            case "table-container":
            case "text":
            case "folder":
            case "add-item-btn":
            case "add-expression-btn":
            case "add-note-btn":
            case "add-table-btn":
            case "add-folder-btn":
            case "add-ticker-btn":
            case "add-image-btn":
            case "change-image-btn":
            case "edit-list-toggle":
            case "expression-icon":
            case "image-icon":
            case "slider-icon":
            case "slider-animation-properties-icon":
            case "slider-thumb":
            case "table-icon":
            case "action-icon":
            case "hide-expression-list-btn":
            case "show-expression-list-btn":
                return !0;
            default:
                return e
            }
        }
        ,
        e.prototype.needsFakeKeypad = function() {
            if (this.inAudioTraceMode() && this.isKeypadEnabled())
                return !0;
            var e = this.getFocusLocation();
            if (!e)
                return !1;
            if ("none" !== this.getBrailleMode() && K.getFocusedBrailleElement())
                return !1;
            switch (e.type) {
            case "settings":
                return "icon" !== e.location && "degree-mode" !== e.location;
            case "distribution-param":
            case "cdf-limit":
            case "slider-limit":
            case "domain-limit":
            case "expression":
            case "visualization-prop":
            case "search-expressions":
            case "ticker":
                return !0;
            case "expression-menu":
                return "opacity" === e.location || "linewidth" === e.location || "lineopacity" === e.location || "pointopacity" === e.location || "pointsize" === e.location || "labelsize" === e.location || "labelangle" === e.location || "updaterule" === e.location;
            case "table":
                if (this.isInEditListMode())
                    return !1;
                var t = e.location;
                if (0 === t.row)
                    return !0;
                var i = this.getItemModel(e.id);
                if (!i || "table" !== i.type)
                    return !1;
                var s = i.columnModels[t.column];
                return !!s && !s.disabled;
            case "image":
                return "name" !== e.location;
            case "readonly-expression":
            case "braille-output":
            case "table-container":
            case "text":
            case "folder":
            case "add-item-btn":
            case "add-expression-btn":
            case "add-note-btn":
            case "add-table-btn":
            case "add-folder-btn":
            case "add-ticker-btn":
            case "add-image-btn":
            case "change-image-btn":
            case "edit-list-toggle":
            case "hide-expression-list-btn":
            case "show-expression-list-btn":
                return !1;
            case "expression-icon":
            case "image-icon":
            case "slider-icon":
            case "action-icon":
            case "slider-animation-properties-icon":
            case "slider-thumb":
            case "table-icon":
                return !1;
            case "editable-label":
                return this.getItemEditableLabelMode(e.id) === v.EditableLabelMode.Math;
            default:
                return e
            }
        }
        ,
        e.prototype.getBrandingMode = function() {
            return this.getEditLink() ? "static-edit-link" : this.getGraphSettings().config.editOnWeb ? "edit-link" : "powered-by"
        }
        ,
        e.prototype.getEditLink = function() {
            return window.iframeEmbedBrandingLink
        }
        ,
        e.prototype._expressionZoomFit = function(e) {
            var t = this.getItemModel(e);
            if (this.grapher && this.isZoomFitEnabled() && t && ("expression" === t.type || "table" === t.type) && t.boundingBoxes && t.boundingBoxes.length) {
                var i = O.getRecommendedViewportForExpression(t.boundingBoxes, this.grapher.viewportController.getProjection());
                i && this.grapher.viewportController.zoomCustom(i)
            }
        }
        ,
        e.prototype._deleteItemAndAnimateOut = function(e, t) {
            var i = this
              , s = this.getItemSelectorById(e);
            s && (s.css({
                transition: "0.2s",
                opacity: "0",
                transform: "scale(.1, .1)"
            }),
            setTimeout(function() {
                i.dispatch({
                    type: "finish-deleting-item-after-animation",
                    id: e,
                    setFocusAfterDelete: t
                })
            }, 200))
        }
        ,
        e.prototype._finishDeletingItemAfterAnimation = function(e, t) {
            var i = this.getItemModel(e);
            if (i) {
                var s = this.getItemSelectorById(e)
                  , o = s && document.activeElement && U(document.activeElement).closest(s).length > 0
                  , r = F.findPrevSelectableItem(this.listModel, i.index);
                if (this._removeExpressionSynchronously(i),
                t && o) {
                    if (!r) {
                        var a = F.getFirstSelectableItem(this.listModel);
                        a && (r = a)
                    }
                    r && C.moveFocusToItem(this, r.id, "end")
                }
            }
        }
        ,
        e.prototype._removeExpressionSynchronously = function(e) {
            if (F.removeItemAtIndex(this.listModel, e.index),
            F.hasNoVisibleExpressions(this.listModel)) {
                var t = this.createItemModel({
                    type: "expression",
                    id: this.generateId(),
                    color: this.getNextColor()
                });
                F.insertItemAtEnd(this.listModel, t)
            }
        }
        ,
        e.prototype.setRootElt = function(e) {
            this.rootElt = e,
            this.dragdrop_expressions = new G.default(this)
        }
        ,
        e.prototype.getRootElt = function() {
            return this.rootElt
        }
        ,
        e.prototype._hideExpressions = function(e) {
            this.graphSettings.config.expressions && (F.setSelected(this.listModel, void 0),
            this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                expressionsVisible: !1,
                expressionsHiddenTime: Date.now()
            }),
            e ? C.setFocusLocation(this, {
                type: "show-expression-list-btn"
            }) : u.default())
        }
        ,
        e.prototype._showExpressions = function(e) {
            this.graphSettings.config.expressions && (this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                expressionsVisible: !0
            }),
            e ? C.setFocusLocation(this, {
                type: "hide-expression-list-btn"
            }) : u.default())
        }
        ,
        e.prototype._showToast = function(e) {
            var t = this;
            if (this.toastData = e,
            this.toastData.hasOwnProperty("undoCallback") && !r.IS_MOBILE) {
                var i = r.IS_APPLE ? this.s("graphing-calculator-text-toast-undo-cmd-z") : this.s("graphing-calculator-text-toast-undo-ctrl-z");
                this.toastData.message += " " + i
            }
            clearTimeout(this._hideToastTimeout);
            var s = "number" == typeof e.hideAfter ? e.hideAfter : 6e3;
            s > 0 && (this._hideToastTimeout = setTimeout(function() {
                t.dispatch({
                    type: "toast/close",
                    onHide: t.toastData.onHide
                })
            }, s))
        }
        ,
        e.prototype._setExpressionPropertiesFromAPI = function(e, t) {
            var i = this.getItemModel(e);
            if (i)
                if ("table" === i.type && t.columns) {
                    t = g.default(t);
                    var s = _.cloneTableAndExtendWithProperties(i, t)
                      , o = F.modelFromSpec(this.listModel, s);
                    this._toplevelReplaceItemAt(i.index, o, !1)
                } else {
                    var r = this.getItemModel(e);
                    if (!r)
                        return;
                    for (var a in t)
                        if (t.hasOwnProperty(a))
                            switch (a) {
                            case "slider":
                                if ("expression" !== r.type)
                                    continue;
                                var n = t[a];
                                n.hasOwnProperty("min") && k.setSliderMin(r, n.min),
                                n.hasOwnProperty("max") && k.setSliderMax(r, n.max),
                                n.hasOwnProperty("step") && k.setSliderStep(r, n.step);
                                break;
                            case "polarDomain":
                                if ("expression" !== r.type)
                                    continue;
                                k.setPolarDomainMin(r, m.default(t.polarDomain.min)),
                                k.setPolarDomainMax(r, m.default(t.polarDomain.max));
                                break;
                            case "parametricDomain":
                                if ("expression" !== r.type)
                                    continue;
                                k.setParametricDomainMin(r, m.default(t.parametricDomain.min)),
                                k.setParametricDomainMax(r, m.default(t.parametricDomain.max));
                                break;
                            case "hidden":
                                this._setItemHidden(e, t.hidden);
                                break;
                            case "secret":
                                D.setSecret(r, t.secret);
                                break;
                            case "color":
                                if ("expression" !== r.type)
                                    continue;
                                k.setColor(r, t.color);
                                break;
                            case "dragMode":
                                if ("expression" !== r.type)
                                    continue;
                                k.setDragMode(r, t.dragMode);
                                break;
                            case "label":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLabel(r, t.label);
                                break;
                            case "showLabel":
                                if ("expression" !== r.type)
                                    continue;
                                k.setShowLabel(r, t.showLabel);
                                break;
                            case "labelSize":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLabelSize(r, t.labelSize);
                                break;
                            case "labelOrientation":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLabelOrientation(r, t.labelOrientation);
                                break;
                            case "latex":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLatex(r, t.latex);
                                break;
                            case "points":
                                if ("expression" !== r.type)
                                    continue;
                                k.setPoints(r, !!t.points);
                                break;
                            case "lines":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLines(r, !!t.lines);
                                break;
                            case "pointStyle":
                                if ("expression" !== r.type)
                                    continue;
                                k.setPointStyle(r, t.pointStyle);
                                break;
                            case "pointSize":
                                if ("expression" !== r.type)
                                    continue;
                                k.setPointSize(r, t.pointSize);
                                break;
                            case "pointOpacity":
                                if ("expression" !== r.type)
                                    continue;
                                k.setPointOpacity(r, t.pointOpacity);
                                break;
                            case "lineStyle":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLineStyle(r, t.lineStyle);
                                break;
                            case "lineWidth":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLineWidth(r, t.lineWidth);
                                break;
                            case "lineOpacity":
                                if ("expression" !== r.type)
                                    continue;
                                k.setLineOpacity(r, t.lineOpacity);
                                break;
                            case "fill":
                                if ("expression" !== r.type)
                                    continue;
                                k.setFill(r, t.fill);
                                break;
                            case "fillOpacity":
                                if ("expression" !== r.type)
                                    continue;
                                k.setFillOpacity(r, t.fillOpacity);
                                break;
                            case "id":
                            case "type":
                            case "domain":
                                break;
                            default:
                                throw new Error("trying to call setProperty for: " + a)
                            }
                }
        }
        ,
        e.prototype._isParentFolderHidden = function(e) {
            var t = this.getItemModel(e);
            if (!t)
                return !1;
            var i = F.getParentFolderModel(t);
            return !!i && i.hidden
        }
        ,
        e.prototype._toggleItemHidden = function(e) {
            if (this._isParentFolderHidden(e))
                this._setItemHidden(e, !1);
            else {
                var t = this.getItemModel(e);
                if (!t)
                    return;
                switch (t.type) {
                case "expression":
                case "image":
                case "folder":
                    this._setItemHidden(e, !t.hidden);
                    break;
                case "table":
                case "text":
                    break;
                default:
                    return t
                }
            }
        }
        ,
        e.prototype._toggleTableColumnHidden = function(e, t) {
            if (this._isParentFolderHidden(e))
                this._setTableColumnHidden(e, t, !1);
            else {
                var i = this.getItemModel(e);
                if (!i || "table" !== i.type)
                    return;
                var s = _.getColumnModel(i, t);
                if (!s)
                    return;
                this._setTableColumnHidden(e, t, !s.hidden)
            }
        }
        ,
        e.prototype._setTableColumnHidden = function(e, t, i) {
            var s = this.getItemModel(e);
            if (s && "table" === s.type) {
                var o = _.shouldHideColumn(s, t);
                !i && this._isParentFolderHidden(e) && this._setItemHidden(s.folderId, !1),
                _.setColumnHidden(s, t, i),
                !i && o && _.setColumnPoints(s, t, !0)
            }
        }
        ,
        e.prototype._setItemHidden = function(e, t) {
            var i = this.getItemModel(e);
            if (i)
                switch (!t && "folder" !== i.type && this._isParentFolderHidden(i.id) && this._setItemHidden(i.folderId, !1),
                i.type) {
                case "expression":
                    k.setHidden(i, t);
                    break;
                case "folder":
                    L.setHidden(i, t);
                    break;
                case "image":
                    w.setHidden(i, t);
                    break;
                case "table":
                case "text":
                    break;
                default:
                    return i
                }
        }
        ,
        e.prototype._addItemToEndFromAPI = function(e) {
            var t = F.getLastSelectableItem(this.listModel);
            !e.secret && t && "expression" === t.type && "" === t.latex && F.removeItemAtIndex(this.listModel, t.index),
            F.insertItemAtEnd(this.listModel, e)
        }
        ,
        e.prototype.copyExpressionToIndex = function(e, t, s) {
            var o, r = this, a = {
                stripDefaults: !1
            };
            switch (e.type) {
            case "expression":
                o = k.getState(e, a);
                break;
            case "table":
                (o = _.getState(e, a)).columns && o.columns.forEach(function(e) {
                    e.id = r.generateId()
                });
                break;
            case "image":
                o = w.getState(e, a);
                break;
            case "text":
                o = A.getState(e, a);
                break;
            default:
                return
            }
            var n = this.createItemModel(i.__assign(i.__assign({}, o), {
                id: this.generateId()
            }));
            this._toplevelInsertItemAt(t, n, !1, s || e.folderId)
        }
        ,
        e.prototype._toplevelInsertItemAt = function(e, t, i, s) {
            var o = t;
            F.insertItemAtIndex(this.listModel, o, e),
            s && D.setFolderId(o, s),
            i && C.moveFocusToItem(this, o.id)
        }
        ,
        e.prototype._toplevelNewItemAtSelection = function(e, t) {
            var i = this.getSelectedItem();
            if (i) {
                var s = "expression" === i.type && !i.latex;
                if (s && !i.folderId && ("expression" !== e.type || e.latex))
                    return this._toplevelReplaceItemAt(i.index, e, t.shouldFocus);
                if (s && i.folderId && "expression" !== e.type && "folder" !== e.type)
                    return this._toplevelReplaceItemAt(i.index, e, t.shouldFocus);
                if ("folder" !== i.type && !i.folderId) {
                    return this._toplevelInsertItemAt(i.index + 1, e, t.shouldFocus, undefined)
                }
                if ("folder" !== i.type && i.folderId && "folder" !== e.type)
                    return this._toplevelInsertItemAt(i.index + 1, e, t.shouldFocus, i.folderId);
                if ("folder" === i.type && !i.collapsed && "folder" !== e.type)
                    return this._toplevelInsertItemAt(i.index + 1, e, t.shouldFocus, i.id)
            }
            var o = this.getFirstFullyVisibleItem();
            for (o && "folder" === o.type && (o = this.getItemModelByIndex(o.index + 1)); o && "folder" !== o.type && o.folderId; )
                o = this.getItemModelByIndex(o.index + 1);
            var r = o ? o.index : this.getItemCount();
            return this._toplevelInsertItemAt(r, e, t.shouldFocus, undefined)
        }
        ,
        e.prototype.getFirstFullyVisibleItem = function() {
            var e = z.getFirstFullyVisibleItemId(this);
            if (e)
                return F.getItemById(this.listModel, e)
        }
        ,
        e.prototype.find$ = function(e) {
            return U(this.rootElt).find(e)
        }
        ,
        e.prototype.getExppanelSelectorOrThrow = function() {
            var e = z.getExppanelElt(this);
            if (e)
                return U(e);
            throw new Error("expected to find $exppanel but could not")
        }
        ,
        e.prototype.scrollItemIntoView = function(e) {
            if (this.rootElt && this.isListVisible()) {
                var t = this.getItemSelectorById(e.id)
                  , i = z.getExppanelSelector(this);
                if (t && i) {
                    if ("table" === e.type) {
                        var o = t.find(".dcg-row .dcg-selected");
                        if (1 === o.length)
                            return void s.scrollVisible(o, i, 60)
                    }
                    s.scrollVisible(t, i, 90)
                }
            }
        }
        ,
        e.prototype.scrollSelectedItemIntoView = function() {
            var e = this.getSelectedItem();
            e && this.scrollItemIntoView(e)
        }
        ,
        e.prototype._pasteTable = function(e) {
            var t = this;
            if (this.grapher) {
                var i = F.findAvailableColumnSubscript(this.listModel)
                  , s = _.makeTableState(i, e, this)
                  , o = this.createItemModel(s);
                this._toplevelNewItemAtSelection(o, {
                    shouldFocus: !0
                }),
                this._closeAddExpression();
                var r = this.grapher.viewportController.getViewport()
                  , a = n.map(e[0], function(e) {
                    return parseFloat(e)
                })
                  , l = n.map(e[1], function(e) {
                    return parseFloat(e)
                })
                  , d = {
                    xmin: n.min(a),
                    xmax: n.max(a),
                    ymin: n.min(l),
                    ymax: n.max(l),
                    type: "table"
                };
                if (isFinite(d.xmin) && isFinite(d.xmax) && isFinite(d.ymin) && isFinite(d.ymax) && (d.xmax > r.xmax || d.xmin < r.xmin || d.ymax > r.ymax || d.ymin < r.ymin)) {
                    var p = O.getRecommendedViewportForExpression([d], r);
                    if (p) {
                        var c = new f.Viewport(p.xmin,p.xmax,p.ymin,p.ymax);
                        this.grapher.viewportController.setViewport(c),
                        this._showToast({
                            message: this.s("graphing-calculator-text-toast-zoom-to-fit"),
                            undoCallback: function() {
                                t.dispatch({
                                    type: "undo"
                                })
                            }
                        })
                    }
                }
            }
        }
        ,
        e.prototype._insertSeveralExpressions = function(e) {
            for (var t = 0; t < e.length; t++) {
                var i;
                i = this.createItemModel(e[t]),
                this._toplevelNewItemAtSelection(i, {
                    shouldFocus: !0
                })
            }
        }
        ,
        e.prototype._appendNumberList = function(e) {
            var t = this.getSelectedItem();
            if (t && "expression" === t.type) {
                var i = t.latex
                  , s = this.createItemModel({
                    type: "expression",
                    id: this.generateId(),
                    latex: i + e
                });
                return this._toplevelReplaceItemAt(t.index, s, !0)
            }
        }
        ,
        e.prototype._openOnWeb = function() {
            var e = this;
            this.runAfterDispatch(function() {
                if (e.grapher) {
                    var t = JSON.stringify(e.getState())
                      , i = e.grapher.screenshot({
                        width: 100,
                        height: 100
                    })
                      , s = (e.getGraphSettings().config.crossOriginSaveTest ? "/" : "https://www.desmos.com/") + "api/v1/calculator/cross_origin_save"
                      , o = U('<input type="text" name="calc_state" />').val(t)
                      , r = U('<input type="text" name="thumb_data" />').val(i)
                      , a = U('<form target="_blank" method="POST" style="display:none;"></form>').attr("action", s).append(U('<input type="text" name="is_open_on_web" value="true" />')).append(U('<input type="text" name="my_graphs" value="false" />')).append(U('<input type="text" name="is_update" value="false" />')).append(o).append(r);
                    U(e.rootElt).append(a),
                    a.trigger("submit").remove()
                }
            })
        }
        ,
        e.prototype.notifyBugsnagAboutMissingSelectedItem = function(e, t) {
            var i = F.getSelected(this.listModel)
              , s = "";
            try {
                s = i ? JSON.stringify(i.cachedUndoRedoFullState, null, 2) : "undefined"
            } catch (e) {
                s = "[[could not stringify]]"
            }
            var o = "";
            try {
                if (i) {
                    var r = {
                        id: i.id,
                        index: i.index,
                        displayIndex: i.index,
                        secretIndex: i.secretIndex,
                        guid: i.guid,
                        renderShell: i.renderShell,
                        isHiddenFromUI: i.isHiddenFromUI,
                        hasDCGView: !!i.dcgView,
                        cachedRenderHeight: i.cachedRenderHeight
                    };
                    o = JSON.stringify(r, null, 2)
                } else
                    o = "undefined"
            } catch (e) {
                o = "[[could not stringify]]"
            }
            var a = "";
            try {
                a = JSON.stringify(F.getUndoRedoFullState(this.listModel), null, 2)
            } catch (e) {
                a = "[[could not stringify]]"
            }
            N.notify("ReplaceItemAtError: no item at index", {
                metaData: {
                    index: e,
                    shouldFocus: t,
                    selectedModelJSON: o,
                    selectedItemJSON: s,
                    listStateJSON: a
                }
            })
        }
        ,
        e.prototype._toplevelReplaceItemAt = function(e, t, i) {
            var s = t
              , o = this.getItemModelByIndex(e);
            o || this.notifyBugsnagAboutMissingSelectedItem(e, i);
            var r = "folder" !== o.type && o.folderId;
            F.removeItemAtIndex(this.listModel, e),
            F.insertItemAtIndex(this.listModel, s, e),
            r && D.setFolderId(s, r),
            i && C.moveFocusToItem(this, s.id)
        }
        ,
        e.prototype.convertImageToDraggable = function(e) {
            var t = this.getItemModel(e);
            if (t && "image" === t.type) {
                var i = t.folderId
                  , s = t.index + 1
                  , o = t.center
                  , r = F.findAvailableColumnSubscript(this.listModel)
                  , n = a.identifierToLatex("C_" + r)
                  , l = this.createItemModel({
                    id: this.generateId(),
                    type: "expression",
                    latex: n + "=" + o,
                    dragMode: c.DragMode.XY,
                    hidden: !0
                });
                F.insertItemAtIndex(this.listModel, l, s),
                i && D.setFolderId(l, i),
                w.setMQAttribute(t, "center", n),
                w.setDraggable(t, !0),
                w.setForeground(t, !0),
                this.listModel.openItemMenu = void 0
            }
        }
        ,
        e.prototype.createSlidersForItem = function(e, t) {
            var i = this.getItemModel(e);
            if (i) {
                var s = "folder" !== i.type && i.folderId;
                return this.createSliders({
                    model: i,
                    folderId: s,
                    index: i.index + 1
                }, t)
            }
        }
        ,
        e.prototype.createSlidersForTicker = function(e) {
            return this.createSliders({
                model: this.listModel.ticker,
                folderId: !1,
                index: 0,
                doNotChangeFocus: !0
            }, e)
        }
        ,
        e.prototype.createSliders = function(e, t) {
            var i = this
              , s = e.model
              , o = e.folderId
              , r = e.index
              , n = e.doNotChangeFocus
              , l = [];
            "ticker" === s.type ? E.eachLatex(s, function(e, t) {
                l.push({
                    latex: e,
                    location: t
                })
            }) : F.eachLatexForItem(s, function(e, t) {
                l.push({
                    latex: e,
                    location: t
                })
            });
            for (var d = x.computeDefaults(l, t, {
                degreeMode: this.graphSettings.degreeMode
            }), p = s.formula ? s.formula.action_value : void 0, c = t.map(function(e) {
                var t, s = d[e], o = "1";
                s && void 0 !== s.value && (o = s.value),
                t = "" === e ? "" : p && p.hasOwnProperty(e) ? p[e] : a.identifierToLatex(e) + "=" + o;
                var r = {
                    type: "expression",
                    id: i.generateId(),
                    latex: t,
                    color: i.getNextColor(),
                    hidden: !!t
                };
                return s && (void 0 !== s.min && (r.slider || (r.slider = {}),
                r.slider.hardMin = !0,
                r.slider.min = s.min),
                void 0 !== s.max && (r.slider || (r.slider = {}),
                r.slider.hardMax = !0,
                r.slider.max = s.max),
                void 0 !== s.step && (r.slider || (r.slider = {}),
                r.slider.step = s.step)),
                r
            }), h = c.length - 1; h >= 0; h--) {
                var u = this.createItemModel(c[h]);
                F.insertItemAtIndex(this.listModel, u, r),
                o && D.setFolderId(u, o)
            }
            if (!n) {
                var g = c[c.length - 1];
                "" === g.latex ? C.moveFocusToItem(this, g.id) : C.setFocusLocation(this, void 0)
            }
        }
        ,
        e.prototype._uploadImagesAndWaitForThemToLoad = function(e) {
            var t = this
              , i = e.files
              , s = e.id;
            if (i && 0 !== i.length)
                if (s && i.length > 1)
                    this._showToast({
                        message: this.s("graphing-calculator-text-toast-choose-one-file")
                    });
                else {
                    var o = w.uploadImages({
                        controller: this,
                        files: i,
                        id: s
                    })
                      , r = o.errors[0];
                    r && this._showToast({
                        message: r
                    });
                    for (var a = 0, n = o.tokens; a < n.length; a++) {
                        var l = n[a];
                        this.__pendingImageUploads[l] = !0
                    }
                    this.isUploadingImages() && this._showToast({
                        message: this.s("graphing-calculator-text-toast-uploading-images"),
                        onHide: function() {
                            t._clearPendingImageUploads()
                        }
                    })
                }
            else
                this._showToast({
                    message: this.s("graphing-calculator-text-toast-no-file-selected")
                })
        }
        ,
        e.prototype.getImageToRetry = function() {
            for (var e, t = 0, i = this.getAllItemModels(); t < i.length; t++) {
                var s = i[t];
                "image" === s.type && "failed" === s.loadStatus && (!e || e.failures > s.failures) && (e = s)
            }
            return e
        }
        ,
        e.prototype.retryLoadingFailedImage = function(e) {
            var t = Date.now()
              , i = t - this.imageRetryState.lastAttemptTime
              , s = 1e3 * Math.pow(2, this.imageRetryState.attempts);
            this.imageRetryState.attempts > 0 && i < s || (w.retryLoading(e),
            this.imageRetryState = {
                lastAttemptTime: t,
                attempts: this.imageRetryState.attempts + 1
            })
        }
        ,
        e.prototype.getSelectedItem = function() {
            return F.getSelected(this.listModel)
        }
        ,
        e.prototype.getOpenItemMenu = function() {
            return this.listModel.openItemMenu
        }
        ,
        e.prototype.closeItemSettingsMenu = function() {
            var e = this.getOpenItemMenu();
            void 0 !== e && (e.focusFirstOption && (void 0 !== e.previousFocusLocation ? C.setFocusLocation(this, e.previousFocusLocation) : this.focusOpenMenuIcon()),
            this.listModel.openItemMenu = void 0)
        }
        ,
        e.prototype.focusOpenMenuIcon = function() {
            var e = this.getOpenItemMenu();
            e && ("slider" === e.type ? this.dispatch({
                type: "set-focus-location",
                location: {
                    type: "slider-animation-properties-icon",
                    id: e.model.id
                }
            }) : "image" === e.type ? this.dispatch({
                type: "set-focus-location",
                location: {
                    type: "image-icon",
                    id: e.model.id
                }
            }) : "table-column" === e.type ? this.dispatch({
                type: "set-focus-location",
                location: {
                    type: "table-icon",
                    id: e.model.table.id,
                    columnId: e.model.id
                }
            }) : this.dispatch({
                type: "set-focus-location",
                location: {
                    type: "expression-icon",
                    id: e.model.id
                }
            }))
        }
        ,
        e.prototype.getFocusedItem = function() {
            return C.getFocusedItem(this)
        }
        ,
        e.prototype.getFocusLocation = function() {
            return this.focusLocation
        }
        ,
        e.prototype.isFocusLocationFocused = function(e) {
            var t = this.focusLocation
              , i = e;
            return !(!t || !i) && n.isEqual(t, i)
        }
        ,
        e.prototype.isCurrentFocusLocationValid = function() {
            var e = this.focusLocation;
            if (!e)
                return !0;
            if ("settings" === e.type)
                return "icon" === e.location || this.isGraphSettingsOpen();
            if ("add-item-btn" === e.type || "edit-list-toggle" === e.type || "hide-expression-list-btn" === e.type || "show-expression-list-btn" === e.type)
                return this.isListEnabled();
            if ("add-expression-btn" === e.type || "add-table-btn" === e.type)
                return this.layoutModel.addExpressionOpen;
            if ("add-note-btn" === e.type)
                return this.layoutModel.addExpressionOpen && this.areNotesEnabled();
            if ("add-folder-btn" === e.type)
                return this.layoutModel.addExpressionOpen && this.areFoldersEnabled();
            if ("add-ticker-btn" === e.type)
                return this.layoutModel.addExpressionOpen && this.areActionsEnabled();
            if ("add-image-btn" === e.type)
                return this.layoutModel.addExpressionOpen && this.areImagesEnabled();
            if ("search-expressions" === e.type)
                return this.expressionSearchOpen;
            if ("ticker" === e.type)
                return this.listModel.ticker.open;
            var t = void 0
              , i = this.getOpenItemMenu();
            if (!(t = i && "table-column" === i.type ? i.model.table : this.getItemModel(e.id)))
                return !1;
            if ("change-image-btn" === e.type)
                return this.listModel && "image" === t.type && this.areImagesEnabled();
            if ("expression-menu" === e.type) {
                if ("start" === e.location || "end" === e.location || "updaterule" === e.location || "anywhere" === e.location)
                    return !0;
                if ("table" === t.type)
                    return !0;
                if ("expression" !== t.type)
                    return !1;
                var s = t.points
                  , o = t.lines
                  , r = t.fill;
                k.isInequality(t) && (r = !0);
                var a = I.getReconciledExpressionProps(t.formula.expression_type, {
                    points: s,
                    lines: o,
                    fill: r
                });
                return !!(a.fill || a.points || a.lines || t.showLabel)
            }
            if (!this.isItemSelected(e.id) && "editable-label" !== e.type)
                return !1;
            switch (e.type) {
            case "domain-limit":
                return "expression" === t.type && !!k.hasDomain(t);
            case "expression-icon":
                return !0;
            case "image-icon":
                return "image" === t.type && "loading" !== t.loadStatus && "failed" !== t.loadStatus && !t.error;
            case "action-icon":
                return "expression" === t.type && !!k.isNonemptyAction(t);
            case "slider-icon":
            case "slider-animation-properties-icon":
            case "slider-thumb":
            case "slider-limit":
                return "expression" === t.type && !!k.hasSlider(t);
            case "table-icon":
                return "table" === t.type && this.getGraphSettings().config.graphpaper;
            case "visualization-prop":
                return "expression" === t.type && !!k.isVisualization(t);
            case "distribution-param":
                if ("expression" !== t.type)
                    return !1;
                var n = k.parseToplevelFunction(t);
                return !!n && e.location in n.values;
            case "cdf-limit":
                return "expression" === t.type && k.shouldShowCDFFooter(t);
            case "image":
                return "image" === t.type;
            case "folder":
                return "folder" === t.type;
            case "text":
                return "text" === t.type;
            case "expression":
                return "expression" === t.type && !this.isInEditListMode();
            case "readonly-expression":
                return "expression" === t.type && this.isInEditListMode();
            case "braille-output":
                return "expression" === t.type && "none" !== this.getBrailleMode();
            case "table":
                return "table" === t.type && !!_.doesCellExist(t, e.location);
            case "table-container":
                return "table" === t.type && this.isInEditListMode();
            case "editable-label":
                return "expression" === t.type && k.hasEditableLabel(t);
            default:
                return e
            }
        }
        ,
        e.prototype.isDragDropActive = function() {
            return !!this.listModel.dragState
        }
        ,
        e.prototype.isItemBeingDragged = function(e) {
            var t = this.listModel.dragState;
            return !(!t || t.firstItemId !== e)
        }
        ,
        e.prototype.getDraggedItemId = function() {
            var e = this.listModel.dragState;
            return e && e.firstItemId
        }
        ,
        e.prototype.getRawDragState = function() {
            return this.listModel.dragState
        }
        ,
        e.prototype.initStateStack = function() {
            this.stateStack = new y.default,
            this.stateStack.addState({
                diffState: this.getUndoRedoDiffState(),
                fullState: this.getUndoRedoFullState()
            })
        }
        ,
        e.prototype.getUndoRedoDiffState = function() {
            return {
                randomSeed: this.getRandomSeed(),
                layoutModel: this.layoutModel,
                settingsViewModel: this.settingsViewModel,
                graph: this.grapher ? this.grapher.getUndoRedoState() : void 0,
                expressions: F.getUndoRedoDiffState(this.listModel),
                wasCompleteSetState: this.isCurrentlyDoingSetState
            }
        }
        ,
        e.prototype.getUndoRedoFullState = function() {
            return {
                randomSeed: this.getRandomSeed(),
                layoutModel: this.layoutModel,
                settingsViewModel: this.settingsViewModel,
                graph: this.grapher ? this.grapher.getUndoRedoState() : void 0,
                expressions: F.getUndoRedoFullState(this.listModel),
                wasCompleteSetState: this.isCurrentlyDoingSetState
            }
        }
        ,
        e.prototype.getState = function(e) {
            var t = {
                stripDefaults: !0
            };
            e && e.hasOwnProperty("stripDefaults") && (t.stripDefaults = !!e.stripDefaults);
            var s = this.grapher ? this.grapher.getState(t) : i.__assign(i.__assign({}, this.getBlankState().graph), {
                degreeMode: this.graphSettings.degreeMode
            })
              , o = {
                version: b.currentVersion,
                randomSeed: this.getRandomSeed(),
                graph: s,
                expressions: F.getState(this.listModel, t)
            };
            return e && e.avoidBackMigration ? g.default(o) : b.migrateToPersisted(g.default(o))
        }
        ,
        e.prototype.getBlankState = function() {
            return this.graphSettings.config.clearIntoDegreeMode ? i.__assign(i.__assign({}, H.default), {
                graph: i.__assign(i.__assign({}, H.default.graph), {
                    degreeMode: !0
                })
            }) : H.default
        }
        ,
        e.prototype.externalSetState = function(e, t) {
            this._clearPendingImageUploads(),
            this.rootElt && U(document.activeElement).closest(this.rootElt).length && U(document.activeElement).trigger("blur"),
            t || (t = {}),
            e || (e = this.getBlankState()),
            "string" == typeof e && (e = JSON.parse(e)),
            e && (e = b.migrateToLatest(e));
            var s = this.layoutModel;
            this.setState(e, t),
            F.clearAnyItemIsAction(this.listModel),
            F.recomputeAnyItemIsAction(this.listModel),
            this.layoutModel = i.__assign(i.__assign({}, V.defaultLayoutModel(this.graphSettings.config)), {
                keypadMinimized: s.keypadMinimized,
                keypadLayout: s.keypadLayout,
                keypadFunctionsOpen: s.keypadFunctionsOpen,
                expressionsVisible: !!this.graphSettings.config.expressions && (this.isListVisible() || !!t.forceExpressionsOpen)
            }),
            this.settingsViewModel = R.defaultSettingsViewModel(),
            C.setFocusLocation(this, void 0),
            t.forceUnsavedChanges ? this.enqueueEvent("change") : this.enqueueEvent("clearUnsavedChanges")
        }
        ,
        e.prototype.setState = function(e, t) {
            if (this.isCurrentlyDoingSetState = !0,
            "graph"in e && (this.grapher ? this.grapher.setGrapherState(e.graph) : o.Grapher.copyGraphProperties(e.graph, this.graphSettings)),
            "expressions"in e) {
                F.setSelected(this.listModel, void 0);
                var i = F.getLargestIntegerId(e.expressions);
                i >= this.__nextItemId && (this.__nextItemId = i + 1),
                F.setListState(this.listModel, e.expressions, t || {})
            }
            e.layoutModel && (this.layoutModel = e.layoutModel),
            e.settingsViewModel && (this.settingsViewModel = e.settingsViewModel),
            t && t.allowUndo || this.clearUndoRedoHistory(),
            this.setRandomSeed(e.randomSeed || j.default())
        }
        ,
        e.prototype.updateToState = function(e) {
            this.isCurrentlyDoingRestoreState = !0,
            "graph"in e && this.grapher && this.grapher.setGrapherState(e.graph, {
                doNotClear: !0
            }),
            "expressions"in e && F.restoreListState(this.listModel, e.expressions),
            e.layoutModel && (this.layoutModel = e.layoutModel),
            e.settingsViewModel && (this.settingsViewModel = e.settingsViewModel)
        }
        ,
        e.prototype.commitUndoRedoSynchronously = function(e) {
            var t = this.stateStack.getState()
              , i = t && t.diffState
              , s = this.getUndoRedoDiffState();
            if (o = i,
            r = s,
            !n.isEqual(J(o), J(r))) {
                var o, r, a = {
                    diffState: s,
                    fullState: this.getUndoRedoFullState()
                };
                !function(e) {
                    var t;
                    switch (e.type) {
                    case "tick":
                    case "tick-ticker":
                        return !1;
                    case "on-evaluator-changes":
                        return !!(null === (t = e.eventUpdates) || void 0 === t ? void 0 : t.userAction);
                    default:
                        return !0
                    }
                }(e) ? this.stateStack.replaceInteriorState(a) : (this.stateStack.addState(a),
                this.enqueueEvent("change"))
            }
        }
        ,
        e.prototype.undo = function() {
            if (this.canUndo()) {
                this.closeToast(),
                this.stateStack.undo();
                var e = this.stateStack.getState().fullState;
                e.wasCompleteSetState ? this.setState(e, {
                    allowUndo: !0
                }) : this.updateToState(e),
                this.enqueueEvent("change")
            }
        }
        ,
        e.prototype.redo = function() {
            if (this.canRedo()) {
                this.stateStack.redo();
                var e = this.stateStack.getState().fullState;
                e.wasCompleteSetState ? this.setState(e, {
                    allowUndo: !0
                }) : this.updateToState(e),
                this.enqueueEvent("change")
            }
        }
        ,
        e.prototype.clearUndoRedoHistory = function() {
            this.stateStack.clear()
        }
        ,
        e.prototype.canUndo = function() {
            return this.stateStack.canUndo()
        }
        ,
        e.prototype.canRedo = function() {
            return this.stateStack.canRedo()
        }
        ,
        e.prototype.closeToast = function() {
            var e = this.toastData.onHide;
            e && this.runAfterDispatch(e),
            this.toastData = {}
        }
        ,
        e.prototype._closeAddExpression = function() {
            this.layoutModel = i.__assign(i.__assign({}, this.layoutModel), {
                addExpressionOpen: !1
            })
        }
        ,
        e.prototype.doesDOMHaveSize = function() {
            return this.layoutMeasurements.width > 0 && this.layoutMeasurements.height > 0
        }
        ,
        e.prototype._getExpListWidth = function() {
            var e;
            if (void 0 !== this.userSpecifiedExpListWidth)
                e = Math.max(280, Math.min(this.layoutMeasurements.width - 200, this.userSpecifiedExpListWidth));
            else {
                if (!(e = this.layoutMeasurements.width))
                    return 356;
                var t = .2 * e + 160;
                e = Math.min(500, Math.max(280, t))
            }
            var i = this.layoutMeasurements.width - this.layoutMeasurements.height;
            return Math.abs(i - e) <= 10 ? i : e
        }
        ,
        e.prototype._setExpListWidth = function(e) {
            this.userSpecifiedExpListWidth !== e && (this.userSpecifiedExpListWidth = e)
        }
        ,
        e.prototype.getKeypadHeight = function() {
            return this.computeMajorLayout().keypad.height
        }
        ,
        e.prototype.isKeypadEnabled = function() {
            return !!this.graphSettings.config.keypad
        }
        ,
        e.prototype.isKeypadOpen = function() {
            if (!this.isKeypadEnabled())
                return !1;
            var e = this.layoutModel.keypadMinimized && !this.isNarrow();
            return this.needsFakeKeypad() && !e
        }
        ,
        e.prototype.isKeypadFunctionsPopoverOpen = function() {
            return !!this.layoutModel.keypadFunctionsOpen
        }
        ,
        e.prototype.getKeypadLayout = function() {
            return this.layoutModel.keypadLayout
        }
        ,
        e.prototype.isLetterKeypadOpen = function() {
            var e = this.getKeypadLayout();
            return this.isKeypadOpen() && ("letters" === e || "noQwertyLetters" === e || "capitalLetters" === e || "noQwertyCapitalLetters" === e)
        }
        ,
        e.prototype.isFileDraggedOver = function() {
            return this.layoutModel.isFileDraggedOver
        }
        ,
        e.prototype.computeMajorLayout = function() {
            var e = this.layoutMeasurements.width
              , t = this.layoutMeasurements.height
              , i = this.isNarrow()
              , s = this.isListVisible()
              , o = this.isKeypadOpen()
              , r = !this.isGrapherEnabled()
              , a = !this.isListEnabled()
              , n = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
              , l = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
              , d = {
                left: 0,
                top: t,
                width: e,
                height: !!this.getGraphSettings().config.projectorMode ? i ? 185 : 193 : 169
            };
            return a ? (l.width = e,
            l.height = t) : r ? (n.width = e,
            n.height = t) : s ? i ? (n.width = e,
            n.height = Math.round(.58 * t),
            n.top = t - n.height,
            l.width = e,
            l.height = t - n.height) : (n.width = this.getExpListWidth(),
            n.height = t,
            l.left = n.width,
            l.width = e - l.left,
            l.height = t) : s || (i ? (n.width = e,
            n.height = Math.round(.58 * t),
            n.top = t,
            l.width = e,
            l.height = t) : (n.width = this.getExpListWidth(),
            n.height = t,
            n.left = -n.width,
            l.width = e,
            l.height = t)),
            o && (d.top -= d.height,
            a || (n.height -= d.height)),
            {
                list: n,
                grapher: l,
                keypad: d
            }
        }
        ,
        e.prototype.isNarrow = function() {
            return this.layoutMeasurements.width < 450
        }
        ,
        e.prototype.getLayoutMeasurements = function() {
            return this.layoutMeasurements
        }
        ,
        e.prototype.getCapExpressionSize = function() {
            return !!this.getGraphSettings().config.capExpressionSize
        }
        ,
        e.prototype.handleAudioTraceCommand = function(e) {
            var t = this.getAudioGraph();
            if (void 0 !== t) {
                var i = t.agNavigator;
                switch (e) {
                case "on":
                    this.runAfterDispatch(function() {
                        t.enterAudioTrace({
                            fromKeypad: !0
                        })
                    });
                    break;
                case "off":
                    this.runAfterDispatch(function() {
                        t.exitAudioTrace()
                    });
                    break;
                case "hear-graph":
                    t.hearGraph();
                    break;
                case "stop-graph":
                    this.runAfterDispatch(function() {
                        t.stopGraph()
                    });
                    break;
                case "volume-down":
                    t.adjustVolume("down");
                    break;
                case "volume-up":
                    t.adjustVolume("up");
                    break;
                case "speed-down":
                    t.speedDown();
                    break;
                case "speed-up":
                    t.speedUp();
                    break;
                case "previous-point":
                    this.runAfterDispatch(function() {
                        t.reportAndMoveToPrevPoint()
                    });
                    break;
                case "next-point":
                    this.runAfterDispatch(function() {
                        t.reportAndMoveToNextPoint()
                    });
                    break;
                case "previous-poi":
                    this.runAfterDispatch(function() {
                        t.reportAndMoveToPrevPOI()
                    });
                    break;
                case "next-poi":
                    this.runAfterDispatch(function() {
                        t.reportAndMoveToNextPOI()
                    });
                    break;
                case "previous-curve":
                    this.runAfterDispatch(function() {
                        i.prevCurve()
                    });
                    break;
                case "next-curve":
                    this.runAfterDispatch(function() {
                        i.nextCurve()
                    });
                    break;
                case "describe-point":
                    t.describePoint();
                    break;
                case "describe-curve":
                    t.describeCurve();
                    break;
                case "keyboard-shortcuts":
                    this.enqueueEvent("showHotkeysModal");
                    break;
                default:
                    return e
                }
            }
        }
        ,
        e.prototype.setAudioTraceSpeed = function(e) {
            var t = this.getAudioGraph();
            t && t.adjustPlaybackSpeed(e)
        }
        ,
        e.prototype.focusGraphPaper = function() {
            this.find$(".dcg-graph-outer").trigger("focus")
        }
        ,
        e.prototype.setCanShowKeyboardShortcuts = function(e) {
            this.canShowKeyboardShortcuts = e
        }
        ,
        e.prototype.getCanShowKeyboardShortcuts = function() {
            return this.canShowKeyboardShortcuts
        }
        ,
        e
    }();
    function J(e) {
        return e ? i.__assign(i.__assign({}, e), {
            wasCompleteSetState: void 0,
            layoutModel: void 0,
            settingsViewModel: void 0
        }) : e
    }
    e.default = Y
});