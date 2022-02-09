define('submodules/dcgview/build-amd/if', ["./create-class", "./const", "./switch"], function(t, e, n) {
    "use strict";
    function i(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var r = i(t)
      , s = i(e)
      , c = i(n);
    return r.default({
        viewName: "If",
        _isDCGIf: !0,
        template: function() {
            if ("function" != typeof this.props.predicate)
                throw new Error("<If predicate={}> must be a function");
            if (1 !== this.children.length)
                throw new Error("<If> expects a single child. You passed " + this.children.length);
            if (this._viewFunction = this.children[0],
            this._viewFunction && this._viewFunction._isDCGElement)
                throw new Error("<If> expects a function that constructs a DCGElement. You passed a DCGElement directly");
            if ("function" != typeof this._viewFunction) {
                var t = JSON.stringify(this._viewFunction);
                throw new Error("<If> expects a function that constructs a DCGElement. You passed " + t)
            }
            if (s.default.isConst(this._viewFunction))
                throw new Error("<If> expects a function that constructs a DCGElement. You passed a constant");
            var e = function() {
                return !!this.props.predicate()
            }
            .bind(this)
              , n = function(t) {
                if (t)
                    return this._viewFunction()
            }
            .bind(this);
            return this.createElement(c.default, {
                key: e
            }, n)
        }
    })
});