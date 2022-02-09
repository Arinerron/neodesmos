
define('submodules/dcgview/build-amd/input', ["./create-class", "./spread"], function(t, e) {
    "use strict";
    function i(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var n = i(t)
      , s = i(e);
    return n.default({
        viewName: "Input",
        computeValue: function() {
            var t = this.props.value();
            return null == t ? "" : t + ""
        },
        template: function() {
            if (!this.props.value)
                throw new Error('<Input> expects a "value={}" prop');
            if (!this.props.onInput)
                throw new Error('<Input> expects an "onInput={}" prop');
            var t = s.default({}, this.props, {
                value: this.const(this.computeValue()),
                onInput: function(t) {
                    this.props.onInput(t.target.value),
                    this._isMounted && this.update()
                }
                .bind(this)
            });
            return this.props.onEnterPressed && (t.onKeypress = function(t) {
                13 === t.which && this.props.onEnterPressed()
            }
            .bind(this)),
            this.props.disabled && (t.disabled = function() {
                return !!this.props.disabled() || void 0
            }
            .bind(this)),
            t.hasOwnProperty("tabindex") || (t.tabindex = function() {
                return this.props.disabled && this.props.disabled() ? "-1" : "0"
            }
            .bind(this)),
            this.createElement("input", t)
        },
        didUpdate: function() {
            this.rootDOM || (this.rootDOM = this.findRootNode());
            var t = this.computeValue();
            this.rootDOM.value !== t && (this.rootDOM.value = t)
        }
    })
});