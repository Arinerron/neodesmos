#!/usr/bin/env python3

from . import *

INSTRUCTION_VECTOR_OF_NUMBER = 58
INSTRUCTION_EMPTY_VECTOR = 59
INSTRUCTION_CROSS_PRODUCT = 97

class SupportVectorFeature(Feature):
    def patch(self):
        self.patch_notation()
        self.patch_cross_product()


    def patch_cross_product(self):
        self.insert_after_re(r'"\]=(\S)\.times=', r'g.cross=')
        self.insert_after_re(r'var \S="alpha beta ', r'cross ')
        #self.replace(r'"&times;","[x]","times', r'"&times;","[x]","cross')
        self.replace(r'\\times":"*",', r'\\times":"Cross",', matches=2) # gets used by https://github.com/Arinerron/neodesmos/blob/main/rev/files/core/math/parser/expression-lexer.js#L102-L103
        self.insert_after(r'allTokenTypes=Object.keys({', r'Cross:!0,', matches=2)
        self.insert_after_re(r'(\S)\.la\("Trig"\),', r'\2.la("Cross"),', matches=2)
        self.insert_before_re(r'case"\.":\S=\S\.advance\(\S\);\S=\S\.spanStates', r'case "Cross":', matches=2)
        
        self.insert_after_re(r'\S\.peek\(\S\);switch\(\S\.type\)\{case"\+":', r'case "Cross":', matches=2)
        self.insert_after_re(r'":return (\S)\.Mul\((\S),(\S)\);', r'case "Cross": return \2.Cross(\3,\4);', matches=2)
        self.insert_after_re(r'(\S)\.Mul=function\((\S),(\S)\)\{return\{type:"Mul",span:(\S),args:(\S)\}\},',
            # \2: n
            # \3: n (arg)
            # \4: t
            # \5: n (span)
            # \6: t (span)
            r'\2.Cross = function(\3, \4) {'
                r'return {'
                    r'type: "Cross",'
                    r'span: \3,'
                    r'args: \4'
                r'}'
            r'},', matches=2)
        self.insert_before_re(r'case (\S)\.Action:return \S\(\S\.type\)', r'case \2.Cross:', matches=2)
        self.insert_after_re(r'case (\S).Multiply:return"Multiply";', r'case \2.Cross:return "Cross";', matches=2)
        self.insert_after_re(r'getInstruction\(\S\);switch\((\S)\.type\)\{case (\S)\.Constant\:return \S\.value;case \S\.Add\:return \S\((\S)\((\S),\S\.args\[0\],(\S)\),\S\(\S,\S\.args\[1\],\S\)\);',
            # \2: n
            # \3: a
            # \4: M
            # \5: r
            # \6: t
            r'case \3.Cross:return cross(\4(\5, \2.args[0], \6), \4(\5, \2.args[1], \6));', matches=2)
        self.insert_before_re(r'function \S\(\S,\S,\S\)\{var \S=\S\.getInstruction\(\S\);switch', r'''function cross(r, e) {
    console.log("cross(",r,e,")");
    /*return t.sub(r,e);*/
    if (typeof r === "object" && r.length !== undefined && typeof e === "object" && e.length !== undefined) {
        return [
            t.sub(t.mul(r[1], e[2]), t.mul(r[2], e[1])),
            t.sub(t.mul(r[2], e[0]), t.mul(r[0], e[2])),
            t.sub(t.mul(r[0], e[1]), t.mul(r[1], e[0]))
        ];
    } else { return t.mul(r, e); }
}'''.replace('\n', ''), matches=2)
        self.insert_before_re(r'(\S)\.GreaterEqual=\S,\S\.And=function\(', r'\2.Cross = cross,', matches=2)
        self.insert_before_re(r'(\S)\.Multiply=\S,\S\.Divide=', r'\2.Cross=cross,', matches=2)

        self.insert_before_re(r'case (\w+)\.Multiply\:\S\=(\w+)\.getInstruction\((\w+)\.args\[0\]\),\w\=\w\.getInstruction\(\w\.args\[1\]\);return \w\.type\=\=\=\S\.Constant&&\S\.type\=\=\=\S\.Constant\?\(\S\.popInstruction\(\),\S\.Constant\((\w+)\.Multiply\(\S\.value,\S\.value\)\)\)\:\S\.type\=\=\=\S\.Constant&&1\=\=\=\S\.asFloat\(\S\.value\)\?\(\S\.popInstruction\(\),\S\.args\[1\]\)\:\S\.type\=\=\=n\.Constant&&1\=\=\=(\w+)\.asFloat\(\S\.value\)\?\(\S\.popInstruction\(\),\S\.args\[0\]\)\:\S\.returnIndex;',
            # \2: n
            # \3: t
            # \4: d
            # \5: l
            # \6: s
            r'''case \2.Cross:
    C = \3.getInstruction(\4.args[0]),
    f = \3.getInstruction(\4.args[1]);
    return C.type === \2.Constant && f.type === \2.Constant ? (\3.popInstruction(),
        (
        C.value.length === undefined && f.value.length === undefined
        ? \3.Constant(\5.Cross(C.value, f.value))
        : \3.Vector(\5.Cross(C.value, f.value))
        )
    )
    : C.type === \2.Constant && 1 === \6.asFloat(C.value) ? (\3.popInstruction(),
    \4.args[1]) : f.type === \2.Constant && 1 === \6.asFloat(f.value) ? (\3.popInstruction(),
    \4.args[0]) : \3.returnIndex;
'''.replace('\n', ' '), matches=2)

        self.insert_before_re(r'case (\w+)\.Multiply\:(\w+)\=\[(\w+)\.Number,\w\.Number\];if\(\!(\w+)\((\w+),(\w+)\.args,(\w+)\)\)throw (\w+)\.multiplyTypeError\((\w+)\(\w,\w\.args\)\);return;',
            # \2: t
            # \3: p
            # \4: a
            # \5: u
            # \6: e
            # \7: c
            # \8: p
            # \9: r
            # \10: i
            r'case \2.Cross:'
                r'\3 = [\4.Number, \4.Number];'
                r'var a\3 = [\4.VectorOfNumber, \4.VectorOfNumber];'
                r'if (!(\5(\6, \7.args, \3) || \5(\6, \7.args, a\3) ))'
                    r'throw \9.crossTypeError(\10(\6, \7.args));'
                r'return;', matches=2)
        self.insert_before_re(r'(\w+)\.multiplyTypeError=function\(\w\)\{return (\w+)\((\w+)\.(\w+)',
            r'\2.crossTypeError = function(r) {'
            r'return \3(\4.\5("shared-calculator-error-cross-type-error", {symbol1: r[0], symbol2: r[1]})).allowExport()'
            r'},', matches=2)
        self.insert_before_re(r'\\nshared-calculator-error-multiply-type-error = ', r'\\nshared-calculator-error-cross-type-error = Cannot find cross product of { $symbol1 } and { $symbol2 }')
        self.insert_after_re(r'Multiply\:(\w+)\((\w+),\{\}\),', r'Cross: \2(\3, {}),', matches=2)
        self.insert_after_re(r'(\w+).Multiply=10,', r'\2.Cross = ' + str(INSTRUCTION_CROSS_PRODUCT) + ',', matches=2)
        self.insert_after_re(r'case"Mul"\:return (\w+)\.Multiply\((\w+)\((\w+),(\w+)\.args\)\);', r'case "Cross": return \2.Cross(\3(\4, \5.args));', matches=2)
        self.insert_before_re(r'case (\w+)\.Action:return \S\(\S\.type\)\+', r'case \2.Cross:', matches=2)
        self.insert_after_re(r'case (\w+)\.Multiply:return"Multiply";', r'case \2.Cross: return "Cross";', matches=2)

        self.insert_after_re(r'case"Multiply":return (\w+)\.Multiply\((\w+)\((\w+),(\w+)\.args\)\);', r'case "Cross": return \2.Cross(\3(\4, \5.args));', matches=2)
        self.insert_after_re(r'(\w+)\.prototype\.Multiply\=function\(\w\)\{var \w\=(\w+)\.Multiply,\w\=(\w+)\.getValueType\(this,\w,\w\);return this\.pushInstruction\(\{type\:\w,valueType\:\w,args\:\w\}\)\},',
            r'\2.prototype.Cross = function(t) {'
                r'var e = \3.Cross, n = \4.getValueType(this, e, t);'
                r'return this.pushInstruction({'
                    r'type: e, valueType: n, args: t'
                r'})'
            r'},', matches=2)
        self.insert_after_re(r'\w\.getValueType\=function\(\w,\w,\w\)\{switch\(\w\)\{case (\w+)\.Add\:', r'case \2.Cross:', matches=2)
        self.insert_after_re(r'\w\.copyInstructionWithArgs\=function\((\w+),\w,(\w+)\)\{switch\(\w\.type\)\{case (\w+)\.Add\:return \w\.Add\(\w\);', r'case \4.Cross: return \2.Cross(\3);', matches=2)
        self.insert_after_re(r'return \w\.returnIndex;switch\(\w\.type\)\{case (\w+)\.Add:case \w\.Subtract:', r'case \2.Cross:', matches=2)

        self.insert_before_re(r'case (\w+)\.Subtract\:if\(\w\((\w+),(\w+)\.args\[0\]\)&&(\w+)\(\w,\w\.args\[1\]\)\)',
            # \2: r
            # \3: e
            # \4: s
            # \5: t
            r'''case \2.Cross:
if (\5(e, \4.args[0]) && \5(\3, \4.args[1])) {
    c = \3.Constant(1),
    i = \3.Constant(2);
    return \3.OrderedPair([\3.Subtract([\3.OrderedPairAccess([\4.args[0], c]), \3.OrderedPairAccess([\4.args[1], c])]), \3.Subtract([\3.OrderedPairAccess([\4.args[0], i]), \3.OrderedPairAccess([\4.args[1], i])])]);
}
return e.returnIndex;
        '''.replace('\n', ' '), matches=2)

        #self.replace(r'return function(r,e,t){', r'var asdf = function(r, e, t) {', matches=2)
        #self.replace('s}(r,e,t);', r's}(r,e,t); console.log("asdf:", asdf); return [{"vector": [1,2]}];', matches=2)


    def patch_notation(self):
        # language
        self.insert_after('graphing-calculator-label-evaluation-list = { $count } element list\\n', 'graphing-calculator-label-evaluation-vector = { $dimension }D vector\\n')
        
        # rendering evaluation
        # TODO: add latex rendering of (x,y,z) as a vertical column of numbers here. See the fraction code :71880
        # TODO: support braille rendering. see code @ :71945
        self.insert_after_re(r'(\S)\.const\("dcg-evaluation-list"\)},function\(\)\{return\ \S\.controller\.(\S)\("graphing-calculator-label-evaluation-list",\{count:(\S)\.props\.val\(\)\.length}\)}\)},',
            # \2: n
            # \3: s
            # \4: e
            # NOTE: e.controller.s(a, b) finds string key a and formats with object b
            'vector: function() {'
                r'return \2.createElement("span", {'
                    r'class: \2.const("dcg-evaluation-list")'
                r'}, function() {'
                    r'return \4.controller.\3("graphing-calculator-label-evaluation-vector", {'
                        r'dimension: \4.props.val().vector.length'
                    r'})'
                r'})'
            '},'
            )

        # token->object
        self.insert_after_re(
            # \2: a
            # \3: e
            # \4: t
            # \5: u
            # \6: t
            # \7: s
            # \8: r

            # :25582
            r'throw\ (\S)\.listComprehensionIncorrectInput\(\);'
            r'\S\S\.push\((\S)\.setInput\((\S)\.AssignmentExpression\((\S)\(\S,\S\S\.args\)\),\S\S\.span\)\)}'
            r'return\ (\S)\.ListComprehension\(\S,\$,\S\S\)}'
            r'return\ \S\.List\(\S\(\S,(\S)\.unwrapSeq\(\S\)\)\);'
            r'case"Pipes":return\ \S\.FunctionCall\("\\\\\\?\\?abs",\S\(\S,(\S)\.args\)\);',
            
            'case "Vector":'
                r'if (0 === \8.args.length) throw \2.emptyVector();' # TODO: have custom error msg
                r'var G = \8.args[0];'
                r'return \6.Vector(\5(\3, \7.unwrapSeq(G)));',
            matches=2)

        self.insert_after_re(r'case"Index":case"List":', 'case "Vector":', matches=2)
        self.insert_after_re(r'case"Sub":case"List":', 'case "Vector":', matches=1)
        self.insert_after_re(r'case t.List:return"List";', 'case t.Vector: return "Vector";', matches=2)
        self.insert_after_re(r'(\S)\.List=38,', r'\2.Vector=99,', matches=2) # XXX: this opcode could get taken sometime
        self.insert_before_re(r'case (\w)\.Action:return \w\.returnIndex;default:throw', r'case \2.Vector:', matches=4) # XXX ??? 4 matches?
        self.insert_after_re(r'(\S)\.prototype\.List=function\((\S)\)\{var n=(\S)\.List,r=(\S)\.getValueType\(this,n,t\);if\(t\.length>(\S)\)throw\ e\.maxListSize\(\S\.toLocaleString\(\)\);return this\.pushInstruction\(\{type:n,valueType:r,args:t}\)},', # :31133
                # \2: t
                # \3: t (func arg) # XXX: remove
                # \4: i
                # \5: c
                # \6: E
                r'\2.prototype.Vector = function(t) {'
                    r'var n = \4.Vector,'
                        #r'r = \5.getValueType(this, n, t);'
                        r'r = 1;'
                    r'if (t.length > \6) throw e.maxListSize(\6.toLocaleString());' # TODO: make own error msg
                    r'if (t.length == 0) throw e.emptyVector(\6.toLocaleString());' # TODO: make own error msg
                    'return this.pushInstruction({type: n, valueType: r, args: t});'
                r'},',
                matches=2
                )
        # TODO be sure to add :31919

        # add custom error message
        # r.emptyParen @ :21309
        self.insert_before_re(r'(\S)\.emptyParen=function\(\)\{return (\S)\((\S)\.(\S)',
            # \2: r
            # \3: e
            # \4: o
            # \5: s
            r'\2.emptyVector = function() {'
                r'return \3(\4.\5("shared-calculator-error-empty-vector"))'
            '},', matches=2)
        self.insert_before('\\nshared-calculator-error-empty-square-bracket =', '\\nshared-calculator-error-empty-vector = Vectors cannot be 0 dimensional')

        # initialize t.Vector
        self.insert_after_re(r'(\S)\.List=function\(n,t\)\{return\{type:"List",span:n,args:t}},',
            # \2: the parent obj, named n here
            r'\2.Vector = function(n, t) {'
                'return {'
                    'type: "Vector",'
                    'span: n,'
                    'args: t'
                '}'
            '},',
            matches=2
            )

        self.insert_after_re(r'(\S)\.And=function\(\S,\S\)\{return \S&&\S},',
            r'\2.Vector = function(r) {return r},',
            matches=2)

        self.insert_after_re(r'case"\[":return\ e=i\.advance\(e\),i\.isAt\(e,"]"\)\?v\(e=i\.advance\(e\),a\.List\(i\.spanStates\(F,e\),\[]\)\):\(e=\(o=j\(F,e=\(c=S\(e,N\)\)\.state,q=c\.tree,"\[","]"\)\)\.state,"Err"===\(q=o\.tree\)\.type\?v\(e,q\):v\(e,a\.List\(i\.spanStates\(F,e\),\[q]\)\)\);',

            'case "<":'
                'return e = i.advance(e),'
                'i.isAt(e, ">") ? v(e = i.advance(e), a.Vector(i.spanStates(F, e), [])) : (e = (o = j(F, e = (c = S(e, N)).state, q = c.tree, "<", ">")).state,'
                '"Err" === (q = o.tree).type ? v(e, q) : v(e, a.Vector(i.spanStates(F, e), [q])));',

            matches=2) # TODO make reliable

        self.insert_after_re(r'case"]":e=i\.advance\(e\);t=i\.spanStates\(r,e\);return\ v\(e,n\.Err\(t,n\.UnexpectedCloseDelimiter\("\[","]"\)\)\);',

            'case ">":'
                'e = i.advance(e);'
                't = i.spanStates(r, e);'
                'return v(e, n.Err(t, n.UnexpectedCloseDelimiter("<", ">")));',

            matches=2
                ) # TODO make reliable

        # add closing token
        self.insert_before(r'case"]":case"|)":case"Differential":', 'case ">":', matches=2)

        # disable error checking :26386
        self.insert_before(r'case">":case"<":case">="', '/*', matches=2)
        self.insert_before(r'case"<":case">=":case"<=":', '*/', matches=2)

        self.insert_after('.rightTable={', '">": ">",', matches=2)
        self.insert_after('.leftTable={', '"<": "<",', matches=2)

        # XXX: fix >
        self.replace('p.la(">"),p.la("<")', 'p.r(">"), p.l("<")', matches=2) # TODO add p.la(>) again!!!
        self.insert_after_re(r'p\.r\("\["\),p\.la\("\]"\),', r'p.r("<"), p.l(">"), ', matches=2) # TODO make reliable

        self.replace('throw"Unexpected surface node "+r.type+"."', 'console.error("unexp surf node 1, i hate", r);throw "Unexpected surface node #1 " + r.type + "."', matches=2)
        self.replace('!1;default:throw"Unexpected surface node "+e.type+"."', '!1;default:throw "Unexpected surface node #2 " + e.type + "."', matches=2)
        self.replace('d();default:throw"Unexpected surface node "+e.type+"."', 'd();default:throw "Unexpected surface node #3 " + e.type + "."', matches=2)

        self.insert_before_re(r"define\((\\)?'core/math/parsenode/list(\\)?'", '''
    define("core/math/parsenode/vector", ["require", "pjs", "./expression", "core/math/types"], function(require) {
        "use strict";
        var t = require("pjs")
          , i = require("./expression")
          , n = require("core/math/types");
        return t(i, function(t, i, s) {
            t.init = function(t) {
                i.init.call(this, t),
                this.length = t.length
            }
            ,
            t.isVector = !0,
            t.asValue = function() {
                for (var t = [], i = 0; i < this.args.length; i++)
                    t.push(this.args[i].asValue());
                return t
            }
            ,
            t.asCompilerValue = function() {
                for (var t = [], i = 0; i < this.args.length; i++)
                    t.push(this.args[i].asCompilerValue());
                return t
            }
            ,
            t.getEvaluationInfo = function() {
                if (this.args.every(function(t) {
                    return t.isConstant
                }))
                    return [{
                        val: this.args.map(function(t) {
                            return t.asValue()
                        })
                    }]
            }
            ,
            s.eachArgs = function(t, i) {
                var s = function(t) {
                    for (var i = 1 / 0, n = 0; n < t.length; n++)
                        (t[n].isVector || t[n].isBroadcast) && (i = Math.min(i, t[n].length));
                    return i
                }(t);
                if (isFinite(s))
                    for (var e = 0; e < s; e++) {
                        for (var r = [], a = 0; a < t.length; a++)
                            r.push(t[a].isVector || n.isVector(t[a].valueType) ? t[a].elementAt(e) : t[a]);
                        i(r, e)
                    }
                else
                    i(t)
            }
            ,
            s.wrap = function(t) {
                return t.isVector || n.isVector(t.valueType) ? t : s([t])
            }
        })
    });
    '''.replace('\n', ''), matches=2)

        #self.insert_before('r.parse=void 0,r.parse=function(r,l){', 'console.log("inc vector");e.Vector = require("core/math/parsenode/vector");console.log("done", e.Vector);', matches=2)
        self.insert_after('r.parseError=function(){', 'console.trace();', matches=2)
        self.insert_before('return r instanceof e?r:o.parseError()', 'console.error(r);', matches=2)
        #self.insert_after('t.Expression.prototype.analyze=function(e,t){', 'console.log("THIS IS e,t", e,t);', matches=2)
        
        self.insert_before('List:require("core/math/parsenode/list"),', 'Vector: require("core/math/parsenode/vector"),', matches=2)
        self.insert_after_re(r"(\\?)'core/math/parsenode/identifier(\\?)',(\\?)'core/math/parsenode/ans(\\?)',", "\"core/math/parsenode/vector\",", matches=2)

        self.insert_before(r'case"List":if(a.getDependencies().length>0)return g.List(B(e,a.args));', '''case "Vector":
            if (a.getDependencies().length > 0)
                return g.Vector(B(e, a.args));
            if (0 === a.args.length)
                return g.ConstantOfType(s.EmptyVector, []);
            for (var N = g.instructionsLength(), F = [], O = void 0, _ = void 0, R = 0, k = a.args; R < k.length; R++) {
                var M = C(e, k[R])
                  , H = g.getInstruction(M);
                if (void 0 === O) { /*TODO how to check if everythings an int/float/double type*/
                    if (O = H.valueType,
                    !s.hasVectorType(O))
                        throw new Error("Vector type error: too lazy to impl but n.vectorTypeError([s.prettyPrint(O)])");
                    _ = s.vectorType(O)
                } else if (H.valueType !== O)
                    /*throw n.heterogeneousList();*/
                    throw new Error("Heterogeneous vector error TODO does this mean anything lol");
                if (H.type !== u.Constant)
                    throw new Error("Programming error: expected vector with no dependencies to constant collapse.");
                F.push(H.value),
                g.truncate(N)
            }
            return g.ConstantOfType(_, F);
    '''.replace('\n', ''), matches=2)

        self.insert_after_re(r'(\S)\.EmptyList=11,', r'\2.EmptyVector=' + str(INSTRUCTION_EMPTY_VECTOR) + r',\2.VectorOfNumber=' + str(INSTRUCTION_VECTOR_OF_NUMBER) + r',', matches=2) # XXX: 59 could exist in the future, assuming unused
        self.insert_after_re(r'(\S)\[\S\.EmptyList\]=(\S)\.Number,', r'\2[\3.EmptyVector] = \3.Number,\2[\3.VectorOfNumber] = \3.Number,', matches=2)
        self.insert_after_re(r'case (\S)\.EmptyList:return"EmptyList";', r'case \2.EmptyVector:return"EmptyVector";', matches=2)
        #self.insert_before_re(r'case \S\.ListOfPolygon:case (\S)\.EmptyList:return!0;', r'case \2.EmptyVector:case \2.VectorOfNumber:', matches=2) # jumpback
        self.insert_after_re(r'case \S\.ListOfPolygon:case (\S)\.EmptyList:return!0;', r'case \2.EmptyVector:case \2.VectorOfNumber:', matches=2)
        self.insert_after_re(r'\){case (\S)\.EmptyList:case \S\.ListOfNumber:', r'case \2.EmptyVector:case \2.VectorOfNumber:', matches=2)
        self.insert_after_re(r'\S=\[(\S)\.Number,\S\.ListOfNumber,\S\.EmptyList', r', \2.EmptyVector, \2.VectorOfNumber', matches=2)
        # XXX: do we need :20169 @ return !(t !== e.EmptyList || !o(r)) || (!(r !== e.ListOfAny || !o(t)) || t  ... 
        self.insert_before_re(r'case (\S)\.EmptyList:return (\S)\.(\S)\("shared-calculator-label-value-type-empty-list',
            # \2: e
            # \3: t
            # \4: s
            r'case \2.EmptyVector:'
                r'return \3.\4("shared-calculator-label-value-type-empty-vector");'
            r'case \2.VectorOfNumber:'
                r'return \3.\4("shared-calculator-label-value-type-vector-of-number");', matches=2)
        self.insert_before('\\nshared-calculator-label-value-type-empty-list = ', '\\nshared-calculator-label-value-type-empty-vector = an empty vector\\nshared-calculator-label-value-type-vector-of-number = a vector')

        self.insert_before_re(r'(\S)\.listType=function\(\S\)\{switch', r'\2.vectorType = function(t) {'
                r'switch (t) {'
                    r'case \2.Number: return \2.VectorOfNumber;'
                    r'default: throw new Error("Invalid vector type #1: " + t);'
                r'}'
            r'},', matches=2)
        self.insert_before_re(r'(\S)\.hasListType=function\(\S\)\{switch', r'\2.hasVectorType = function(t) {'
                r'switch (t) {'
                    r'case \2.Number: return !0;'
                    r'default: throw new Error("Invalid vector type #2: " + t);'
                r'}'
            r'},', matches=2)

        self.insert_before_re(r'case (\S)\.Number:case \S\.ListOfNumber:return 0===s.length', r'case \2.VectorOfNumber:', matches=2)
        #self.insert_after('return i(e,r,n);case o.Number:case o.ListOfNumber:', 'case o.VectorOfNumber:')
        self.insert_after('case o.Distribution:case o.ListOfDistribution:case o.EmptyList:', 'case o.VectorOfNumber:', matches=2)

        #self.insert_after(r'},u(function(){', 'console.log("this",this,"e",e);debugger;', matches=1)
        # DEBUG TODO remove
        #self.insert_after('e.valueToLatex=function e(a,i){', 'console.log("VALUETOLATEX:",a,i);debugger;', matches=2)
        self.insert_after('e.Polygon;function o(t){', 'console.log("matching type=",t);', matches=2)
        
        # XXX/TODO: figure out how to prevent vector+scalar
        '''
        self.insert_after_re(r'case t\.(Add|Subtract):(var )?p=\[a\.Number,a\.Number\];if\(!u\(e,c\.args,p\)',
            r' || using_sv(e, c.args)', matches=4)
        self.insert_before(r'function u(e,r,t){', r'function using_sv(e, r) {'
                r'var all_vectors = true;'
                r'var found_vector = false;'
                r'for (var s = 0; s < r.length; s++) {'
                    r'var n = e.getInstruction(r[s]).valueType;'
                    r'if (n === ' + str(INSTRUCTION_VECTOR_OF_NUMBER) + r' || n === ' + str(INSTRUCTION_EMPTY_VECTOR) + ') {'
                        r'found_vector = true;'
                    r'} else {'
                        r'all_vectors = false;'
                    r'}'
                r'}'
                r'return found_vector && !all_vectors;' # not all are vectors, but at least one is
            r'}', matches=2)
        '''

        # evaluator display
        self.replace("e.asValue=function(e,a){var r=e.getInstruction(a);switch(r.type){case t.Constant:return u(r.value);", "e.asValue=function(e,a,isVector){var r=e.getInstruction(a);switch(r.type){case t.Constant:var arr=u(r.value);if(isVector){return {\"vector\":arr};}else{return arr;}", matches=2)
        self.replace("return A.asValue(this,this.returnIndex)", "return A.asValue(this,this.returnIndex,this.instructions.length==1&&this.instructions[0].valueType==n.VectorOfNumber)", matches=2)
        self.replace("c.prototype.getEvaluationType=function(){var e=this.props.val();return\"string\"==typeof e?\"rgbcolor\":Array.isArray(e)?\"string\"==typeof e[0]?\"rgbcolor\":\"list\":this.getNumberLabel().type}", "c.prototype.getEvaluationType=function(){var e=this.props.val();if(e.vector)return \"vector\";return\"string\"==typeof e?\"rgbcolor\":Array.isArray(e)?\"string\"==typeof e[0]?\"rgbcolor\":\"list\":this.getNumberLabel().type}")

        self.insert_after_re(r'case (\w+)\.List:if\(0===\w\.length\)return \w\.EmptyList;var \w=(\w+)\.getInstruction\((\w+)\[0\]\)\.valueType;return (\w+)\.hasListType\(\w\)\?t\.listType\(\w\)\:\w\.ListOfAny;',
            r'case \2.Vector:'
                r'if (0 === \4.length) return \5.EmptyVector;'
            r'var i = \3.getInstruction(\4[0]).valueType;'
            r'return \5.hasVectorType(i) ? \5.vectorType(i) : t.VectorOfAny;', matches=2) # TODO: add VectorOfAny

        # TODO: add an icon that shows the item is a vector (like if you type f(x) it shows a squiggly line)

        # DEBUG TODO remove
        #self.insert_before(r'switch(R.type){', 'console.log("Parsing token", R.type, "type of R =", R);', matches=2)
        
        # TODO: support Vector parsing like @ :26552 and :26198. Error because of case on :26516 and :26386

        # XXX: add a truncatedHTMLLabel? see :20634

        #self.insert_after('E=o.initialPrec,f={trailingComma:!1};', 'console.log("THIS IS c:", c);console.log("THIS IS p:", p);', matches=2)
        
        self.insert_before(r'case t.List:if(0===c.args.length)return;var d=e.getInstruction', r'''
            case t.Vector:
                if (0 === c.args.length)
                    return;
                var d = e.getInstruction(c.args[0]).valueType;
                if (!a.hasVectorType(d))
                    throw r.vectorTypeError([a.prettyPrint(d)]);
                for (var h = 0, b = c.args; h < b.length; h++) {
                    l = b[h];
                    var m = e.getInstruction(l).valueType;
                    if (!a.hasVectorType(m))
                        throw r.vectorTypeError([a.prettyPrint(m)]);
                    if (m !== d)
                        throw r.heterogeneousList()
                }
                return;
        '''.replace('\n', ''), matches=2)

