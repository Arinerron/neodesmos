define('core/math/features/typeCheck', ['require', 'parsenodes', 'core/math/types', 'core/math/errormsg'], function(require) {
    "use strict";
    var t = require("parsenodes")
      , e = require("core/math/types")
      , i = require("core/math/errormsg")
      , o = e.isOneOf;
    function s(t) {
        for (var i = [], o = 0; o < t.length; o++)
            i.push(e.prettyPrint(t[o].valueType));
        return i
    }
    function r(t, s) {
        var r = s.length
          , h = s[0];
        if (r < 2)
            throw i.methodRequiresList(this._symbol);
        if (!o(h.valueType, [e.ListOfNumber, e.EmptyList]))
            throw i.methodRequiresList(this._symbol);
        if (r > 2)
            throw i.tooManyArguments(this._symbol, 2)
    }
    var h = {
        Object3D: function(t, e) {
            if (e.length < 3)
                throw i.wrongArity(this._symbol, 3, e.length)
        },
        Histogram: r,
        DotPlot: r,
        BoxPlot: function(t, s) {
            var r = s.length
              , h = s[0];
            if (0 === r)
                throw i.methodRequiresList(this._symbol);
            if (!o(h.valueType, [e.ListOfNumber, e.EmptyList]))
                throw i.methodRequiresList(this._symbol);
            if (r > 1)
                throw i.methodRequiresList(this._symbol)
        },
        TTest: function(t, o) {
            var r = this._symbol;
            if (0 === o.length)
                throw i.methodRequiresList(r);
            if (o[0].valueType === e.EmptyList)
                throw i.ttestListTooShort(r);
            if (o[0].valueType !== e.ListOfNumber)
                throw i.methodRequiresList(r);
            if (o.length > 2)
                throw i.tooManyArguments(r, 2);
            if (o[0].length < 2)
                throw i.ttestListTooShort(r);
            if (o[1] && o[1].valueType !== e.Number)
                throw i.functionTypeError(r, s(o))
        },
        IndependentTTest: function(t, o) {
            var r = this._symbol;
            if (2 !== o.length)
                throw i.wrongDoubleReducerArity(r);
            if (!e.isList(o[0].valueType) || !e.isList(o[1].valueType))
                throw i.nonListDoubleReducer(r);
            if (o[0].valueType === e.EmptyList || o[1].valueType === e.EmptyList)
                throw i.ttestListTooShort("ittest");
            if (o[0].valueType !== e.ListOfNumber || o[1].valueType !== e.ListOfNumber)
                throw i.functionTypeError(r, s(o));
            if (o[0].length < 2 || o[1].length < 2)
                throw i.ttestListTooShort("ittest")
        },
        Stats: function(t, o) {
            var r = o.length
              , h = o[0];
            if (0 === r)
                throw i.methodRequiresList(this._symbol);
            if (h.valueType === e.EmptyList)
                throw i.functionTypeError(this._symbol, s(o));
            if (h.valueType !== e.ListOfNumber)
                throw i.methodRequiresList(this._symbol);
            if (r > 1)
                throw i.methodRequiresList(this._symbol)
        }
    };
    for (var n in h)
        t[n].prototype.typeCheck = h[n]
});