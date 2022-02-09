
define('submodules/dcgview/build-amd/update', ["./bindings", "./warnings"], function(t, i) {
    "use strict";
    function e(t) {
        return t && "object" == typeof t && "default"in t ? t : {
            default: t
        }
    }
    var d = e(t)
      , n = e(i);
    return {
        update: function() {
            if (!this._isMounted)
                return n.default.warn("Trying to update view that is not mounted. Ignoring update.", this);
            if (!this.shouldUpdate || this.shouldUpdate()) {
                if (this.willUpdate && this.willUpdate(),
                d.default.invoke(this, "willUpdate"),
                d.default.invoke(this, "onUpdate"),
                this.onUpdate && this.onUpdate(),
                this.overrideChildUpdates)
                    this.overrideChildUpdates();
                else
                    for (var t = this._childViews, i = t.length, e = 0; e < i; e++)
                        t[e].update();
                d.default.invoke(this, "didUpdate"),
                this.didUpdate && this.didUpdate()
            }
        }
    }
});