define('config', ["require", "exports", "core/lib/deepCopy", "lib/parse-query-params"], function(require, e, o, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.all = e.get = void 0;
    var i = {}
      , t = n.getQueryParams();
    if ("undefined" != typeof Desmos && Desmos.config)
        for (var r in Desmos.config)
            Desmos.config.hasOwnProperty(r) && (t[r] = Desmos.config[r]);
    var s = function(e) {
        return t.hasOwnProperty(e)
    }
      , a = function(e) {
        i[e] = s(e)
    }
      , l = function(e) {
        i[e] = !s("no" + e)
    };
    a("testing"),
    a("maintenance"),
    a("disableScrollFix"),
    a("nativeOnscreenKeypad"),
    a("hidden"),
    a("disableMouseInteractions"),
    a("advancedStyling"),
    a("outofdom"),
    t.lang && (i.language = t.lang),
    t.fontSize && (i.fontSize = t.fontSize),
    t.backgroundColor && (i.backgroundColor = "#" + t.backgroundColor),
    t.textColor && (i.textColor = "#" + t.textColor),
    i.no_navigation_warning = s("noconcat") || s("testing"),
    i.previewMessage = "You're previewing some new accessibility features.",
    i.previewFeedbackUrl = "mailto:feedback@desmos.com";
    var c = location && "preview.desmos.com" === location.hostname;
    i.previewMode = s("previewMode") || c,
    a("lockViewport"),
    a("administerSecretFolders"),
    a("degreeMode"),
    a("clearIntoDegreeMode"),
    a("plaidMode"),
    a("editOnWeb"),
    a("crossOriginSaveTest"),
    a("showResetButtonOnGraphpaper"),
    a("transparentBackground"),
    a("forceLogModeRegressions"),
    l("links"),
    l("trace"),
    l("zoomFit"),
    a("expressionsCollapsed"),
    a("invertedColors"),
    a("projectorMode"),
    l("images"),
    l("folders"),
    l("settingsMenu"),
    l("expressionsTopbar"),
    l("zoomButtons"),
    l("keypad"),
    l("graphpaper"),
    l("expressions"),
    l("branding"),
    l("pointsOfInterest"),
    l("plotSingleVariableImplicitEquations"),
    l("plotImplicits"),
    l("plotInequalities"),
    l("notes"),
    l("sliders"),
    a("pauseWhenOffscreen"),
    a("worksheetSVG"),
    l("brailleControls"),
    a("audioTraceKeypad"),
    a("sciKeypad"),
    a("4fnKeypad"),
    a("ans"),
    s("braille") && (i.braille = !0),
    l("qwertyKeyboard"),
    a("restrictedFunctions"),
    a("forceEnableGeometryFunctions"),
    l("functionDefinition"),
    a("singleExpression"),
    a("restrictedEditing"),
    a("replaceCommaWith10Exp"),
    a("replaceRoundWithReciprocal"),
    s("typingAsteriskWritesTimesSymbol") && (i.typingAsteriskWritesTimesSymbol = !0),
    l("labels"),
    l("distributions"),
    i["4fnKeypad"] ? a("decimalToFraction") : l("decimalToFraction"),
    a("3d"),
    s("exponentButtonForSquareRoot") ? i.additionalFunctions = ["exponent"] : t.additionalFunctions && "string" == typeof t.additionalFunctions && (i.additionalFunctions = t.additionalFunctions.split(",")),
    s("actions") ? i.actions = !0 : s("noactions") ? i.actions = !1 : s("clickableObjects") && (i.actions = !0),
    e.get = function(e) {
        return i[e]
    }
    ,
    e.all = function() {
        return o.default(i)
    }
});
