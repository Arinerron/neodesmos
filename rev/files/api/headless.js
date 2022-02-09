define('api/headless', ["require", "exports", "main/calc_headless", "graphing-calc/json/config-options", "main/shared-clock-bus", "main/shared-worker-pool", "graphing-calc/api/sanitize-expression", "underscore_model", "lib/console"], function(require, t, e, o, s, i, r, n, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function() {
        function t() {
            var r = this;
            if (!(this instanceof t))
                return new t;
            this._calc = new e.HeadlessCalc(i.default,o.validateConfigOptions({})),
            this.controller = this._calc.controller,
            this._sharedClockBusToken = s.subscribe(function() {
                r._calc.tick()
            })
        }
        return t.prototype.destroy = function() {
            function t(t) {
                p.warn("You've destroyed this API instance. You can no longer call ." + t + "()")
            }
            for (var e in this._calc.destroy(),
            s.unsubscribe(this._sharedClockBusToken),
            this)
                "function" == typeof this[e] ? this[e] = t.bind(this, e) : this.hasOwnProperty(e) && delete this[e];
            this.destroy = function() {}
        }
        ,
        t.prototype.setExpression = function(t) {
            var e = this.controller.getItemModel(t.id)
              , o = e && e.type
              , s = r.validateItem(t, o, this.controller);
            if (s)
                if (o)
                    this.controller.dispatch({
                        type: "set-expression-properties-from-api",
                        id: s.id,
                        properties: s
                    });
                else {
                    if ("image" === s.type)
                        return;
                    this.controller.dispatch({
                        type: "add-item-to-end-from-api",
                        state: s
                    })
                }
        }
        ,
        t.prototype.setExpressions = function(t) {
            t.forEach(this.setExpression.bind(this))
        }
        ,
        t.prototype.removeExpression = function(t) {
            var e = t.id.toString();
            this.controller.dispatch({
                type: "remove-item-by-id",
                id: e
            })
        }
        ,
        t.prototype.removeExpressions = function(t) {
            t.forEach(this.removeExpression.bind(this))
        }
        ,
        t.prototype.getState = function(t) {
            return this.controller.getState(t)
        }
        ,
        t.prototype.getExpressions = function() {
            return this.getState({
                stripDefaults: !1
            }).expressions.list.map(r.sanitizeItem)
        }
        ,
        t.prototype.setBlank = function(t) {
            this.controller.dispatch({
                type: "set-blank",
                opts: t || {}
            })
        }
        ,
        t.prototype.setState = function(t, e) {
            this.controller.dispatch({
                type: "set-state",
                state: t,
                opts: e || {}
            })
        }
        ,
        t.prototype.HelperExpression = function(t) {
            var e = t && t.latex || ""
              , o = new n.UnderscoreModel;
            return o.latex = e,
            this.controller.dispatch({
                type: "add-helper-expression",
                state: {
                    type: "helper-expression",
                    id: this.controller.generateId(),
                    latex: e,
                    proxy: o
                }
            }),
            o
        }
        ,
        t.prototype.resize = function() {}
        ,
        t
    }();
    t.default = a
});