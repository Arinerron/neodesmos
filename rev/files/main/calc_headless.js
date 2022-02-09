
define('main/calc_headless', ["require", "exports", "main/graph_settings", "main/evaluator", "underscore_model", "main/controller"], function(require, t, e, o, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.HeadlessCalc = void 0;
    var r = function() {
        function t(t, r) {
            var a = this
              , s = new e;
            for (var l in r)
                s.config.setProperty(l, r[l]);
            this.controller = new n.default(s);
            var c = new o.Evaluator(t);
            this.controller.setEvaluator(c),
            c.readEvaluatorConfig = function() {
                return {
                    evaluationMode: "graphing",
                    globalRandomSeed: s.randomSeed,
                    degreeMode: s.degreeMode,
                    restrictedFunctions: s.config.restrictedFunctions,
                    distributions: s.config.distributions,
                    pointsOfInterest: s.config.pointsOfInterest,
                    plotSingleVariableImplicitEquations: s.config.plotSingleVariableImplicitEquations,
                    plotImplicits: s.config.plotImplicits,
                    plotInequalities: s.config.plotInequalities,
                    sliders: s.config.sliders,
                    actions: s.config.actions
                }
            }
            ,
            c.onEvaluatorResults = function(t) {
                a.controller.dispatch({
                    type: "on-evaluator-changes",
                    changes: t.evaluationStates,
                    timingData: t.timingData,
                    eventUpdates: t.eventUpdates
                })
            }
            ;
            var d = new i.UnderscoreModel;
            d.setProperties({
                pixelCoordinates: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                },
                mathCoordinates: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }
            }),
            this.graphpaperBounds = d,
            this.evaluator = c,
            this.setBlank()
        }
        return t.prototype.setBlank = function(t) {
            this.controller.dispatch({
                type: "set-blank",
                opts: t
            })
        }
        ,
        t.prototype.tick = function() {
            this.evaluator.tick()
        }
        ,
        t.prototype.destroy = function() {
            this.evaluator.destroy()
        }
        ,
        t
    }();
    t.HeadlessCalc = r
});