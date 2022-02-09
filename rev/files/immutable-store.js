
define('immutable-store', ['require', 'underscore', 'core/lib/deepCopy'], function(require) {
    "use strict";
    var t = require("underscore")
      , e = require("core/lib/deepCopy").default;
    function s(e) {
        return t.clone(e)
    }
    function i(t) {
        this.setState(t)
    }
    return i.prototype.setState = function(t) {
        this.state = t
    }
    ,
    i.prototype.getState = function() {
        return this.state
    }
    ,
    i.prototype.set = function(t, e) {
        if (1 !== arguments.length) {
            if ("string" == typeof t)
                return this.state = s(this.state),
                void (this.state[t] = e);
            var i, a = t.length - 2, r = t[a + 1];
            this.state = i = s(this.state);
            for (var n = 0; n <= a; n++) {
                var h = t[n];
                i = i[h] = s(i[h])
            }
            i[r] = e
        } else
            this.state = t
    }
    ,
    i.prototype.deepMutate = function(t, i) {
        if (1 === arguments.length)
            return i = t,
            this.state = e(this.state),
            void i(this.state);
        if ("string" == typeof t)
            return this.state = s(this.state),
            this.state[t] = e(this.state[t]),
            void i(this.state[t]);
        for (var a = t.length - 2, r = t[a + 1], n = this.state = s(this.state), h = 0; h <= a; h++) {
            var o = t[h];
            n = n[o] = s(n[o])
        }
        i(n = n[r] = e(n[r]))
    }
    ,
    i.prototype.shallowMutate = function(t, e) {
        if (1 === arguments.length)
            return e = t,
            this.state = s(this.state),
            void e(this.state);
        if ("string" == typeof t)
            return this.state = s(this.state),
            this.state[t] = s(this.state[t]),
            void e(this.state[t]);
        for (var i = t.length - 1, a = this.state = s(this.state), r = 0; r <= i; r++) {
            var n = t[r];
            a = a[n] = s(a[n])
        }
        e(a)
    }
    ,
    i.areShallowEqual = function(t, e) {}
    ,
    i.areDeepEqual = function(t, e) {}
    ,
    {
        default: i
    }
});