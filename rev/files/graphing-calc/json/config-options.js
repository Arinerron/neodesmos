define('graphing-calc/json/config-options', ["require", "exports", "tslib", "core/lib/color-helpers", "lib/console", "main/font_sizes", "expressions/colors", "expressions/image_file_to_data_url", "core/lib/deepCopy", "api/util"], function(require, e, o, a, s, n, t, i, r, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.validateConfigOptions = e.isConfigOption = e.publicConfigOptions = void 0;
    var p = {
        keypad: !0,
        graphpaper: !0,
        expressions: !0,
        settingsMenu: !0,
        zoomButtons: !0,
        showResetButtonOnGraphpaper: !1,
        expressionsTopbar: !0,
        capExpressionSize: !1,
        pointsOfInterest: !0,
        trace: !0,
        border: !0,
        lockViewport: !1,
        expressionsCollapsed: !1,
        administerSecretFolders: !1,
        advancedStyling: !1,
        images: !0,
        imageUploadCallback: i.imageFileToDataURL,
        folders: !0,
        notes: !0,
        sliders: !0,
        links: !0,
        qwertyKeyboard: !0,
        restrictedFunctions: !1,
        forceEnableGeometryFunctions: !1,
        pasteGraphLink: !1,
        pasteTableData: !0,
        degreeMode: !1,
        clearIntoDegreeMode: !1,
        autosize: !0,
        plotSingleVariableImplicitEquations: !0,
        plotImplicits: !0,
        plotInequalities: !0,
        colors: {
            RED: t.RED,
            BLUE: t.BLUE,
            GREEN: t.GREEN,
            ORANGE: t.ORANGE,
            PURPLE: t.PURPLE,
            BLACK: t.BLACK
        },
        invertedColors: !1,
        functionDefinition: !0,
        projectorMode: !1,
        decimalToFraction: !0,
        fontSize: n.MEDIUM,
        language: "en",
        backgroundColor: "#fff",
        textColor: "#000",
        distributions: !0,
        brailleMode: "none",
        sixKeyInput: !1,
        brailleControls: !0,
        zoomFit: !0,
        forceLogModeRegressions: !1,
        actions: "auto"
    };
    e.publicConfigOptions = Object.keys(p);
    var c = {
        showHamburger: !1,
        disableScrollFix: !1,
        branding: !0,
        redrawSlowly: !1,
        onlyTraceSelected: !1,
        disableMouseInteractions: !1,
        nativeOnscreenKeypad: !1,
        plaidMode: !1,
        pasteGraphLinkCallback: void 0,
        editOnWeb: !1,
        crossOriginSaveTest: !1,
        enableTabindex: !0,
        audioTraceReverseExpressions: !1,
        transparentBackground: !1,
        pauseWhenOffscreen: !1
    }
      , d = {
        solutions: !0,
        menus: !0,
        singleVariableSolutions: !0,
        clickableObjects: !1
    }
      , u = o.__assign(o.__assign({}, p), c);
    e.isConfigOption = function(e) {
        return !!p.hasOwnProperty(e) || (!!c.hasOwnProperty(e) || !!d.hasOwnProperty(e))
    }
    ,
    e.validateConfigOptions = function(e) {
        var o = r.default(u);
        for (var n in e)
            o.hasOwnProperty(n) && (o[n] = e[n]);
        return a.isValidHexColor(o.backgroundColor) || (o.backgroundColor = u.backgroundColor,
        s.warn("Invalid backgroundColor. Background color must be a 3- or 6-character hex color (e.g. #cde or #ffaaaa)")),
        a.isValidHexColor(o.textColor) || (o.textColor = u.textColor,
        s.warn("Invalid textColor. Text color must be a 3- or 6-character hex color (e.g. #000 or #001111)")),
        !0 !== o.actions && !1 !== o.actions && "auto" !== o.actions && (o.actions = u.actions,
        s.warn("Invalid actions setting. Must be true, false, or 'auto'.")),
        void 0 === e.zoomButtons && (o.graphpaper && !o.lockViewport || (o.zoomButtons = !1)),
        void 0 === e.images && (o.graphpaper || (o.images = !1)),
        e.hasOwnProperty("menus") && (s.warn("As of API version 0.4, the 'menus' option is deprecated and has been split into 'settingsMenu' (boolean) and 'expressionsTopbar' (boolean)."),
        e.hasOwnProperty("settingsMenu") || (o.settingsMenu = !!e.menus),
        e.hasOwnProperty("expressionsTopbar") || (o.expressionsTopbar = !!e.menus)),
        e.hasOwnProperty("solutions") && (s.warn("As of API v1.0, the 'solutions' option is deprecated and has been replaced with 'pointsOfInterest' (boolean)."),
        e.hasOwnProperty("pointsOfInterest") || (o.pointsOfInterest = !!e.solutions)),
        e.hasOwnProperty("singleVariableSolutions") && s.warn("As of API v1.0, the 'singleVariableSolutions' has been removed. The calculator no longer displays solutions to single variable equations."),
        e.hasOwnProperty("clickableObjects") && (s.warn("As of API v1.7, the 'clickableObjects' option is deprecated and has been replaced with 'actions'."),
        !0 !== e.clickableObjects || e.hasOwnProperty("actions") || (o.actions = !0)),
        o.graphpaper || (o.expressionsCollapsed && (o.expressionsCollapsed = !1,
        s.warn("Desmos API initialized with bad options. graphpaper: false and expressionsCollapsed: true are incompatible. Proceeding with expressionsCollapsed: false.")),
        o.zoomButtons && (o.zoomButtons = !1,
        s.warn("Desmos API initialized with bad options. graphpaper: false and zoomButtons: true are incompatible. Proceeding with zoomButtons: false.")),
        o.showResetButtonOnGraphpaper && (o.showResetButtonOnGraphpaper = !1,
        s.warn("Desmos API initialized with bad options. graphpaper: false and showResetButtonOnGraphpaper: true are incompatible. Proceeding with showResetButtonOnGraphpaper: false."))),
        o.lockViewport && o.zoomButtons && (o.zoomButtons = !1,
        s.warn("Desmos API initialized with bad options. lockViewport: true and zoomButtons: true are incompatible. Proceeding with zoomButtons: false.")),
        !1 !== o.notes && !1 !== o.folders && !1 !== o.images || !0 !== o.pasteGraphLink || (o.pasteGraphLink = !1,
        s.warn("Desmos API initialized with bad options. pasteGraphLink: true is incompatible with disabling the creation of note, folder, or image expressions. Proceeding with pasteGraphLink: false.")),
        o.language && (o.language = l.validateLanguage(o.language)),
        o
    }
});