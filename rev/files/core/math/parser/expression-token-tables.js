define('core/math/parser/expression-token-tables', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.allTokenTypes = e.rightTable = e.leftTable = e.escapedSymbolTable = e.symbolTable = e.commandTable = void 0;
    e.commandTable = {
        "\\lt": "<",
        "\\gt": ">",
        "\\le": "<=",
        "\\ge": ">=",
        "\\leq": "<=",
        "\\geq": ">=",
        "\\ldots": "...",
        "\\sim": "~",
        "\\to": "->",
        "\\cdot": "*",
        "\\times": "*",
        "\\div": "/",
        "\\ln": "Ln",
        "\\log": "Log",
        "\\int": "Int",
        "\\sum": "Sum",
        "\\prod": "Prod",
        "\\backslash": "Err",
        "\\for": "for"
    };
    for (var a = 0, l = ["sin", "cos", "tan", "cot", "sec", "csc"]; a < l.length; a++) {
        var o = l[a];
        e.commandTable["\\" + o] = "Trig",
        e.commandTable["\\" + o + "h"] = "Trig",
        e.commandTable["\\arc" + o] = "Trig",
        e.commandTable["\\arc" + o + "h"] = "Trig",
        e.commandTable["\\ar" + o + "h"] = "Trig"
    }
    e.symbolTable = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        "!": "!",
        "(": "(",
        ")": ")",
        "[": "[",
        "]": "]",
        ",": ",",
        "...": "...",
        ":": ":",
        "=": "=",
        ">=": ">=",
        "<=": "<=",
        ">": ">",
        "<": "<",
        "~": "~",
        ".": "."
    },
    e.escapedSymbolTable = {
        "\\{": "\\{",
        "\\}": "\\}",
        "\\%": "%"
    },
    e.leftTable = {
        "|": "(|",
        "\\{": "\\{",
        "[": "[",
        "(": "("
    },
    e.rightTable = {
        "|": "|)",
        "\\}": "\\}",
        "]": "]",
        ")": ")"
    },
    e.allTokenTypes = Object.keys({
        "+": !0,
        "-": !0,
        "*": !0,
        "/": !0,
        "!": !0,
        "(": !0,
        ")": !0,
        "\\{": !0,
        "\\}": !0,
        "(|": !0,
        "|)": !0,
        "[": !0,
        "]": !0,
        ",": !0,
        "...": !0,
        ":": !0,
        "=": !0,
        ">": !0,
        "<": !0,
        ">=": !0,
        "<=": !0,
        "->": !0,
        "~": !0,
        "%": !0,
        ".": !0,
        for: !0,
        Letter: !0,
        Decimal: !0,
        Cmd: !0,
        Differential: !0,
        End: !0,
        Trig: !0,
        Ln: !0,
        Log: !0,
        Int: !0,
        Sum: !0,
        Prod: !0,
        Err: !0
    })
});