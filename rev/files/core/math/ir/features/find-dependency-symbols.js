define('core/math/ir/features/find-dependency-symbols', ["require", "exports", "../instructions", "../opcodes"], function(require, e, o, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.findDependencySymbols = void 0,
    e.findDependencySymbols = function(e, r) {
        for (var n = [], a = [], t = 0; t < r; t++)
            a.push(!1);
        for (a.push(!0),
        t = r; t >= 0; t--)
            if (a[t]) {
                var i = e.getInstruction(t);
                if (i.type === s.LoadArg)
                    n.push({
                        symbol: e.argNames[t],
                        scope: "free"
                    });
                else if (o.beginsBlock(i))
                    switch (i.type) {
                    case s.BeginIntegral:
                        n.push({
                            symbol: i.callData.indexSymbol,
                            scope: "integral"
                        });
                        break;
                    case s.BeginLoop:
                        n.push({
                            symbol: i.callData.indexSymbol,
                            scope: i.callData.type
                        });
                        break;
                    case s.BeginBroadcast:
                        if (i.listComprehensionCallData)
                            for (var l = 0, c = i.listComprehensionCallData.inputListSymbols; l < c.length; l++) {
                                var p = c[l];
                                n.push({
                                    symbol: p,
                                    scope: "comprehension"
                                })
                            }
                        break;
                    default:
                        throw new Error("Programming Error: unexpected loop instruction " + i.type)
                    }
                else
                    i.type === s.SymbolicVar && i.symbol && n.push({
                        symbol: i.symbol,
                        scope: "symbolic-var"
                    });
                if (!o.isLeafInstruction(i))
                    for (var y = 0, u = i.args; y < u.length; y++) {
                        a[u[y]] = !0
                    }
            }
        return n.reverse()
    }
});