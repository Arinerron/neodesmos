
define('core/math/parser/surface-node-error', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.UnexpectedFor = e.AdjacentNumbers = e.FractionEmpty = e.FractionMissingDenominator = e.FractionMissingNumerator = e.DifferentialWithSuperscript = e.IntegralMissingDifferential = e.DerivativeMissingBody = e.IntegralMissingBody = e.ProductMissingBody = e.SumMissingBody = e.IntegralMissingBound = e.MissingBound = e.ProductMissingBound = e.SumMissingBound = e.UnexpectedPrime = e.SuperscriptWithPrime = e.PrimeWithoutParen = e.PercentMissingOf = e.FunctionMissingArgument = e.UnexpectedSubscript = e.InvalidSubscript = e.InvalidOperatorName = e.UnrecognizedSymbol = e.UnexpectedDifferential = e.UnexpectedCloseDelimiter = e.MissingCloseDelimiter = e.UnaryOperatorMissingLeft = e.UnaryOperatorMissingRight = e.BinaryOperatorMissingLeft = e.BinaryOperatorMissingRight = e.UnexpectedEnd = e.EmptyRadicalIndex = e.EmptyPipe = e.EmptySquareBracket = e.EmptyRadical = e.EmptySuperscript = e.EmptySubscript = e.EmptyGroup = e.EmptyInput = e.UnexpectedParseError = e.Err = void 0,
    e.Err = function(e, n) {
        return {
            type: "Err",
            span: e,
            error: n
        }
    }
    ,
    e.UnexpectedParseError = function() {
        return {
            type: "UnexpectedParseError"
        }
    }
    ,
    e.EmptyInput = function() {
        return {
            type: "EmptyInput"
        }
    }
    ,
    e.EmptyGroup = function() {
        return {
            type: "EmptyGroup"
        }
    }
    ,
    e.EmptySubscript = function() {
        return {
            type: "EmptySubscript"
        }
    }
    ,
    e.EmptySuperscript = function() {
        return {
            type: "EmptySuperscript"
        }
    }
    ,
    e.EmptyRadical = function() {
        return {
            type: "EmptyRadical"
        }
    }
    ,
    e.EmptySquareBracket = function() {
        return {
            type: "EmptySquareBracket"
        }
    }
    ,
    e.EmptyPipe = function() {
        return {
            type: "EmptyPipe"
        }
    }
    ,
    e.EmptyRadicalIndex = function() {
        return {
            type: "EmptyRadicalIndex"
        }
    }
    ,
    e.UnexpectedEnd = function() {
        return {
            type: "UnexpectedEnd"
        }
    }
    ,
    e.BinaryOperatorMissingRight = function(e) {
        return {
            type: "BinaryOperatorMissingRight",
            val: e
        }
    }
    ,
    e.BinaryOperatorMissingLeft = function(e) {
        return {
            type: "BinaryOperatorMissingLeft",
            val: e
        }
    }
    ,
    e.UnaryOperatorMissingRight = function(e) {
        return {
            type: "UnaryOperatorMissingRight",
            val: e
        }
    }
    ,
    e.UnaryOperatorMissingLeft = function(e) {
        return {
            type: "UnaryOperatorMissingLeft",
            val: e
        }
    }
    ,
    e.MissingCloseDelimiter = function(e, n) {
        return {
            type: "MissingCloseDelimiter",
            open: e,
            close: n
        }
    }
    ,
    e.UnexpectedCloseDelimiter = function(e, n) {
        return {
            type: "UnexpectedCloseDelimiter",
            open: e,
            close: n
        }
    }
    ,
    e.UnexpectedDifferential = function() {
        return {
            type: "UnexpectedDifferential"
        }
    }
    ,
    e.UnrecognizedSymbol = function(e) {
        return {
            type: "UnrecognizedSymbol",
            val: e
        }
    }
    ,
    e.InvalidOperatorName = function(e) {
        return {
            type: "InvalidOperatorName",
            val: e
        }
    }
    ,
    e.InvalidSubscript = function(e) {
        return {
            type: "InvalidSubscript",
            val: e
        }
    }
    ,
    e.UnexpectedSubscript = function(e) {
        return {
            type: "UnexpectedSubscript",
            base: e
        }
    }
    ,
    e.FunctionMissingArgument = function(e) {
        return {
            type: "FunctionMissingArgument",
            val: e
        }
    }
    ,
    e.PercentMissingOf = function() {
        return {
            type: "PercentMissingOf"
        }
    }
    ,
    e.PrimeWithoutParen = function() {
        return {
            type: "PrimeWithoutParen"
        }
    }
    ,
    e.SuperscriptWithPrime = function() {
        return {
            type: "SuperscriptWithPrime"
        }
    }
    ,
    e.UnexpectedPrime = function() {
        return {
            type: "UnexpectedPrime"
        }
    }
    ,
    e.SumMissingBound = function() {
        return {
            type: "SumMissingBound"
        }
    }
    ,
    e.ProductMissingBound = function() {
        return {
            type: "ProductMissingBound"
        }
    }
    ,
    e.MissingBound = function() {
        return {
            type: "MissingBound"
        }
    }
    ,
    e.IntegralMissingBound = function() {
        return {
            type: "IntegralMissingBound"
        }
    }
    ,
    e.SumMissingBody = function() {
        return {
            type: "SumMissingBody"
        }
    }
    ,
    e.ProductMissingBody = function() {
        return {
            type: "ProductMissingBody"
        }
    }
    ,
    e.IntegralMissingBody = function() {
        return {
            type: "IntegralMissingBody"
        }
    }
    ,
    e.DerivativeMissingBody = function() {
        return {
            type: "DerivativeMissingBody"
        }
    }
    ,
    e.IntegralMissingDifferential = function() {
        return {
            type: "IntegralMissingDifferential"
        }
    }
    ,
    e.DifferentialWithSuperscript = function() {
        return {
            type: "DifferentialWithSuperscript"
        }
    }
    ,
    e.FractionMissingNumerator = function() {
        return {
            type: "FractionMissingNumerator"
        }
    }
    ,
    e.FractionMissingDenominator = function() {
        return {
            type: "FractionMissingDenominator"
        }
    }
    ,
    e.FractionEmpty = function() {
        return {
            type: "FractionEmpty"
        }
    }
    ,
    e.AdjacentNumbers = function(e) {
        return {
            type: "AdjacentNumbers",
            args: e
        }
    }
    ,
    e.UnexpectedFor = function() {
        return {
            type: "UnexpectedFor"
        }
    }
});