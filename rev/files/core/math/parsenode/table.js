
define('core/math/parsenode/table', ['require', 'pjs', './base'], function(require) {
    "use strict";
    return require("pjs")(require("./base"), function(t, n) {
        t.init = function(t) {
            n.init.call(this),
            this.columns = t,
            this._exports = [],
            this.mergeDependencies.apply(this, t);
            for (var e = 0; e < t.length; e++)
                Array.prototype.push.apply(this._exports, t[e].getExports())
        }
        ,
        t.exportPenalty = 1,
        t.isTable = !0,
        t.exportTo = function(t, n, e) {
            for (var s = 0; s < this.columns.length; s++) {
                var r = this.columns[s].getExports();
                if (r.length) {
                    var i = r[0];
                    t.assignmentForbidden(i) || e[i] || (n.isError ? e[i] = n : this.columns[s].exportTo(t, n.columns[s], e))
                }
            }
        }
        ,
        t.getAllIds = function() {
            return this.columns.map(function(t) {
                return t.header.userData.id
            })
        }
    })
});