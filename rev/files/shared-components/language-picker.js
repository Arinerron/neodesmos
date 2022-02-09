
define('shared-components/language-picker', ["require", "exports", "tslib", "dcgview", "loadcss!./language-picker", "loadcss!./btn-styles"], function(require, e, t, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LanguagePicker = void 0;
    var r = n.Components
      , o = r.For
      , i = r.If
      , s = function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(r, e),
        r.prototype.init = function() {
            this.i18n = this.props.i18n()
        }
        ,
        r.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "dcg-language-picker": !0,
                        "dcg-two-columns": e.getLanguages().length > 7
                    }
                }
            }, n.createElement("div", {
                class: n.const("dcg-language-header"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, function() {
                return e.i18n.s("shared-title-language-menu")
            }), n.createElement(o, {
                each: function() {
                    return e.getLanguages()
                }
            }, n.createElement("div", {
                class: n.const("dcg-languages-list"),
                role: n.const("list")
            }, function(t) {
                return n.createElement("div", {
                    class: n.const("dcg-listitem"),
                    role: n.const("listitem")
                }, n.createElement("div", {
                    class: function() {
                        return {
                            "dcg-language-option": !0,
                            "dcg-selected": e.isLanguageSelected(t)
                        }
                    },
                    lang: e.const(e.getLangCode(t)),
                    role: n.const("link"),
                    tabindex: n.const("0"),
                    "aria-current": function() {
                        return e.isLanguageSelected(t)
                    },
                    onTap: function() {
                        return e.updateLang(t)
                    }
                }, function() {
                    return e.i18n.raw(e.getLanguageDisplayName(t))
                }))
            })), n.createElement(i, {
                predicate: function() {
                    return e.shouldShowFooterLink()
                }
            }, function() {
                return n.createElement("a", {
                    class: n.const("dcg-language-footer-link dcg-shared-blue-link"),
                    href: function() {
                        return e.getFooterLinkURL()
                    }
                }, function() {
                    return e.getFooterLinkText()
                })
            }))
        }
        ,
        r.prototype.shouldShowFooterLink = function() {
            return !(!this.props.footerLink || !this.props.footerLink())
        }
        ,
        r.prototype.getFooterLinkURL = function() {
            var e = this.props.footerLink && this.props.footerLink();
            if (e)
                return e.url
        }
        ,
        r.prototype.getFooterLinkText = function() {
            var e = this.props.footerLink && this.props.footerLink();
            return e ? e.text : this.i18n.raw("")
        }
        ,
        r.prototype.getCurrentLang = function() {
            return this.props.currentLang()
        }
        ,
        r.prototype.getLanguages = function() {
            return Object.keys(this.props.getAllLangs())
        }
        ,
        r.prototype.getLanguageDisplayName = function(e) {
            return this.props.getAllLangs()[e].display_name
        }
        ,
        r.prototype.updateLang = function(e) {
            var t = this.props.getAllLangs()[e].code;
            return this.props.onLangChosen(t)
        }
        ,
        r.prototype.getLangCode = function(e) {
            return this.props.getAllLangs()[e].code
        }
        ,
        r.prototype.isLanguageSelected = function(e) {
            return this.getLangCode(e) === this.getCurrentLang()
        }
        ,
        r
    }(n.Class);
    e.LanguagePicker = s
});
