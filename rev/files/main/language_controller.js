
define('main/language_controller', ["require", "exports", "lib/i18n", "lib/urlparser"], function(require, t, e, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function t(t) {
            var n = this;
            this.s = e.createDictionaryLookupFunction(function() {
                return n._language
            }),
            this._language = e.detectLanguage(),
            this.Calc = t
        }
        return t.prototype.raw = function(t, n) {
            return e.raw(t, n)
        }
        ,
        t.prototype.unpack = function(t) {
            return e.unpack(t, this._language)
        }
        ,
        t.prototype.getLanguage = function() {
            return this._language
        }
        ,
        t.prototype.updateUrl = function(t) {
            if (window.history && history.replaceState) {
                var e = location.origin
                  , r = location.pathname
                  , a = location.search
                  , o = location.hash
                  , i = "" + e + r + n.setParameter(a, "lang", t) + o;
                history.replaceState(null, "", i)
            }
        }
        ,
        t.prototype.setHeaderController = function(t) {
            this.headerController = t
        }
        ,
        t.prototype.fetchAndSetLanguage = function(t) {
            var n = this;
            e.fetchLanguage(t).then(function() {
                n._language = t,
                n.Calc.updateSettings({
                    language: t
                }),
                n.headerController && n.headerController.triggerRender(),
                n.updateUrl(t)
            })
        }
        ,
        t
    }();
    t.default = r
});