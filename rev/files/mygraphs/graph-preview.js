
define('mygraphs/graph-preview', ["require", "exports", "tslib", "dcgview", "jquery", "mygraphs/load-graph-view", "loadcss!./graph-preview"], function(require, t, e, r, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GraphPreview = void 0;
    var i = r.Components.If
      , n = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.didMountGraphPreview = function(t) {
            return this.$graphPreview = o(t),
            this.updateGraphPreviewTop()
        }
        ,
        n.prototype.didMountArrow = function(t) {
            return this.$arrow = o(t),
            this.updateArrowTop()
        }
        ,
        n.prototype.didMountCalc = function(t) {
            return this.previewCalc = this.props.makeAPI(t),
            this.updatePreviewCalc()
        }
        ,
        n.prototype.willUnmountCalc = function() {
            this.previewCalc && this.previewCalc.destroy && this.previewCalc.destroy()
        }
        ,
        n.prototype.didUpdate = function() {
            return this.updateGraphPreviewTop(),
            this.updateArrowTop(),
            this.updatePreviewCalc()
        }
        ,
        n.prototype.updateGraphPreviewTop = function() {
            return this.$graphPreview.css("top", this.getTopOffset() + "px")
        }
        ,
        n.prototype.updateArrowTop = function() {
            this.$arrow.css("top", this.getArrowOffset() + "px")
        }
        ,
        n.prototype.updatePreviewCalc = function() {
            var t = this.props.getGraphData();
            t !== this.cachedGraphData && (this.cachedGraphData = t,
            this.previewCalc.setState(t),
            this.previewCalc.resize())
        }
        ,
        n.prototype.getMaxTop = function() {
            return o(window).height() - this.$graphPreview.outerHeight() - 10
        }
        ,
        n.prototype.getIdealTop = function() {
            var t = this.props.alignToNode();
            return null == t ? null : o(t).offset().top + .5 * o(t).outerHeight() - 60
        }
        ,
        n.prototype.getTopOffset = function() {
            var t = this.getIdealTop();
            if (null == t)
                return 0;
            var e = this.getMaxTop();
            return Math.min(t, e)
        }
        ,
        n.prototype.getArrowOffset = function() {
            var t = this.getIdealTop();
            return null == t ? 60 : 60 + t - this.getTopOffset()
        }
        ,
        n.prototype.template = function() {
            var t = this;
            return r.createElement("div", {
                class: r.const("graph-preview"),
                didMount: this.didMountGraphPreview.bind(this)
            }, r.createElement("span", {
                role: r.const("button"),
                tabindex: r.const("0"),
                class: r.const("dcg-pull-right dcg-btn-light-gray dcg-action-cancel"),
                onTap: this.props.onCancel
            }, function() {
                return t.props.s("account-shell-button-mygraphs-cancel")
            }), r.createElement("h4", {
                class: r.const("dcg-title")
            }, this.props.getTitle), r.createElement("div", {
                class: r.const("preview-graph-area")
            }, r.createElement(i, {
                predicate: function() {
                    return !t.props.getGraphData()
                }
            }, function() {
                return r.createElement(a.LoadGraphView, {
                    didDataLoadFail: t.props.didDataLoadFail,
                    onCancel: t.props.onCancel,
                    requestLoadGraphData: t.props.requestLoadGraphData,
                    s: t.props.s.bind(t.props)
                })
            }), r.createElement("div", {
                didMount: this.didMountCalc.bind(this),
                willUnmount: this.willUnmountCalc.bind(this),
                class: function() {
                    return {
                        "dcg-preview-calculator": !0,
                        "dcg-visible": t.props.getGraphData()
                    }
                }
            }), r.createElement("div", {
                class: function() {
                    return {
                        "screenshot-clickjack": !0,
                        "dcg-action-open-graph": !0,
                        "dcg-visible": t.props.getGraphData()
                    }
                }
            }, r.createElement("span", {
                role: r.const("button"),
                tabindex: r.const("0"),
                class: r.const("dcg-action-open-graph dcg-open-graph-btn dcg-btn-blue"),
                onTap: this.props.onOpenGraph
            }, this.props.getOpenText))), r.createElement("div", {
                class: r.const("active-arrow"),
                didMount: this.didMountArrow.bind(this)
            }, r.createElement("div", {
                class: r.const("dcg-graphic")
            })))
        }
        ,
        n
    }(r.Class);
    t.GraphPreview = n
});
