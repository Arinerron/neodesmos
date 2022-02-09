
define('lib/priority-queue', ["require", "exports"], function(require, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function t(t) {
            this.comparator = t,
            this._data = []
        }
        return t.prototype.size = function() {
            return this._data.length
        }
        ,
        t.prototype.queue = function(t) {
            var a = this._data.length;
            for (this._data.push(t); a > 0; ) {
                var i = a - 1 >>> 1;
                if (!(this.comparator(this._data[a], this._data[i]) < 0))
                    break;
                var r = this._data[i];
                this._data[i] = this._data[a],
                this._data[a] = r,
                a = i
            }
        }
        ,
        t.prototype.dequeue = function() {
            var t = this._data[0]
              , a = this._data.pop();
            if (this._data.length > 0 && void 0 !== a) {
                this._data[0] = a;
                for (var i = 0, r = this._data.length - 1; ; ) {
                    var e = 1 + (i << 1)
                      , h = e + 1
                      , s = i;
                    if (e <= r && this.comparator(this._data[e], this._data[s]) < 0 && (s = e),
                    h <= r && this.comparator(this._data[h], this._data[s]) < 0 && (s = h),
                    s === i)
                        break;
                    var o = this._data[s];
                    this._data[s] = this._data[i],
                    this._data[i] = o,
                    i = s
                }
            }
            return t
        }
        ,
        t.prototype.peek = function() {
            return this._data[0]
        }
        ,
        t.prototype.clear = function() {
            this._data.length = 0
        }
        ,
        t
    }();
    t.default = a
});