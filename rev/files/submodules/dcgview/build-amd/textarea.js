
define('submodules/dcgview/build-amd/textarea', ["./create-class", "./spread"], function(t, e) {
    "use strict";
    function r(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var o = r(t)
      , i = r(e);
    return o.default({
        viewName: "Textarea",
        computeValue: function() {
            var t = this.props.value();
            return null == t ? "" : t + ""
        },
        template: function() {
            if (!this.props.value)
                throw new Error('<Textarea> expects a "value={}" prop');
            if (!this.props.onInput)
                throw new Error('<Textarea> expects an "onInput={}" prop');
            var t = i.default({}, this.props, {
                onInput: function(t) {
                    this.props.onInput(t.target.value),
                    this._isMounted && this.update()
                }
                .bind(this)
            });
            return this.props.disabled && (t.disabled = function() {
                return !!this.props.disabled() || void 0
            }
            .bind(this)),
            delete t.value,
            this.createElement("textarea", t, this.const(this.computeValue()))
        },
        didUpdate: function() {
            this.rootDOM || (this.rootDOM = this.findRootNode());
            var t = this.computeValue();
            this.rootDOM.value !== t && (this.rootDOM.value = t)
        }
    })
});