
define('submodules/dcgview/build-amd/create-class', ["./create-element", "./mounting", "./update", "./const", "./spread"], function(t, e, r, n, o) {
    "use strict";
    function i(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var s = i(t)
      , p = i(e)
      , a = i(r)
      , f = i(n)
      , u = i(o);
    return function(t) {
        if (!t)
            throw new Error("must pass a spec to DCGView.createClass");
        if ("function" != typeof t.template)
            throw new Error("must pass a template function to DCGView.createClass");
        var e = function(e, r) {
            this._viewName = t.viewName || (this.constructor ? this.constructor.name : "Anonymous DCGView"),
            this._setupProps(e, r),
            this.init && this.init(),
            this._callTemplate()
        };
        for (var r in e.prototype._setupProps = function(t, e) {
            if (t) {
                for (var r in t) {
                    var n = t[r];
                    if ("function" != typeof n && void 0 !== n)
                        throw new Error('The "' + r + '" prop must be a function. It is: ' + JSON.stringify(n))
                }
                this.props = t
            } else
                this.props = {};
            this.children = e,
            this._childViews = [],
            this._bindings = {}
        }
        ,
        e.prototype._callTemplate = function() {
            if (this._element = this.template(),
            !this._element || !this._element._isDCGElement)
                throw new Error("template() must return a DCGElement");
            this._element._parentElement = this
        }
        ,
        e.prototype.bindFn = function(t) {
            return t.bind(this)
        }
        ,
        e.prototype.findRootNode = p.default.findRootNode,
        e.prototype.renderToDocFrag = p.default.renderToDocFrag,
        e.prototype.const = f.default.makeConst,
        e.prototype.spread = u.default,
        e.prototype.createElement = s.default,
        e.prototype.update = a.default.update,
        e.prototype.traceViewHierarchy = function() {
            for (var t = [], e = this._parentElement; e; e = e._parentElement)
                t.unshift(e);
            var r = t.concat([this]).filter(function(t) {
                return !!t._isDCGView && (!(t._isDCGSwitch && t._parentElement && t._parentElement._isDCGIf) && !(t._isDCGIfDefinedWrapper || t._isDCGSwitchWrapper || t._isDCGSwitchUnionWrapper))
            }).map(function(t, e) {
                for (var r = ""; e-- > 0; )
                    r += "  ";
                return r + "<" + t._viewName + ">"
            }).join("\n");
            return {
                ancestors: t,
                formatted: r
            }
        }
        ,
        t)
            if (t.hasOwnProperty(r)) {
                if (e.prototype.hasOwnProperty(r))
                    throw new Error("Cannot override the " + r + "() method");
                e.prototype[r] = t[r]
            }
        return e._isDCGViewClass = !0,
        e.prototype._isDCGView = !0,
        e.prototype._isDCGElement = !0,
        e
    }
});