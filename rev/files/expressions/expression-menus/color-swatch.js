define('expressions/expression-menus/color-swatch', ["require", "exports", "lib/color-distance", "tslib", "dcgview", "loadcss!./color-swatch"], function(require, t, o, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ColorSwatch = void 0;
    var e = n.Components
      , c = e.Switch
      , s = e.For
      , l = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return r.__extends(e, t),
        e.prototype.template = function() {
            var t = this;
            return n.createElement(c, {
                key: this.bindFn(this.colorType)
            }, function(r) {
                switch (r) {
                case "string":
                    return n.createElement("span", {
                        class: function() {
                            return {
                                "dcg-color-swatch": !0,
                                "dcg-color-evaluation": t.props.isEvaluation && t.props.isEvaluation(),
                                "dcg-light-color": o.isLightColor(t.props.color())
                            }
                        },
                        style: function() {
                            return {
                                background: t.props.color()
                            }
                        }
                    });
                case "list":
                    return n.createElement(s, {
                        each: function() {
                            return t.getColorArray()
                        },
                        key: function(t) {
                            return t.idx + "-" + t.color
                        }
                    }, n.createElement("span", {
                        class: n.const("dcg-color-swatch dcg-color-array")
                    }, function(t) {
                        return n.createElement("span", {
                            class: n.const("dcg-color-array-item"),
                            style: function() {
                                return {
                                    background: t.color
                                }
                            }
                        })
                    }));
                case "unknown":
                    return n.createElement("span", {
                        class: n.const("dcg-color-swatch"),
                        style: function() {
                            return {
                                background: "#000"
                            }
                        }
                    })
                }
            })
        }
        ,
        e.prototype.colorType = function() {
            var t = this.props.color();
            return "string" == typeof t ? "string" : "object" == typeof t ? "list" : "unknown"
        }
        ,
        e.prototype.getColorArray = function() {
            var t = []
              , o = this.props.color();
            if (!o || "object" != typeof o)
                return t;
            for (var r = Math.min(o.length, 10), n = 0; n < Math.min(o.length, 10); n++)
                t.push({
                    idx: n,
                    color: "" + o[Math.round(n * o.length / r)]
                });
            return t
        }
        ,
        e
    }(n.Class);
    t.ColorSwatch = l
});
