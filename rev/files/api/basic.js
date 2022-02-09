
define('api/basic', ["require", "exports", "tslib", "dcgview", "./abstract", "main/shared-worker-pool", "basic/controller", "basic/main", "core/lib/color-helpers", "underscore_model", "./util", "core/lib/deepCopy", "lib/console"], function(require, e, t, o, r, i, n, a, s, l, c, d, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.BasicCalculator = void 0;
    var u = function(e) {
        function r(t) {
            return e.call(this, t) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function(e) {
            var o = this;
            (e = d.default(e)).backgroundColor && !s.isValidHexColor(e.backgroundColor) && (p.warn("Invalid backgroundColor. Background color must be a 3- or 6-character hex color (e.g. #cde or #ffaaaa)"),
            delete e.backgroundColor),
            e.textColor && !s.isValidHexColor(e.textColor) && (p.warn("Invalid textColor. Text color must be a 3- or 6-character hex color (e.g. #000 or #001111)"),
            delete e.textColor);
            var r = t.__assign({
                language: "en",
                qwertyKeyboard: !0,
                links: !0,
                degreeMode: !1,
                settingsMenu: !0,
                invertedColors: !1,
                backgroundColor: "#fff",
                textColor: "#000",
                brailleMode: "none",
                sixKeyInput: !1,
                brailleControls: !0,
                brailleExpressionDownload: !0,
                projectorMode: !1,
                capExpressionSize: !1,
                functionDefinition: !0,
                autosize: !0,
                evaluationMode: "scientific",
                restrictedEditing: !1,
                additionalFunctions: ["sqrt"],
                typingSlashWritesDivisionSymbol: !1,
                typingAsteriskWritesTimesSymbol: !1,
                decimalToFraction: !0,
                replaceCommaWith10Exp: !1,
                replaceRoundWithReciprocal: !1
            }, e);
            this.settings = new l.UnderscoreModel;
            var a = {
                workerPool: i.default,
                settingsProxy: this.settings
            };
            this.controller = new n.default(r,a),
            this.controller.onEventEmitted = function(e) {
                "render" === e && o.updateView(),
                o.triggerEvent(e, void 0)
            }
            ,
            this.setupDomChangeDetector(r.autosize)
        }
        ,
        r.prototype.onCreateView = function() {
            return o.mountToNode(a.default, this.rootElt, {
                controller: o.const(this.controller)
            })
        }
        ,
        r.prototype.setState = function(e, t) {
            t || (t = {}),
            this.controller.dispatch({
                type: "set-state-from-api",
                state: e,
                opts: {
                    allowUndo: !!t.allowUndo
                }
            })
        }
        ,
        r.prototype.getState = function() {
            return d.default(this.controller.model.getPersistedState())
        }
        ,
        r.prototype.undo = function() {
            this.controller.dispatch({
                type: "undo",
                source: "api"
            })
        }
        ,
        r.prototype.redo = function() {
            this.controller.dispatch({
                type: "redo",
                source: "api"
            })
        }
        ,
        r.prototype.clearHistory = function() {
            this.controller.dispatch({
                type: "clear-history"
            })
        }
        ,
        r.prototype.setBlank = function(e) {
            e || (e = {}),
            this.controller.dispatch({
                type: "set-blank",
                opts: {
                    allowUndo: !!e.allowUndo
                }
            })
        }
        ,
        r.prototype.updateSettings = function(e) {
            if (null != e)
                for (var t in e)
                    switch (t) {
                    case "fontSize":
                        var o = e[t];
                        if (void 0 === o)
                            continue;
                        this.controller.dispatch({
                            type: "update-font-size",
                            size: o
                        });
                        break;
                    case "invertedColors":
                        var r = e[t];
                        if (void 0 === r)
                            continue;
                        this.controller.dispatch({
                            type: "update-inverted-colors",
                            mode: r
                        });
                        break;
                    case "backgroundColor":
                        var i = e[t];
                        if (void 0 === i || !s.isValidHexColor(i)) {
                            p.warn("Invalid backgroundColor. Background color must be a 3- or 6-character hex color (e.g. #cde or #ffaaaa)");
                            continue
                        }
                        this.controller.dispatch({
                            type: "update-background-color",
                            color: i
                        });
                        break;
                    case "textColor":
                        var n = e[t];
                        if (void 0 === n || !s.isValidHexColor(n)) {
                            p.warn("Invalid textColor. Text color must be a 3- or 6-character hex color (e.g. #000 or #001111)");
                            continue
                        }
                        this.controller.dispatch({
                            type: "update-text-color",
                            color: n
                        });
                        break;
                    case "degreeMode":
                        var a = e[t];
                        if (void 0 === a)
                            continue;
                        this.controller.dispatch({
                            type: "update-degree-mode",
                            mode: a
                        });
                        break;
                    case "brailleMode":
                        var l = e[t];
                        this.controller.dispatch({
                            type: "set-braille-mode",
                            mode: l
                        });
                        break;
                    case "sixKeyInput":
                        var d = e[t];
                        if (void 0 === d)
                            continue;
                        this.controller.dispatch({
                            type: "set-six-key-input",
                            mode: d
                        });
                        break;
                    case "brailleControls":
                        var u = e[t];
                        if (void 0 === u)
                            continue;
                        this.controller.dispatch({
                            type: "set-braille-controls",
                            value: u
                        });
                        break;
                    case "brailleExpressionDownload":
                        var h = e[t];
                        if (void 0 === h)
                            continue;
                        this.controller.dispatch({
                            type: "set-braille-expression-download",
                            mode: h
                        });
                        break;
                    case "projectorMode":
                        var y = e[t];
                        if (void 0 === y)
                            continue;
                        this.controller.dispatch({
                            type: "update-projector-mode",
                            mode: y
                        });
                        break;
                    case "capExpressionSize":
                        var f = e[t];
                        if (void 0 === f)
                            continue;
                        this.controller.dispatch({
                            type: "update-cap-expression-size",
                            mode: f
                        });
                        break;
                    case "language":
                        var b = e[t];
                        if (void 0 === b)
                            continue;
                        this.controller.dispatch({
                            type: "update-language",
                            language: c.validateLanguage(b)
                        });
                        break;
                    case "settingsMenu":
                        e.settingsMenu ? this.controller.dispatch({
                            type: "enable-settings-menu"
                        }) : this.controller.dispatch({
                            type: "disable-settings-menu"
                        });
                        break;
                    case "qwertyKeyboard":
                        this.controller.dispatch({
                            type: "update-options",
                            options: {
                                qwertyKeyboard: !!e.qwertyKeyboard
                            }
                        });
                        var v = this.controller.getKeyboardMode();
                        "qwerty" !== v && "letters" !== v || this.controller.dispatch({
                            type: "ABC"
                        });
                        break;
                    case "functionDefinition":
                        e.functionDefinition ? this.controller.model.enableFunctionDefinition() : this.controller.model.disableFunctionDefinition();
                        break;
                    case "links":
                        this.controller.dispatch({
                            type: "update-options",
                            options: {
                                links: !!e.links
                            }
                        });
                        break;
                    case "decimalToFraction":
                        var g = e[t];
                        if (void 0 === g)
                            continue;
                        this.controller.dispatch({
                            type: "update-decimal-to-fraction",
                            mode: g
                        });
                        break;
                    case "replaceCommaWith10Exp":
                        var m = e[t];
                        if (void 0 === m)
                            continue;
                        this.controller.dispatch({
                            type: "set-replace-comma-with-10-exp",
                            replace: m
                        });
                        break;
                    case "replaceRoundWithReciprocal":
                        var k = e[t];
                        if (void 0 === k)
                            continue;
                        this.controller.dispatch({
                            type: "set-replace-round-with-reciprocal",
                            replace: k
                        });
                        break;
                    case "restrictedEditing":
                        this.controller.dispatch({
                            type: "update-options",
                            options: {
                                restrictedEditing: !!e.restrictedEditing
                            }
                        });
                        break;
                    case "typingAsteriskWritesTimesSymbol":
                        var x = e[t];
                        if (void 0 === x)
                            continue;
                        this.controller.dispatch({
                            type: "set-typing-asterisk-writes-times-symbol",
                            mode: x
                        })
                    }
        }
        ,
        r.prototype.focusFirstExpression = function() {
            this.controller.dispatch({
                type: "focus-first-expression"
            })
        }
        ,
        r.prototype.onResizeView = function(e) {
            this.controller.dispatch({
                type: "ui/container-resized",
                size: e
            })
        }
        ,
        r.prototype.onDestroyView = function() {
            o.unmountFromNode(this.rootElt)
        }
        ,
        r.prototype.destroy = function() {
            this.controller.model.destroy(),
            e.prototype.destroy.call(this)
        }
        ,
        r
    }(r.default);
    e.BasicCalculator = u
});