
define('submodules/dcgview/build-amd/mounting', ["./bindings"], function(n) {
    "use strict";
    function e(n) {
        return n && "object" == typeof n && "default"in n ? n : {
            default: n
        }
    }
    var o = e(n);
    function t(n) {
        n.willMount && n.willMount(),
        o.default.invoke(n, "willMount"),
        n._childViews.forEach(t)
    }
    function i(n) {
        n._isMounted = !0,
        n.onMount && n.onMount(),
        o.default.invoke(n, "onMount"),
        n._childViews.forEach(i)
    }
    function r(n) {
        n.didMount && n.didMount(),
        o.default.invoke(n, "didMount"),
        n._childViews.forEach(r)
    }
    function u(n) {
        n.willUnmount && n.willUnmount(),
        o.default.invoke(n, "willUnmount"),
        n._childViews.forEach(u)
    }
    function d(n) {
        n._isMounted = !1,
        n._childViews.forEach(d),
        o.default.invoke(n, "onUnmount"),
        n.onUnmount && n.onUnmount()
    }
    function a(n) {
        n._childViews.forEach(a),
        o.default.invoke(n, "didUnmount"),
        n.didUnmount && n.didUnmount()
    }
    return {
        renderToDocFrag: function(n, e) {
            if (e && e._childViews.push(this),
            this.__generatedHTMLBefore)
                throw new Error("Cannot remount a DCGView");
            this.__generatedHTMLBefore = !0,
            this._element.renderToDocFrag(n, this)
        },
        findRootNode: function() {
            for (var n = this._element; n._isDCGView; )
                n = n._element;
            return n._domNode
        },
        createNodeForView: function(n, e) {
            var o = document.createDocumentFragment();
            return n.renderToDocFrag(o, e),
            o.firstChild
        },
        willMount: t,
        onMount: i,
        didMount: r,
        willUnmount: u,
        onUnmount: d,
        didUnmount: a,
        mountToNode: function(n, e, o) {
            if (!n || !n._isDCGViewClass)
                throw new Error("Must pass a DCGView class to be mounted");
            if (!e || 1 !== e.nodeType)
                throw new Error("Must pass an HTMLElement for the node");
            if (e._mountedDCGView)
                throw new Error("This node is already mounted by a view");
            var u = new n(o)
              , d = document.createDocumentFragment();
            return u.renderToDocFrag(d),
            e.innerHTML = "",
            t(u),
            e._mountedDCGView = u,
            e.appendChild(d),
            i(u),
            r(u),
            u
        },
        unmountFromNode: function(n) {
            var e = n._mountedDCGView;
            if (!e)
                throw new Error("This node is not mounted by a DCGView");
            u(e),
            n.innerHTML = "",
            delete n._mountedDCGView,
            d(e),
            a(e)
        }
    }
});