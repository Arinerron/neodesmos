
define('graphing-calc/models/image', ["require", "exports", "tslib", "core/lib/color-helpers", "./abstract-item", "core/lib/deepCopy", "core/lib/copy-properties", "./list", "jquery", "core/graphing-calc/json/image", "core/lib/dragmode", "./expression"], function(require, e, a, r, t, n, o, i, l, d, c, s) {
    "use strict";
    function g(e) {
        if (e.formula) {
            var a = e.formula.center_reference_id
              , r = e.formula.center_reference_symbol;
            if (a && r) {
                var t = e.controller.getItemModel(a);
                if (t && "expression" === t.type && t.formula.assignment === r && s.isSinglePoint(t))
                    return t
            }
        }
    }
    function u(e) {
        var a = g(e);
        if (!a)
            return !1;
        var r = a.reconciledDragMode;
        return !(!r || r === c.DragMode.NONE)
    }
    function f(e) {
        return !!e.draggable && u(e)
    }
    function m(e) {
        var a = d.computeParsableState(e);
        a.color = e.color,
        a.index = e.index,
        a.guid = e.guid,
        a.shouldGraph = e.shouldGraph,
        a.showPoints = e.showPoints,
        e.cachedParsableState = a
    }
    function p(e) {
        var r = e.cachedViewState.clickableInfo
          , t = !0
          , n = !0;
        if (r && (r.depressedImage === e.clickableInfo.depressedImage && (n = !1),
        r.hoveredImage === e.clickableInfo.hoveredImage && (t = !1)),
        t && (e.hoveredImageObj && (l(e.hoveredImageObj).off("load"),
        delete e.hoveredImageObj),
        e.clickableInfo.hoveredImage)) {
            e.hoveredImageObj = new Image;
            var o = function() {
                var a = e.controller.getGrapher();
                a && a.redrawAllLayers()
            }
              , i = function() {};
            b(e.hoveredImageObj, e.clickableInfo.hoveredImage, o, i)
        }
        if (n && (e.depressedImageObj && (l(e.depressedImageObj).off("load"),
        delete e.depressedImageObj),
        e.clickableInfo.depressedImage)) {
            e.depressedImageObj = new Image;
            o = function() {
                var a = e.controller.getGrapher();
                a && a.redrawAllLayers()
            }
            ,
            i = function() {}
            ;
            b(e.depressedImageObj, e.clickableInfo.depressedImage, o, i)
        }
        if (e.cachedViewState.image_url !== e.image_url) {
            l(e.imageObj).off("load"),
            e.imageObj = new Image;
            b(e.imageObj, e.image_url, function() {
                e.controller.dispatch({
                    type: "image-load-success",
                    id: e.id
                })
            }, function() {
                e.controller.dispatch({
                    type: "image-load-error",
                    id: e.id
                })
            })
        }
        e.cachedViewState = a.__assign({
            type: e.type,
            id: e.id,
            folderId: e.folderId,
            image_url: e.image_url,
            name: e.name,
            hidden: e.hidden,
            foreground: e.foreground,
            secret: e.secret
        }, d.extractDynamicProperties(e))
    }
    function h(e) {
        var r = e.cachedViewState;
        e.cachedUndoRedoFullState = e.cachedViewState,
        e.preTransientState && (r = a.__assign(a.__assign({}, r), e.preTransientState)),
        e.cachedUndoRedoDiffState = r
    }
    function b(e, a, r, t) {
        l(e).on("load.initial-image-load", function() {
            var a = e.width
              , t = e.height;
            1 === a && 1 === t ? (l(e).off(".initial-image-load"),
            l(e).on("load", r),
            e.src = function(e) {
                var a = document.createElement("canvas");
                return a.width = 2,
                a.height = 2,
                a.getContext("2d").drawImage(e, 0, 0, 2, 2),
                a.toDataURL()
            }(e)) : r()
        }).on("error", t),
        /^data:/.test(a) || (e.crossOrigin = "anonymous"),
        e.src = a
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.isClickableObject = e.setClickableInfoRuleLatex = e.setClickableInfoProp = e.retryLoading = e.setLoadStatus = e.uploadImageAndGenerateToken = e.uploadImages = e.restoreState = e.initModel = e.updateCachedUndoRedoState = e.setIsDraggingOnGrapher = e.updateCachedViewState = e.getState = e.hasInputError = e.getMissingVariables = e.onFormulaUpdate = e.onControllerUpdate = e.updateCachedParsableState = e.eachLatex = e.setImageURL = e.setForeground = e.setOpacity = e.canConvertToDraggableImage = e.isActuallyDraggable = e.doesImageCenterReferenceDraggablePoint = e.doesImageCenterReferenceExternalPoint = e.getCenterExternalReferencedModel = e.setDraggable = e.setName = e.getMQAttribute = e.setMQAttribute = e.setSecret = e.setHidden = void 0,
    e.setHidden = function(e, a) {
        e.hidden = a
    }
    ,
    e.setSecret = function(e, a) {
        e.secret = a
    }
    ,
    e.setMQAttribute = function(e, a, r) {
        e[a] = r
    }
    ,
    e.getMQAttribute = function(e, a) {
        return e[a]
    }
    ,
    e.setName = function(e, a) {
        e.name = a
    }
    ,
    e.setDraggable = function(e, a) {
        e.draggable = a
    }
    ,
    e.getCenterExternalReferencedModel = g,
    e.doesImageCenterReferenceExternalPoint = function(e) {
        return !!g(e)
    }
    ,
    e.doesImageCenterReferenceDraggablePoint = u,
    e.isActuallyDraggable = f,
    e.canConvertToDraggableImage = function(e) {
        if (!e.formula)
            return !1;
        if (!e.formula.center_is_point_literal)
            return !1;
        var a = e.formula.move_strategy;
        if (!a)
            return !1;
        var r = a[2]
          , t = a[3]
          , n = r && "none" !== r.type
          , o = t && "none" !== t.type;
        return !(!n && !o)
    }
    ,
    e.setOpacity = function(e, a) {
        e.opacity = a
    }
    ,
    e.setForeground = function(e, a) {
        e.foreground = a
    }
    ,
    e.setImageURL = function(e, a) {
        e.image_url = a
    }
    ,
    e.eachLatex = function(e, a) {
        a(e.opacity, "imageOpacity"),
        a(e.center, "imageCenter"),
        a(e.height, "imageHeight"),
        a(e.width, "imageWidth"),
        a(e.angle, "imageAngle")
    }
    ,
    e.updateCachedParsableState = m,
    e.onControllerUpdate = function(e) {
        e.draggingOnGraphpaper ? e.preTransientState || (e.preTransientState = {
            center: e.center,
            width: e.width,
            height: e.height
        }) : delete e.preTransientState,
        t.updateIsHiddenFromUI(e);
        var a = i.getParentFolderModel(e);
        e.shouldGraph = (!a || !a.hidden) && !e.hidden,
        e.showPoints = e.shouldGraph && i.isItemSelected(e) && "loaded" === e.loadStatus && !f(e) && e.controller.isTraceEnabled(),
        p(e),
        h(e),
        m(e)
    }
    ,
    e.onFormulaUpdate = function(e, a) {
        e.formula = a,
        e.error = function(e) {
            var a = {
                center: e.controller.s("graphing-calculator-error-image-invalid-center"),
                angle: e.controller.s("graphing-calculator-error-image-invalid-angle"),
                width: e.controller.s("graphing-calculator-error-image-invalid-width"),
                height: e.controller.s("graphing-calculator-error-image-invalid-height"),
                opacity: e.controller.s("graphing-calculator-error-image-invalid-opacity")
            };
            for (var r in e.formula.errorMap) {
                if (e.formula.errorMap[r])
                    return a[r]
            }
        }(e)
    }
    ,
    e.getMissingVariables = function(e) {
        return e.formula && e.formula.variables || []
    }
    ,
    e.hasInputError = function(e, a) {
        return !(!e.formula || !e.formula.errorMap) && !!e.formula.errorMap[a]
    }
    ,
    e.getState = function(e, a) {
        var r = e.cachedViewState;
        return a.stripDefaults ? d.stripDefaults(r) : r
    }
    ,
    e.updateCachedViewState = p,
    e.setIsDraggingOnGrapher = function(e, a) {
        e.draggingOnGraphpaper = a
    }
    ,
    e.updateCachedUndoRedoState = h,
    e.initModel = function(e, o) {
        var i = n.default(d.inflateDefaults(e));
        return a.__assign(a.__assign(a.__assign({}, i), t.DEFAULTS(o)), {
            color: r.colors.BLUE,
            loadStatus: "loading",
            failures: 0,
            imageObj: new Image,
            hoveredImageObj: void 0,
            depressedImageObj: void 0,
            shouldGraph: void 0,
            showPoints: void 0,
            error: void 0,
            formula: void 0,
            draggingOnGraphpaper: !1,
            cachedViewState: {},
            cachedParsableState: {},
            cachedUndoRedoDiffState: {},
            cachedUndoRedoFullState: {}
        })
    }
    ;
    var I = a.__assign({
        id: !1,
        type: !1,
        image_url: !0,
        name: !0,
        folderId: !0,
        hidden: !0,
        secret: !0,
        foreground: !0
    }, o.makeTrueMap(d.DEFAULTS_DYNAMIC));
    e.restoreState = function(e, a) {
        o.copyProperties({
            from: a,
            to: e,
            props: I
        })
    }
    ,
    e.uploadImages = function(e) {
        for (var a = e.controller, r = e.files, t = e.id, n = {
            errors: [],
            tokens: []
        }, o = 0; o < r.length; o++) {
            var i = r[o];
            i.type.match("image/*") ? n.tokens.push(_({
                controller: a,
                file: i,
                id: t
            })) : n.errors.push(a.s("graphing-calculator-error-image-invalid-file", {
                file: i.name
            }))
        }
        return n
    }
    ;
    var v = 0;
    function _(e) {
        var a = e.controller
          , r = e.file
          , t = e.id
          , n = "" + v++;
        return a.getGraphSettings().config.imageUploadCallback(r, function(e, o) {
            setTimeout(function() {
                if (e)
                    a.dispatch({
                        type: "image-upload-error",
                        token: n,
                        error: e
                    });
                else {
                    var i = new Image;
                    b(i, o, function() {
                        var e = i.width
                          , l = i.height
                          , d = Math.max(e, l) / Math.min(e, l);
                        e < l ? (l = 10,
                        e = Math.round(10 * l / d) / 10) : (e = 10,
                        l = Math.round(10 * e / d) / 10),
                        a.dispatch({
                            type: "image-upload-success",
                            token: n,
                            url: o,
                            width: e + "",
                            height: l + "",
                            name: r.name,
                            id: t
                        })
                    }, function() {
                        a.dispatch({
                            type: "image-upload-error",
                            token: n,
                            error: ""
                        })
                    })
                }
            })
        }),
        n
    }
    function S(e, a) {
        e.loadStatus = a,
        "loaded" === a && (e.failures = 0),
        "failed" === a && (e.failures += 1)
    }
    e.uploadImageAndGenerateToken = _,
    e.setLoadStatus = S,
    e.retryLoading = function(e) {
        e.imageObj.src = e.imageObj.src,
        S(e, "loading")
    }
    ,
    e.setClickableInfoProp = function(e, r, t) {
        var n;
        e.clickableInfo = a.__assign(a.__assign({}, e.clickableInfo), ((n = {})[r] = t,
        n))
    }
    ,
    e.setClickableInfoRuleLatex = function(e, r) {
        e.clickableInfo = a.__assign(a.__assign({}, e.clickableInfo), {
            latex: r
        })
    }
    ,
    e.isClickableObject = function(e) {
        return e.clickableInfo.enabled && e.formula && e.formula.click_handler && "maybe-valid" === e.formula.click_handler.status
    }
});