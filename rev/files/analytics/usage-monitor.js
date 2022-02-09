define('analytics/usage-monitor', ["require", "exports", "./usage-client", "./queries/graph-feature"], function(require, e, r, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = 1 / 60
      , i = function() {
        function e(e) {
            var r = this;
            void 0 === e && (e = {}),
            this.pageLoadTime = Date.now(),
            this.loggers = {},
            this.calcController = e.calcController,
            this.featureQueryMap = {
                "graph-feature": []
            },
            this.registerLogger("usage-ping", function() {
                return {
                    timeSincePageload: r.getTimeSincePageload(),
                    probability: o
                }
            })
        }
        return e.prototype.start = function() {
            setInterval(this.callLoggers.bind(this))
        }
        ,
        e.prototype.trackFeatureUsage = function(e, r) {
            var o = this;
            if (!this.calcController)
                throw new Error("Monitoring graph feature usage requires a calculator controller.");
            this.featureQueryMap[e].push(r),
            this.registerLogger(e, function() {
                for (var r = {}, i = 0, a = o.featureQueryMap[e]; i < a.length; i++) {
                    var n = a[i]
                      , s = t[n];
                    if (!s)
                        throw new Error("'" + n + "' is not a valid feature name.");
                    r[n] = s(o.calcController)
                }
                return r
            })
        }
        ,
        e.prototype.getTimeSincePageload = function() {
            return Date.now() - this.pageLoadTime
        }
        ,
        e.prototype.registerLogger = function(e, r, t, i) {
            void 0 === t && (t = 6e4),
            void 0 === i && (i = o),
            this.loggers[e] = {
                fn: r,
                interval: t,
                probability: i,
                lastConsideredTime: 0
            }
        }
        ,
        e.prototype.callLoggers = function() {
            var e = Date.now()
              , t = this.loggers;
            for (var o in this.loggers)
                if (t.hasOwnProperty(o)) {
                    var i = t[o]
                      , a = i.fn
                      , n = i.interval
                      , s = i.probability;
                    e - i.lastConsideredTime > n && (t[o].lastConsideredTime = e,
                    Math.random() < s && r.logUsageData(o, a()))
                }
        }
        ,
        e
    }();
    e.default = i
});