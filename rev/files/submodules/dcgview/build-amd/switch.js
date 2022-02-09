
define('submodules/dcgview/build-amd/switch', ["./create-class", "./const", "./mounting"], function(e, t, i) {
    "use strict";
    function n(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var s = n(e)
      , r = n(t)
      , o = n(i)
      , h = s.default({
        viewName: "SwitchWrapper",
        _isDCGSwitchWrapper: !0,
        template: function() {
            return this.children[0]
        }
    });
    return s.default({
        viewName: "Switch",
        _isDCGSwitch: !0,
        updateKey: function() {
            this._key = this.props.key()
        },
        createView: function() {
            var e = this._viewFunction(this._key);
            null == e && (e = this.createElement("div", {
                style: this.const("display: none")
            }));
            var t = this.createElement(h, null, e);
            return t._parentElement = this,
            t
        },
        template: function() {
            if (this._key = void 0,
            "function" != typeof this.props.key)
                throw new Error("<Switch key={}> must be a function");
            if (1 !== this.children.length)
                throw new Error("<Switch> expects a single child. You passed " + this.children.length);
            if (this._viewFunction = this.children[0],
            this._viewFunction && this._viewFunction._isDCGElement)
                throw new Error("<Switch> expects a function that constructs a DCGElement. You passed a DCGElement directly");
            if ("function" != typeof this._viewFunction) {
                var e = JSON.stringify(this._viewFunction);
                throw new Error("<Switch> expects a function that constructs a DCGElement. You passed " + e)
            }
            if (r.default.isConst(this._viewFunction))
                throw new Error("<Switch> expects a function that constructs a DCGElement. You passed a constant");
            return this.updateKey(),
            this.createView()
        },
        overrideChildUpdates: function() {
            var e = this._key;
            if (this.updateKey(),
            e === this._key)
                this._element.update();
            else {
                var t = this.findRootNode()
                  , i = document.createTextNode("");
                t.parentNode.insertBefore(i, t),
                o.default.willUnmount(this._element),
                this._childViews = [],
                t.parentNode.removeChild(t),
                o.default.onUnmount(this._element),
                o.default.didUnmount(this._element),
                this._element = this.createView();
                var n = o.default.createNodeForView(this._element, this);
                o.default.willMount(this._element),
                i.parentNode.insertBefore(n, i),
                i.parentNode.removeChild(i),
                o.default.onMount(this._element),
                o.default.didMount(this._element)
            }
        }
    })
});