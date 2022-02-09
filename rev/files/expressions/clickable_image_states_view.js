define('expressions/clickable_image_states_view', ["require", "exports", "tslib", "dcgview", "../shared-components/tooltip", "./image-upload-view", "loadcss!./clickable_image_states_view"], function(require, e, t, o, r, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ClickableImageStatesView = void 0;
    var n = o.Components
      , l = n.If
      , i = n.Switch
      , c = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return o.createElement("div", {
                class: o.const("dcg-clickable-image-info-view"),
                role: o.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-narration-clickable-image-options")
                }
            }, o.createElement("div", {
                class: o.const("dcg-clickable-image-state-container")
            }, o.createElement(r.Tooltip, {
                tooltip: function() {
                    return e.tooltip("hovered")
                },
                gravity: this.const("s")
            }, o.createElement(a.ImageUploadView, {
                controller: function() {
                    return e.controller
                },
                ariaLabel: function() {
                    return e.tooltip("hovered")
                },
                onFileChange: function(t) {
                    return e.updateImage("hovered", t)
                }
            }, o.createElement(i, {
                key: this.bindFn(this.hoveredStatus)
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-clickable-image-state"),
                    style: function() {
                        return e.getStyleForState("hovered")
                    }
                })
            }))), o.createElement(l, {
                predicate: function() {
                    return !!e.model.clickableInfo.hoveredImage
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-clickable-image-state-close"),
                    onTap: function() {
                        return e.removeImageState("hovered")
                    },
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-label-remove-hovered-image")
                    },
                    role: o.const("button"),
                    tabIndex: o.const(0)
                }, o.createElement("i", {
                    class: o.const("dcg-icon-remove")
                }))
            }), o.createElement("div", {
                role: o.const("heading"),
                "aria-level": o.const("2"),
                class: o.const("dcg-clickable-image-label")
            }, function() {
                return e.controller.s("graphing-calculator-label-hovered")
            })), o.createElement("div", {
                class: o.const("dcg-clickable-image-state-container")
            }, o.createElement(r.Tooltip, {
                tooltip: function() {
                    return e.tooltip("depressed")
                },
                gravity: this.const("s")
            }, o.createElement(a.ImageUploadView, {
                controller: function() {
                    return e.controller
                },
                ariaLabel: function() {
                    return e.tooltip("depressed")
                },
                onFileChange: function(t) {
                    return e.updateImage("depressed", t)
                }
            }, o.createElement(i, {
                key: this.bindFn(this.depressedStatus)
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-clickable-image-state"),
                    style: function() {
                        return e.getStyleForState("depressed")
                    }
                })
            }))), o.createElement(l, {
                predicate: function() {
                    return !!e.model.clickableInfo.depressedImage
                }
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-clickable-image-state-close"),
                    onTap: function() {
                        return e.removeImageState("depressed")
                    },
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-label-remove-depressed-image")
                    },
                    role: o.const("button"),
                    tabIndex: o.const(0)
                }, o.createElement("i", {
                    class: o.const("dcg-icon-remove")
                }))
            }), o.createElement("div", {
                role: o.const("heading"),
                "aria-level": o.const("2"),
                class: o.const("dcg-clickable-image-label")
            }, function() {
                return e.controller.s("graphing-calculator-label-depressed")
            })))
        }
        ,
        n.prototype.hoveredStatus = function() {
            return this.hoveredUploading ? "loading" : "background"
        }
        ,
        n.prototype.depressedStatus = function() {
            return this.depressedUploading ? "loading" : "background"
        }
        ,
        n.prototype.tooltip = function(e) {
            return ("hovered" === e ? this.model.clickableInfo.hoveredImage : this.model.clickableInfo.depressedImage) ? "depressed" === e ? this.controller.s("graphing-calculator-label-change-depressed-image-tooltip") : this.controller.s("graphing-calculator-label-change-hovered-image-tooltip") : "depressed" === e ? this.controller.s("graphing-calculator-label-add-depressed-image-tooltip") : this.controller.s("graphing-calculator-label-add-hovered-image-tooltip")
        }
        ,
        n.prototype.getImageURLForState = function(e) {
            var t;
            if ("hovered" === e) {
                if ("background" !== this.hoveredStatus())
                    return "";
                t = "hoveredImage"
            } else {
                if ("background" !== this.depressedStatus())
                    return "";
                t = "depressedImage"
            }
            var o = this.model.clickableInfo[t];
            return o ? "url(" + o + ")" : "url(" + this.model.image_url + ")"
        }
        ,
        n.prototype.getStyleForState = function(e) {
            var t = {
                "background-image": this.getImageURLForState(e),
                opacity: 1
            };
            return "hovered" !== e || this.model.clickableInfo.hoveredImage || (t.opacity = .5),
            t
        }
        ,
        n.prototype.removeImageState = function(e) {
            "hovered" === e ? this.controller.dispatch({
                type: "set-hovered-image",
                id: this.model.id,
                url: ""
            }) : this.controller.dispatch({
                type: "set-depressed-image",
                id: this.model.id,
                url: ""
            })
        }
        ,
        n.prototype.updateImage = function(e, t) {
            var o = this;
            if (t && t[0]) {
                var r = t[0];
                "hovered" === e && (this.hoveredUploading = !0),
                "depressed" === e && (this.depressedUploading = !0),
                this.controller.getGraphSettings().config.imageUploadCallback(r, function(t, r) {
                    "hovered" === e && (o.hoveredUploading = !1),
                    "depressed" === e && (o.depressedUploading = !1),
                    !t && r && ("hovered" === e ? o.controller.dispatch({
                        type: "set-hovered-image",
                        id: o.model.id,
                        url: r
                    }) : o.controller.dispatch({
                        type: "set-depressed-image",
                        id: o.model.id,
                        url: r
                    }))
                })
            }
        }
        ,
        n
    }(o.Class);
    e.ClickableImageStatesView = c
});