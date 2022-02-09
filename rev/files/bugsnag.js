define('bugsnag', ["require", "exports", "tslib"], function(require, e, r) {
    "use strict";
    var t, i;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.setBeforeSendCB = e.leaveBreadcrumb = e.notify = e.init = void 0;
    var n = ["UnhandledRejection", "lnrAppboy", "socratic", "MyAppGet", "SymBrowser_", "mobincube_", "_avast_submit", "Cannot redefine property: googletag", "jcarousel", "SyntaxError: Unexpected identifier 'script'", "__gCrWeb.autofill.extractForms", "BrowseITEXT", "Can't find variable: removeAllHighlights", "aAttribruteValue.parentNode.getAttribute", "vid_mate_check", "GetImageTagSrcFromPoint", "Can't find variable: didEnterViewPort", "tinyMCE is not defined"];
    function o() {
        var e = "production";
        if (location && location.hostname) {
            var r = location.hostname.split(".")
              , t = r.slice(0, r.length - 2).join(".");
            "desmos.com" === r.slice(r.length - 2).join(".") && (e = t && "www" !== t ? t : "production")
        }
        return e
    }
    e.init = function(e) {
        if (!t) {
            var r = 0
              , a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var r = 16 * Math.random() | 0;
                return ("x" == e ? r : 3 & r | 8).toString(16)
            });
            t = e({
                apiKey: "7f7807097671acbc4557e64bbf5eb529",
                maxBreadcrumbs: 40,
                appVersion: window.Desmos && window.Desmos.commit,
                releaseStage: o(),
                consoleBreadcrumbsEnabled: !1,
                beforeSend: function(e) {
                    if (e.errorClass)
                        for (var t = 0, o = n; t < o.length; t++) {
                            var s = o[t];
                            if (-1 !== e.errorClass.indexOf(s))
                                return void e.ignore()
                        }
                    if (e.errorMessage)
                        for (var c = 0, d = n; c < d.length; c++) {
                            s = d[c];
                            if (-1 !== e.errorMessage.indexOf(s))
                                return void e.ignore()
                        }
                    i && i(e),
                    e.isIgnored() || (r += 1,
                    e.metaData.errorNumber = r,
                    e.metaData.pageLoadId = a)
                }
            })
        }
    }
    ,
    e.notify = function(e, r) {
        t && t.notify(e, r)
    }
    ,
    e.leaveBreadcrumb = function(e, i, n, o) {
        if (i)
            for (var a in i = r.__assign({}, i))
                try {
                    i[a] = JSON.stringify(i[a], null, 2)
                } catch (e) {
                    i[a] = "[[could not stringify]]"
                }
        t && t.leaveBreadcrumb(e, i, n, o)
    }
    ,
    e.setBeforeSendCB = function(e) {
        i = e
    }
});