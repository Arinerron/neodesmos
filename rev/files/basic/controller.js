
define('basic/controller', ["require", "exports", "tslib", "flux", "underscore", "./model", "lib/state-stack", "keypad/mq-commands", "lib/i18n", "dcgview-helpers/mathquill-view", "lib/console", "bugsnag", "core/lib/color-helpers"], function(require, e, t, o, s, i, n, r, a, c, l, p, u) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var d = function() {
        function e(e, t) {
            var s = this;
            this.keyboardMode = "main",
            this.fontSize = 16,
            this.invertedColors = !1,
            this.backgroundColor = "",
            this.textColor = "",
            this.projectorMode = !1,
            this.capExpressionSize = !1,
            this.decimalToFraction = !0,
            this.settingsMenu = !0,
            this.settingsMenuOpen = !1,
            this.language = "en",
            this.brailleMode = "none",
            this.sixKeyInput = !1,
            this.brailleControls = !0,
            this.brailleExpressionDownload = !0,
            this.replaceCommaWith10Exp = !1,
            this.typingAsteriskWritesTimesSymbol = !1,
            this.stateStack = new n.default,
            this.dispatcher = new o.Dispatcher,
            this.s = a.createDictionaryLookupFunction(function() {
                return s.language
            }),
            this.dispatch = function(e) {
                var t;
                for (p.leaveBreadcrumb("dispatch", {
                    type: e.type
                }),
                s.dispatcher.dispatch(e); t = s._queuedCallbacks.shift(); )
                    t()
            }
            ,
            this._queuedCallbacks = [],
            this.stateStack = new n.default,
            this.dispatcher = new o.Dispatcher,
            this.options = e,
            this.model = new i.default({
                evaluationMode: this.options.evaluationMode,
                additionalFunctions: this.options.additionalFunctions,
                functionDefinition: this.options.functionDefinition,
                replaceRoundWithReciprocal: this.options.replaceRoundWithReciprocal,
                workerPool: t.workerPool
            }),
            this.model = this.model,
            this.model.setDegreeMode(e.degreeMode),
            this.setLanguage(e.language),
            this.setBrailleMode(e.brailleMode),
            this.setSixKeyInput(e.sixKeyInput),
            this.setBrailleControls(e.brailleControls),
            this.setBrailleExpressionDownload(e.brailleExpressionDownload),
            this.setReplaceCommaWith10Exp(e.replaceCommaWith10Exp),
            this.setReplaceRoundWithReciprocal(e.replaceRoundWithReciprocal),
            this.setTypingAsteriskWritesTimesSymbol(e.typingAsteriskWritesTimesSymbol),
            this.setProjectorMode(e.projectorMode),
            this.setCapExpressionSize(e.capExpressionSize),
            this.setDecimalToFraction(e.decimalToFraction),
            this.invertedColors = e.invertedColors,
            this.backgroundColor = e.backgroundColor,
            this.textColor = e.textColor,
            this.settingsMenu = e.settingsMenu,
            this.model.onEvaluationUpdate = function() {
                return s.dispatch({
                    type: "render"
                })
            }
            ,
            this.settingsProxy = t.settingsProxy,
            this.syncPublicSettings(),
            this.hookUpDispatcher(),
            this.containerSize = {
                width: 0,
                height: 0
            }
        }
        return e.prototype.runAfterDispatch = function(e) {
            this._queuedCallbacks.push(e)
        }
        ,
        e.prototype.enqueueEvent = function(e) {
            var t = this;
            this.runAfterDispatch(function() {
                t.onEventEmitted && t.onEventEmitted(e)
            })
        }
        ,
        e.prototype.getFunctionDefinition = function() {
            return this.options.functionDefinition
        }
        ,
        e.prototype.getSettingsMenu = function() {
            return this.settingsMenu
        }
        ,
        e.prototype.getBrailleMode = function() {
            return this.brailleMode
        }
        ,
        e.prototype.renderAsBraille = function() {
            return "none" !== this.brailleMode
        }
        ,
        e.prototype.setBrailleMode = function(e) {
            this.brailleMode = e
        }
        ,
        e.prototype.getSixKeyInput = function() {
            return this.sixKeyInput
        }
        ,
        e.prototype.setSixKeyInput = function(e) {
            this.sixKeyInput = e
        }
        ,
        e.prototype.getBrailleControls = function() {
            return this.brailleControls
        }
        ,
        e.prototype.setBrailleControls = function(e) {
            this.brailleControls = e
        }
        ,
        e.prototype.getBrailleExpressionDownload = function() {
            return this.brailleExpressionDownload
        }
        ,
        e.prototype.setBrailleExpressionDownload = function(e) {
            this.brailleExpressionDownload = e
        }
        ,
        e.prototype.getRestrictedEditing = function() {
            return this.options.restrictedEditing
        }
        ,
        e.prototype.getKeyboardMode = function() {
            return this.keyboardMode
        }
        ,
        e.prototype.getFontSize = function() {
            return this.fontSize
        }
        ,
        e.prototype.getInvertedColors = function() {
            return this.invertedColors
        }
        ,
        e.prototype.hasBackgroundColor = function() {
            return "#ffffff" !== this.getBackgroundColor()
        }
        ,
        e.prototype.getBackgroundColor = function() {
            var e = u.normalizeColor(this.backgroundColor || "#fff");
            return this.getInvertedColors() && "#ffffff" !== e ? u.invertColor(e) : e
        }
        ,
        e.prototype.getTextColor = function() {
            var e = u.normalizeColor(this.textColor || "#000");
            return this.getInvertedColors() && "#000000" !== e ? u.invertColor(e) : e
        }
        ,
        e.prototype.getAdditionalFunctions = function() {
            return this.options.additionalFunctions
        }
        ,
        e.prototype.getTypingSlashWritesDivisionSymbol = function() {
            return this.options.typingSlashWritesDivisionSymbol
        }
        ,
        e.prototype.setTypingAsteriskWritesTimesSymbol = function(e) {
            this.typingAsteriskWritesTimesSymbol = e
        }
        ,
        e.prototype.getTypingAsteriskWritesTimesSymbol = function() {
            return this.typingAsteriskWritesTimesSymbol
        }
        ,
        e.prototype.setProjectorMode = function(e) {
            this.projectorMode = e
        }
        ,
        e.prototype.isProjectorMode = function() {
            return this.projectorMode
        }
        ,
        e.prototype.getReplaceCommaWith10Exp = function() {
            return this.replaceCommaWith10Exp
        }
        ,
        e.prototype.setReplaceCommaWith10Exp = function(e) {
            this.replaceCommaWith10Exp = e
        }
        ,
        e.prototype.getReplaceRoundWithReciprocal = function() {
            return this.model.getReplaceRoundWithReciprocal()
        }
        ,
        e.prototype.setReplaceRoundWithReciprocal = function(e) {
            e ? this.model.enableReplaceRoundWithReciprocal() : this.model.disableReplaceRoundWithReciprocal()
        }
        ,
        e.prototype.setCapExpressionSize = function(e) {
            this.capExpressionSize = e
        }
        ,
        e.prototype.getCapExpressionSize = function() {
            return this.capExpressionSize
        }
        ,
        e.prototype.setDecimalToFraction = function(e) {
            this.decimalToFraction = e
        }
        ,
        e.prototype.setLanguage = function(e) {
            "en" !== e && -1 === Desmos.supportedLanguages.indexOf(e) ? l.warn("Translation for '" + e + "' isn't currently available. Using '" + this.language + "' instead.") : this.language = e
        }
        ,
        e.prototype.getLanguage = function() {
            return this.language
        }
        ,
        e.prototype.getDecimalToFraction = function() {
            return this.decimalToFraction
        }
        ,
        e.prototype.isScientificCalc = function() {
            var e = this.options.evaluationMode;
            return "scientific" === e || "singleExpressionScientific" === e
        }
        ,
        e.prototype.isFourFunctionCalc = function() {
            return "fourFunction" === this.options.evaluationMode || "singleExpressionFourFunction" === this.options.evaluationMode
        }
        ,
        e.prototype.getAllowLinks = function() {
            return this.options.links
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
        e.prototype.undo = function(e) {
            if (this.canUndo()) {
                this.stateStack.undo();
                var o = this.stateStack.getState();
                if (!e.restoreFocus) {
                    var s = {
                        focus: void 0
                    };
                    o = t.__assign(t.__assign({}, o), {
                        ui: s
                    })
                }
                this.model.setState(o),
                this.enqueueEvent("change")
            }
        }
        ,
        e.prototype.redo = function(e) {
            if (this.canRedo()) {
                this.stateStack.redo();
                var o = this.stateStack.getState();
                if (!e.restoreFocus) {
                    var s = {
                        focus: void 0
                    };
                    o = t.__assign(t.__assign({}, o), {
                        ui: s
                    })
                }
                this.model.setState(o),
                this.enqueueEvent("change")
            }
        }
        ,
        e.prototype.clearHistory = function() {
            this.stateStack.clear()
        }
        ,
        e.prototype.canBackspace = function() {
            var e = this.model.getFocusedExpression();
            return e && (e.latex.length > 0 || this.model.getNumberOfExpressions() > 1)
        }
        ,
        e.prototype.focusLastExpression = function() {
            this.model.focusLastExpression()
        }
        ,
        e.prototype.shouldRender = function() {
            return this.containerSize.width > 0 && this.containerSize.height > 0
        }
        ,
        e.prototype.canClear = function() {
            return this.model.canClear()
        }
        ,
        e.prototype.shouldShowClear = function() {
            return this.model.shouldShowClear()
        }
        ,
        e.prototype.enableSettingsMenu = function() {
            this.settingsMenu = !0
        }
        ,
        e.prototype.disableSettingsMenu = function() {
            this.closeSettingsMenu(),
            this.settingsMenu = !1
        }
        ,
        e.prototype.closeSettingsMenu = function() {
            this.settingsMenuOpen = !1
        }
        ,
        e.prototype.toggleSettingsMenu = function() {
            this.settingsMenuOpen = !this.settingsMenuOpen
        }
        ,
        e.prototype.isSettingsMenuOpen = function() {
            return this.settingsMenuOpen
        }
        ,
        e.prototype.isLastExpressionEmpty = function() {
            return this.model.isLastExpressionEmpty()
        }
        ,
        e.prototype.createAtEnd = function() {
            this.model.createAtEnd()
        }
        ,
        e.prototype.clearFocusedExpression = function() {
            this.model.clearFocusedExpression()
        }
        ,
        e.prototype.setLatexById = function(e, t) {
            this.model.setLatexById(e, t)
        }
        ,
        e.prototype.setLatexAndBrailleById = function(e, t, o) {
            this.model.setLatexAndBrailleById(e, t, o)
        }
        ,
        e.prototype.setLatexOfFocusedExpression = function(e) {
            this.model.setLatexOfFocusedExpression(e)
        }
        ,
        e.prototype.toggleFractionEvaluationById = function(e) {
            this.model.setFractionEvaluation(e, !this.model.getExpressionById(e).displayAsFraction)
        }
        ,
        e.prototype.conditionallyCopyPrevious = function(e) {
            this.model.conditionallyCopyPrevious(e)
        }
        ,
        e.prototype.createBlankAfterId = function(e) {
            this.model.createBlankAfterId(e)
        }
        ,
        e.prototype.backspaceAtFrontOfId = function(e) {
            this.model.backspaceAtFrontOfId(e)
        }
        ,
        e.prototype.areStatesDifferentEnoughForUndoRedo = function(e, o) {
            var i = {
                focus: void 0
            };
            return s.isEqual(t.__assign(t.__assign({}, e), {
                ui: i
            }), t.__assign(t.__assign({}, o), {
                ui: i
            }))
        }
        ,
        e.prototype.commitUndoRedoDebounced = function() {
            var e = this.model.getState()
              , t = this.stateStack.getState();
            if (!this.areStatesDifferentEnoughForUndoRedo(e, t)) {
                var o = (new Date).getTime();
                o - this._lastDebouncedTime < 1e3 ? this.stateStack.replaceState(e) : this.stateStack.addState(e),
                this._lastDebouncedTime = o,
                this.enqueueEvent("change")
            }
        }
        ,
        e.prototype.commitUndoRedoSynchronously = function() {
            var e = this.model.getState()
              , t = this.stateStack.getState();
            this.areStatesDifferentEnoughForUndoRedo(e, t) || (this._lastDebouncedTime = 0,
            this.stateStack.addState(e),
            this.enqueueEvent("change"))
        }
        ,
        e.prototype.updateKeyboardMode = function(e) {
            this.keyboardMode = e
        }
        ,
        e.prototype.getFocusedMathquill = function() {
            if (this.model.getFocusedExpressionId())
                return c.default.getFocusedMathquill()
        }
        ,
        e.prototype.ensureMathquillIsFocusedAndReturnFocusedMathquill = function() {
            var e = this.getFocusedMathquill();
            return e || (this.isLastExpressionEmpty() && !this.model.isSingleExpression() ? this.createAtEnd() : this.focusLastExpression(),
            this.onEventEmitted && this.onEventEmitted("render"),
            this.getFocusedMathquill())
        }
        ,
        e.prototype.typeIntoFocusedMathquill = function(e) {
            e = e.replace(/\r|\n/g, "");
            var t = this.ensureMathquillIsFocusedAndReturnFocusedMathquill();
            t && c.default.canAcceptText(t, this.getCapExpressionSize(), e) && (t.typedText(e),
            this.setLatexOfFocusedExpression(t.latex()),
            this.model.markShouldDebounceUndoRedo())
        }
        ,
        e.prototype.pressKeyInFocusedMathquill = function(e, t) {
            if ("none" === this.getBrailleMode()) {
                var o = this.ensureMathquillIsFocusedAndReturnFocusedMathquill();
                if (o)
                    if ("Up" === e || "Down" === e || "Left" === e || "Right" === e)
                        c.default.applyArrowKeyAndReturnIfWasAtBounds(o, e, t) && this.moveFocusInDirection(e);
                    else
                        "Enter" === e ? (t && (t.preventDefault(),
                        t.stopPropagation()),
                        this.handleEnter()) : "Backspace" === e && this.attemptToMoveFocusWithBackspace() || (o.keystroke(e, t),
                        this.setLatexOfFocusedExpression(o.latex()))
            }
        }
        ,
        e.prototype.moveFocusInDirection = function(e) {
            var t = this.model.getFocusedExpressionId();
            t && ("Up" === e ? this.model.focusPrevById(t) : "Down" === e && this.model.focusNextById(t))
        }
        ,
        e.prototype.handleEnter = function() {
            if (!this.model.isSingleExpression()) {
                var e = this.model.getFocusedExpressionId();
                e && (this.conditionallyCopyPrevious(e),
                this.createBlankAfterId(e))
            }
        }
        ,
        e.prototype.attemptToMoveFocusWithBackspace = function() {
            var e = this.model.getFocusedExpression();
            if (!e)
                return !1;
            var t = e.latex
              , o = e.id;
            return "" === t && (this.backspaceAtFrontOfId(o),
            !0)
        }
        ,
        e.prototype.executeCommandInFocusedMathquill = function(e) {
            var t = this.ensureMathquillIsFocusedAndReturnFocusedMathquill();
            t && (r.execute(t, e),
            this.setLatexOfFocusedExpression(t.latex()))
        }
        ,
        e.prototype.syncPublicSettings = function() {
            this.settingsProxy.setProperty("language", this.language),
            this.settingsProxy.setProperty("fontSize", this.fontSize),
            this.settingsProxy.setProperty("degreeMode", this.model.getDegreeMode()),
            this.settingsProxy.setProperty("invertedColors", this.invertedColors),
            this.settingsProxy.setProperty("backgroundColor", this.backgroundColor),
            this.settingsProxy.setProperty("textColor", this.textColor),
            this.settingsProxy.setProperty("brailleMode", this.brailleMode),
            this.settingsProxy.setProperty("sixKeyInput", this.sixKeyInput),
            this.settingsProxy.setProperty("brailleControls", this.brailleControls),
            this.settingsProxy.setProperty("brailleExpressionDownload", this.brailleExpressionDownload),
            this.settingsProxy.setProperty("projectorMode", this.projectorMode),
            this.settingsProxy.setProperty("capExpressionSize", this.capExpressionSize),
            this.settingsProxy.setProperty("decimalToFraction", this.decimalToFraction),
            this.settingsProxy.setProperty("qwertyKeyboard", this.options.qwertyKeyboard),
            this.settingsProxy.setProperty("links", this.options.links),
            this.settingsProxy.setProperty("settingsMenu", this.settingsMenu),
            this.settingsProxy.setProperty("functionDefinition", this.model.getFunctionDefinition()),
            this.settingsProxy.setProperty("replaceCommaWith10Exp", this.replaceCommaWith10Exp),
            this.settingsProxy.setProperty("replaceRoundWithReciprocal", this.model.getReplaceRoundWithReciprocal()),
            this.settingsProxy.setProperty("typingAsteriskWritesTimesSymbol", this.typingAsteriskWritesTimesSymbol)
        }
        ,
        e.prototype.hookUpDispatcher = function() {
            var e = this;
            this.dispatcher.register(function(o) {
                e.enqueueEvent("render");
                var s = !1
                  , i = e.getRestrictedEditing();
                switch (o.type) {
                case "update-options":
                    e.options = t.__assign(t.__assign({}, e.options), o.options);
                    break;
                case "keypad/shift":
                    var n = void 0;
                    switch (e.keyboardMode) {
                    case "qwerty":
                        n = "capitalQwerty";
                        break;
                    case "capitalQwerty":
                        n = "qwerty";
                        break;
                    case "letters":
                        n = "capitalLetters";
                        break;
                    case "capitalLetters":
                        n = "letters";
                        break;
                    default:
                        n = "qwerty"
                    }
                    e.updateKeyboardMode(n);
                    break;
                case "undo":
                    i || (e.undo({
                        restoreFocus: "keyboard-shortcut" === o.source
                    }),
                    s = !0);
                    break;
                case "redo":
                    i || (e.redo({
                        restoreFocus: "keyboard-shortcut" === o.source
                    }),
                    s = !0);
                    break;
                case "clear-history":
                    e.clearHistory();
                    break;
                case "set-state-from-api":
                    o.opts.allowUndo || e.clearHistory(),
                    e.model.setStateFromAPI(o.state);
                    break;
                case "main":
                    e.updateKeyboardMode("main");
                    break;
                case "ABC":
                    e.options.qwertyKeyboard ? e.updateKeyboardMode("qwerty") : e.updateKeyboardMode("letters");
                    break;
                case "functions":
                    e.updateKeyboardMode("functions");
                    break;
                case "degrees":
                    e.model.setDegreeMode(!e.model.getDegreeMode());
                    break;
                case "update-degree-mode":
                    e.model.setDegreeMode(!!o.mode);
                    break;
                case "update-font-size":
                    var r = o.size;
                    if ("number" != typeof r && (r = parseInt(r, 10)),
                    isNaN(r))
                        return;
                    e.fontSize = r;
                    break;
                case "update-inverted-colors":
                    e.invertedColors = !!o.mode;
                    break;
                case "update-background-color":
                    e.backgroundColor = o.color;
                    break;
                case "update-text-color":
                    e.textColor = o.color;
                    break;
                case "update-projector-mode":
                    e.setProjectorMode(!!o.mode);
                    break;
                case "update-cap-expression-size":
                    e.setCapExpressionSize(!!o.mode);
                    break;
                case "update-decimal-to-fraction":
                    e.setDecimalToFraction(!!o.mode);
                    break;
                case "update-language":
                    e.setLanguage(o.language);
                    break;
                case "set-blank":
                    o.opts.allowUndo || e.clearHistory(),
                    e.model.clear(),
                    e.focusLastExpression();
                    break;
                case "clear":
                    e.model.clearFocusedExpression();
                    break;
                case "set-braille-mode":
                    var a = o.mode;
                    "nemeth" !== a && "ueb" !== a && "none" !== a ? l.warn("Valid Braille modes are 'nemeth', 'none', and 'ueb'. You passed '" + a + "'.") : (e.model.clearCachedBrailleValues(),
                    e.setBrailleMode(o.mode));
                    break;
                case "set-six-key-input":
                    e.setSixKeyInput(!!o.mode);
                    break;
                case "set-braille-controls":
                    e.setBrailleControls(!!o.value);
                    break;
                case "set-braille-expression-download":
                    e.setBrailleExpressionDownload(!!o.mode);
                    break;
                case "set-replace-comma-with-10-exp":
                    e.setReplaceCommaWith10Exp(!!o.replace);
                    break;
                case "set-replace-round-with-reciprocal":
                    e.setReplaceRoundWithReciprocal(!!o.replace);
                    break;
                case "set-typing-asterisk-writes-times-symbol":
                    e.setTypingAsteriskWritesTimesSymbol(!!o.mode);
                    break;
                case "update-latex":
                    e.model.markShouldDebounceUndoRedo(),
                    e.setLatexById(o.id, o.latex);
                    break;
                case "update-latex-from-braille":
                    e.model.markShouldDebounceUndoRedo(),
                    e.setLatexAndBrailleById(o.id, o.latex, o.braille);
                    break;
                case "focusin":
                    e.model.setFocusedById(o.id, !0);
                    break;
                case "focusout":
                    e.model.setFocusedById(o.id, !1);
                    break;
                case "focus-first-expression":
                    e.model.focusFirstExpression();
                    break;
                case "focus-prev-expression":
                    e.moveFocusInDirection("Up");
                    break;
                case "focus-next-expression":
                    e.moveFocusInDirection("Down");
                    break;
                case "focus-last-expression":
                    e.model.focusLastExpression();
                    break;
                case "insert-blank-expression":
                    e.handleEnter();
                    break;
                case "backspace-from-braille":
                    e.attemptToMoveFocusWithBackspace();
                    break;
                case "keypad/type-text":
                    e.typeIntoFocusedMathquill(o.text);
                    break;
                case "keypad/press-key":
                    e.pressKeyInFocusedMathquill(o.key, o.evt);
                    break;
                case "keypad/custom-command":
                    e.executeCommandInFocusedMathquill(o.command);
                    break;
                case "keypad/123":
                case "keypad/abc":
                case "keypad/audio-trace":
                    break;
                case "enable-settings-menu":
                    e.enableSettingsMenu();
                    break;
                case "disable-settings-menu":
                    e.disableSettingsMenu();
                    break;
                case "toggle-settings-menu":
                    e.toggleSettingsMenu();
                    break;
                case "close-settings-menu":
                    e.closeSettingsMenu();
                    break;
                case "render":
                    break;
                case "ui/container-resized":
                    e.containerSize = o.size;
                    break;
                case "toggle-fraction-evaluation":
                    e.toggleFractionEvaluationById(o.id);
                    break;
                default:
                    return o
                }
                e.runAfterDispatch(function() {
                    return e.syncPublicSettings()
                }),
                s || (e.model.getShouldDebounceUndoRedo() ? (e.commitUndoRedoDebounced(),
                e.model.clearShouldDebounceUndoRedo()) : e.commitUndoRedoSynchronously())
            })
        }
        ,
        e
    }();
    e.default = d
});