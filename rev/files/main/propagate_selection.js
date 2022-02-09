
define('main/propagate_selection', ['require', 'graphing-calc/models/table'], function(require) {
    "use strict";
    var e = require("graphing-calc/models/table");
    function t(t) {
        var d = t && t.id;
        if (t && "table" === t.type) {
            var i = e.getSelectedCell(t);
            if (i) {
                var l = t.columnModels[i.column];
                d = l ? l.id : void 0
            } else
                d = void 0
        }
        if (t && "folder" === t.type) {
            var r = t.selectedHiddenChild;
            d = r ? r.id : void 0
        }
        return d
    }
    return {
        getSelectedId: t,
        propagateSelection: function(e, d, i, l) {
            var r = t(e.getSelectedItem());
            return r !== l && d.select(r),
            r
        }
    }
});