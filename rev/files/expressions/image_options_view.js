define('expressions/image_options_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/image", "graphing-calc/models/expression", "dcgview-helpers/checkbox", "./circular-icon-view", "expressions/expression-menus/clickable", "lib/coerce-url"], function(require, e, t, n, o, r, i, c, a, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ImageOptionsView = void 0;
    var s = n.Components
      , g = s.For
      , d = s.If
      , u = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            n.createElement("div", {
                class: n.const("dcg-image-options-menu dcg-options-menu")
            }, n.createElement("div", {
                class: n.const("dcg-triangle")
            }), n.createElement("div", {
                class: n.const("dcg-opacities-menu dcg-dividing-line-after")
            }, n.createElement("div", {
                role: n.const("heading"),
                "aria-level": n.const("2"),
                class: n.const("dcg-title")
            }, function() {
                return e.controller.s("graphing-calculator-heading-image-opacity")
            }), n.createElement(g, {
                each: function() {
                    return e.controller.getImageOpacities()
                }
            }, n.createElement("div", {
                class: n.const("dcg-opacities-menu-flex"),
                role: n.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-heading-image-opacity")
                }
            }, function(t) {
                return n.createElement("span", {
                    class: n.const("dcg-opacity-option"),
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-label": function() {
                        return "opacity: " + t
                    },
                    "aria-pressed": function() {
                        return e.isOpacitySelected(t)
                    },
                    handleevent: n.const("true"),
                    onTap: function() {
                        return e.onSelectOpacity(t)
                    }
                }, n.createElement(c.CircularIconView, {
                    backgroundImage: e.bindFn(e.getBackgroundImage),
                    iconType: function() {
                        return e.isOpacitySelected(t) ? "check" : "none"
                    },
                    backgroundOpacity: function() {
                        return parseFloat(t)
                    }
                }))
            }))), n.createElement("div", {
                class: n.const("dcg-styles-div dcg-options-menu-section")
            }, n.createElement("div", {
                class: n.const("dcg-styles-menu"),
                role: n.const("group"),
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-narration-image-styles")
                }
            }, n.createElement(i.Checkbox, {
                checked: function() {
                    return !e.model.foreground
                },
                onChange: this.bindFn(this.onToggleForeground),
                ariaLabel: function() {
                    return e.controller.s("graphing-calculator-button-place-image-behind-graphs")
                }
            }, function() {
                return e.controller.s("graphing-calculator-button-place-image-behind-graphs")
            })), n.createElement(d, {
                predicate: function() {
                    return e.shouldShowDraggableCheckbox()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-draggable-checkbox-container")
                }, n.createElement(i.Checkbox, {
                    checked: function() {
                        return o.isActuallyDraggable(e.model)
                    },
                    onChange: e.bindFn(e.onToggleDraggable),
                    ariaLabel: function() {
                        return e.controller.s("graphing-calculator-button-draggable")
                    }
                }, function() {
                    return e.controller.s("graphing-calculator-button-draggable")
                }))
            }), n.createElement(d, {
                predicate: this.bindFn(this.shouldShowClickable)
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-clickable-image-controls")
                }, n.createElement(a.ClickableMenu, t.__assign({}, e.props, {
                    isOpen: function() {
                        return !!e.model.clickableInfo.enabled
                    },
                    isFirstOpenSection: e.const(!1)
                })))
            })))
        }
        ,
        s.prototype.onToggleDraggable = function() {
            o.getCenterExternalReferencedModel(this.model) ? this.controller.dispatch({
                type: "set-image-draggable",
                id: this.id,
                draggable: !this.model.draggable
            }) : this.makeDraggable()
        }
        ,
        s.prototype.onToggleForeground = function(e) {
            this.controller.dispatch({
                type: "set-image-in-foreground",
                id: this.id,
                foreground: !e
            })
        }
        ,
        s.prototype.onSelectOpacity = function(e) {
            this.controller.dispatch({
                type: "set-image-opacity",
                id: this.id,
                opacity: e
            })
        }
        ,
        s.prototype.isOpacitySelected = function(e) {
            return this.model.opacity === e
        }
        ,
        s.prototype.getBackgroundImage = function() {
            return this.model.image_url === this.lastURL || (this.lastURL = this.model.image_url,
            this.lastEncodedURL = 'url("' + l.coerceURL(this.model.image_url) + '")'),
            this.lastEncodedURL
        }
        ,
        s.prototype.shouldShowClickable = function() {
            return this.controller.areActionsEnabled()
        }
        ,
        s.prototype.makeDraggable = function() {
            this.controller.dispatch({
                type: "convert-image-to-draggable",
                id: this.model.id
            })
        }
        ,
        s.prototype.shouldShowDraggableCheckbox = function() {
            var e = o.getCenterExternalReferencedModel(this.model);
            return e ? r.isPotentiallyMovable(e) : o.canConvertToDraggableImage(this.model)
        }
        ,
        s
    }(n.Class);
    e.ImageOptionsView = u
});
