
define('expressions/image-icon-view', ["require", "exports", "tslib", "lib/coerce-url", "dcgview", "main/manage-focus-helper", "../dcgview-helpers/tooltipped-error", "./circular-icon-view", "jquery.handleevent", "loadcss!./image-icon-view"], function(require, e, t, o, n, i, r, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = n.Components.SwitchUnion
      , s = function(e) {
        function s() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(s, e),
        s.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller()
        }
        ,
        s.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-expression-icon-container dcg-image-icon-container")
            }, c(this.bindFn(this.typeOfIcon), {
                error: function() {
                    return n.createElement(r.TooltippedError, {
                        error: function() {
                            return e.controller.unpack(e.model.error)
                        },
                        isWhite: e.bindFn(e.isSelected),
                        gravity: e.const("se")
                    })
                },
                failed: function() {
                    return n.createElement("span", null)
                },
                loading: function() {
                    return n.createElement(l.CircularIconView, {
                        iconType: e.const("loading")
                    })
                },
                hidden: function() {
                    return e.buildIconView()
                },
                image: function() {
                    return e.buildIconView()
                }
            }))
        }
        ,
        s.prototype.buildIconView = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-circular-icon-container"),
                role: n.const("button"),
                tabindex: n.const("0"),
                "model-id": function() {
                    return e.model.id
                },
                "aria-label": this.bindFn(this.getIconAriaLabel),
                onTap: function(t) {
                    if (!t.wasHandled("dragdrop") && !t.wasLongheld())
                        return e.myOptionsOpen() || e.controller.isInEditListMode() || t.shiftKey ? e.toggleOptions(t) : void e.toggleImageShown()
                },
                onLongHold: function(t) {
                    t.handle("dcg-longhold"),
                    t.handle("dcg-tap"),
                    e.toggleOptions(t)
                },
                manageFocus: this.const(i.manageFocusHelper({
                    controller: this.controller,
                    location: {
                        type: "image-icon",
                        id: this.model.id
                    }
                }))
            }, n.createElement(l.CircularIconView, {
                iconType: function() {
                    return "hidden" === e.typeOfIcon() ? "hidden" : "background"
                },
                backgroundImage: this.bindFn(this.getBackgroundImage),
                backgroundOpacity: this.const(1),
                whiteIcon: this.bindFn(this.isSelected)
            }))
        }
        ,
        s.prototype.isSelected = function() {
            return this.controller.isItemSelected(this.model.id) || this.controller.isItemBeingDragged(this.model.id)
        }
        ,
        s.prototype.typeOfIcon = function() {
            return "loading" === this.model.loadStatus ? "loading" : "failed" === this.model.loadStatus ? "failed" : this.hasError() ? "error" : this.model.shouldGraph ? "image" : "hidden"
        }
        ,
        s.prototype.myOptionsOpen = function() {
            var e = this.controller.getOpenItemMenu();
            return !!e && e.model === this.model
        }
        ,
        s.prototype.toggleOptions = function(e) {
            this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "image",
                    model: this.model,
                    focusFirstOption: "keyboard" === e.device
                }
            })
        }
        ,
        s.prototype.hasError = function() {
            return !!this.model.error && "none" === this.controller.getBrailleMode()
        }
        ,
        s.prototype.getBackgroundImage = function() {
            return this.model.image_url === this.lastURL || (this.lastURL = this.model.image_url,
            this.lastEncodedURL = 'url("' + o.coerceURL(this.model.image_url) + '")'),
            this.lastEncodedURL
        }
        ,
        s.prototype.toggleImageShown = function() {
            this.controller.dispatch({
                type: "toggle-item-hidden",
                id: this.model.id
            }),
            this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "image-icon",
                    id: this.model.id
                }
            })
        }
        ,
        s.prototype.getIconAriaLabel = function() {
            return this.myOptionsOpen() ? this.controller.s("graphing-calculator-narration-hide-options") : this.controller.isInEditListMode() ? this.controller.s("graphing-calculator-narration-show-options") : this.model.hidden ? this.controller.s("graphing-calculator-narration-show-image") : this.controller.s("graphing-calculator-narration-hide-image")
        }
        ,
        s
    }(n.Class);
    e.default = s
});