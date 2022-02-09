
define('main/graph', ['require', 'pjs', 'underscore_model', 'core/lib/worker-i18n', 'main/backend'], function(require) {
    "use strict";
    var e = require("pjs")
      , t = require("underscore_model").UnderscoreModel
      , a = require("core/lib/worker-i18n")
      , r = require("main/backend")
      , s = e(t, function(e, t) {
        var l = ["title", "thumbURL", "stateURL", "hash", "parentHash", "recovery", "recoveryParentHash", "graphData", "access", "created", "example", "draft", "easterEgg"];
        e.init = function(e) {
            t.init.call(this);
            var a = this;
            e && l.forEach(function(t) {
                e.hasOwnProperty(t) && a.setProperty(t, e[t])
            }),
            this.access || this.setProperty("access", "all"),
            this.example || this.setProperty("example", !1),
            this.draft || this.setProperty("draft", !1),
            this.now = new Date
        }
        ,
        e.copy = function() {
            return s(this)
        }
        ,
        e.getCollectionKey = function() {
            var e = "";
            return this.example ? e = "example-" : this.draft && (e = "draft-"),
            e + this.hash
        }
        ,
        e.displayDate = function() {
            var e = (Date.now() - this.created) / 1e3 / 60
              , t = e / 60
              , r = t / 24
              , s = r / 7
              , l = [a.s("account-shell-label-month-jan"), a.s("account-shell-label-month-feb"), a.s("account-shell-label-month-mar"), a.s("account-shell-label-month-apr"), a.s("account-shell-label-month-may"), a.s("account-shell-label-month-jun"), a.s("account-shell-label-month-jul"), a.s("account-shell-label-month-aug"), a.s("account-shell-label-month-sep"), a.s("account-shell-label-month-oct"), a.s("account-shell-label-month-nov"), a.s("account-shell-label-month-dec")];
            return s >= 5 ? a.s("account-shell-label-created-on-date", {
                month: l[this.created.getMonth()],
                day: this.created.getDate(),
                year: this.created.getFullYear()
            }) : s >= 2 ? a.s("account-shell-label-created-weeks-ago", {
                number: String(Math.floor(s))
            }) : r >= 7 ? a.s("account-shell-label-created-last-week") : r >= 2 ? a.s("account-shell-label-created-days-ago", {
                number: String(Math.floor(r))
            }) : t >= 24 ? a.s("account-shell-label-created-yesterday") : t >= 2 ? a.s("account-shell-label-created-hours-ago", {
                number: String(Math.floor(t))
            }) : e >= 60 ? a.s("account-shell-label-created-one-hour-ago") : e >= 2 ? a.s("account-shell-label-created-minutes-ago", {
                number: String(Math.floor(e))
            }) : e >= 1 ? a.s("account-shell-label-created-one-minute-ago") : a.s("account-shell-label-created-seconds-ago")
        }
        ,
        e.plainObject = function() {
            var e = {}
              , t = this;
            return l.forEach(function(a) {
                e[a] = t[a]
            }),
            e
        }
        ,
        e.getURL = function() {
            var e;
            if ("file:" === window.location.protocol) {
                var t = "/calculator";
                if (!r.baseURL)
                    return t;
                e = r.baseURL + t
            } else {
                var a = "/" + document.location.pathname.split("/")[1];
                e = window.location.href.split(a)[0] + a
            }
            return e + (this.hash && !this.recovery ? "/" + this.hash : "")
        }
    });
    return s.fromAjax = function(e) {
        return s({
            title: e.title,
            thumbURL: e.thumbUrl,
            stateURL: e.stateUrl,
            graphData: e.state,
            hash: e.hash,
            parentHash: e.parent_hash,
            recoveryParentHash: e.recovery_parent_hash,
            access: e.access,
            created: new Date(e.created),
            example: !!e.example,
            draft: !!e.draft,
            easterEgg: e.easterEgg
        })
    }
    ,
    s.toAjax = function(e) {
        return {
            title: e.title,
            thumbUrl: e.thumbURL,
            stateUrl: e.stateURL,
            state: e.graphData,
            hash: e.hash,
            parent_hash: e.parentHash,
            recovery_parent_hash: e.recoveryParentHash,
            access: e.access,
            created: e.created.toString()
        }
    }
    ,
    s.updateFromSync = function(e, t) {
        e.setProperty("title", t.title),
        e.setProperty("hash", t.hash),
        e.setProperty("parentHash", t.parent_hash),
        e.setProperty("recoveryParentHash", t.recovery_parent_hash),
        e.setProperty("graphData", e.graphData),
        e.setProperty("thumbURL", t.thumbUrl),
        e.setProperty("stateURL", t.stateUrl),
        e.setProperty("created", new Date(t.created))
    }
    ,
    s
});
