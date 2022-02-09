
define('api/calculator', ["require", "exports", "mathquill", "tslib", "main/mathquill-operators", "graphing/clipping", "graphing/canvas-labels", "core/constants", "expressions/colors", "graphing-calc/api/sanitize-expression", "core/graphing-calc/json/graph-settings", "main/font_sizes", "expressions/image_file_to_data_url", "./graphing", "./headless", "./fourfunction", "./scientific", "./pillow-keypad", "core/mathtools", "abraham"], function(require, a, e, o, t, l, i, n, r, s, u, c, d, p, g, C, m, f, h, D) {
    "use strict";
    var A;
    function S(a) {
        var e = A.enabledFeatures;
        return !e || e[a]
    }
    function P(e) {
        a.DesmosAPI[e] = function() {
            throw new Error("The Desmos " + e + " is not enabled for this API key.")
        }
    }
    for (var F in Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.Calculator = a.HeadlessGraphingCalculator = a.PillowKeypad = a.FourFunctionCalculator = a.ScientificCalculator = a.GraphingCalculator = a.DesmosAPI = void 0,
    "undefined" != typeof Desmos ? A = Desmos : (A = {},
    window.Desmos = A),
    a.GraphingCalculator = p.default,
    a.HeadlessGraphingCalculator = g.default,
    a.FourFunctionCalculator = C.default,
    a.ScientificCalculator = m.default,
    a.PillowKeypad = f.default,
    a.DesmosAPI = {
        version: n.CURRENT_API_VERSION,
        Colors: {
            RED: r.RED,
            BLUE: r.BLUE,
            GREEN: r.GREEN,
            ORANGE: r.ORANGE,
            PURPLE: r.PURPLE,
            BLACK: r.BLACK
        },
        imageFileToDataURL: d.imageFileToDataURL,
        supportedLanguages: ["en"].concat(A.localeData ? Object.keys(A.localeData) : A.locales ? Object.keys(A.locales) : []),
        Styles: o.__assign(o.__assign({}, s.SanitizedLineStyle), s.SanitizedPointStyle),
        ColumnModes: s.SanitizedColumnMode,
        DragModes: s.SanitizedDragMode,
        AxisArrowModes: u.AxisArrowModes,
        FontSizes: c,
        LabelSizes: s.SanitizedLabelSize,
        LabelOrientations: s.SanitizedLabelOrientation,
        GraphingCalculator: p.default,
        Calculator: p.default,
        FourFunctionCalculator: C.default,
        ScientificCalculator: m.default,
        Private: {
            Abraham: D,
            Mathtools: h,
            Graphtools: {
                getClippingGraphType: l.getClippingGraphType,
                mapSegmentToCanvas: l.mapSegmentToCanvas,
                computeDrawingCommandsForDOMLabel: i.computeDrawingCommandsForDOMLabel,
                drawCommandsToCtx: i.drawCommandsToCtx
            },
            MathquillConfig: {
                getAutoCommands: t.getAutoCommands,
                getAutoOperators: t.getAutoOperators
            }
        },
        MathQuill: e,
        PillowKeypad: f.default,
        HeadlessGraphingCalculator: g.default
    },
    S("GraphingCalculator") || (P("GraphingCalculator"),
    P("Calculator")),
    S("FourFunctionCalculator") || P("FourFunctionCalculator"),
    S("ScientificCalculator") || P("ScientificCalculator"),
    a.DesmosAPI)
        a.DesmosAPI.hasOwnProperty(F) && (A[F] = a.DesmosAPI[F]);
    a.Calculator = p.default
});