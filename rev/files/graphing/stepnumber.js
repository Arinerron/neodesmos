define('graphing/stepnumber', ['require', 'pjs', './svg-classes'], function(require) {
    "use strict";
    var t = require("pjs")
      , s = require("./svg-classes")
      , i = document.createElement("canvas").getContext("2d")
      , e = t(function(t) {
        t.init = function(t, s) {
            this._label = t,
            this._fontSize = s,
            this._layout = this._computeLayout(t, s)
        }
        ,
        t._computeLayout = function(t, s) {
            var a = {};
            return t.superscript ? (a.mantissa_height = s,
            e.setCtxFontSize(i, a.mantissa_height),
            a.mantissa_width = i.measureText(t.mantissa).width,
            a.superscript_height = Math.round(.8 * s),
            e.setCtxFontSize(i, a.superscript_height),
            a.superscript_width = i.measureText(t.superscript).width,
            a.mantissa_x = 0,
            a.mantissa_y = s / 5,
            a.superscript_x = a.mantissa_width / 2 + a.superscript_width / 2,
            a.superscript_y = -s / 4,
            a.top = a.superscript_y - a.superscript_height / 2,
            a.bottom = a.mantissa_y + a.mantissa_height / 2,
            a.left = a.mantissa_x - a.mantissa_width / 2,
            a.right = a.superscript_x + a.superscript_width / 2) : (a.mantissa_height = s,
            e.setCtxFontSize(i, s),
            a.mantissa_width = i.measureText(t.string).width,
            a.mantissa_x = 0,
            a.mantissa_y = 0,
            a.top = a.mantissa_y - a.mantissa_height / 2,
            a.bottom = a.mantissa_y + a.mantissa_height / 2,
            a.left = a.mantissa_x - a.mantissa_width / 2,
            a.right = a.mantissa_x + a.mantissa_width / 2),
            a
        }
        ,
        t.getRect = function() {
            return this.getRectWhenCenteredAt({
                x: 0,
                y: 0
            })
        }
        ,
        t.getRectWhenCenteredAt = function(t) {
            return {
                left: this._layout.left + t.x,
                right: this._layout.right + t.x,
                top: this._layout.top + t.y,
                bottom: this._layout.bottom + t.y
            }
        }
        ,
        t.getWidth = function() {
            return this._layout.right - this._layout.left
        }
        ,
        t.getHeight = function() {
            return this._layout.bottom - this._layout.top
        }
        ,
        t.clampBoundsWithinRect = function(t, s) {
            var i = {};
            return t.x + this._layout.left < s.left ? i.x = s.left - this._layout.left : t.x + this._layout.right > s.right ? i.x = s.right - this._layout.right : i.x = t.x,
            t.y + this._layout.top < s.top ? i.y = s.top - this._layout.top : t.y + this._layout.bottom > s.bottom ? i.y = s.bottom - this._layout.bottom : i.y = t.y,
            i
        }
        ,
        t.getValue = function() {
            return this._label.value
        }
        ,
        t.getMinusWidth = function() {
            return this.getValue() < 0 ? (e.setCtxFontSize(i, this._fontSize),
            i.measureText("-1").width - i.measureText("1").width) : 0
        }
        ,
        t.getString = function() {
            return this._label.superscript ? this._label.mantissa + "^" + this._label.superscript : this._label.string
        }
        ,
        t.drawCenteredAt = function(t, i, a) {
            var n = i.x
              , r = e.computeBaselineFromCenter(i.y, this._fontSize);
            a && s.save(t, a),
            t.save(),
            a && s.restore(t),
            e.setCtxFontSize(t, this._fontSize),
            this._label.superscript ? (t.strokeText(this._label.mantissa, this._layout.mantissa_x + n, this._layout.mantissa_y + r),
            t.strokeText(this._label.superscript, this._layout.superscript_x + n, this._layout.superscript_y + r),
            t.fillText(this._label.mantissa, this._layout.mantissa_x + n, this._layout.mantissa_y + r),
            t.fillText(this._label.superscript, this._layout.superscript_x + n, this._layout.superscript_y + r)) : (t.strokeText(this._label.string, this._layout.mantissa_x + n, this._layout.mantissa_y + r),
            t.fillText(this._label.string, this._layout.mantissa_x + n, this._layout.mantissa_y + r)),
            t.restore()
        }
    });
    return e.computeBaselineFromCenter = function(t, s) {
        return t + .272 * s
    }
    ,
    e.setCtxFontSize = function(t, s) {
        t.font = s + "px Arial",
        t.textAlign = "center"
    }
    ,
    e
});