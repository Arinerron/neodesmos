define('dcgview-helpers/download-button', ["require", "exports", "tslib", "dcgview", "browser", "loadcss!./download-button"], function(require, t, o, n, e) {
    "use strict";
    function i() {
        return !e.IS_IE && !function() {
            if (!e.IS_SAFARI)
                return !1;
            var t = navigator.userAgent.match(/Version\/(\d+)/);
            return !(!t || !t[1]) && parseFloat(t[1]) < 11
        }() && void 0 !== document.createElement("a").download
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.canDownload = void 0,
    t.canDownload = function() {
        return i() || void 0 !== navigator.msSaveBlob
    }
    ;
    var d = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(e, t),
        e.prototype.init = function() {
            this.supportsDirectDownload = i()
        }
        ,
        e.prototype.template = function() {
            var t = this;
            return n.createElement("a", {
                role: n.const("button"),
                tabindex: function() {
                    return t.props.enabled() ? 0 : -1
                },
                "aria-disabled": function() {
                    return !t.props.enabled()
                },
                class: function() {
                    return {
                        "dcg-download-button": !0,
                        "dcg-disabled": !t.props.enabled(),
                        "dcg-braille-equations": t.props.isBraille,
                        "dcg-svg-button": t.props.isSvg
                    }
                },
                didMount: this.bindFn(this.didMountDownload),
                didUnmount: this.bindFn(this.didUnmountDownload),
                didUpdate: this.bindFn(this.didUpdate),
                download: function() {
                    return t.supportsDirectDownload ? t.props.filename() : void 0
                },
                onTap: function(o) {
                    if (!t.supportsDirectDownload && navigator.msSaveOrOpenBlob) {
                        var n = t.props.data();
                        n && (navigator.msSaveOrOpenBlob(n, t.props.filename()),
                        o.preventDefault())
                    }
                }
            }, n.createElement("i", {
                class: n.const("dcg-icon-download")
            }), n.createElement("span", null, function() {
                return t.props.text()
            }))
        }
        ,
        e.prototype.didMountDownload = function(t) {
            this.downloadLink = t,
            this.didUpdate()
        }
        ,
        e.prototype.didUnmountDownload = function() {
            this.revokeBlobURL()
        }
        ,
        e.prototype.didUpdate = function() {
            this.updateDownloadURL(),
            this.cachedObjectURL && (this.downloadLink.href = this.cachedObjectURL)
        }
        ,
        e.prototype.updateDownloadURL = function() {
            if (this.revokeBlobURL(),
            this.supportsDirectDownload) {
                var t = this.props.data();
                t && (this.cachedObjectURL = URL.createObjectURL(t))
            }
        }
        ,
        e.prototype.revokeBlobURL = function() {
            this.cachedObjectURL && URL.revokeObjectURL(this.cachedObjectURL)
        }
        ,
        e
    }(n.Class);
    t.default = d
});