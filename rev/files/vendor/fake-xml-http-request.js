define('vendor/fake-xml-http-request', [], function() {
    var e = function(e, t, s, n) {
        this.type = e,
        this.bubbles = t,
        this.cancelable = s,
        this.target = n
    };
    e.prototype = {
        stopPropagation: function() {},
        preventDefault: function() {
            this.defaultPrevented = !0
        }
    };
    var t = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        300: "Multiple Choice",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        422: "Unprocessable Entity",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported"
    };
    var s = {
        "Accept-Charset": !0,
        "Accept-Encoding": !0,
        Connection: !0,
        "Content-Length": !0,
        Cookie: !0,
        Cookie2: !0,
        "Content-Transfer-Encoding": !0,
        Date: !0,
        Expect: !0,
        Host: !0,
        "Keep-Alive": !0,
        Referer: !0,
        TE: !0,
        Trailer: !0,
        "Transfer-Encoding": !0,
        Upgrade: !0,
        "User-Agent": !0,
        Via: !0
    };
    function n(e, t) {
        t.addEventListener(e, function(s) {
            var n = t["on" + e];
            n && "function" == typeof n && n.call(s.target, s)
        })
    }
    function r() {
        this._eventListeners = {};
        for (var e = ["loadstart", "progress", "load", "abort", "loadend"], t = e.length - 1; t >= 0; t--)
            n(e[t], this)
    }
    function i() {
        r.call(this),
        this.readyState = i.UNSENT,
        this.requestHeaders = {},
        this.requestBody = null,
        this.status = 0,
        this.statusText = "",
        this.upload = new r
    }
    r.prototype = {
        addEventListener: function(e, t) {
            this._eventListeners[e] = this._eventListeners[e] || [],
            this._eventListeners[e].push(t)
        },
        removeEventListener: function(e, t) {
            for (var s = this._eventListeners[e] || [], n = 0, r = s.length; n < r; ++n)
                if (s[n] == t)
                    return s.splice(n, 1)
        },
        dispatchEvent: function(e) {
            for (var t = e.type, s = this._eventListeners[t] || [], n = 0; n < s.length; n++)
                "function" == typeof s[n] ? s[n].call(this, e) : s[n].handleEvent(e);
            return !!e.defaultPrevented
        },
        _progress: function(t, s, n) {
            var r = new e("progress");
            r.target = this,
            r.lengthComputable = t,
            r.loaded = s,
            r.total = n,
            this.dispatchEvent(r)
        }
    },
    i.prototype = new r,
    i.UNSENT = 0,
    i.OPENED = 1,
    i.HEADERS_RECEIVED = 2,
    i.LOADING = 3,
    i.DONE = 4;
    var o = {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4,
        async: !0,
        withCredentials: !1,
        open: function(e, t, s, n, r) {
            this.method = e,
            this.url = t,
            this.async = "boolean" != typeof s || s,
            this.username = n,
            this.password = r,
            this.responseText = null,
            this.responseXML = null,
            this.requestHeaders = {},
            this.sendFlag = !1,
            this._readyStateChange(i.OPENED)
        },
        setRequestHeader: function(e, t) {
            if (h(this),
            s[e] || /^(Sec-|Proxy-)/.test(e))
                throw new Error('Refused to set unsafe header "' + e + '"');
            this.requestHeaders[e] ? this.requestHeaders[e] += "," + t : this.requestHeaders[e] = t
        },
        send: function(t) {
            if (h(this),
            !/^(get|head)$/i.test(this.method)) {
                var s = !1;
                Object.keys(this.requestHeaders).forEach(function(e) {
                    "content-type" === e.toLowerCase() && (s = !0)
                }),
                s || (t || "").toString().match("FormData") || (this.requestHeaders["Content-Type"] = "text/plain;charset=UTF-8"),
                this.requestBody = t
            }
            this.errorFlag = !1,
            this.sendFlag = this.async,
            this._readyStateChange(i.OPENED),
            "function" == typeof this.onSend && this.onSend(this),
            this.dispatchEvent(new e("loadstart",!1,!1,this)),
            i.onSend && i.onSend(this)
        },
        abort: function() {
            this.aborted = !0,
            this.responseText = null,
            this.errorFlag = !0,
            this.requestHeaders = {},
            this.readyState > i.UNSENT && this.sendFlag && (this._readyStateChange(i.DONE),
            this.sendFlag = !1),
            this.readyState = i.UNSENT,
            this.dispatchEvent(new e("abort",!1,!1,this)),
            "function" == typeof this.onerror && this.onerror()
        },
        getResponseHeader: function(e) {
            if (this.readyState < i.HEADERS_RECEIVED)
                return null;
            if (/^Set-Cookie2?$/i.test(e))
                return null;
            for (var t in e = e.toLowerCase(),
            this.responseHeaders)
                if (t.toLowerCase() == e)
                    return this.responseHeaders[t];
            return null
        },
        getAllResponseHeaders: function() {
            if (this.readyState < i.HEADERS_RECEIVED)
                return "";
            var e = "";
            for (var t in this.responseHeaders)
                this.responseHeaders.hasOwnProperty(t) && !/^Set-Cookie2?$/i.test(t) && (e += t + ": " + this.responseHeaders[t] + "\r\n");
            return e
        },
        overrideMimeType: function(e) {
            "string" == typeof e && (this.forceMimeType = e.toLowerCase())
        },
        _readyStateChange: function(t) {
            this.readyState = t,
            "function" == typeof this.onreadystatechange && this.onreadystatechange(new e("readystatechange")),
            this.dispatchEvent(new e("readystatechange")),
            this.readyState == i.DONE && (this.dispatchEvent(new e("load",!1,!1,this)),
            this.dispatchEvent(new e("loadend",!1,!1,this)))
        },
        _setResponseHeaders: function(e) {
            for (var t in this.responseHeaders = {},
            e)
                e.hasOwnProperty(t) && (this.responseHeaders[t] = e[t]);
            this.forceMimeType && (this.responseHeaders["Content-Type"] = this.forceMimeType),
            this.async ? this._readyStateChange(i.HEADERS_RECEIVED) : this.readyState = i.HEADERS_RECEIVED
        },
        _setResponseBody: function(e) {
            !function(e) {
                if (e.readyState == i.DONE)
                    throw new Error("Request done")
            }(this),
            function(e) {
                if (e.async && e.readyState != i.HEADERS_RECEIVED)
                    throw new Error("No headers received")
            }(this),
            function(e) {
                if ("string" != typeof e) {
                    var t = new Error("Attempted to respond to fake XMLHttpRequest with " + e + ", which is not a string.");
                    throw t.name = "InvalidBodyException",
                    t
                }
            }(e);
            var t = this.chunkSize || 10
              , s = 0;
            this.responseText = "";
            do {
                this.async && this._readyStateChange(i.LOADING),
                this.responseText += e.substring(s, s + t),
                s += t
            } while (s < e.length);
            var n, r, o = this.getResponseHeader("Content-Type");
            if (this.responseText && (!o || /(text\/xml)|(application\/xml)|(\+xml)/.test(o)))
                try {
                    this.responseXML = (n = this.responseText,
                    "undefined" != typeof DOMParser ? r = (new DOMParser).parseFromString(n, "text/xml") : ((r = new ActiveXObject("Microsoft.XMLDOM")).async = "false",
                    r.loadXML(n)),
                    r)
                } catch (e) {}
            this.async ? this._readyStateChange(i.DONE) : this.readyState = i.DONE
        },
        respond: function(e, s, n) {
            this._setResponseHeaders(s || {}),
            this.status = "number" == typeof e ? e : 200,
            this.statusText = t[this.status],
            this._setResponseBody(n || "")
        }
    };
    for (var a in o)
        i.prototype[a] = o[a];
    function h(e) {
        if (e.readyState !== i.OPENED)
            throw new Error("INVALID_STATE_ERR");
        if (e.sendFlag)
            throw new Error("INVALID_STATE_ERR")
    }
    return i
});