
define('submodules/dcgview/build-amd/checkbox', ["./create-class", "./spread"], function(e, t) {
    "use strict";
    function o(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var c = o(e)
      , h = o(t);
    return c.default({
        viewName: "Checkbox",
        computeChecked: function() {
            return !!this.props.checked()
        },
        template: function() {
            if (!this.props.checked)
                throw new Error('<Checkbox> expects a "checked={}" prop');
            if (!this.props.onChange)
                throw new Error('<Checkbox> expects an "onChange={}" prop');
            var e = h.default({}, this.props, {
                type: this.const("checkbox"),
                checked: this.const(this.computeChecked() ? "checked" : void 0),
                onChange: function(e) {
                    this.props.onChange(e.target.checked),
                    this._isMounted && this.update()
                }
                .bind(this)
            });
            return this.createElement("input", e)
        },
        didUpdate: function() {
            this.rootDOM || (this.rootDOM = this.findRootNode());
            var e = this.computeChecked();
            this.rootDOM.checked !== e && (this.rootDOM.checked = e)
        }
    })
});