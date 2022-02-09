
define('basic/model', ["require", "exports", "immutable-store", "main/shared-clock-bus", "core/lib/label", "main/evaluator", "core/lib/label", "underscore"], function(require, t, e, o, s, i, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function t(t) {
            var s = this
              , i = t.evaluationMode
              , n = t.additionalFunctions
              , r = t.functionDefinition
              , a = t.replaceRoundWithReciprocal
              , u = t.workerPool;
            this._evaluations = {},
            this._nextObjectId = 0,
            this.store = new e.default({
                expressions: {
                    1: {
                        id: "1",
                        latex: "",
                        braille: "",
                        type: "latex",
                        displayAsFraction: !1
                    }
                },
                order: ["1"],
                settings: {
                    degreeMode: !1
                },
                ui: {
                    focus: void 0
                }
            }),
            this.evaluationMode = i,
            this.additionalFunctions = n,
            this.functionDefinition = r,
            this.replaceRoundWithReciprocal = a,
            this.workerPool = u,
            this._setupEvaluator(),
            this.clear(),
            this._sharedClockBusToken = o.subscribe(function() {
                s._evaluator.tick()
            })
        }
        return t.prototype.isSingleExpression = function() {
            return "singleExpressionScientific" === this.evaluationMode || "singleExpressionFourFunction" === this.evaluationMode
        }
        ,
        t.prototype.destroy = function() {
            o.unsubscribe(this._sharedClockBusToken)
        }
        ,
        t.prototype.generateObjectId = function() {
            return (this._nextObjectId++).toString()
        }
        ,
        t.prototype.updateNextObjectId = function() {
            var t = this.store.getState().order;
            this._nextObjectId = 0;
            for (var e = /^[0-9]+$/, o = 0, s = t; o < s.length; o++) {
                var i = s[o];
                if (e.test(i)) {
                    var n = parseInt(i, 10);
                    n >= this._nextObjectId && (this._nextObjectId = n + 1)
                }
            }
        }
        ,
        t.prototype.clearShouldDebounceUndoRedo = function() {
            this._shouldDebounceUndoRedo = !1
        }
        ,
        t.prototype.markShouldDebounceUndoRedo = function() {
            this._shouldDebounceUndoRedo = !0
        }
        ,
        t.prototype.getShouldDebounceUndoRedo = function() {
            return this._shouldDebounceUndoRedo
        }
        ,
        t.prototype.clearCachedBrailleValues = function() {
            for (var t = 0, e = this.getExpressionOrder(); t < e.length; t++) {
                var o = e[t];
                this.store.set(["expressions", o, "braille"], "")
            }
        }
        ,
        t.prototype.getState = function() {
            return this.store.getState()
        }
        ,
        t.prototype.getPersistedState = function() {
            var t = this.getState()
              , e = t.expressions
              , o = t.order
              , s = t.settings;
            return {
                expressions: {
                    list: o.map(function(t) {
                        var o = e[t];
                        return {
                            id: o.id,
                            latex: o.latex,
                            displayAsFraction: o.displayAsFraction
                        }
                    })
                },
                settings: s
            }
        }
        ,
        t.prototype.setState = function(t) {
            this.store.set(t),
            this._updateIndexes(),
            this.updateNextObjectId()
        }
        ,
        t.prototype.setStateFromAPI = function(t) {
            var e = []
              , o = {};
            t.expressions.list.forEach(function(t) {
                e.push(t.id),
                o[t.id] = {
                    id: t.id,
                    latex: t.latex,
                    braille: "",
                    type: "latex",
                    displayAsFraction: !!t.displayAsFraction
                }
            }),
            this.setState({
                expressions: o,
                order: e,
                settings: t.settings,
                ui: {
                    focus: void 0
                }
            })
        }
        ,
        t.prototype.canClear = function() {
            if (this.getNumberOfExpressions() > 1)
                return !0;
            var t = this.getExpressionOrder()[0];
            return "" !== this.getExpressionLatex(t)
        }
        ,
        t.prototype.clear = function() {
            this.setState({
                expressions: {
                    1: {
                        id: "1",
                        type: "latex",
                        latex: "",
                        braille: "",
                        displayAsFraction: !1
                    }
                },
                ui: {
                    focus: void 0
                },
                order: ["1"],
                settings: this.getState().settings
            })
        }
        ,
        t.prototype.getExpressionOrder = function() {
            return this.store.getState().order
        }
        ,
        t.prototype.getNumberOfExpressions = function() {
            return this.getExpressionOrder().length
        }
        ,
        t.prototype.getExpressionById = function(t) {
            return this.getState().expressions[t]
        }
        ,
        t.prototype.getExpressionIndex = function(t) {
            return this._indexes[t]
        }
        ,
        t.prototype._getExpressionByIndex = function(t) {
            var e = this.getExpressionOrder()[t];
            return this.getExpressionById(e)
        }
        ,
        t.prototype._updateIndexes = function() {
            this._indexes = {};
            for (var t = 0, e = 0, o = this.getExpressionOrder(); e < o.length; e++) {
                var s = o[e];
                this._indexes[s] = t,
                t += 1
            }
            this._evaluate()
        }
        ,
        t.prototype._usesAnsById = function(t) {
            return -1 !== this.getExpressionById(t).latex.indexOf("\\operatorname{ans}")
        }
        ,
        t.prototype._getPreviousExpById = function(t) {
            var e = this.getExpressionIndex(t);
            return this._getExpressionByIndex(e - 1)
        }
        ,
        t.prototype.createBlankAfterId = function(t) {
            if (!this.isSingleExpression() && this.getExpressionById(t).latex) {
                var e = this.getExpressionIndex(t)
                  , o = this.generateObjectId();
                this.store.shallowMutate("order", function(t) {
                    t.splice(e + 1, 0, o)
                }),
                this.store.shallowMutate("expressions", function(t) {
                    t[o] = {
                        id: o,
                        latex: "",
                        braille: "",
                        type: "latex",
                        displayAsFraction: !1
                    }
                }),
                this._updateIndexes(),
                this.setFocusedById(o, !0)
            }
        }
        ,
        t.prototype.conditionallyCopyPrevious = function(t) {
            var e = this._getPreviousExpById(t)
              , o = this.getExpressionById(t);
            null != e && "" === o.latex && this._usesAnsById(e.id) && this.setLatexById(t, e.latex)
        }
        ,
        t.prototype.backspaceAtFrontOfId = function(t) {
            if ("" === this.getExpressionById(t).latex && 1 !== this.getNumberOfExpressions()) {
                var e = this.getExpressionIndex(t);
                this.store.shallowMutate("order", function(t) {
                    t.splice(e, 1)
                }),
                this.store.shallowMutate("expressions", function(e) {
                    delete e[t]
                }),
                this._updateIndexes(),
                this._setFocusedByIndex(Math.max(e - 1, 0), !0)
            }
        }
        ,
        t.prototype.setLatexById = function(t, e) {
            this.store.set(["expressions", t, "latex"], e),
            this.store.set(["expressions", t, "braille"], ""),
            "" === e && this.setFractionEvaluation(t, !1),
            this._evaluate()
        }
        ,
        t.prototype.setLatexAndBrailleById = function(t, e, o) {
            this.store.set(["expressions", t, "latex"], e),
            this.store.set(["expressions", t, "braille"], o),
            "" === e && this.setFractionEvaluation(t, !1),
            this._evaluate()
        }
        ,
        t.prototype.setFractionEvaluation = function(t, e) {
            this.store.set(["expressions", t, "displayAsFraction"], e)
        }
        ,
        t.prototype.setLatexOfFocusedExpression = function(t) {
            var e = this.getFocusedExpressionId();
            e && this.setLatexById(e, t)
        }
        ,
        t.prototype.isExpressionFocused = function(t) {
            return this.getFocusedExpressionId() === t
        }
        ,
        t.prototype.getExpressionLatex = function(t) {
            return this.getExpressionById(t).latex
        }
        ,
        t.prototype.getExpressionError = function(t) {
            var e = this._evaluations[t];
            return e ? e.error : ""
        }
        ,
        t.prototype.getExpressionValue = function(t) {
            var e = this._evaluations[t];
            if (e)
                return e.value
        }
        ,
        t.prototype.getExpressionAns = function(t) {
            var e = this._evaluations[t];
            if (e)
                return e.ans
        }
        ,
        t.prototype.getExpressionAnsId = function(t) {
            var e = this._evaluations[t];
            if (e)
                return e.ansId
        }
        ,
        t.prototype.shouldShowEvaluationForExpression = function(t) {
            var e = this._evaluations[t];
            return !!e && e.showEvaluation
        }
        ,
        t.prototype.isRationalizableConstant = function(t) {
            var e = this._evaluations[t];
            return !!e && e.isRationalizableConstant
        }
        ,
        t.prototype.canDisplayEvaluationAsFraction = function(t) {
            var e = this.getExpressionValue(t);
            return !!e && n.canDisplayAsFraction(e)
        }
        ,
        t.prototype._setFocusedByIndex = function(t, e) {
            var o = this._getExpressionByIndex(t)
              , s = this.store.getState().ui.focus
              , i = e ? {
                type: "latex-expression",
                id: o.id
            } : void 0;
            if (!r.isEqual(s, i)) {
                if (s) {
                    var n = s.id;
                    this.store.deepMutate("expressions", function(t) {
                        var e = t[n];
                        e && (e.braille = "")
                    })
                }
                (e || this.getFocusedExpressionId() === o.id) && this.store.shallowMutate("ui", function(t) {
                    t.focus = i
                })
            }
        }
        ,
        t.prototype.setFocusedById = function(t, e) {
            var o = this.getExpressionIndex(t);
            this._setFocusedByIndex(o, e)
        }
        ,
        t.prototype.focusPrevById = function(t) {
            var e = this.getExpressionIndex(t) - 1;
            e >= 0 && this._setFocusedByIndex(e, !0)
        }
        ,
        t.prototype.focusNextById = function(t) {
            var e = this.getExpressionIndex(t) + 1;
            e < this.getNumberOfExpressions() ? this._setFocusedByIndex(e, !0) : this.createAtEnd()
        }
        ,
        t.prototype.getFocusedExpression = function() {
            var t = this.getFocusedExpressionId();
            return t ? this.getExpressionById(t) : void 0
        }
        ,
        t.prototype.getFocusedExpressionId = function() {
            var t = this.getState().ui.focus;
            return t && t.id
        }
        ,
        t.prototype.clearFocusedExpression = function() {
            var t = this.getFocusedExpression();
            t && this.setLatexById(t.id, "")
        }
        ,
        t.prototype.shouldShowClear = function() {
            if (1 === this.getNumberOfExpressions())
                return !1;
            var t = this.getFocusedExpression();
            return !!t && !!t.latex
        }
        ,
        t.prototype.getLastExpression = function() {
            return this._getExpressionByIndex(this.getNumberOfExpressions() - 1)
        }
        ,
        t.prototype.isLastExpressionEmpty = function() {
            return !!this.getLastExpression().latex
        }
        ,
        t.prototype.createAtEnd = function() {
            this.createBlankAfterId(this.getLastExpression().id)
        }
        ,
        t.prototype.focusLastExpression = function() {
            this._setFocusedByIndex(this.getNumberOfExpressions() - 1, !0)
        }
        ,
        t.prototype.focusFirstExpression = function() {
            this._setFocusedByIndex(0, !0)
        }
        ,
        t.prototype.getDegreeMode = function() {
            return this.getState().settings.degreeMode
        }
        ,
        t.prototype.setDegreeMode = function(t) {
            this.store.set(["settings", "degreeMode"], !!t),
            this._evaluate()
        }
        ,
        t.prototype._cleanupLatex = function(t) {
            return "=" === (t = s.trimLatex(t)).substr(t.length - 1) && (t = t.substr(0, t.length - 1)),
            t
        }
        ,
        t.prototype._evaluate = function() {
            var t = this;
            this._evaluator.clearStatementsAndStartCompleteState(),
            this.getExpressionOrder().forEach(function(e) {
                return t._evaluator.addStatement({
                    id: e,
                    index: t.getExpressionIndex(e),
                    latex: t._cleanupLatex(t.getExpressionLatex(e)),
                    shouldGraph: !1,
                    type: "statement"
                })
            })
        }
        ,
        t.prototype._setupEvaluator = function() {
            var t = this;
            this._evaluator = new i.Evaluator(this.workerPool),
            this._evaluator.readEvaluatorConfig = function() {
                return {
                    degreeMode: t.getDegreeMode(),
                    evaluationMode: t.evaluationMode,
                    additionalFunctions: t.additionalFunctions,
                    functionDefinition: t.functionDefinition,
                    replaceRoundWithReciprocal: t.replaceRoundWithReciprocal,
                    actions: !1
                }
            }
            ,
            this._evaluator.onEvaluatorResults = function(e) {
                var o = e.evaluationStates;
                for (var s in t._evaluations = {},
                o) {
                    var i = o[s];
                    if (t.getExpressionById(s)) {
                        var r = i.constant_value;
                        void 0 === r && i.zero_values && i.zero_values.length && (r = i.zero_values[0].val);
                        var a = i.hasOwnProperty("constant_value") && n.canDisplayAsFraction(i.constant_value)
                          , u = !i.is_evaluable && a
                          , p = !!i.is_evaluable || u || Array.isArray(r);
                        t._evaluations[s] = {
                            error: i.error,
                            ans: void 0,
                            ansId: void 0,
                            value: r,
                            showEvaluation: p,
                            isRationalizableConstant: u
                        }
                    }
                }
                for (var d = void 0, c = void 0, l = 0, h = t.getExpressionOrder(); l < h.length; l++) {
                    s = h[l];
                    var x = t._evaluations[s];
                    if (d && x) {
                        var f = d.value;
                        "number" == typeof f ? (x.ans = f,
                        x.ansId = c) : Array.isArray(f) && (x.ans = "[...]")
                    }
                    d = x,
                    c = s
                }
                "function" == typeof t.onEvaluationUpdate && t.onEvaluationUpdate()
            }
        }
        ,
        t.prototype.reloadState = function() {
            this.setState(this.getState())
        }
        ,
        t.prototype.getFunctionDefinition = function() {
            return !!this.functionDefinition
        }
        ,
        t.prototype.enableFunctionDefinition = function() {
            this.functionDefinition = !0,
            this.reloadState()
        }
        ,
        t.prototype.disableFunctionDefinition = function() {
            this.functionDefinition = !1,
            this.reloadState()
        }
        ,
        t.prototype.getReplaceRoundWithReciprocal = function() {
            return !!this.replaceRoundWithReciprocal
        }
        ,
        t.prototype.enableReplaceRoundWithReciprocal = function() {
            this.replaceRoundWithReciprocal = !0,
            this.reloadState()
        }
        ,
        t.prototype.disableReplaceRoundWithReciprocal = function() {
            this.replaceRoundWithReciprocal = !1,
            this.reloadState()
        }
        ,
        t
    }();
    t.default = a
});