define('basic/keypad/braille-example-row', ["require", "exports", "tslib", "dcgview", "dcgview-helpers/static-mathquill-view", "abraham", "loadcss!./braille-example-row"], function(require, e, t, r, l, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.BrailleExampleRow = void 0;
    var i = r.Components.For
      , a = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.template = function() {
            var e = this;
            return r.createElement("tr", null, r.createElement(i, {
                each: function() {
                    return e.getBrailleAscii(e.props.latex())
                },
                key: function(e) {
                    return e.key
                }
            }, r.createElement("td", null, function(e) {
                return r.createElement("span", {
                    class: r.const("dcg-key-press")
                }, function() {
                    return e.char
                })
            })), r.createElement("td", {
                class: r.const("dcg-braille-font")
            }, function() {
                return e.getBrailleUnicode(e.props.latex())
            }), r.createElement("td", null, r.createElement(l.default, {
                config: this.const({}),
                latex: function() {
                    return e.props.latex()
                }
            })))
        }
        ,
        a.prototype.getBrailleAscii = function(e) {
            for (var t = n.UnicodeBraille.toExpandedBrailleAscii(this.getBrailleUnicode(e)), r = [], l = 0; l < t.length; l++)
                r.push({
                    char: t[l],
                    key: l + ")" + t[l]
                });
            return r
        }
        ,
        a.prototype.getBrailleUnicode = function(e) {
            var t;
            return "nemeth" === this.props.brailleMode() ? t = n.latexToNemeth(e) : "ueb" === this.props.brailleMode() && (t = n.latexToUeb(e)),
            t && t.value ? t.value : ""
        }
        ,
        a
    }(r.Class);
    e.BrailleExampleRow = a
});
