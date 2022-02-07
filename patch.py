#!/usr/bin/env python3

import re

with open('calculator_desktop.min.js', 'r') as f:
    source = f.read()

def _check_needle(needle, matches=1):
    global source
    assert source.count(needle) == matches, 'Found needle %s %d times in the source (expecting matches=%d)' % (needle, source.count(needle), matches)

def _check_needle_re(needle, matches=1):
    global source
    needle = '(%s)' % needle
    count = len(re.findall(needle, source))
    assert count == matches, 'Found needle %s %d times in the source (expecting matches=%d)' % (needle, count, matches)

def insert_before(needle, data, **kwargs):
    global source
    _check_needle(needle, **kwargs)
    source = source.replace(needle, data + needle)

def insert_after(needle, data, **kwargs):
    global source
    _check_needle(needle, **kwargs)
    source = source.replace(needle, needle + data)


def replace(needle, data, **kwargs):
    global source
    _check_needle(needle, **kwargs)
    source = source.replace(needle, data)


def insert_before_re(needle, data, **kwargs):
    global source
    _check_needle_re(needle, **kwargs)
    source = re.sub('('+needle+')', data + r'\1', source)

def insert_after_re(needle, data, **kwargs):
    global source
    _check_needle_re(needle, **kwargs)
    source = re.sub('('+needle+')', r'\1' + data, source)



######



def patch_inject_init(code):
    # wrap in {  } so variables have limited scope
    insert_before('/*PATCH_INIT*/', '{ %s }' % code)


def patch_inject_onload(code):
    # wrap in {  } so variables have limited scope
    insert_before('/*PATCH_ONLOAD*/', '{ %s }' % code)



######


def disable_bugsnag():
    insert_after('sessions.bugsnag.com', '.example.com')
    insert_after('notify.bugsnag.com', '.example.com')


def inject_globals():
    insert_after_re('^var requirejs,require,define;', (
        'function PATCH_SHOW_TOAST(msg) {'
            # NOTE: You can find more events you can dispatch by searching for "e.prototype.handleDispatchedAction = function(e) {" in the rev js file
            "window.controller.dispatch({"
                'type: "toast/show",'
                'toast: {'
                    'message: msg,'
                    #'hideAfter: 0,'
                    'toastStyle: "cover"'
                "}"
            "})"
        '}'

        'var PATCH_INIT_RAN = false;'
        'function PATCH_INIT() {'
            'if (!PATCH_INIT_RAN) {'
                'console.log("Patching Desmos...");'
                'PATCH_INIT_RAN = true;'
                '/*PATCH_INIT*/'
            '}'
        '};'

        "window.addEventListener('load', function() {/*PATCH_ONLOAD*/}, false);")
    )
    insert_after_re(r'\S\.prototype\.setRootElt\=function\((\S)\)\{', r'window.controller=this;PATCH_INIT();')


def inject_neodesmos_banner():
    patch_inject_init(
        "var banner = document.createElement('div');"
        "banner.className = 'dcg-powered-by';"
        "banner.style.fontStyle = 'italic';"
        "banner.style.color = 'gray';"
        "banner.style.fontSize = 'smaller';"
        "banner.innerText = '(neodesmos enabled)';"
        "document.querySelector('span[class=dcg-noedit-branding]').prepend(banner);"
    )

    insert_before_re(r'\},\S\}\(\S\.Class\);\S\.DesmosSVGLogo=\S',
        ";"
        "var banner = document.createElement('h1');"
        "banner.style.display = 'inline';"
        "banner.style.verticalAlign = 'sub';"
        "banner.style.padding = '0';"
        "banner.style.margin = '0';"
        "banner.style.marginRight = '-0.2em';"
        "banner.innerText = 'neo';"
        "document.querySelector('div[class=dcg-header-desktop] > div[class=align-center-container]').prepend(banner);"
    )


def default_dark():
    patch_inject_init('controller.graphSettings.config.invertedColors = true;')


def support_inf():
    insert_before_re('(\S)\.infty=\S\.infin=\S\.infinity=', 'g.inf=') # TODO: convert to insert_before_re
    insert_after_re(r'var \S\="alpha beta ', 'inf ')


