
define('submodules/dcgview/build-amd/switch-union', ["./create-class", "./mounting", "./create-element"], function(e, t, i) {
    "use strict";
    function n(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var r = n(e)
      , a = n(t)
      , s = n(i)
      , o = r.default({
        viewName: "SwitchUnionWrapper",
        _isDCGSwitchUnionWrapper: !0,
        template: function() {
            return this.children[0]
        }
    })
      , u = r.default({
        viewName: "SwitchUnion",
        _isDCGSwitchUnion: !0,
        updateCase: function() {
            this._case = this.props.getCase()
        },
        createView: function() {
            var e = this.props.buildChildView(this._case);
            null == e && (e = this.createElement("div", {
                style: this.const("display: none")
            }));
            var t = this.createElement(o, null, e);
            return t._parentElement = this,
            t
        },
        template: function() {
            return this._case = void 0,
            this.updateCase(),
            this.createView()
        },
        overrideChildUpdates: function() {
            var e = this._case;
            if (this.updateCase(),
            e === this._case)
                this._element.update();
            else {
                var t = this.findRootNode()
                  , i = document.createTextNode("");
                t.parentNode.insertBefore(i, t),
                a.default.willUnmount(this._element),
                this._childViews = [],
                t.parentNode.removeChild(t),
                a.default.onUnmount(this._element),
                a.default.didUnmount(this._element),
                this._element = this.createView();
                var n = a.default.createNodeForView(this._element, this);
                a.default.willMount(this._element),
                i.parentNode.insertBefore(n, i),
                i.parentNode.removeChild(i),
                a.default.onMount(this._element),
                a.default.didMount(this._element)
            }
        }
    });
    function l(e, t, i) {
        return s.default(u, {
            getCase: function() {
                var i = t();
                return e ? i && i[e] : i
            },
            buildChildView: function(e) {
                var n = i[e];
                if (n)
                    return n(t)
            }
        })
    }
    return function(e, t) {
        return "string" == typeof e ? l.bind(this, e, t) : l(void 0, e, t)
    }
});