define('graphing-calc/models/list', ["require", "exports", "lib/color-distance", "tslib", "./expression", "./folder", "./table", "./text", "./helper-expression", "./image", "./ticker", "core/types/graphmode", "core/lib/color-helpers", "underscore", "core/lib/deepCopy", "../../lib/latex-search-helpers"], function(require, e, t, r, o, n, i, a, l, d, s, c, u, f, m, p) {
    "use strict";
    function _(e, t) {
        return e.__itemModelArray[t]
    }
    function y(e, t) {
        var r;
        do {
            if (-1 === --t)
                return;
            r = _(e, t)
        } while (r && !h(r));
        return r
    }
    function I(e, t) {
        var r, o = E(e);
        do {
            if (++t === o)
                return;
            r = _(e, t)
        } while (r && !h(r));
        return r
    }
    function g(e) {
        if ("folder" !== e.type && e.folderId) {
            var t = k(e.controller.getListModel(), e.folderId);
            if (t && "folder" === t.type)
                return t
        }
    }
    function v(e) {
        if (!e)
            return !1;
        if (e.secret)
            return !0;
        var t = g(e);
        return !(!t || !t.secret)
    }
    function h(e) {
        return !x(e)
    }
    function x(e) {
        if (!e)
            return !0;
        if (e.filteredBySearch)
            return !0;
        if (e.controller.isItemBeingDragged(e.id))
            return !1;
        if (!e.controller.canAdministerSecretFolders() && v(e))
            return !0;
        var t = g(e);
        return !(!t || !t.collapsed || e.controller.getExpressionSearchStr())
    }
    function M(e) {
        return e.__itemModelArray
    }
    function A(e, t) {
        for (var r = 0; r < e.__itemModelArray.length; r++) {
            S(e.__itemModelArray[r], t)
        }
    }
    function S(e, t) {
        switch (e.type) {
        case "expression":
            o.eachLatex(e, t);
            break;
        case "table":
            i.eachLatex(e, t);
            break;
        case "image":
            d.eachLatex(e, t);
            break;
        case "folder":
        case "text":
            break;
        default:
            return e
        }
    }
    function b(e, t) {
        return !!e.replace(/([_^])([a-z0-9])/gi, "$1{$2}").match(t)
    }
    function k(e, t) {
        return e.__itemIdToModel[t]
    }
    function D(e, t) {
        return e.__helperIdToModel[t]
    }
    function w(e) {
        e.__anyDependsOnRandomSeed = !1;
        for (var t = 0; t < e.__itemModelArray.length; t++) {
            var r = e.__itemModelArray[t];
            if (r && "formula"in r && r.formula && r.formula.depends_on_random_seed)
                return void (e.__anyDependsOnRandomSeed = !0)
        }
    }
    function B(e) {
        if (!e.__anyIsAction)
            if (e.ticker.open)
                e.__anyIsAction = !0;
            else
                for (var t = 0; t < e.__itemModelArray.length; t++) {
                    var r = e.__itemModelArray[t];
                    if (r && "formula"in r && r.formula) {
                        if ("expression" !== r.type && "image" !== r.type)
                            continue;
                        var o = r.formula;
                        if (o.hasOwnProperty("action_value") || o.hasOwnProperty("click_handler"))
                            return void (e.__anyIsAction = !0)
                    }
                }
    }
    function F(e) {
        for (var t = !e.controller.canAdministerSecretFolders(), r = 1, o = 1, n = 0; n < e.__itemModelArray.length; n++) {
            var i = e.__itemModelArray[n];
            i.index = n,
            i.displayIndex = r,
            v(i) && (i.secretIndex = o,
            o += 1),
            t && v(i) || (r += 1)
        }
        e.nextDisplayIndex = r
    }
    function O(e) {
        e.__itemModelArray = [],
        e.__itemIdToModel = {},
        e.__helperIdToModel = {},
        e.__anyDependsOnRandomSeed = !1
    }
    function E(e) {
        return e.__itemModelArray.length
    }
    function R(e) {
        return e.selectedItem
    }
    function L(e, t) {
        switch (t.type) {
        case "expression":
            return o.initModel(t, e.controller);
        case "table":
            return i.initModel(t, e.controller);
        case "image":
            return d.initModel(t, e.controller);
        case "folder":
            return n.initModel(t, e.controller);
        case "text":
            return a.initModel(t, e.controller);
        default:
            return t
        }
    }
    function T(e, t) {
        e.selectedItem = t
    }
    function C(e, t, r) {
        var o = String(t.id);
        if (e.__itemIdToModel.hasOwnProperty(o))
            throw Error("Item with id '" + o + "' is already in list");
        e.__itemIdToModel[o] = t,
        e.__itemModelArray.splice(r, 0, t),
        F(e)
    }
    function N(e, t) {
        var r = e.__itemModelArray[t];
        if ("folder" === r.type) {
            for (var o = 0, n = r.index + 1; n < e.__itemModelArray.length; n++) {
                var i = e.__itemModelArray[n];
                if ("folder" === i.type || i.folderId !== r.id)
                    break;
                o += 1,
                U(i) && T(e, void 0),
                delete e.__itemIdToModel[i.id],
                delete e.expressionAnalysis[r.id]
            }
            e.__itemModelArray.splice(t, 1 + o)
        } else
            e.__itemModelArray.splice(t, 1);
        U(r) && T(e, void 0),
        delete e.__itemIdToModel[r.id],
        delete e.expressionAnalysis[r.id],
        w(e),
        F(e)
    }
    function U(e) {
        return e.controller.getListModel().selectedItem === e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.collapseAllFolders = e.getMissingVariablesForItem = e.setDragState = e.isItemSelected = e.selectNextItem = e.selectPrevItem = e.removeItemById = e.anyItemIsAction = e.anyItemDependsOnRandomSeed = e.removeItemAtIndex = e.insertItemAtEnd = e.insertItemAtIndex = e.moveItemsTo = e.setSelected = e.onEvaluatorFormulaUpdates = e.onGraphComputed = e.restoreListState = e.modelFromSpec = e.setListState = e.getLargestIntegerId = e.getState = e.getUndoRedoFullState = e.getUndoRedoDiffState = e.getSelected = e.getAllModelsWithSliders = e.hasNoVisibleExpressions = e.getItemCount = e.removeAllItems = e.reindex = e.recomputeAnyItemIsAction = e.clearAnyItemIsAction = e.recomputeAnyItemDependsOnRandomSeed = e.addHelperExpression = e.getHelperExpressionById = e.getItemsByIdentifier = e.getItemById = e.updateDrawOrder = e.findAvailableColumnSubscript = e.filterItemsBySearch = e.eachLatexForItem = e.eachLatex = e.getAllHelperItemModels = e.getAllItemModels = e.isItemHiddenFromUI = e.isItemSelectable = e.isItemSecret = e.getNumberOfItemsInFolder = e.getParentFolderModel = e.findNextSelectableItem = e.findPrevSelectableItem = e.getLastSelectableItem = e.getFirstSelectableItem = e.getItemByIndex = e.getNextColor = e.areAnyImagesLoading = e.init = void 0,
    e.init = function(e) {
        return {
            controller: e,
            __itemModelArray: [],
            __itemIdToModel: {},
            __helperIdToModel: {},
            __anyDependsOnRandomSeed: !1,
            __anyIsAction: !1,
            drawOrder: [],
            colorIdx: 0,
            expressionAnalysis: {},
            nextDisplayIndex: 1,
            ticker: s.defaultTicker()
        }
    }
    ,
    e.areAnyImagesLoading = function(e) {
        for (var t = 0; t < e.__itemModelArray.length; t++) {
            var r = e.__itemModelArray[t];
            if ("image" === r.type && "loading" === r.loadStatus)
                return !0
        }
        return !1
    }
    ,
    e.getNextColor = function(e) {
        var t = f.filter(f.values(e.controller.getColors()), function(e) {
            return e != u.colors.ORANGE
        })
          , r = t[e.colorIdx];
        return e.colorIdx = (e.colorIdx + 1) % t.length,
        r
    }
    ,
    e.getItemByIndex = _,
    e.getFirstSelectableItem = function(e) {
        for (var t = 0; t < e.__itemModelArray.length; t++) {
            var r = e.__itemModelArray[t];
            if (h(r))
                return r
        }
    }
    ,
    e.getLastSelectableItem = function(e) {
        for (var t = e.__itemModelArray.length - 1; t >= 0; t--) {
            var r = e.__itemModelArray[t];
            if (h(r))
                return r
        }
    }
    ,
    e.findPrevSelectableItem = y,
    e.findNextSelectableItem = I,
    e.getParentFolderModel = g,
    e.getNumberOfItemsInFolder = function(e, t) {
        var r = k(e, t);
        if (!r || "folder" !== r.type)
            return 0;
        for (var o = 0, n = e.__itemModelArray.length, i = r.index + 1; i < n; i++) {
            var a = e.__itemModelArray[i];
            if ("folder" === a.type || a.folderId !== t)
                break;
            o += 1
        }
        return o
    }
    ,
    e.isItemSecret = v,
    e.isItemSelectable = h,
    e.isItemHiddenFromUI = x,
    e.getAllItemModels = M,
    e.getAllHelperItemModels = function(e) {
        return f.values(e.__helperIdToModel)
    }
    ,
    e.eachLatex = A,
    e.eachLatexForItem = S,
    e.filterItemsBySearch = function(e, t) {
        for (var r = 0, n = p.getFuzzyLatexRegExp(t), a = 0; a < e.__itemModelArray.length; a++)
            if (t) {
                var l = e.__itemModelArray[a];
                switch (l.filteredBySearch = !0,
                l.type) {
                case "expression":
                    o.eachLatex(l, function(e) {
                        b(e, n) && (l.filteredBySearch = !1,
                        r++)
                    }),
                    l.label && l.showLabel && (0 === "label".indexOf(t) || b(l.label, n)) && (l.filteredBySearch = !1,
                    r++);
                    break;
                case "table":
                    i.eachLatex(l, function(e) {
                        b(e, n) && (l.filteredBySearch = !1,
                        r++)
                    });
                    break;
                case "image":
                    d.eachLatex(l, function(e) {
                        b(e, n) && (l.filteredBySearch = !1,
                        r++)
                    });
                    break;
                case "folder":
                    l.title && l.title.indexOf(t) >= 0 && (l.filteredBySearch = !1,
                    r++);
                    break;
                case "text":
                    l.text.indexOf(t) >= 0 && (l.filteredBySearch = !1,
                    r++);
                    break;
                default:
                    return l
                }
                !l.filteredBySearch && "folder" !== l.type && l.folderId && (e.__itemIdToModel[l.folderId].filteredBySearch = !1,
                r++)
            } else
                e.__itemModelArray[a].filteredBySearch = !1;
        return r
    }
    ,
    e.findAvailableColumnSubscript = function(e) {
        var t = [];
        A(e, function(e) {
            if (-1 === e.indexOf("~") && -1 === e.indexOf("\\sim"))
                for (var r = /_(\d)|_\{(?:\s|\\space)*(\d+)(?:\s|\\space)*\}/g; ; ) {
                    var o = r.exec(e);
                    if (!o)
                        break;
                    t.push(parseInt(o[1] || o[2], 10))
                }
        }),
        t.sort(function(e, t) {
            return e - t
        });
        for (var r = 1, o = 0; o < t.length; o++)
            t[o] === r && r++;
        return r
    }
    ,
    e.updateDrawOrder = function(e) {
        var t = [];
        f.each(e.__itemModelArray, function(e) {
            "table" === e.type ? f.each(e.columnModels, function(e) {
                t.push(e.id)
            }) : t.push(e.id)
        }),
        e.drawOrder = t
    }
    ,
    e.getItemById = k,
    e.getItemsByIdentifier = function(e, t) {
        for (var r = [], n = 0; n < e.__itemModelArray.length; n++) {
            var i = e.__itemModelArray[n];
            "expression" === i.type && o.getAssignment(i) === t && r.push(i)
        }
        return r
    }
    ,
    e.getHelperExpressionById = D,
    e.addHelperExpression = function(e, t) {
        var r = l.init(t);
        e.__helperIdToModel[r.id] = r
    }
    ,
    e.recomputeAnyItemDependsOnRandomSeed = w,
    e.clearAnyItemIsAction = function(e) {
        e.__anyIsAction = !1
    }
    ,
    e.recomputeAnyItemIsAction = B,
    e.reindex = F,
    e.removeAllItems = O,
    e.getItemCount = E,
    e.hasNoVisibleExpressions = function(e) {
        return 1 === e.nextDisplayIndex
    }
    ,
    e.getAllModelsWithSliders = function(e) {
        for (var t = [], r = 0; r < e.__itemModelArray.length; r++) {
            var o = e.__itemModelArray[r];
            "expression" === o.type && o.sliderExists && t.push(o)
        }
        return t
    }
    ,
    e.getSelected = R,
    e.getUndoRedoDiffState = function(e) {
        return {
            list: e.__itemModelArray.map(function(e) {
                return e.cachedUndoRedoDiffState
            }),
            ticker: s.getUndoRedoDiffState(e.ticker)
        }
    }
    ,
    e.getUndoRedoFullState = function(e) {
        return {
            list: e.__itemModelArray.map(function(e) {
                return e.cachedUndoRedoFullState
            }),
            ticker: s.getUndoRedoFullState(e.ticker)
        }
    }
    ,
    e.getState = function(e, t) {
        var r = {
            list: e.__itemModelArray.map(function(e) {
                switch (e.type) {
                case "expression":
                    return o.getState(e, t);
                case "image":
                    return d.getState(e, t);
                case "table":
                    return i.getState(e, t);
                case "folder":
                    return n.getState(e, t);
                case "text":
                    return a.getState(e, t);
                default:
                    return e
                }
            })
        }
          , l = s.getState(e.ticker, t);
        return l && (r.ticker = l),
        r
    }
    ,
    e.getLargestIntegerId = function(e) {
        for (var t = 0, r = /^[0-9]+$/, o = e.list.length - 1; o >= 0; o--) {
            var n = e.list[o]
              , i = n.id;
            if (r.test(i))
                (l = parseInt(i, 10)) > t && (t = l);
            if ("table" === n.type && n.columns)
                for (var a = n.columns.length - 1; a >= 0; a--) {
                    var l;
                    if (i = n.columns[a].id,
                    r.test(i))
                        (l = parseInt(i, 10)) > t && (t = l)
                }
        }
        return t
    }
    ,
    e.setListState = function(e, r, o) {
        var n, i;
        for (o || (o = {}),
        e.colorIdx = 0,
        O(e),
        e.expressionAnalysis = {},
        n = 0; n < r.list.length; n++) {
            if (i = L(e, r.list[n]),
            o.remapColors && "color"in i && i.color) {
                var a = f.values(e.controller.getColors());
                f.contains(a, i.color) || (i.color = t.closestColor(i.color, a))
            }
            e.__itemModelArray.push(i),
            e.__itemIdToModel[i.id] = i
        }
        if (e.ticker = s.initModel(r.ticker),
        F(e),
        1 === e.nextDisplayIndex) {
            var l = L(e, {
                type: "expression",
                id: e.controller.generateId(),
                color: e.controller.getNextColor()
            });
            C(e, l, e.__itemModelArray.length)
        }
    }
    ,
    e.modelFromSpec = L,
    e.restoreListState = function(e, t) {
        var r, l, c = e.__itemIdToModel;
        for (e.__itemModelArray = [],
        e.__itemIdToModel = {},
        r = 0; r < t.list.length; r++) {
            var u = t.list[r];
            if ((l = c[u.id]) && l.type === u.type)
                switch (l.type) {
                case "expression":
                    if (u.type !== l.type)
                        throw new Error("invalid restoration");
                    o.restoreState(l, u);
                    break;
                case "table":
                    if (u.type !== l.type)
                        throw new Error("invalid restoration");
                    i.restoreState(l, u);
                    break;
                case "image":
                    if (u.type !== l.type)
                        throw new Error("invalid restoration");
                    d.restoreState(l, u);
                    break;
                case "folder":
                    if (u.type !== l.type)
                        throw new Error("invalid restoration");
                    n.restoreState(l, u);
                    break;
                case "text":
                    if (u.type !== l.type)
                        throw new Error("invalid restoration");
                    a.restoreState(l, u);
                    break;
                default:
                    return l
                }
            else
                l = L(e, u);
            e.__itemModelArray.push(l),
            e.__itemIdToModel[l.id] = l
        }
        t.ticker && s.restoreState(e.ticker, t.ticker),
        w(e),
        B(e),
        F(e)
    }
    ,
    e.onGraphComputed = function(e, t, r) {
        var o, n = k(e, r[0] && r[0].tableId || t);
        if (n)
            switch (n.type) {
            case "expression":
                var a = !1;
                n.__workerNeedsDotplotXMode = !1;
                for (var l = 0; l < r.length; l++) {
                    (p = r[l]).graphMode !== c.Z_3D && p.graphMode !== c.OBJECT3D && p.graphMode !== c.PARAMETRIC_CURVE_3D && (p.graphMode !== c.ERROR ? ("resolved"in p && !p.resolved && (a = !0),
                    p.boundingBox && (o || (o = []),
                    o.push(p.boundingBox)),
                    p.needsDotplotXMode && (n.__workerNeedsDotplotXMode = !0)) : n.error = p.error)
                }
                n.unresolved = a,
                n.boundingBoxes = o;
                for (var d = 1 / 0, s = -1 / 0, u = 0, f = r; u < f.length; u++) {
                    if ((p = f[u]).graphMode === c.POLAR) {
                        var m = p.sampledDomain;
                        m && (d = Math.min(d, m.min),
                        s = Math.max(s, m.max))
                    }
                }
                return isFinite(d) && (n.__workerSampledDomainMin = d),
                void (isFinite(s) && (n.__workerSampledDomainMax = s));
            case "table":
                for (l = 0; l < r.length; l++) {
                    var p;
                    (p = r[l]).graphMode !== c.Z_3D && p.graphMode !== c.OBJECT3D && p.graphMode !== c.PARAMETRIC_CURVE_3D && (p.boundingBox && (o || (o = []),
                    o.push(p.boundingBox)))
                }
                return void (o && i.setColumnBoundingBoxes(n, t, o));
            default:
                return
            }
    }
    ,
    e.onEvaluatorFormulaUpdates = function(e, t) {
        var r, n, a, c = m.default(e.expressionAnalysis);
        for (r in t)
            if (t.hasOwnProperty(r)) {
                a = t[r],
                n = k(e, r);
                var u = {
                    isGraphable: !!a.is_graphable,
                    isError: !!a.error,
                    errorMessage: a.error ? e.controller.unpack(a.error) : void 0
                };
                if (n)
                    switch (n.type) {
                    case "expression":
                        if (o.onFormulaUpdate(n, a),
                        a.zero_values && 1 === a.zero_values.length) {
                            var p = a.zero_values[0].val;
                            f.isNumber(p) && (u.evaluation = {
                                type: "Number",
                                value: p
                            },
                            u.evaluationDisplayed = !0),
                            f.isArray(p) && p.every(f.isNumber) && (u.evaluation = {
                                type: "ListOfNumber",
                                value: p.slice()
                            },
                            u.evaluationDisplayed = !0)
                        } else
                            a.hasOwnProperty("constant_value") && f.isNumber(a.constant_value) && (u.evaluation = {
                                type: "Number",
                                value: a.constant_value
                            },
                            u.evaluationDisplayed = !1);
                        break;
                    case "image":
                        d.onFormulaUpdate(n, a);
                        break;
                    case "table":
                        i.onFormulaUpdate(n, a);
                        break;
                    case "folder":
                    case "text":
                        break;
                    default:
                        return n
                    }
                else if (r === e.ticker.id)
                    s.onFormulaUpdate(e.ticker, a);
                else {
                    var _ = D(e, r);
                    if (!_)
                        continue;
                    l.onFormulaUpdate(e.controller, _, a)
                }
                r !== e.ticker.id && (c[r] = u)
            }
        w(e),
        B(e),
        e.expressionAnalysis = c
    }
    ,
    e.setSelected = T,
    e.moveItemsTo = function(e, t, o, n) {
        if (t !== o) {
            var i = e.__itemModelArray.splice(t, n);
            t < o && (o = o - n + 1),
            e.__itemModelArray.splice.apply(e.__itemModelArray, r.__spreadArray([o, 0], i)),
            F(e)
        }
    }
    ,
    e.insertItemAtIndex = C,
    e.insertItemAtEnd = function(e, t) {
        C(e, t, E(e))
    }
    ,
    e.removeItemAtIndex = N,
    e.anyItemDependsOnRandomSeed = function(e) {
        return e.__anyDependsOnRandomSeed
    }
    ,
    e.anyItemIsAction = function(e) {
        return e.__anyIsAction
    }
    ,
    e.removeItemById = function(e, t) {
        var r = k(e, t);
        r && N(e, r.index)
    }
    ,
    e.selectPrevItem = function(e) {
        var t = R(e);
        if (!t)
            return !1;
        var r = y(e, t.index);
        return !!r && (T(e, r),
        r.index === E(e) - 1 && "expression" === t.type && o.isEmpty(t) && N(e, r.index),
        !0)
    }
    ,
    e.selectNextItem = function(e) {
        var t = R(e);
        if (!t)
            return !1;
        var r = I(e, t.index);
        return !!r && (T(e, r),
        !0)
    }
    ,
    e.isItemSelected = U,
    e.setDragState = function(e, t) {
        e.dragState = t
    }
    ,
    e.getMissingVariablesForItem = function(e) {
        switch (e.type) {
        case "expression":
            return o.getMissingVariables(e);
        case "image":
            return d.getMissingVariables(e);
        case "table":
        case "text":
        case "folder":
            return [];
        default:
            return e
        }
    }
    ,
    e.collapseAllFolders = function(e, t) {
        for (var r = 0, o = M(e); r < o.length; r++) {
            var i = o[r];
            "folder" === i.type && n.setCollapsed(i, t)
        }
    }
});