
define('core/graphing-calc/json/image', ["require", "exports", "tslib", "core/lib/default-spec", "../../lib/copy-properties"], function(require, e, t, i, a) {
    "use strict";
    function n(t) {
        return a.extractPropertiesLike(t, e.DEFAULTS_DYNAMIC)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.computeParsableState = e.extractDynamicProperties = e.stripDefaults = e.inflateDefaults = e.DEFAULTS = e.DEFAULTS_DYNAMIC = e.CLICKABLEINFO_DEFAULTS = void 0,
    e.CLICKABLEINFO_DEFAULTS = {
        enabled: !1,
        description: "",
        latex: "",
        hoveredImage: "",
        depressedImage: ""
    },
    e.DEFAULTS_DYNAMIC = {
        center: "\\left(0,0\\right)",
        angle: "0",
        width: "10",
        height: "10",
        opacity: "1",
        clickableInfo: e.CLICKABLEINFO_DEFAULTS,
        draggable: !1
    },
    e.DEFAULTS = t.__assign({
        folderId: "",
        hidden: !1,
        secret: !1,
        foreground: !1,
        name: ""
    }, e.DEFAULTS_DYNAMIC),
    e.inflateDefaults = function(i) {
        return t.__assign(t.__assign(t.__assign({}, e.DEFAULTS), i), {
            clickableInfo: t.__assign(t.__assign({}, e.CLICKABLEINFO_DEFAULTS), i.clickableInfo)
        })
    }
    ,
    e.stripDefaults = function(t) {
        var a = i.stripDefaults(e.DEFAULTS, t)
          , n = i.stripDefaultsAndMaybeReturnUndefined(e.CLICKABLEINFO_DEFAULTS, t.clickableInfo);
        return void 0 === n ? delete a.clickableInfo : a.clickableInfo = n,
        a
    }
    ,
    e.extractDynamicProperties = n,
    e.computeParsableState = function(e) {
        return t.__assign(t.__assign({
            type: "image",
            id: e.id
        }, n(e)), {
            guid: "",
            index: 0,
            color: "",
            shouldGraph: e.hidden,
            showPoints: !1
        })
    }
});