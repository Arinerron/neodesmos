define('submodules/dcgview/build-amd/dcg-element', ["./bind-attrs", "./bind-text", "./const", "./warnings"], function(t, e, n, r) {
    "use strict";
    function i(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var o = i(t)
      , a = i(e)
      , d = i(n)
      , s = i(r)
      , h = a.default.bindText;
    function c(t, e) {
        var n = document.createTextNode(e);
        t.appendChild(n)
    }
    function f(t, e, n) {
        if (this.tagName = t,
        this.attrs = e,
        this.children = n,
        Array.isArray(this.children))
            for (var r = 0; r < this.children.length; r++) {
                var i = typeof this.children[r];
                "object" !== i && "function" !== i || (this.children[r]._parentElement = this)
            }
    }
    return f.prototype._isDCGElement = !0,
    f.prototype.renderToDocFrag = function(t, e) {
        if (this._domNode)
            throw new Error("Cannot remount a DCGElement");
        var n = this.children
          , r = document.createElement(this.tagName);
        this._domNode = r,
        o.default(e, this.attrs, r),
        t.appendChild(r);
        for (var i = n.length, a = 0; a < i; a++) {
            var f = n[a];
            f._isDCGElement ? f.renderToDocFrag(r, e) : d.default.isConst(f) ? c(r, f()) : "function" == typeof f ? h(e, r, f) : (s.default.warn("Text should be a const or a getter: " + JSON.stringify(f), e),
            c(r, f))
        }
    }
    ,
    f
});