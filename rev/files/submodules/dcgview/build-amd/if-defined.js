
define('submodules/dcgview/build-amd/if-defined', ["./create-class", "./mounting", "./create-element"], function(e, t, i) {
    "use strict";
    function n(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var d = n(e)
      , s = n(t)
      , r = n(i)
      , l = d.default({
        viewName: "IfDefinedWrapper",
        _isDCGIfDefinedWrapper: !0,
        template: function() {
            return this.children[0]
        }
    })
      , u = d.default({
        viewName: "IfDefined",
        _isDCGIfDefined: !0,
        updateIsDefined: function() {
            this._isDefined = this.props.isDefined()
        },
        createView: function() {
            var e;
            this._isDefined && (e = this.props.buildChildView()),
            null == e && (e = this.createElement("div", {
                style: this.const("display: none")
            }));
            var t = this.createElement(l, null, e);
            return t._parentElement = this,
            t
        },
        template: function() {
            return this._isDefined = void 0,
            this.updateIsDefined(),
            this.createView()
        },
        overrideChildUpdates: function() {
            var e = this._isDefined;
            if (this.updateIsDefined(),
            e === this._isDefined)
                this._element.update();
            else {
                var t = this.findRootNode()
                  , i = document.createTextNode("");
                t.parentNode.insertBefore(i, t),
                s.default.willUnmount(this._element),
                this._childViews = [],
                t.parentNode.removeChild(t),
                s.default.onUnmount(this._element),
                s.default.didUnmount(this._element),
                this._element = this.createView();
                var n = s.default.createNodeForView(this._element, this);
                s.default.willMount(this._element),
                i.parentNode.insertBefore(n, i),
                i.parentNode.removeChild(i),
                s.default.onMount(this._element),
                s.default.didMount(this._element)
            }
        }
    });
    return function(e, t) {
        return r.default(u, {
            isDefined: function() {
                return null != e()
            },
            buildChildView: function() {
                return t(e)
            }
        })
    }
});