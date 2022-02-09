define('core/math/ir/features/element-at', ["require", "exports", "./list-length", "./interpret", "../opcodes", "core/math/types", "./nan-of-type"], function(require, t, e, n, s, a, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.elementsAt = t.elementAt = void 0,
    t.elementAt = function(t, r, o) {
        var i = t.getInstruction(r);
        if (a.isList(i.valueType)) {
            var p = e.getConstantListLength(t, r);
            if (o = Math.floor(o),
            isNaN(o) || o < 0 || void 0 !== p && o >= p) {
                var l = a.elementType(i.valueType);
                return t.NanOfType(l)
            }
            return i.type === s.List ? i.args[o] : i.type === s.Constant && a.isList(i.valueType) ? t.ConstantOfType(a.elementType(i.valueType), i.value[o]) : i.type === s.BroadcastResult && i.isConstantBroadcast ? t.ConstantOfType(a.elementType(i.valueType), n.interpretBroadcastElement(t, r, o)) : void 0 !== p ? t.InboundsListAccess([r, t.Constant(o + 1)]) : t.ListAccess([r, t.Constant(o + 1)])
        }
        if (i.valueType === a.Point)
            return isNaN(o) || o < 0 || o > 2 ? t.Constant(NaN) : i.type === s.OrderedPair ? i.args[o] : i.type === s.Constant ? t.Constant(i.value[o]) : t.OrderedPairAccess([r, t.Constant(o + 1)]);
        throw new Error("Cannot access elements of " + a.prettyPrint(i.valueType))
    }
    ,
    t.elementsAt = function(t, o, i) {
        var p = t.getInstruction(o);
        if (0 === i.length)
            return t.ConstantOfType(p.valueType, []);
        if (p.type === s.Constant && a.isList(p.valueType)) {
            for (var l = [], u = a.elementType(p.valueType), y = 0, c = i; y < c.length; y++) {
                var v = c[y]
                  , f = Math.floor(v);
                isNaN(f) || f < 0 || f >= e.assertConstantListLength(t, o, "Programming error: expected Constant list instruction to have constant length.") ? l.push(r.nanOfType(u)) : l.push(p.value[f])
            }
            return t.ConstantOfType(p.valueType, l)
        }
        if (p.type === s.List) {
            l = [];
            for (var T = 0, h = i; T < h.length; T++) {
                v = h[T],
                f = Math.floor(v);
                if (isNaN(f) || f < 0 || f >= e.assertConstantListLength(t, o, "Programming error: expected List instruction to have constant length.")) {
                    var d = a.elementType(p.valueType);
                    l.push(t.NanOfType(d))
                } else
                    l.push(p.args[f])
            }
            return t.List(l)
        }
        if (p.type === s.BroadcastResult && p.isConstantBroadcast)
            return t.ConstantOfType(p.valueType, n.interpretBroadcastElements(t, o, i));
        for (var g = [], C = !0, L = e.getConstantListLength(t, o), m = 0, N = i; m < N.length; m++) {
            v = N[m],
            f = Math.floor(v);
            g.push(t.Constant(f + 1)),
            (isNaN(f) || f < 0 || void 0 === L || f >= L) && (C = !1)
        }
        var O = [o, t.List(g)];
        return C ? t.InboundsListAccess(O) : t.ListAccess(O)
    }
});