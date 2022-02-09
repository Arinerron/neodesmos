define('core/math/features/getConcreteTree', ['require', 'parsenodes', 'core/math/errormsg', 'core/math/types', 'core/math/maybe-rational', 'core/math/sliders'], function(require) {
    "use strict";
    var e = require("parsenodes")
      , t = require("core/math/errormsg")
      , r = require("core/math/types")
      , i = require("core/math/maybe-rational")
      , s = (e.List,
    e.ParenSeq,
    e.Constant)
      , n = e.Identifier
      , o = require("core/math/sliders");
    function a(e, r) {
        return e.isError ? e : -1 === r.indexOf(e.valueType) ? t.parseError() : e
    }
    function l(e, t, r) {
        if (t) {
            var i = t.getDependencies();
            if (t.isError)
                r.errors[e] = !0;
            else if (i.length > 0) {
                r.errors[e] = !0;
                for (var s = 0; s < i.length; s++)
                    i[s] === r.exportedSymbol ? r.errors.cycle = !0 : r.missingVars.push(i[s])
            } else
                r.values[e] = +t.asValue();
            r.valids[e] = isFinite(r.values[e]),
            r.valids[e] || (r.values[e] = void 0)
        } else
            r.valids[e] = !0
    }
    function c(e) {
        return e && e.valueType === r.ListOfNumber && 1 === e.length && e.args ? e.args[0] : e
    }
    function u(i, s) {
        if (!s[this._symbol])
            throw t.functionUnsupported(this._symbol);
        var n = this.args.map(function(e) {
            return e.getConcreteTree(i, s)
        });
        if (n.length > 0) {
            if (1 === n.length && n.push(e.Constant(1).getConcreteTree(i, s)),
            n[1].getDependencies().length)
                throw t.illegalBinWidth(this._symbol).setDependencies(n[1].getDependencies());
            if (n[1].valueType !== r.Number)
                throw t.illegalBinWidth(this._symbol);
            var o = n[1].asValue();
            if (!isFinite(o) || o <= 0)
                throw t.illegalBinWidth(this._symbol)
        }
        return this.typeCheck(i, n),
        new this.constructor(n)
    }
    function h(e, r) {
        if (!r[this._symbol])
            throw t.functionUnsupported(this._symbol);
        var i = this.args.map(function(t) {
            return t.getConcreteTree(e, r)
        });
        return this.typeCheck(e, i),
        new this.constructor(i)
    }
    e.Base.prototype.tryGetConcreteTree = function() {
        var r;
        try {
            r = this.getConcreteTree.apply(this, arguments)
        } catch (i) {
            r = i instanceof e.Base ? i : t.parseError()
        }
        return r
    }
    ,
    e.Base.prototype.getConcreteTree = function(e, t) {
        var r = this.buildIRExpression(e, t);
        if (r.isError)
            throw r;
        return r
    }
    ,
    e.DoubleInequality.prototype.getConcreteTree = function(t, r) {
        return new this.constructor([e.Piecewise([this._indicator, this._expressions[0], s(NaN)]).getConcreteTree(t, r), this._operators[0], n(this._symbol), this._operators[1], e.Piecewise([this._indicator, this._expressions[1], s(NaN)]).getConcreteTree(t, r)])
    }
    ,
    e.Error.prototype.getConcreteTree = function(e, t) {
        return this
    }
    ,
    e.Image.prototype.getConcreteTree = function(t, i) {
        var s = this.center.tryGetConcreteTree(t, i)
          , n = this.radianAngle.tryGetConcreteTree(t, i)
          , o = this.width.tryGetConcreteTree(t, i)
          , l = this.height.tryGetConcreteTree(t, i)
          , c = this.opacity.tryGetConcreteTree(t, i)
          , u = [r.Point, r.ListOfPoint, r.EmptyList]
          , h = [r.Number, r.ListOfNumber, r.EmptyList];
        return s = a(s, u),
        n = a(n, h),
        o = a(o, h),
        l = a(l, h),
        c = a(c, h),
        e.Image({
            center: s,
            radianAngle: n,
            width: o,
            height: l,
            opacity: c
        }, this.moveStrategy)
    }
    ,
    e.Ticker.prototype.getConcreteTree = function(i, s) {
        var n = this.handler.tryGetConcreteTree(i, s);
        n.isError || n.valueType === r.Action || (n = t.eventHandlerTypeError(r.prettyPrint(n.valueType)));
        var o = n.getDependencies().filter(function(e) {
            return !i.validActionVariable(e)
        });
        return o.length && (n = t.tooManyVariables(i.sliderVariables(o)).setDependencies(o)),
        e.Ticker({
            handler: n,
            minStep: this.minStep.tryGetConcreteTree(i, s)
        })
    }
    ,
    e.Slider.prototype.getConcreteTree = function(e, r) {
        var n = this._expression.getConcreteTree(e, r)
          , a = c(this.sliderMin && this.sliderMin.tryGetConcreteTree(e, r))
          , u = c(this.sliderMax && this.sliderMax.tryGetConcreteTree(e, r))
          , h = c(this.sliderStep && this.sliderStep.tryGetConcreteTree(e, r))
          , p = {
            exportedSymbol: this._symbol,
            errors: {},
            values: {},
            valids: {},
            missingVars: [],
            errMsg: void 0
        };
        if (l("min", a, p),
        l("max", u, p),
        l("step", h, p),
        h && p.valids.step && (0 === p.values.step ? delete p.values.step : p.values.step = Math.abs(p.values.step)),
        p.errors.cycle ? n = t.sliderLimitReferencesExport(p.exportedSymbol) : (p.errors.min || !p.valids.min ? p.errMsg = t.sliderMinInvalid() : p.errors.max || !p.valids.max ? p.errMsg = t.sliderMaxInvalid() : !p.errors.step && p.valids.step || (p.errMsg = t.sliderStepInvalid()),
        p.values.min > p.values.max && (p.valids.min = !1,
        p.valids.max = !1,
        p.errMsg || (p.errMsg = t.sliderMaxLessThanMin()))),
        n.isConstant) {
            var d = r.initialEvaluation && r.initialEvaluation.asValue() && this.sliderIsPlayingOnce
              , y = p.values.max
              , v = +n.asValue()
              , g = p.values.min
              , T = p.values.step;
            if (d && !isFinite(y)) {
                var m = c(this.sliderSoftMax && this.sliderSoftMax.tryGetConcreteTree(e, r));
                m && (y = o.computeSoftMax({
                    storedMax: +m.asValue(),
                    sliderValue: v,
                    step: T,
                    hardMin: g
                }))
            }
            var f = o.constrainSliderValueLikeEvaluator({
                target: v,
                hardMin: g,
                hardMax: y,
                step: T,
                forceSliderToMax: d
            })
              , C = i.fromDecimalString(f.toString())
              , b = isFinite(i.asFloat(C)) ? C : f;
            n = s(b).getConcreteTree(e, r)
        }
        return n.sliderInfo = p,
        n
    }
    ,
    e.Histogram.prototype.getConcreteTree = u,
    e.DotPlot.prototype.getConcreteTree = u,
    e.BoxPlot.prototype.getConcreteTree = function(e, i) {
        if (!i[this._symbol])
            throw t.functionUnsupported(this._symbol);
        var s = this.args.map(function(t) {
            return t.getConcreteTree(e, i)
        });
        return this.typeCheck(e, s),
        1 !== s.length || s[0].valueType !== r.ListOfNumber && s[0].valueType !== r.EmptyList ? t.parseError() : new this.constructor(s)
    }
    ,
    e.TTest.prototype.getConcreteTree = h,
    e.IndependentTTest.prototype.getConcreteTree = h,
    e.Stats.prototype.getConcreteTree = h,
    e.Table.prototype.getConcreteTree = function(e, t) {
        for (var r = [], i = Object.create(t), s = 0; s < this.columns.length; s++) {
            var n = this.columns[s].getConcreteTree(e, i);
            n.isIndependent && this.columns[s].exportToLocal(n, i),
            r.push(n)
        }
        return new this.constructor(r)
    }
    ,
    e.TableColumn.prototype.getConcreteTree = function(i, s, n) {
        var o, a, l = this.header.getConcreteTree(i, s);
        if (this.header instanceof e.Identifier && !s[this.header._symbol]) {
            o = [];
            for (var c = 0; c < this.values.length; c++)
                if (this.values[c].tableError())
                    o.push(t.invalidTableEntry(this.values[c].tableError()));
                else {
                    var u = this.values[c].tryGetConcreteTree(i, s);
                    u.isError ? o.push(u) : u.tableError() ? o.push(t.invalidTableEntry(u.tableError())) : u.valueType === r.Number ? o.push(u) : o.push(t.tableEntryTypeError([r.prettyPrint(u.valueType)]))
                }
            return (a = new this.constructor(l,this.length,o)).isIndependent = !0,
            a
        }
        if (l.isConstant) {
            for (var h = [], p = 0; p < this.length; p++)
                h.push(l);
            o = h
        } else
            o = l.isList ? l.mapElements(function(e) {
                return e
            }) : [];
        if (l.isError || l.valueType === r.Number || l.valueType === r.ListOfNumber || l.valueType === r.EmptyList || (l = t.tableHeaderTypeError([r.prettyPrint(l.valueType)])),
        a = new this.constructor(l,this.length,o),
        void 0 !== n) {
            var d = this.header.tryGetConcreteTree(i, n);
            d.isError || d.valueType !== r.Number || (a.continuousConcreteTree = d)
        }
        return a
    }
});