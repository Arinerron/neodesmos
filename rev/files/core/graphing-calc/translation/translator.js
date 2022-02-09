
define('core/graphing-calc/translation/translator', ["require", "exports", "tslib", "../../lib/deepCopy", "./common"], function(require, e, i, a, t) {
    "use strict";
    function r(e, a) {
        return function(r, l, o, n) {
            if (r) {
                var s = t.serializeTranslationKey(i.__assign(i.__assign({}, a), {
                    path: l
                }));
                e[s] = {
                    value: r,
                    type: o,
                    context: n
                }
            }
        }
    }
    function l(e) {
        var i, a, t, l, o = {}, n = r(o, {
            location: "expression",
            id: e.id
        });
        switch (e.type) {
        case "expression":
            n(e.label, "label", "interpolated-string", "expression-list-expression-label"),
            n(null === (i = e.clickableInfo) || void 0 === i ? void 0 : i.description, "clickableInfo.description", "string", "expression-list-expression-clickable-description");
            break;
        case "image":
            n(e.image_url, "image_url", "image", "expression-list-image-url"),
            n(null === (a = e.clickableInfo) || void 0 === a ? void 0 : a.description, "clickableInfo.description", "string", "expression-list-image-clickable-description"),
            n(null === (t = e.clickableInfo) || void 0 === t ? void 0 : t.hoveredImage, "clickableInfo.hoveredImage", "image", "expression-list-image-clickable-hovered"),
            n(null === (l = e.clickableInfo) || void 0 === l ? void 0 : l.depressedImage, "clickableInfo.depressedImage", "image", "expression-list-image-clickable-depressed");
            break;
        case "text":
            n(e.text, "text", "string", "expression-list-note-text");
            break;
        case "folder":
            n(e.title, "title", "string", "expression-list-folder-title")
        }
        return o
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.applyLocalizationMap = e.extractLocalizationMap = void 0,
    e.extractLocalizationMap = function(e) {
        var i, a, t, o = {};
        if ("graph" == e.type) {
            for (var n = 0, s = e.graphState.expressions.list; n < s.length; n++) {
                var c = l(s[n]);
                for (var p in c)
                    o[p] = c[p]
            }
            var d = function(e) {
                var i = {}
                  , a = r(i, {
                    location: "settings"
                });
                return a(e.graph.xAxisLabel, "xAxisLabel", "string", "settings-xaxis-label"),
                a(e.graph.yAxisLabel, "yAxisLabel", "string", "settings-yaxis-label"),
                i
            }(e.graphState);
            for (var p in d)
                o[p] = d[p]
        } else {
            var g = e.geometryState.objects;
            for (var v in g) {
                var b = (i = g[v],
                a = void 0,
                t = void 0,
                (t = r(a = {}, {
                    location: "object",
                    id: i.id
                }))(i.label, "label", "string", "geometry-object-label"),
                "image" === i.type && t(i.url, "url", "image", "geometry-object-image-url"),
                a);
                for (var p in b)
                    o[p] = b[p]
            }
        }
        return o
    }
    ,
    e.applyLocalizationMap = function(e, i, r) {
        var l, o, n = a.default(e);
        if ("graph" === r) {
            for (var s = {}, c = 0, p = null !== (o = null === (l = n.expressions) || void 0 === l ? void 0 : l.list) && void 0 !== o ? o : []; c < p.length; c++) {
                var d = p[c];
                s[d.id] = d
            }
            for (var g in i) {
                "expression" == (v = t.deserializeTranslationKey(g)).location ? t.mutateString(s[v.id], v.path, i[g].value) : t.mutateString(n.graph, v.path, i[g].value)
            }
        } else if (n.objects)
            for (var g in i) {
                var v;
                "object" == (v = t.deserializeTranslationKey(g)).location && t.mutateString(n.objects[v.id], v.path, i[g].value)
            }
        return n
    }
});