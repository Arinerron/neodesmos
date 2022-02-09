
define('mathquill', ['require', 'browser', 'jquery', 'toplevel/mathquill', 'main/mathquill-operators'], function(require) {
    "use strict";
    var t = require("browser")
      , e = require("jquery")
      , r = require("toplevel/mathquill").getInterface(1)
      , a = require("main/mathquill-operators");
    return r.config({
        leftRightIntoCmdGoes: "up",
        sumStartsWithNEquals: !0,
        supSubsRequireOperand: !0,
        charsThatBreakOutOfSupSub: "+-=<>*",
        autoCommands: a.getAutoCommands(),
        autoSubscriptNumerals: !0,
        restrictMismatchedBrackets: !0,
        typingPercentWritesPercentOf: !0,
        substituteTextarea: function() {
            return t.IS_IOS || t.IS_ANDROID ? e('<span class="dcg-mathquill-input-span" tabindex=0 role="textbox" style="display:inline-block;height:1px;width:1px">')[0] : t.IS_WINDOWS && t.IS_TOUCH ? e("<textarea readonly>").on("keydown", function() {
                this.readOnly = !1,
                this.select()
            }).on("blur", function() {
                this.readOnly = !0
            })[0] : e("<textarea>")[0]
        },
        autoOperatorNames: a.getAutoOperators(),
        quietEmptyDelimiters: "( [",
        resetCursorOnBlur: !0,
        enableDigitGrouping: !0,
        disableAutoSubstitutionInSubscripts: !0
    })
});