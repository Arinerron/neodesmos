
define('expressions/exp-list-resizer', ["require", "exports", "tslib", "dcgview", "jquery", "underscore", "loadcss!./exp-list-resizer"], function(require, i, t, e, n, s) {
    "use strict";
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.ExpListResizer = void 0;
    var o = e.Components.If
      , r = function(i) {
        function r() {
            return null !== i && i.apply(this, arguments) || this
        }
        return t.__extends(r, i),
        r.prototype.init = function() {
            this.guid = s.uniqueId("dcg-exp-list-resize")
        }
        ,
        r.prototype.template = function() {
            var i = this;
            return e.createElement(o, {
                predicate: this.bindFn(this.isVisible)
            }, function() {
                return e.createElement("div", {
                    class: e.const("dcg-exp-list-resizer"),
                    onTapStart: i.bindFn(i.onTapStart)
                })
            })
        }
        ,
        r.prototype.isVisible = function() {
            return !this.props.controller().expressionsAreFullWidth() && this.props.controller().isListVisible()
        }
        ,
        r.prototype.onTapStart = function(i) {
            var t = this;
            this.initialWidth = this.props.controller().getExpListWidth(),
            this.initialLeft = i.changedTouches[0].clientX,
            n(document).on("dcg-tapmove." + this.guid, function(i) {
                if (void 0 !== t.initialLeft && void 0 !== t.initialWidth) {
                    var e = i.changedTouches[0].clientX - t.initialLeft + t.initialWidth;
                    t.props.controller().dispatch({
                        type: "resize-exp-list",
                        expListWidth: e
                    })
                }
            }),
            n(document).on("dcg-tapend." + this.guid, this.bindFn(this.onTapEnd)),
            n(document).on("dcg-tapcancel." + this.guid, this.bindFn(this.onTapEnd))
        }
        ,
        r.prototype.onTapEnd = function() {
            n(document).off("." + this.guid),
            this.initialLeft = void 0,
            this.initialWidth = void 0
        }
        ,
        r
    }(e.Class);
    i.ExpListResizer = r
});