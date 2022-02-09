
define('core/math/errormsg', ["require", "exports", "core/math/parsenode/error", "core/lib/worker-i18n", "core/lib/label", "core/math/types"], function(require, r, e, o, n, t) {
    "use strict";
    function a(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-multiply-defined", {
            dependency: r
        }))
    }
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.variableLengthProductBodyDependsOnIndex = r.variableLengthSumBodyDependsOnIndex = r.variableLengthDistributionList = r.variableLengthTopLevelList = r.badListComprehensionInputDependency = r.shadowedListComprehensionInput = r.unexpectedForKeyword = r.listComprehensionIncorrectInput = r.listComprehensionInputListTypeError = r.matrixInvalidVariable = r.matrixElementTypeError = r.matrixPowerDimensions = r.matrixFractionalPower = r.matrixMultiplyDimensions = r.matrixSubtractDimensions = r.matrixAddDimensions = r.matrixAssignment = r.clickableObjectInvalidExpression = r.clickableObjectAssignmentNotIdentifier = r.clickableObjectAlreadyAssigned = r.clickableObjectAssignmentNotDefined = r.singularInverse = r.nonSquareInverse = r.nonSquareTrace = r.nonSquareDeterminant = r.fractionsUnavailable = r.featureUnavailable = r.pointsUnsupported = r.regressionsUnsupported = r.inequalitiesUnsupported = r.equationsUnsupported = r.functionDefinitionsUnsupported = r.assignmentsUnsupported = r.constantUnsupported = r.logbaseUnsupported = r.functionUnsupported = r.variablesUnsupported = r.ansUndefined = r.badSymbolContext = r.variableSeed = r.badSampleSize = r.ttestListTooShort = r.illegalBinWidth = r.percentMissingOf = r.badIntegralBoundDependency = r.shadowedIntegrationVariable = r.mismatchedBraces = r.derivativeMissingBody = r.integralMissingBody = r.productMissingBody = r.sumMissingBody = r.differentialWithSuperscript = r.integralMissingDifferential = r.integralMissingBound = r.badProductBoundDependency = r.badSumBoundDependency = r.incorrectProductLowerBound = r.incorrectSumLowerBound = r.productMissingBound = r.sumMissingBound = r.invalidHalfEmptyRange = r.nonArithmeticRange = r.functionFreeVariable = r.methodRequiresList = r.nonListParameterizedReducer = r.nonListDoubleReducer = r.optimizationError = r.invalidRegressionParameter = r.invalidDependentFirstTableColumn = r.invalidFirstTableColumn = r.invalidTableEntry = r.invalidTableHeader = r.distributionAsFunction = r.variableAsFunction = r.equationRequired = r.complicatedDoubleInequality = r.mismatchedDoubleInequality = r.invalidDoubleInequalityVariables = r.complicatedPolarImplicit = r.inequalitiesDisabled = r.implicitsDisabled = r.singleVariableImplicitEquationsDisabled = r.invalidImplicitVariables = r.invalidInequalityVariables = r.unplottablePolarFunction = r.invalidLHS = r.addArgumentsToDefinition = r.tooManyVariables = r.cdfMaxLessThanMin = r.cdfMaxInvalid = r.cdfMinInvalid = r.domainMaxLessThanMin = r.domainMaxInvalid = r.domainMinInvalid = r.sliderStepInvalid = r.sliderMaxLessThanMin = r.sliderMaxInvalid = r.sliderMinInvalid = r.sliderLimitReferencesExport = r.tickerMinStepNonNegativeNumber = r.selfReferentialFunction = r.cycle = r.shadowedIndex = r.multiplyDefinedByTables = r.multiplyDefined = r.cannotSubscript = r.cannotRedefine = r.parameterAlreadyDefined = r.functionNotDefined = r.blankExpression = r.colonMissingCondition = r.piecewisePartMissingCondition = r.piecewiseMissingCondition = r.inequalityChainTooLong = r.badLogExponent = r.badTrigExponent = r.emptyPipe = r.emptySquareBracket = r.emptyParen = r.emptyRadicalIndex = r.emptyRadical = r.primeWithoutParen = r.unexpectedPrime = r.superscriptWithPrime = r.unexpectedSubscript = r.invalidOperatorName = r.invalidSubscript = r.emptySuperscript = r.emptySubscript = r.fractionEmpty = r.fractionMissingDenominator = r.fractionMissingNumerator = r.unaryOperatorMissingRight = r.unaryOperatorMissingLeft = r.binaryOperatorMissingOperand = r.identifierAsFunction = r.adjacentNumbers = r.badImplicitCall = r.badTupleDimensions = r.malformedList = r.malformedPoint = r.zeroArgReducer = r.primedFunctionArity = r.wrongDoubleReducerArity = r.wrongParameterizedReducerArity = r.wrongArity = r.colorArity = r.randomFromBroadcastDistribution = r.randomArity = r.tdistWrongArity = r.cdfTooManyArguments = r.cdfRequiresArguments = r.pdfWrongArity = r.tooManyArguments = r.boxplotBreadthInvalid = r.boxplotOffsetInvalid = r.polygonTwoNumbersError = r.polygonPointArgsError = r.polygonListTypeError = r.maxListSize = r.deeplyNested = r.combineTypeError = r.heterogeneousList = r.eventHandlerTypeError = r.actionMergeFreeVariable = r.updateRuleLocalLHS = r.updateRuleFunctionLHS = r.updateRuleIllegalLHS = r.updateRuleUndefinedLHS = r.duplicateUpdateRules = r.updateRuleNonIdentifierLHS = r.updateRuleTypeError = r.regressionTypeError = r.tableEntryTypeError = r.tableHeaderTypeError = r.piecewiseBranchTypeError = r.piecewiseConditionTypeError = r.derivativeVariableTypeError = r.derivativeTypeError = r.integralArgumentTypeError = r.integralUpperBoundTypeError = r.integralLowerBoundTypeError = r.productArgumentTypeError = r.productInfiniteBoundError = r.productUpperBoundTypeError = r.productLowerBoundTypeError = r.sumArgumentTypeError = r.sumInfiniteBoundError = r.sumUpperBoundTypeError = r.sumLowerBoundTypeError = r.dotLHSTypeError = r.illegalDotCall = r.functionTypeError = r.orderedPairAccessTypeError = r.indexTypeError = r.pointTypeError = r.listTypeError = r.andTypeError = r.comparatorTypeError = r.negativeTypeError = r.exponentTypeError = r.divideTypeError = r.multiplyTypeError = r.subtractTypeError = r.addTypeError = r.unexpectedSymbol = r.unexpectedInequality = r.unrecognizedSymbol = r.parseError = void 0,
    r.parseError = function() {
        return e(o.s("shared-calculator-error-parse-error"))
    }
    ,
    r.unrecognizedSymbol = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-unrecognized-symbol", {
            symbol: r
        }))
    }
    ,
    r.unexpectedInequality = function() {
        return e(o.s("shared-calculator-error-unexpected-inequality"))
    }
    ,
    r.unexpectedSymbol = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-unexpected-symbol", {
            symbol: r
        }))
    }
    ,
    r.addTypeError = function(r) {
        return e(o.s("shared-calculator-error-add-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.subtractTypeError = function(r) {
        return e(o.s("shared-calculator-error-subtract-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.multiplyTypeError = function(r) {
        return e(o.s("shared-calculator-error-multiply-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.divideTypeError = function(r) {
        return e(o.s("shared-calculator-error-divide-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.exponentTypeError = function(r) {
        return e(o.s("shared-calculator-error-exponent-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.negativeTypeError = function(r) {
        return e(o.s("shared-calculator-error-negative-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.comparatorTypeError = function(r) {
        return e(o.s("shared-calculator-error-comparator-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.andTypeError = function(r) {
        return e(o.s("shared-calculator-error-and-type-error", {
            symbol: "and",
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.listTypeError = function(r) {
        return e(o.s("shared-calculator-error-list-type-error", {
            symbol1: r[0]
        })).allowExport()
    }
    ,
    r.pointTypeError = function(r) {
        return e(o.s("shared-calculator-error-point-type-error", {
            symbol1: r,
            symbol2: t.prettyPrint(t.Point)
        })).allowExport()
    }
    ,
    r.indexTypeError = function(r) {
        return e(o.s("shared-calculator-error-index-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.orderedPairAccessTypeError = function(r) {
        return e(o.s("shared-calculator-error-ordered-pair-access-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.functionTypeError = function(r, t) {
        switch (t.length) {
        case 1:
            return e(o.s("shared-calculator-error-function-type-error-1", {
                fn: n.formatSymbol(r),
                arg: t[0]
            })).allowExport();
        case 2:
            return e(o.s("shared-calculator-error-function-type-error-2", {
                fn: n.formatSymbol(r),
                arg1: t[0],
                arg2: t[1]
            })).allowExport();
        default:
            return e(o.s("shared-calculator-error-function-type-error-many", {
                fn: n.formatSymbol(r)
            })).allowExport()
        }
    }
    ,
    r.illegalDotCall = function(r) {
        return e(o.s("shared-calculator-error-illegal-dot-call", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.dotLHSTypeError = function(r, t) {
        return e(o.s("shared-calculator-error-dot-lhs-type-error", {
            symbol: n.formatSymbol(r),
            type: t
        })).allowExport()
    }
    ,
    r.sumLowerBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-sum-lower-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.sumUpperBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-sum-upper-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.sumInfiniteBoundError = function() {
        return e(o.s("shared-calculator-error-sum-infinite-bound-type-error"))
    }
    ,
    r.sumArgumentTypeError = function(r) {
        return e(o.s("shared-calculator-error-sum-argument-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.productLowerBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-product-lower-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.productUpperBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-product-upper-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.productInfiniteBoundError = function() {
        return e(o.s("shared-calculator-error-product-infinite-bound-type-error"))
    }
    ,
    r.productArgumentTypeError = function(r) {
        return e(o.s("shared-calculator-error-product-argument-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.integralLowerBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-integral-lower-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.integralUpperBoundTypeError = function(r) {
        return e(o.s("shared-calculator-error-integral-upper-bound-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.integralArgumentTypeError = function(r) {
        return e(o.s("shared-calculator-error-integral-argument-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.derivativeTypeError = function(r) {
        return e(o.s("shared-calculator-error-derivative-type-error", {
            symbol: r[0]
        })).allowExport()
    }
    ,
    r.derivativeVariableTypeError = function(r, t) {
        return e(o.s("shared-calculator-error-derivative-variable-type-error", {
            symbol1: n.formatSymbol(r),
            symbol2: t[0]
        }))
    }
    ,
    r.piecewiseConditionTypeError = function(r) {
        return e(o.s("shared-calculator-error-piecewise-condition-type-error", {
            symbol1: t.prettyPrint(t.Bool),
            symbol2: r[0]
        })).allowExport()
    }
    ,
    r.piecewiseBranchTypeError = function(r) {
        return e(o.s("shared-calculator-error-piecewise-branch-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.tableHeaderTypeError = function(r) {
        return e(o.s("shared-calculator-error-table-header-type-error", {
            symbol: r[0]
        }))
    }
    ,
    r.tableEntryTypeError = function(r) {
        return e(o.s("shared-calculator-error-table-entry-type-error", {
            symbol: r[0]
        }))
    }
    ,
    r.regressionTypeError = function(r) {
        return e(o.s("shared-calculator-error-regression-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        }))
    }
    ,
    r.updateRuleTypeError = function(r) {
        return e(o.s("shared-calculator-error-update-rule-type-error", {
            symbol: r
        }))
    }
    ,
    r.updateRuleNonIdentifierLHS = function() {
        return e(o.s("shared-calculator-error-update-rule-non-identifier-lhs", {
            arrow: "→",
            example: "a"
        }))
    }
    ,
    r.duplicateUpdateRules = function(r) {
        return e(o.s("shared-calculator-error-duplicate-update-rules", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.updateRuleUndefinedLHS = function(r) {
        return e(o.s("shared-calculator-error-update-rule-undefined-lhs", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.updateRuleIllegalLHS = function(r) {
        return e(o.s("shared-calculator-error-update-rule-illegal-lhs", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.updateRuleFunctionLHS = function(r) {
        return e(o.s("shared-calculator-error-update-rule-function-lhs", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.updateRuleLocalLHS = function(r) {
        return e(o.s("shared-calculator-error-update-rule-local-lhs", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.actionMergeFreeVariable = function(r) {
        var t = r.filter(function(r) {
            return "free" === r.scope
        }).map(function(r) {
            return r.symbol
        });
        return e(o.s("shared-calculator-error-action-merge-free-variable", {
            symbol: n.formatSymbol(t[0] || "")
        })).setDependencies(t).allowExport()
    }
    ,
    r.eventHandlerTypeError = function(r) {
        return e(o.s("shared-calculator-error-event-handler-type-error", {
            example: "a→a+1"
        }))
    }
    ,
    r.heterogeneousList = function() {
        return e(o.s("shared-calculator-error-heterogeneous-list")).allowExport()
    }
    ,
    r.combineTypeError = function(r) {
        return e(o.s("shared-calculator-error-combine-type-error", {
            symbol1: r[0],
            symbol2: r[1]
        })).allowExport()
    }
    ,
    r.deeplyNested = function() {
        return e(o.s("shared-calculator-error-deeply-nested")).allowExport()
    }
    ,
    r.maxListSize = function(r) {
        return e(o.s("shared-calculator-error-max-list-size", {
            maxListSize: r
        })).allowExport()
    }
    ,
    r.polygonListTypeError = function(r) {
        return e(o.s("shared-calculator-error-polygon-list-type-error", {
            type: r[0]
        }))
    }
    ,
    r.polygonPointArgsError = function() {
        return e(o.s("shared-calculator-error-polygon-point-args-error"))
    }
    ,
    r.polygonTwoNumbersError = function() {
        return e(o.s("shared-calculator-error-two-numbers-error"))
    }
    ,
    r.boxplotOffsetInvalid = function() {
        return e(o.s("shared-calculator-error-boxplot-offset-invalid"))
    }
    ,
    r.boxplotBreadthInvalid = function() {
        return e(o.s("shared-calculator-error-boxplot-breadth-invalid"))
    }
    ,
    r.tooManyArguments = function(r, n) {
        return e(o.s("shared-calculator-error-too-many-arguments", {
            symbol: r,
            max: n
        }))
    }
    ,
    r.pdfWrongArity = function() {
        var r = o.s("shared-calculator-error-pdf-wrong-arity-recommendation")
          , n = o.s("shared-calculator-error-pdf-wrong-arity", {
            recommendation: r
        });
        return e(n)
    }
    ,
    r.cdfRequiresArguments = function() {
        var r = o.s("shared-calculator-error-cdf-wrong-arity-recommendation")
          , n = o.s("shared-calculator-error-cdf-wrong-arity", {
            recommendation: r
        });
        return e(n)
    }
    ,
    r.cdfTooManyArguments = function() {
        var r = o.s("shared-calculator-error-cdf-too-many-arguments-recommendation")
          , n = o.s("shared-calculator-error-cdf-too-many-arguments", {
            recommendation: r
        });
        return e(n)
    }
    ,
    r.tdistWrongArity = function() {
        return e(o.s("shared-calculator-error-tdist-wrong-arity"))
    }
    ,
    r.randomArity = function() {
        return e(o.s("shared-calculator-error-random-arity"))
    }
    ,
    r.randomFromBroadcastDistribution = function() {
        return e(o.s("shared-calculator-error-random-from-broadcast-distribution"))
    }
    ,
    r.colorArity = function(r) {
        var t = "rgb" === r ? [150, 30, 100] : [180, .5, .5]
          , a = o.s("shared-calculator-error-color-arity-recommendation", {
            recommendation: n.formatSymbol(r) + "(" + t.join(", ") + ")"
        })
          , i = o.s("shared-calculator-error-color-arity", {
            symbol: r,
            recommendation: a
        });
        return e(i)
    }
    ,
    r.wrongArity = function(r, t, a, i) {
        var l, s;
        if (r = n.formatSymbol(r),
        1 === t)
            i || (i = r + "(x)"),
            s = o.s("shared-calculator-error-wrong-arity-supplement", {
                recommendation: i
            }),
            l = a > 1 ? o.s("shared-calculator-error-wrong-arity-single-arg-too-many", {
                dependency: r,
                supplement: s
            }) : o.s("shared-calculator-error-wrong-arity-single-arg-too-few", {
                dependency: r,
                supplement: s
            });
        else {
            var u = [];
            if (!i) {
                for (var c = 0; c < t; c++)
                    u[c] = c + 1;
                i = n.formatSymbol(r) + "(" + u.join(", ") + ")"
            }
            s = o.s("shared-calculator-error-wrong-arity-supplement", {
                recommendation: i
            }),
            l = o.s("shared-calculator-error-wrong-arity-many-arg", {
                dependency: r,
                assignment_arity: t,
                supplement: s
            })
        }
        return e(l)
    }
    ,
    r.wrongParameterizedReducerArity = function(r) {
        return e(o.s("shared-calculator-error-wrong-two-arg-arity", {
            symbol: n.formatSymbol(r),
            recommendation: n.formatSymbol(r) + "([1,2,3], 1)"
        }))
    }
    ,
    r.wrongDoubleReducerArity = function(r) {
        return e(o.s("shared-calculator-error-wrong-two-arg-arity", {
            symbol: n.formatSymbol(r),
            recommendation: n.formatSymbol(r) + "([1,2,3], [3,2,1])"
        }))
    }
    ,
    r.primedFunctionArity = function() {
        return e(o.s("shared-calculator-error-primed-function-arity"))
    }
    ,
    r.zeroArgReducer = function(r) {
        return e(o.s("shared-calculator-error-zero-arg-reducer", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.malformedPoint = function() {
        return e(o.s("shared-calculator-error-malformed-point"))
    }
    ,
    r.malformedList = function() {
        return e(o.s("shared-calculator-error-malformed-list"))
    }
    ,
    r.badTupleDimensions = function(r) {
        return e(o.s("shared-calculator-error-bad-tuple-dimensions", {
            symbol: r
        }))
    }
    ,
    r.badImplicitCall = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-bad-implicit-call", {
            symbol: r
        }))
    }
    ,
    r.adjacentNumbers = function(r, n) {
        return e(o.s("shared-calculator-error-adjacent-numbers", {
            left: r,
            right: n
        }))
    }
    ,
    r.identifierAsFunction = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-identifier-as-function", {
            symbol: r
        }))
    }
    ,
    r.binaryOperatorMissingOperand = function(r) {
        return "%" === (r = n.formatSymbol(r)) && (r = "% of"),
        e(o.s("shared-calculator-error-binary-operator-missing-operand", {
            symbol: r
        }))
    }
    ,
    r.unaryOperatorMissingLeft = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-unary-operator-missing-left", {
            symbol: r
        }))
    }
    ,
    r.unaryOperatorMissingRight = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-unary-operator-missing-right", {
            symbol: r
        }))
    }
    ,
    r.fractionMissingNumerator = function() {
        return e(o.s("shared-calculator-error-fraction-missing-numerator"))
    }
    ,
    r.fractionMissingDenominator = function() {
        return e(o.s("shared-calculator-error-fraction-missing-denominator"))
    }
    ,
    r.fractionEmpty = function() {
        return e(o.s("shared-calculator-error-fraction-empty"))
    }
    ,
    r.emptySubscript = function() {
        return e(o.s("shared-calculator-error-empty-subscript"))
    }
    ,
    r.emptySuperscript = function() {
        return e(o.s("shared-calculator-error-empty-superscript"))
    }
    ,
    r.invalidSubscript = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-invalid-subscript", {
            symbol: r
        }))
    }
    ,
    r.invalidOperatorName = function() {
        return e(o.s("shared-calculator-error-invalid-operator-name"))
    }
    ,
    r.unexpectedSubscript = function() {
        return e(o.s("shared-calculator-error-unexpected-subscript"))
    }
    ,
    r.superscriptWithPrime = function() {
        return e(o.s("shared-calculator-error-superscript-with-prime"))
    }
    ,
    r.unexpectedPrime = function() {
        return e(o.s("shared-calculator-error-unexpected-prime"))
    }
    ,
    r.primeWithoutParen = function() {
        return e(o.s("shared-calculator-error-prime-without-paren"))
    }
    ,
    r.emptyRadical = function() {
        return e(o.s("shared-calculator-error-empty-radical"))
    }
    ,
    r.emptyRadicalIndex = function() {
        return e(o.s("shared-calculator-error-empty-radical-index"))
    }
    ,
    r.emptyParen = function() {
        return e(o.s("shared-calculator-error-empty-paren"))
    }
    ,
    r.emptySquareBracket = function() {
        return e(o.s("shared-calculator-error-empty-square-bracket"))
    }
    ,
    r.emptyPipe = function() {
        return e(o.s("shared-calculator-error-empty-pipe"))
    }
    ,
    r.badTrigExponent = function(r) {
        var n = r + "^2"
          , t = r + "^-1";
        return e(o.s("shared-calculator-error-bad-trig-exponent", {
            form1: n,
            form2: t
        }))
    }
    ,
    r.badLogExponent = function(r) {
        var n = r + "^2";
        return e(o.s("shared-calculator-error-bad-log-exponent", {
            form: n
        }))
    }
    ,
    r.inequalityChainTooLong = function() {
        return e(o.s("shared-calculator-error-inequality-chain-too-long"))
    }
    ,
    r.piecewiseMissingCondition = function() {
        return e(o.s("shared-calculator-error-piecewise-missing-condition"))
    }
    ,
    r.piecewisePartMissingCondition = function() {
        return e(o.s("shared-calculator-error-piecewise-part-missing-condition"))
    }
    ,
    r.colonMissingCondition = function() {
        return e(o.s("shared-calculator-error-colon-missing-condition"))
    }
    ,
    r.blankExpression = function() {
        return e(o.s("shared-calculator-error-blank-expression"))
    }
    ,
    r.functionNotDefined = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-function-not-defined", {
            dependency: r
        }))
    }
    ,
    r.parameterAlreadyDefined = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-parameter-already-defined", {
            dependency: r
        }))
    }
    ,
    r.cannotRedefine = function(r, t) {
        return r = n.formatSymbol(r),
        e(void 0 === t ? o.s("shared-calculator-error-cannot-redefine", {
            symbol: r
        }) : o.s("shared-calculator-error-cannot-redefine-root", {
            symbol: r,
            symbolRoot: t
        }))
    }
    ,
    r.cannotSubscript = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-cannot-subscript", {
            symbol: r
        }))
    }
    ,
    r.multiplyDefined = a,
    r.multiplyDefinedByTables = function(r) {
        var e = a(r);
        return e.isMultiplyDefinedByTables = !0,
        e
    }
    ,
    r.shadowedIndex = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-shadowed-index", {
            symbol: r
        }))
    }
    ,
    r.cycle = function(r) {
        var t = (r = r.map(n.formatSymbol)).pop() || "";
        return e(o.s("shared-calculator-error-dependency-cycle", {
            symbols: r.join("', '"),
            lastSymbol: t
        }))
    }
    ,
    r.selfReferentialFunction = function(r) {
        return e(o.s("shared-calculator-error-self-referential-function", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.tickerMinStepNonNegativeNumber = function() {
        return e(o.s("shared-calculator-error-ticker-min-step-nonnegative"))
    }
    ,
    r.sliderLimitReferencesExport = function(r) {
        return e(o.s("shared-calculator-error-slider-limit-references-export", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.sliderMinInvalid = function() {
        return e(o.s("shared-calculator-error-slider-min-invalid"))
    }
    ,
    r.sliderMaxInvalid = function() {
        return e(o.s("shared-calculator-error-slider-max-invalid"))
    }
    ,
    r.sliderMaxLessThanMin = function() {
        return e(o.s("shared-calculator-error-slider-max-less-than-min"))
    }
    ,
    r.sliderStepInvalid = function() {
        return e(o.s("shared-calculator-error-slider-step-invalid"))
    }
    ,
    r.domainMinInvalid = function() {
        return e(o.s("shared-calculator-error-domain-min-invalid"))
    }
    ,
    r.domainMaxInvalid = function() {
        return e(o.s("shared-calculator-error-domain-max-invalid"))
    }
    ,
    r.domainMaxLessThanMin = function() {
        return e(o.s("shared-calculator-error-domain-max-less-than-min"))
    }
    ,
    r.cdfMinInvalid = function() {
        return e(o.s("shared-calculator-error-cdf-min-invalid"))
    }
    ,
    r.cdfMaxInvalid = function() {
        return e(o.s("shared-calculator-error-cdf-max-invalid"))
    }
    ,
    r.cdfMaxLessThanMin = function() {
        return e(o.s("shared-calculator-error-cdf-max-less-than-min"))
    }
    ,
    r.tooManyVariables = function(r) {
        if (0 === (r = r.map(n.formatSymbol)).length)
            return e(o.s("shared-calculator-error-too-many-variables-no-symbols"));
        var t = r.pop() || "";
        return r.length > 0 ? e(o.s("shared-calculator-error-too-many-variables-many-symbols", {
            variables: r.join("', '"),
            lastVariable: t
        })) : e(o.s("shared-calculator-error-too-many-variables-one-symbol", {
            variable: t
        }))
    }
    ,
    r.addArgumentsToDefinition = function(r, t, a) {
        r = r.map(n.formatSymbol);
        var i = (t = n.formatSymbol(t)) + "(" + (a = a.map(n.formatSymbol)).join(",") + "," + r.join(",") + ")"
          , l = r.pop() || ""
          , s = {
            symbols: r.join("', '"),
            lastSymbol: l,
            newSignature: i
        };
        return r.length ? e(o.s("shared-calculator-error-add-arguments-to-definition-many", s)) : e(o.s("shared-calculator-error-add-arguments-to-definition-one", s))
    }
    ,
    r.invalidLHS = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-invalid-lhs", {
            symbol: r
        }))
    }
    ,
    r.unplottablePolarFunction = function() {
        return e(o.s("shared-calculator-error-unplottable-polar-function"))
    }
    ,
    r.invalidInequalityVariables = function() {
        return e(o.s("shared-calculator-error-invalid-inequality-variables"))
    }
    ,
    r.invalidImplicitVariables = function() {
        return e(o.s("shared-calculator-error-invalid-implicit-variables"))
    }
    ,
    r.singleVariableImplicitEquationsDisabled = function() {
        return e(o.s("shared-calculator-error-single-variable-implicit-equations-disabled"))
    }
    ,
    r.implicitsDisabled = function() {
        return e(o.s("shared-calculator-error-implicits-disabled"))
    }
    ,
    r.inequalitiesDisabled = function() {
        return e(o.s("shared-calculator-error-inequalities-disabled"))
    }
    ,
    r.complicatedPolarImplicit = function() {
        return e(o.s("shared-calculator-error-complicated-polar-implicit"))
    }
    ,
    r.invalidDoubleInequalityVariables = function() {
        return e(o.s("shared-calculator-error-invalid-double-inequality-variables"))
    }
    ,
    r.mismatchedDoubleInequality = function() {
        return e(o.s("shared-calculator-error-mismatched-double-inequality", {
            example: "1 < y < 2"
        }))
    }
    ,
    r.complicatedDoubleInequality = function() {
        return e(o.s("shared-calculator-error-complicated-double-inequality"))
    }
    ,
    r.equationRequired = function(r) {
        return r ? (r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-equation-required-symbol", {
            lhs: r + "="
        }))) : e(o.s("shared-calculator-error-equation-required"))
    }
    ,
    r.variableAsFunction = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-variable-as-function", {
            dependency: r
        }))
    }
    ,
    r.distributionAsFunction = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-distribution-as-function", {
            symbol: r
        }))
    }
    ,
    r.invalidTableHeader = function(r) {
        return e(o.s("shared-calculator-error-invalid-table-header", {
            supplement: r
        }))
    }
    ,
    r.invalidTableEntry = function(r) {
        return e(o.s("shared-calculator-error-invalid-table-entry", {
            supplement: r
        }))
    }
    ,
    r.invalidFirstTableColumn = function() {
        return e(o.s("shared-calculator-error-invalid-first-table-column", {
            most: "'y', 'r',",
            last: "'θ'"
        }))
    }
    ,
    r.invalidDependentFirstTableColumn = function() {
        return e(o.s("shared-calculator-error-invalid-dependent-first-table-column"))
    }
    ,
    r.invalidRegressionParameter = function(r) {
        return e(o.s("shared-calculator-error-invalid-regression-parameter", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.optimizationError = function() {
        return e(o.s("shared-calculator-error-optimization-error"))
    }
    ,
    r.nonListDoubleReducer = function(r) {
        return e(o.s("shared-calculator-error-non-list-double-reducer", {
            symbol: n.formatSymbol(r),
            recommendation: n.formatSymbol(r) + "([1,2,3], [3,2,1])"
        })).allowExport()
    }
    ,
    r.nonListParameterizedReducer = function(r) {
        return e(o.s("shared-calculator-error-non-list-parameterized-reducer", {
            symbol: n.formatSymbol(r),
            recommendation: n.formatSymbol(r) + "([1,2,3], 1)"
        })).allowExport()
    }
    ,
    r.methodRequiresList = function(r) {
        return e(o.s("shared-calculator-error-method-requires-list", {
            symbol: n.formatSymbol(r),
            recommendation: n.formatSymbol(r) + "([1,2,3])"
        })).allowExport()
    }
    ,
    r.functionFreeVariable = function(r, n) {
        return e(o.s("shared-calculator-error-variable-function-free-variable", {
            functionSymbol: r,
            variableSymbol: n
        })).allowExport()
    }
    ,
    r.nonArithmeticRange = function() {
        return e(o.s("shared-calculator-error-non-arithmetic-range")).allowExport()
    }
    ,
    r.invalidHalfEmptyRange = function() {
        return e(o.s("shared-calculator-error-invalid-half-empty-range"))
    }
    ,
    r.sumMissingBound = function() {
        return e(o.s("shared-calculator-error-sum-missing-bound"))
    }
    ,
    r.productMissingBound = function() {
        return e(o.s("shared-calculator-error-product-missing-bound"))
    }
    ,
    r.incorrectSumLowerBound = function() {
        return e(o.s("shared-calculator-error-incorrect-sum-lower-bound"))
    }
    ,
    r.incorrectProductLowerBound = function() {
        return e(o.s("shared-calculator-error-incorrect-product-lower-bound"))
    }
    ,
    r.badSumBoundDependency = function(r) {
        return e(o.s("shared-calculator-error-bad-sum-bound-dependency", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.badProductBoundDependency = function(r) {
        return e(o.s("shared-calculator-error-bad-product-bound-dependency", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.integralMissingBound = function() {
        return e(o.s("shared-calculator-error-integral-missing-bound"))
    }
    ,
    r.integralMissingDifferential = function() {
        return e(o.s("shared-calculator-error-integral-missing-differential"))
    }
    ,
    r.differentialWithSuperscript = function() {
        return e(o.s("shared-calculator-error-differential-with-superscript"))
    }
    ,
    r.sumMissingBody = function() {
        return e(o.s("shared-calculator-error-sum-missing-body"))
    }
    ,
    r.productMissingBody = function() {
        return e(o.s("shared-calculator-error-product-missing-body"))
    }
    ,
    r.integralMissingBody = function() {
        return e(o.s("shared-calculator-error-integral-missing-body"))
    }
    ,
    r.derivativeMissingBody = function() {
        return e(o.s("shared-calculator-error-derivative-missing-body"))
    }
    ,
    r.mismatchedBraces = function(r, t) {
        return r = n.formatSymbol(r),
        t = n.formatSymbol(t),
        e(o.s("shared-calculator-error-mismatched-braces", {
            symbol1: r,
            symbol2: t
        }))
    }
    ,
    r.shadowedIntegrationVariable = function(r) {
        return e(o.s("shared-calculator-error-shadowed-integration-variable", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.badIntegralBoundDependency = function(r) {
        return e(o.s("shared-calculator-error-bad-integral-bound-dependency", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.percentMissingOf = function() {
        return e(o.s("shared-calculator-error-percent-missing-of"))
    }
    ,
    r.illegalBinWidth = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-illegal-bin-width", {
            symbol: r
        }))
    }
    ,
    r.ttestListTooShort = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-ttest-list-too-short", {
            symbol: r
        }))
    }
    ,
    r.badSampleSize = function() {
        return e(o.s("shared-calculator-error-bad-sample-size"))
    }
    ,
    r.variableSeed = function(r) {
        return e(o.s("shared-calculator-error-variable-seed", {
            symbol: n.formatSymbol(r[0].symbol)
        })).setDependencies(r.filter(function(r) {
            return "free" === r.scope
        }).map(function(r) {
            return r.symbol
        })).allowExport()
    }
    ,
    r.badSymbolContext = function(r) {
        return e(o.s("shared-calculator-error-bad-symbol-context", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.ansUndefined = function() {
        return e(o.s("shared-calculator-error-ans-undefined"))
    }
    ,
    r.variablesUnsupported = function(r) {
        return e(o.s("shared-calculator-error-variables-unsupported", {
            variable: n.formatSymbol(r)
        }))
    }
    ,
    r.functionUnsupported = function(r) {
        return e(o.s("shared-calculator-error-function-unsupported", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.logbaseUnsupported = function() {
        return e(o.s("shared-calculator-error-logbase-unsupported"))
    }
    ,
    r.constantUnsupported = function(r) {
        return e(o.s("shared-calculator-error-constant-unsupported", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.assignmentsUnsupported = function() {
        return e(o.s("shared-calculator-error-assignments-unsupported"))
    }
    ,
    r.functionDefinitionsUnsupported = function() {
        return e(o.s("shared-calculator-error-function-definition-unsupported"))
    }
    ,
    r.equationsUnsupported = function() {
        return e(o.s("shared-calculator-error-equations-unsupported"))
    }
    ,
    r.inequalitiesUnsupported = function() {
        return e(o.s("shared-calculator-error-inequalities-unsupported"))
    }
    ,
    r.regressionsUnsupported = function() {
        return e(o.s("shared-calculator-error-regressions-unsupported"))
    }
    ,
    r.pointsUnsupported = function() {
        return e(o.s("shared-calculator-error-points-unsupported"))
    }
    ,
    r.featureUnavailable = function() {
        return e(o.s("shared-calculator-error-feature-unavailable"))
    }
    ,
    r.fractionsUnavailable = function() {
        return e(o.s("basic-calculator-error-fractions-unavailable"))
    }
    ,
    r.nonSquareDeterminant = function() {
        return e(o.s("shared-calculator-error-non-square-determinant"))
    }
    ,
    r.nonSquareTrace = function() {
        return e(o.s("shared-calculator-error-non-square-trace"))
    }
    ,
    r.nonSquareInverse = function() {
        return e(o.s("shared-calculator-error-non-square-inverse"))
    }
    ,
    r.singularInverse = function() {
        return e(o.s("shared-calculator-error-non-singular-inverse"))
    }
    ,
    r.clickableObjectAssignmentNotDefined = function(r) {
        return e(o.s("shared-calculator-error-clickable-object-assignment-not-defined", {
            symbol: r
        }))
    }
    ,
    r.clickableObjectAlreadyAssigned = function(r) {
        return e(o.s("shared-calculator-error-multiply-defined", {
            dependency: r
        }))
    }
    ,
    r.clickableObjectAssignmentNotIdentifier = function() {
        return e(o.s("shared-calculator-error-clickable-object-assignment-not-identifier"))
    }
    ,
    r.clickableObjectInvalidExpression = function() {
        return e(o.s("shared-calculator-error-clickable-object-invalid-expression"))
    }
    ,
    r.matrixAssignment = function() {
        return e(o.s("shared-calculator-error-matrix-assignment"))
    }
    ,
    r.matrixAddDimensions = function() {
        return e(o.s("shared-calculator-error-matrix-add-dimensions"))
    }
    ,
    r.matrixSubtractDimensions = function() {
        return e(o.s("shared-calculator-error-matrix-subtract-dimensions"))
    }
    ,
    r.matrixMultiplyDimensions = function() {
        return e(o.s("shared-calculator-error-matrix-multiply-dimensions"))
    }
    ,
    r.matrixFractionalPower = function() {
        return e(o.s("shared-calculator-error-matrix-fractional-power"))
    }
    ,
    r.matrixPowerDimensions = function() {
        return e(o.s("shared-calculator-error-matrix-power-dimensions"))
    }
    ,
    r.matrixElementTypeError = function(r) {
        return e(o.s("shared-calculator-error-matrix-element-type-error", {
            arg: r[0]
        }))
    }
    ,
    r.matrixInvalidVariable = function(r) {
        return e(o.s("shared-calculator-error-matrix-invalid-variable", {
            symbol: n.formatSymbol(r)
        }))
    }
    ,
    r.listComprehensionInputListTypeError = function(r, n) {
        return e(o.s("shared-calculator-error-list-comprehension-input-type-error", {
            identifier: r,
            actual: n
        }))
    }
    ,
    r.listComprehensionIncorrectInput = function() {
        return e(o.s("shared-calculator-error-incorrect-list-comprehension-input"))
    }
    ,
    r.unexpectedForKeyword = function() {
        return e(o.s("shared-calculator-error-unexpected-for-keyword"))
    }
    ,
    r.shadowedListComprehensionInput = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-shadowed-list-comprehension-input", {
            symbol: r
        }))
    }
    ,
    r.badListComprehensionInputDependency = function(r) {
        return r = n.formatSymbol(r),
        e(o.s("shared-calculator-error-bad-list-comprehension-input-dependency", {
            symbol: r
        }))
    }
    ,
    r.variableLengthTopLevelList = function(r) {
        var t = r.filter(function(r) {
            return "free" === r.scope
        }).map(function(r) {
            return r.symbol
        });
        return e(o.s("shared-calculator-error-variable-length-top-level-list", {
            symbol: n.formatSymbol(t[0] || "")
        })).setDependencies(t).allowExport()
    }
    ,
    r.variableLengthDistributionList = function(r) {
        return e(o.s("shared-calculator-error-variable-length-distribution-list", {
            symbol: r[0].symbol
        })).setDependencies(r.filter(function(r) {
            return "free" === r.scope
        }).map(function(r) {
            return r.symbol
        }))
    }
    ,
    r.variableLengthSumBodyDependsOnIndex = function(r) {
        return e(o.s("shared-calculator-error-variable-length-sum-body-depends-on-index", {
            symbol: r
        }))
    }
    ,
    r.variableLengthProductBodyDependsOnIndex = function(r) {
        return e(o.s("shared-calculator-error-variable-length-product-body-depends-on-index", {
            symbol: r
        }))
    }
});