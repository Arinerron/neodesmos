define('core/math/ir/chunk', ["require", "exports", "core/math/errormsg", "core/math/types", "core/math/maybe-rational", "core/math/functions", "./opcodes", "./builtin-table", "./features/constant-collapse", "./features/type-check", "./features/emit-js", "./features/get-value-type", "./features/is-constant", "./features/list-length", "./features/drop-unreferenced-instructions", "./features/convert-to-broadcast", "./features/print", "./features/to-dot", "./features/fuse-broadcast", "./features/polynomial-order", "./features/get-polynomial-coefficients", "./features/copy-instruction", "./features/lift-point-operations", "./features/element-at", "./features/take-derivative", "./features/bound-domain", "./features/find-linear-subset", "./features/derive-regression-restrictions", "./features/as-value", "./features/depends-on-outer-variable", "./features/nan-of-type", "./features/find-dependency-symbols"], function(require, t, e, n, r, s, i, o, u, a, p, c, h, y, l, g, f, d, v, I, T, m, b, L, x, k, V, C, A, B, N, D) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Chunk = void 0;
    var E = 1e4
      , S = function() {
        function t(t) {
            if (this.instructions = [],
            this.blockMask = [],
            this.comments = [],
            t.argNames.length !== t.argTypes.length)
                throw new Error("Programming Error: length of argNames must match length of argTypes");
            this.argNames = t.argNames,
            this.argTypes = t.argTypes;
            for (var e = 0; e < this.argTypes.length; e++) {
                var n = this.argTypes[e];
                this.LoadArg(n)
            }
            this.returnIndex = -1
        }
        return t.prototype.addComments = function(t) {
            for (var e in t) {
                var n = this.comments[e] || "";
                this.comments[e] = n + t[e]
            }
            return this
        }
        ,
        t.prototype.instructionsLength = function() {
            return this.instructions.length
        }
        ,
        t.prototype.getInstruction = function(t) {
            return this.instructions[t]
        }
        ,
        t.prototype.popInstruction = function() {
            return this.instructions.pop()
        }
        ,
        t.prototype.truncate = function(t) {
            this.instructions.length = t,
            this.blockMask.length = t,
            this.comments.length = t
        }
        ,
        t.prototype.pushInstructionChecked = function(t) {
            if (this.instructions.length >= 32768)
                throw e.deeplyNested();
            this.instructions.push(t),
            this.returnIndex = this.instructions.length - 1
        }
        ,
        t.prototype.pushLeafInstruction = function(t) {
            return this.pushInstructionChecked(t),
            this.returnIndex
        }
        ,
        t.prototype.pushInstruction = function(t) {
            return this.checkInstructionArguments(t),
            this.pushInstructionChecked(t),
            this.returnIndex = g.convertToBroadcast(this),
            this.returnIndex = b.liftPointOperations(this),
            a.typeCheck(this, this.returnIndex),
            this.returnIndex = u.constantCollapse(this),
            this.returnIndex
        }
        ,
        t.prototype.checkInstructionArguments = function(t) {
            for (var e = 0, n = t.args; e < n.length; e++) {
                var r = n[e];
                if (this.blockMask[r])
                    throw new Error("Programming Error: cannot reference an instruction in a closed block")
            }
        }
        ,
        t.prototype.markClosedBlock = function(t, e) {
            for (var n = t; n < e; n++)
                this.blockMask[n] = !0
        }
        ,
        t.prototype.LoadArg = function(t) {
            return this.pushLeafInstruction({
                type: i.LoadArg,
                valueType: t
            })
        }
        ,
        t.prototype.BlockVar = function(t, e) {
            return this.pushInstruction({
                type: i.BlockVar,
                valueType: t,
                args: e
            })
        }
        ,
        t.prototype.SymbolicVar = function(t, e) {
            return this.pushLeafInstruction({
                type: i.SymbolicVar,
                valueType: t,
                symbol: e
            })
        }
        ,
        t.prototype.BroadcastResult = function(t, e) {
            var n = e[0]
              , r = this.instructions[n]
              , s = r.args[0]
              , o = this.instructions.length - n
              , u = r.args[o]
              , a = !B.dependsOnOuterVariable(this, u, s)
              , p = this.getInstruction(s).args[0]
              , c = this.getInstruction(p);
            return this.pushInstruction({
                type: i.BroadcastResult,
                valueType: t,
                args: e,
                isConstantBroadcast: a,
                constantLength: h.isConstant(c) ? A.asValue(this, p) : void 0
            })
        }
        ,
        t.prototype.Constant = function(t) {
            return this.ConstantOfType(n.Number, t)
        }
        ,
        t.prototype.ConstantOfType = function(t, s) {
            if ("number" == typeof s && (s = r.maybeRational(s, 1)),
            n.isList(t) && s.length > E)
                throw e.maxListSize(E.toLocaleString());
            return this.pushLeafInstruction({
                type: i.Constant,
                valueType: t,
                value: s
            })
        }
        ,
        t.prototype.NanOfType = function(t) {
            if (t === n.Distribution) {
                var e = this.Constant(NaN);
                return this.Distribution("uniformdist", [e, e])
            }
            return this.ConstantOfType(t, N.nanOfType(t))
        }
        ,
        t.prototype.Add = function(t) {
            var e = i.Add
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Subtract = function(t) {
            var e = i.Subtract
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Multiply = function(t) {
            var e = i.Multiply
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Divide = function(t) {
            var e = i.Divide
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Exponent = function(t) {
            var e = i.Exponent
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.RawExponent = function(t) {
            var e = i.RawExponent
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Negative = function(t) {
            var e = i.Negative
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Equal = function(t) {
            var e = i.Equal
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Less = function(t) {
            var e = i.Less
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Greater = function(t) {
            var e = i.Greater
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.LessEqual = function(t) {
            var e = i.LessEqual
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.GreaterEqual = function(t) {
            var e = i.GreaterEqual
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.And = function(t) {
            var e = i.And
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.Piecewise = function(t) {
            var e = i.Piecewise
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.OrderedPair = function(t) {
            var e = i.OrderedPair
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.OrderedPairAccess = function(t) {
            var e = i.OrderedPairAccess
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.List = function(t) {
            var n = i.List
              , r = c.getValueType(this, n, t);
            if (t.length > E)
                throw e.maxListSize(E.toLocaleString());
            return this.pushInstruction({
                type: n,
                valueType: r,
                args: t
            })
        }
        ,
        t.prototype.ListAccess = function(t) {
            var e = i.ListAccess
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.DeferredListAccess = function(t) {
            var e = i.DeferredListAccess
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.InboundsListAccess = function(t) {
            var e = i.InboundsListAccess
              , n = c.getValueType(this, e, t);
            return this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            })
        }
        ,
        t.prototype.NativeFunction = function(t, e, n) {
            var r = this
              , s = i.NativeFunction
              , u = o.BuiltInTable[t].returnType
              , a = "function" == typeof u ? u(n.map(function(t) {
                return r.getInstruction(t).valueType
            })) : u;
            return this.pushInstruction({
                type: s,
                valueType: a,
                args: n,
                symbol: t,
                callData: e
            })
        }
        ,
        t.prototype.SyntheticNativeFunction = function(t, e) {
            var n = this
              , r = i.NativeFunction
              , s = o.BuiltInTable[t].returnType
              , u = "function" == typeof s ? s(e.map(function(t) {
                return n.getInstruction(t).valueType
            })) : s
              , a = {
                errorSymbol: t,
                providedArity: e.length,
                isDotCall: !1
            };
            return this.pushInstruction({
                type: r,
                valueType: u,
                args: e,
                symbol: t,
                callData: a
            })
        }
        ,
        t.prototype.Distribution = function(t, e) {
            var r = i.Distribution
              , s = n.Distribution;
            return this.pushInstruction({
                type: r,
                valueType: s,
                args: e,
                symbol: t
            })
        }
        ,
        t.prototype.BeginIntegral = function(t, e) {
            var n = i.BeginIntegral
              , r = c.getValueType(this, n, []);
            return this.pushInstruction({
                type: n,
                valueType: r,
                args: e,
                endIndex: -1,
                callData: t
            })
        }
        ,
        t.prototype.EndIntegral = function(t) {
            var e = i.EndIntegral
              , n = c.getValueType(this, e, t)
              , r = t[0]
              , s = this.getInstruction(r);
            this.instructions[r] = {
                type: s.type,
                valueType: s.valueType,
                args: s.args,
                endIndex: this.instructionsLength(),
                callData: s.callData
            };
            var o = this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            });
            return this.markClosedBlock(r, o),
            o
        }
        ,
        t.prototype.BeginBroadcast = function(t, n) {
            var r = i.BeginBroadcast
              , s = c.getValueType(this, r, [])
              , o = this.getInstruction(t[0]);
            if (h.isConstant(o) && A.asValue(this, t[0]) > E)
                throw e.maxListSize(E.toLocaleString());
            return this.pushInstruction({
                type: r,
                valueType: s,
                endIndex: -1,
                args: t,
                listComprehensionCallData: n
            })
        }
        ,
        t.prototype.EndBroadcast = function(t) {
            var e = i.EndBroadcast
              , n = c.getValueType(this, e, t)
              , r = t[0]
              , s = this.getInstruction(r)
              , o = {
                type: s.type,
                valueType: s.valueType,
                args: s.args,
                endIndex: this.instructionsLength()
            };
            this.instructions[r] = o;
            var u = this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            });
            return this.markClosedBlock(r, u),
            u
        }
        ,
        t.prototype.BeginLoop = function(t, e) {
            var n = i.BeginLoop
              , r = c.getValueType(this, n, e);
            return this.pushInstruction({
                type: n,
                valueType: r,
                args: e,
                endIndex: -1,
                callData: t
            })
        }
        ,
        t.prototype.EndLoop = function(t) {
            var e = i.EndLoop
              , n = c.getValueType(this, e, t)
              , r = t[0]
              , s = this.getInstruction(r);
            this.instructions[r] = {
                type: s.type,
                valueType: s.valueType,
                args: s.args,
                endIndex: this.instructionsLength(),
                callData: s.callData
            };
            var o = this.pushInstruction({
                type: e,
                valueType: n,
                args: t
            });
            return this.markClosedBlock(r, o),
            o
        }
        ,
        t.prototype.ExtendSeed = function(t, e) {
            var r = i.ExtendSeed
              , s = n.SeedType;
            return this.pushInstruction({
                type: r,
                valueType: s,
                args: e,
                tag: t
            })
        }
        ,
        t.prototype.Noop = function() {
            var t = i.Noop
              , e = n.Any;
            return this.pushLeafInstruction({
                type: t,
                valueType: e
            })
        }
        ,
        t.prototype.Action = function(t, e) {
            return this.pushInstruction({
                type: i.Action,
                valueType: n.Action,
                args: e,
                symbols: t
            })
        }
        ,
        t.prototype.replaceInstructionWithConstant = function(t, e) {
            this.instructions[t] = e,
            this.blockMask[t] = void 0
        }
        ,
        t.prototype.replaceInstructionWithBlockVar = function(t, e) {
            this.instructions[t] = e
        }
        ,
        t.prototype.reopenFinalBlock = function() {
            var t = this.getInstruction(this.returnIndex);
            if (t.type !== i.BroadcastResult)
                return this;
            for (var e = t.args[0], n = this.getInstruction(e).args[0]; n < e; n++)
                this.blockMask[n] = void 0;
            return this.truncate(e),
            this
        }
        ,
        t.prototype.isInClosedBlock = function(t) {
            return this.blockMask[t]
        }
        ,
        t.prototype.copy = function() {
            var e = new t({
                argNames: this.argNames,
                argTypes: this.argTypes
            });
            return e.instructions = this.instructions.slice(),
            e.blockMask = this.blockMask.slice(),
            e.comments = this.comments.slice(),
            e.returnIndex = this.returnIndex,
            e
        }
        ,
        t.prototype.close = function() {
            return this.returnIndex = v.fuseBroadcast(this, this.returnIndex),
            l.dropUnreferencedInstructions(this),
            this
        }
        ,
        t.prototype.copyInstruction = function(t) {
            return m.copyInstruction(this, t)
        }
        ,
        t.prototype.copyInstructionWithArgs = function(t, e) {
            return m.copyInstructionWithArgs(this, t, e)
        }
        ,
        t.prototype.replaceInstructionWithNoop = function(t) {
            this.instructions[t] = {
                type: i.Noop,
                valueType: n.Any
            }
        }
        ,
        t.prototype.getReturnType = function() {
            return this.instructions[this.returnIndex].valueType
        }
        ,
        t.prototype.isConstant = function() {
            return h.isConstant(this.instructions[this.returnIndex])
        }
        ,
        t.prototype.asValue = function() {
            return A.asValue(this, this.returnIndex)
        }
        ,
        t.prototype.asCompilerValue = function() {
            var t = this.instructions[this.returnIndex];
            switch (t.type) {
            case i.Constant:
                return t.value;
            default:
                throw new Error("Unexpected opcode " + t.type + ".")
            }
        }
        ,
        t.prototype.getConstantListLength = function() {
            return y.getConstantListLength(this, this.returnIndex)
        }
        ,
        t.prototype.getListLengthDependencies = function() {
            var t = this.copy()
              , e = y.listLengthIndex(t, t.returnIndex);
            return D.findDependencySymbols(t, e)
        }
        ,
        t.prototype.elementAt = function(t) {
            var e = this.copy()
              , n = e.returnIndex;
            return e.returnIndex = L.elementAt(e, n, t),
            e.close(),
            e
        }
        ,
        t.prototype.getCompiledFunction = function(t) {
            var e;
            if (t) {
                e = t.slice();
                for (var n = 0, r = this.argNames; n < r.length; n++) {
                    var i = r[n];
                    -1 === e.indexOf(i) && e.push(i)
                }
            } else
                e = this.argNames;
            var o = p.emitJS(this)
              , u = o.source
              , a = o.constants;
            return {
                args: e,
                source: u,
                constants: a,
                fn: s.closureFunctionWithBuiltIn(e, u, a)
            }
        }
        ,
        t.prototype.polynomialOrder = function(t, e) {
            return I.polynomialOrder(this, t, e)
        }
        ,
        t.prototype.getPolynomialCoefficients = function(t) {
            return T.getPolynomialCoefficients(this, t)
        }
        ,
        t.prototype.takeDerivative = function(t) {
            var e = this.copy()
              , n = this.argNames.indexOf(t);
            return -1 === n ? (e.Constant(0),
            e.close(),
            e) : (e.returnIndex = x.takeDerivative(e, e.returnIndex, n),
            e.close(),
            e)
        }
        ,
        t.prototype.deriveRegressionRestrictions = function() {
            return C.deriveRegressionRestrictions(this)
        }
        ,
        t.prototype.boundDomain = function(t) {
            return k.boundDomain(this, t, this.returnIndex)
        }
        ,
        t.prototype.findLinearSubset = function(t) {
            for (var e = V.findLinearSubset(this), n = [], r = 0, s = t; r < s.length; r++) {
                var i = s[r]
                  , o = this.argNames.indexOf(i);
                if (-1 === o)
                    throw new Error("Programming Error: findLinearSubset called with a non-dependency");
                n.push(e[o])
            }
            return n
        }
        ,
        t.prototype.print = function() {
            return f.print(this)
        }
        ,
        t.prototype.printInstruction = function(t) {
            return f.printInstruction(this, t)
        }
        ,
        t.prototype.toDot = function() {
            return d.default(this)
        }
        ,
        t.prototype.getLiveArgNames = function() {
            for (var t = [], e = 0; e < this.argNames.length; e++) {
                this.instructions[e].type === i.LoadArg && t.push(this.argNames[e])
            }
            return t
        }
        ,
        t
    }();
    t.Chunk = S
});