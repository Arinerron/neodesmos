
define('core/math/features/elementAt', ['require', 'parsenodes'], function(require) {
    "use strict";
    var t = require("parsenodes");
    t.List.prototype.elementAt = function(e) {
        return (e = Math.floor(e)) >= 0 && e < this.args.length ? this.args[e] : t.Constant(NaN)
    }
    ,
    t.List.prototype.eachElement = function(t) {
        for (var e = 0; e < this.length; e++)
            t(this.elementAt(e), e)
    }
    ,
    t.List.prototype.mapElements = function(t) {
        for (var e = [], n = 0; n < this.length; n++)
            e.push(t(this.elementAt(n), n));
        return e
    }
    ,
    t.ParenSeq.prototype.elementAt = function(e) {
        return e < 0 || e > this.args.length - 1 ? t.Constant(NaN) : this.args[e]
    }
});