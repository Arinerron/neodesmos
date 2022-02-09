define('underscore_model', ['require', 'underscore', 'pjs'], function(require) {
    var e = require("underscore");
    return {
        UnderscoreModel: require("pjs")(function(r) {
            var t = 0
              , s = "guid_" + Math.round(1e6 * Math.random()) + "_" + (new Date).getTime() + "_";
            r.init = function() {
                this.__observers = {},
                this.__eventObservers = {},
                this.__oldProperties = {},
                this.__propertyComparators = {},
                this.guid = s + ++t
            }
            ,
            r.unobserveAll = function() {
                this.__observers = {},
                this.__eventObservers = {}
            }
            ,
            r.getProperty = function(e) {
                return this[e]
            }
            ,
            r.getOldProperty = function(e) {
                return this.__oldProperties[e]
            }
            ,
            r.setProperty = function(r, t) {
                var s = this[r];
                this[r] = t;
                var i = this.__propertyComparators[r];
                if (i) {
                    if (i(s, t))
                        return
                } else if (e.isEqual(s, t))
                    return;
                this.__oldProperties[r] = s,
                this.notifyPropertyChange(r)
            }
            ,
            r.setProperties = function(e) {
                for (var r in e)
                    e.hasOwnProperty(r) && this.setProperty(r, e[r])
            }
            ,
            r.setPropertyComparator = function(e, r) {
                this.__propertyComparators[e] = r
            }
            ,
            r.notifyPropertyChange = function(e) {
                this.__callObservers(this.__observers, e, this)
            }
            ,
            r.observe = function(e, r) {
                this.__addObservers(this.__observers, e, r)
            }
            ,
            r.unobserve = function(e) {
                this.__removeObservers(this.__observers, e)
            }
            ,
            r.observeAndSync = function(e, r) {
                this.observe(e, r);
                for (var t = e.split(" "), s = 0; s < t.length; s++) {
                    var i = t[s].split(".")[0];
                    this.hasOwnProperty(i) && r(i, this)
                }
            }
            ,
            r.triggerEvent = function(e, r) {
                this.__callObservers(this.__eventObservers, e, r)
            }
            ,
            r.observeEvent = function(e, r) {
                this.__addObservers(this.__eventObservers, e, r)
            }
            ,
            r.unobserveEvent = function(e) {
                this.__removeObservers(this.__eventObservers, e)
            }
            ,
            r.__callObservers = function(e, r, t) {
                var s = e[r];
                if (s)
                    for (var i = 0; i < s.length; i++)
                        s[i].callback(r, t)
            }
            ,
            r.__removeObservers = function(e, r) {
                for (var t = r.split(" "), s = 0; s < t.length; s++) {
                    var i = t[s].split(".")
                      , o = i[0]
                      , n = i[1];
                    if (o && n) {
                        var v = e[o]
                          , _ = [];
                        if (!v)
                            continue;
                        for (var a = 0; a < v.length; a++) {
                            var h = v[a];
                            h.namespace !== n && _.push(h)
                        }
                        e[o] = _
                    } else if (o)
                        delete e[o];
                    else if (n)
                        for (o in e)
                            e.hasOwnProperty(o) && this.__removeObservers(e, o + "." + n)
                }
            }
            ,
            r.__addObservers = function(e, r, t) {
                for (var s = r.split(" "), i = 0; i < s.length; i++) {
                    var o = s[i].split(".")
                      , n = o[0];
                    if (!n)
                        throw "Must supply a property to observe";
                    var v = {
                        namespace: o[1],
                        callback: t
                    }
                      , _ = e[n];
                    _ ? _.push(v) : e[n] = [v]
                }
            }
        })
    }
});