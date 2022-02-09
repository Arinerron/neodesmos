define('submodules/dcgview/build-amd/for', ["./create-class", "./compute-key-mutations", "./const", "./mounting"], function(e, t, i, o) {
    "use strict";
    function r(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var n = r(e)
      , s = r(t)
      , h = r(i)
      , a = r(o)
      , c = n.default({
        viewName: "ForWrapper",
        template: function() {
            return this.children[0]
        }
    });
    return n.default({
        viewName: "For",
        _isDCGFor: !0,
        getKeys: function() {
            this._keyToItem = {};
            var e = this.props.each();
            if (!Array.isArray(e))
                throw new Error("<For each={}> must return an array");
            var t = this.props.key ? e.map(this.props.key) : e.slice(0);
            if (!this._chosenKeyType && t.length && (this._chosenKeyType = typeof t[0],
            "string" !== this._chosenKeyType && "number" !== this._chosenKeyType))
                throw new Error("The key: " + JSON.stringify(t[0]) + " is not a string or number");
            for (var i = 0; i < t.length; i++) {
                var o = t[i];
                if (typeof o !== this._chosenKeyType)
                    throw new Error("Keys must be the same type. " + JSON.stringify(o) + " is not a " + this._chosenKeyType);
                if (o in this._keyToItem)
                    throw new Error("The key: " + JSON.stringify(o) + " is not unique");
                this._keyToItem[o] = e[i]
            }
            return t
        },
        createViewForKey: function(e) {
            var t = this._keyToItem[e]
              , i = this._viewFunction.call(this, t, e)
              , o = i;
            return o._isDCGView || (o = this.createElement(c, null, i)),
            this._keyToView[e] = o,
            o
        },
        template: function() {
            if (this._keyToView = {},
            "function" != typeof this.props.each)
                throw new Error("<For each={}> must be a function");
            if (1 !== this.children.length)
                throw new Error("<For> expects a single child. You passed " + this.children.length);
            var e = this.children[0];
            if (!e || !e._isDCGElement)
                throw new Error("<For> expects the root node to be a DCGElement. You passed " + JSON.stringify(e));
            if (e._isDCGView)
                throw new Error("<For> expects the root node to not be a DCGView. Pass in something like <div> or <span>");
            if (1 !== e.children.length)
                throw new Error("<For> expects a root node with a single child. You passed " + e.children.length);
            if (this._viewFunction = e.children[0],
            this._viewFunction && this._viewFunction._isDCGElement)
                throw new Error("<For> expects a function that constructs a DCGElement. You passed a DCGElement directly");
            if ("function" != typeof this._viewFunction) {
                var t = JSON.stringify(this._viewFunction);
                throw new Error("<For> expects a function that constructs a DCGElement. You passed " + t)
            }
            if (h.default.isConst(this._viewFunction))
                throw new Error("<For> expects a function that constructs a DCGElement. You passed a constant");
            this._keys = this.getKeys();
            for (var i = [], o = 0; o < this._keys.length; o++) {
                var r = this._keys[o]
                  , n = this.createViewForKey(r);
                n._parentElement = this,
                i.push(n)
            }
            return e.children = i,
            e
        },
        detachAllRemovedViews: function() {
            for (var e, t = this._childViews, i = 0, o = t.length, r = 0; r < o; r++)
                (e = t[r])._will_be_unmounted_ ? i++ : t[r - i] = e;
            t.splice(o - i, i)
        },
        overrideChildUpdates: function() {
            var e = this._keys
              , t = this.getKeys();
            this._keys = t;
            var i, o, r, n, h, c, l = this.findRootNode(), u = s.default(e, t), f = [];
            for (i = u.removes.length - 1; i >= 0; i--)
                c = u.removes[i],
                f.push(this._keyToView[c]);
            for (f.forEach(a.default.willUnmount),
            i = 0; i < u.removes.length; i++)
                c = u.removes[i],
                o = this._keyToView[c],
                delete this._keyToView[c],
                o._will_be_unmounted_ = !0,
                l.removeChild(o.findRootNode());
            f.length > 0 && this.detachAllRemovedViews(),
            f.forEach(a.default.onUnmount),
            f.forEach(a.default.didUnmount);
            var d = [];
            for (i = u.inserts.length - 1; i >= 0; i--)
                (c = u.inserts[i].key)in this._keyToView || (o = this.createViewForKey(c),
                d.push(o),
                a.default.createNodeForView(o, this));
            for (d.forEach(a.default.willMount),
            i = 0; i < u.inserts.length; i++)
                h = u.inserts[i],
                r = this._keyToView[h.key].findRootNode(),
                n = void 0 !== h.beforeKey ? this._keyToView[h.beforeKey].findRootNode() : null,
                l.insertBefore(r, n);
            d.forEach(a.default.onMount),
            d.forEach(a.default.didMount);
            var y = this._childViews
              , w = y.length - d.length;
            for (i = 0; i < w; i++)
                y[i].update()
        }
    })
});