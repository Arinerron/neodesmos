
define('calculator-shell/language-menu', ["require", "exports", "tslib", "dcgview", "./menu", "shared-components/language-picker", "../lib/enabled-languages", "loadcss!./language"], function(require, e, n, t, r, o, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LanguageMenu = void 0;
    var a = l.buildSupportedLanguagesMap()
      , u = function(e) {
        function l() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(l, e),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            this.languageController = this.controller.languageController
        }
        ,
        l.prototype.template = function() {
            var e = this;
            return t.createElement(r.Menu, {
                type: function() {
                    return "language"
                },
                label: function() {
                    return e.controller.s("account-shell-narration-language-menu")
                },
                controller: this.props.controller
            }, t.createElement("div", {
                class: t.const("dcg-popover-content")
            }, t.createElement(o.LanguagePicker, {
                getAllLangs: function() {
                    return a
                },
                currentLang: function() {
                    return e.languageController.getLanguage()
                },
                onLangChosen: function(n) {
                    e.languageController.fetchAndSetLanguage(n),
                    e.controller.dispatch({
                        type: "toggle-menu",
                        payload: "none"
                    })
                },
                i18n: this.props.controller
            })))
        }
        ,
        l
    }(t.Class);
    e.LanguageMenu = u
});