def support_nrt():
    insert_after_re(r'(\S).nthroot=(\S\S),', r'\2.nrt=\3,')
    insert_after_re(r'var \S\="alpha beta ', 'nrt ')


def support_degrees():
    # not fully implemented
    return False
    insert_after_re(r'(\S)\["√"\]\=function\(\)\{return new (\S\S)\("\\\\sqrt\{\}"\)\}', r',\2.deg=function(){return new \3("^{\\circ}")}')
    insert_after_re('var \S="alpha beta ', 'deg ')


def support_greek():
    letters = ["gamma", "delta", "zeta", "eta", "iota", "kappa", "mu", "nu", "xi", "rho", "sigma", "tau", "chi", "psi"]
    insert_after_re('var \S="alpha beta ', ''.join(letter + ' ' for letter in letters))


def support_vector_notation():
    # language
    insert_after('graphing-calculator-label-evaluation-list = { $count } element list\\n', 'graphing-calculator-label-evaluation-vector - { $dimension dimension vector }\\n')
    
    # rendering evaluation
    # TODO: add latex rendering of (x,y,z) as a vertical column of numbers here. See the fraction code :71880
    # TODO: support braille rendering. see code @ :71945
    insert_after_re(r'(\S)\.const\("dcg-evaluation-list"\)},function\(\)\{return\ \S\.controller\.(\S)\("graphing-calculator-label-evaluation-list",\{count:(\S)\.props\.val\(\)\.length}\)}\)},',
        # \2: n
        # \3: s
        # \4: e
        # NOTE: e.controller.s(a, b) finds string key a and formats with object b
        'vector: function() {'
            r'return \2.createElement("span", {'
                r'class: \2.const("dcg-evaluation-list")'
            r'}), function() {'
                r'return \4.controller.\3("graphing-calculator-label-evaluation-vector", {'
                    r'count: \4.props.val().length'
                r'})'
            r'}'
        '},'
        )

    # token->object
    insert_after_re(
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

    insert_after_re(r'case"Index":case"List":', 'case "Vector":', matches=2)
    insert_after_re(r'case"Sub":case"List":', 'case "Vector":', matches=1)
    insert_after_re(r'case t.List:return"List";', 'case t.Vector: return "Vector";', matches=2)
    insert_after_re(r'(\S).List=38,', r'\2.Vector=99,', matches=2) # XXX: this opcode could get taken sometime
    insert_after_re(r'(\S)\.prototype\.List=function\((\S)\)\{var n=(\S)\.List,r=(\S)\.getValueType\(this,n,t\);if\(t\.length>(\S)\)throw\ e\.maxListSize\(\S\.toLocaleString\(\)\);return this\.pushInstruction\(\{type:n,valueType:r,args:t}\)},', # :31133
            # \2: t
            # \3: t (func arg) # XXX: remove
            # \4: i
            # \5: c
            # \6: E
            r'\2.prototype.Vector = function(t) {'
                r'var n = \4.List,'
                    r'r = \5.getValueType(this, n, t);'
                r'if (t.length > \6) throw e.maxListSize(\6.toLocaleString());' # TODO: make own error msg
                r'if (t.length == 0) throw e.emptyVector(\6.toLocaleString());' # TODO: make own error msg
                'return this.pushInstruction({type: n, valueType: r, args: t});'
            r'},',
            matches=2
            )
    # TODO be sure to add :31919

    # add custom error message
    # r.emptyParen @ :21309
    insert_before_re(r'(\S)\.emptyParen=function\(\)\{return (\S)\((\S)\.(\S)',
        # \2: r
        # \3: e
        # \4: o
        # \5: s
        r'\2.emptyVector = function() {'
            r'return \3(\4.\5("shared-calculator-error-empty-vector"))'
        '},', matches=2)
    insert_before('\\nshared-calculator-error-empty-square-bracket =', '\\nshared-calculator-error-empty-vector = Vectors cannot be 0 dimensional')

    # initialize t.Vector
    insert_after_re(r'(\S)\.List=function\(n,t\)\{return\{type:"List",span:n,args:t}},',
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

    insert_after_re(r'(\S)\.And=function\(\S,\S\)\{return \S&&\S},',
        r'\2.Vector = function(r) {return r},',
        matches=2)

    insert_after_re(r'case"\[":return\ e=i\.advance\(e\),i\.isAt\(e,"]"\)\?v\(e=i\.advance\(e\),a\.List\(i\.spanStates\(F,e\),\[]\)\):\(e=\(o=j\(F,e=\(c=S\(e,N\)\)\.state,q=c\.tree,"\[","]"\)\)\.state,"Err"===\(q=o\.tree\)\.type\?v\(e,q\):v\(e,a\.List\(i\.spanStates\(F,e\),\[q]\)\)\);',

        'case "<":'
            'return e = i.advance(e),'
            'i.isAt(e, ">") ? v(e = i.advance(e), a.Vector(i.spanStates(F, e), [])) : (e = (o = j(F, e = (c = S(e, N)).state, q = c.tree, "<", ">")).state,'
            '"Err" === (q = o.tree).type ? v(e, q) : v(e, a.Vector(i.spanStates(F, e), [q])));',

        matches=2) # TODO make reliable

    insert_after_re(r'case"]":e=i\.advance\(e\);t=i\.spanStates\(r,e\);return\ v\(e,n\.Err\(t,n\.UnexpectedCloseDelimiter\("\[","]"\)\)\);',

        'case ">":'
            'e = i.advance(e);'
            't = i.spanStates(r, e);'
            'return v(e, n.Err(t, n.UnexpectedCloseDelimiter("<", ">")));',

        matches=2
            ) # TODO make reliable

    # add closing token
    insert_before(r'case"]":case"|)":case"Differential":', 'case ">":', matches=2)

    # disable error checking :26386
    insert_before(r'case">":case"<":case">="', '/*', matches=2)
    insert_before(r'case"<":case">=":case"<=":', '*/', matches=2)

    insert_after('.rightTable={', '">": ">",', matches=2)
    insert_after('.leftTable={', '"<": "<",', matches=2)

    # XXX: fix >
    replace('p.la(">"),p.la("<")', 'p.r(">"), p.l("<")', matches=2) # TODO add p.la(>) again!!!
    insert_after_re(r'p\.r\("\["\),p\.la\("\]"\),', r'p.r("<"), p.l(">"), ', matches=2) # TODO make reliable

    replace('throw"Unexpected surface node "+r.type+"."', 'console.error("unexp surf node 1, i hate", r);throw "Unexpected surface node #1 " + r.type + "."', matches=2)
    replace('!1;default:throw"Unexpected surface node "+e.type+"."', '!1;default:throw "Unexpected surface node #2 " + e.type + "."', matches=2)
    replace('d();default:throw"Unexpected surface node "+e.type+"."', 'd();default:throw "Unexpected surface node #3 " + e.type + "."', matches=2)

    insert_before_re(r"define\((\\)?'core/math/parsenode/list(\\)?'", '''
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

    #insert_before('r.parse=void 0,r.parse=function(r,l){', 'console.log("inc vector");e.Vector = require("core/math/parsenode/vector");console.log("done", e.Vector);', matches=2)
    insert_after('r.parseError=function(){', 'console.trace();', matches=2)
    insert_before('return r instanceof e?r:o.parseError()', 'console.error(r);', matches=2)
    #insert_after('t.Expression.prototype.analyze=function(e,t){', 'console.log("THIS IS e,t", e,t);', matches=2)
    
    insert_before('List:require("core/math/parsenode/list"),', 'Vector: require("core/math/parsenode/vector"),', matches=2)
    insert_after_re(r"(\\?)'core/math/parsenode/identifier(\\?)',(\\?)'core/math/parsenode/ans(\\?)',", "\"core/math/parsenode/vector\",", matches=2)

    insert_before(r'case"List":if(a.getDependencies().length>0)return g.List(B(e,a.args));', '''case "Vector":
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

    insert_after_re(r'(\S)\.EmptyList=11,', r'\2.EmptyVector=59,\2.VectorOfNumber=58,', matches=2) # XXX: 59 could exist in the future, assuming unused
    insert_after_re(r'(\S)\[\S\.EmptyList\]=(\S)\.Number,', r'\2[\3.EmptyVector] = \3.Number,\2[\3.VectorOfNumber] = \3.Number,', matches=2)
    insert_after_re(r'case (\S)\.EmptyList:return"EmptyList";', r'case \2.EmptyVector:return"EmptyVector";', matches=2)
    insert_after_re(r'case \S\.ListOfPolygon:case (\S)\.EmptyList:return!0;', r'case \2.EmptyVector:case \2.VectorOfNumber:', matches=2)
    insert_after_re(r'\){case (\S)\.EmptyList:case \S\.ListOfNumber:', r'case \2.EmptyVector:case \2.VectorOfNumber:', matches=2)
    insert_after_re(r'\S=\[(\S)\.Number,\S\.ListOfNumber,\S\.EmptyList', r', \2.EmptyVector, \2.VectorOfNumber', matches=2)
    # XXX: do we need :20169 @ return !(t !== e.EmptyList || !o(r)) || (!(r !== e.ListOfAny || !o(t)) || t  ... 
    insert_before_re(r'case (\S)\.EmptyList:return (\S)\.(\S)\("shared-calculator-label-value-type-empty-list',
        # \2: e
        # \3: t
        # \4: s
        r'case \2.EmptyVector:'
            r'return \3.\4("shared-calculator-label-value-type-empty-vector");'
        r'case \2.VectorOfNumber:'
            r'return \3.\4("shared-calculator-label-value-type-vector-of-number");', matches=2)
    insert_before('\\nshared-calculator-label-value-type-empty-list = ', '\\nshared-calculator-label-value-type-empty-vector = an empty vector\\nshared-calculator-label-value-type-vector-of-number = a vector')

    insert_before_re(r'(\S)\.listType=function\(\S\)\{switch', r'\2.vectorType = function(t) {'
            r'switch (t) {'
                r'case \2.Number: return \2.VectorOfNumber;'
                r'default: throw new Error("Invalid vector type #1: " + t);'
            r'}'
        r'},', matches=2)
    insert_before_re(r'(\S)\.hasListType=function\(\S\)\{switch', r'\2.hasVectorType = function(t) {'
            r'switch (t) {'
                r'case \2.Number: return !0;'
                r'default: throw new Error("Invalid vector type #2: " + t);'
            r'}'
        r'},', matches=2)

    insert_before_re(r'case (\S)\.Number:case \S\.ListOfNumber:return 0===s.length', r'case \2.VectorOfNumber:', matches=2)
    #insert_after('return i(e,r,n);case o.Number:case o.ListOfNumber:', 'case o.VectorOfNumber:')
    insert_after('case o.Distribution:case o.ListOfDistribution:case o.EmptyList:', 'case o.VectorOfNumber:', matches=2)

    #insert_after(r'},u(function(){', 'console.log("this",this,"e",e);debugger;', matches=1)
    # DEBUG TODO remove
    insert_after('e.valueToLatex=function e(a,i){', 'console.log("VALUETOLATEX:",a,i);debugger;', matches=2)
    insert_after('e.Polygon;function o(t){', 'console.log("matching type=",t);', matches=2)
    
    # DEBUG TODO remove
    #insert_before(r'switch(R.type){', 'console.log("Parsing token", R.type, "type of R =", R);', matches=2)
    
    # TODO: support Vector parsing like @ :26552 and :26198. Error because of case on :26516 and :26386

    # XXX: add a truncatedHTMLLabel? see :20634

    #insert_after('E=o.initialPrec,f={trailingComma:!1};', 'console.log("THIS IS c:", c);console.log("THIS IS p:", p);', matches=2)


######

features = [
    disable_bugsnag,
    inject_globals,

    inject_neodesmos_banner,
    default_dark,

    support_inf,
    support_nrt,

    #support_degrees,
    support_greek,

    support_vector_notation
]

for feature in features:
    print(f'Adding feature {feature.__name__}...')
    feature()

######

with open('calculator_desktop_patched.min.js', 'w') as f:
    f.write(source)
