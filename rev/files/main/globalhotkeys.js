define('main/globalhotkeys', ["require", "exports", "browser", "keys", "jquery", "lib/aria"], function(require, e, t, o, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = 0
      , a = function() {
        function e(e, t, o) {
            this.__id = i++,
            this.controller = e,
            this.headerController = t,
            this.userController = t.userController,
            this.mygraphsController = t.mygraphsController,
            this.instanceHotkeys = o,
            this.startListening()
        }
        return e.prototype.remove = function() {
            this.stopListening()
        }
        ,
        e.prototype.startListening = function() {
            var e = this;
            this.isListening || (n(document).on("keydown.dcg-global-keyboard-listener-" + this.__id, function(t) {
                return e.handleGlobalKeydown(t)
            }),
            this.isListening = !0)
        }
        ,
        e.prototype.stopListening = function() {
            this.isListening && (n(document).off("keydown.dcg-global-keyboard-listener-" + this.__id),
            this.isListening = !1)
        }
        ,
        e.prototype.handleGlobalKeydown = function(e) {
            var t = !1;
            if (o.isUndo(e) || o.isRedo(e)) {
                var r = this.controller.getRootElt();
                (!r || document.activeElement && document.activeElement != document.body && !n(document.activeElement).closest(r).length) && (t = !0)
            } else if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || o.lookup(e) !== o.ESCAPE) {
                if (o.isHelp(e))
                    e.preventDefault(),
                    e.stopPropagation(),
                    t = !0,
                    this.headerController.dispatch({
                        type: "show-modal",
                        modal: "hotkeys",
                        device: "keyboard"
                    });
                else if (e.ctrlKey && (e.altKey || e.metaKey) && !e.shiftKey)
                    if ("A" === o.lookupChar(e))
                        if (e.preventDefault(),
                        e.stopPropagation(),
                        t = !0,
                        this.userController.isLoggedIn())
                            this.focusElement(n(document).find(".dcg-header .dcg-account-link"), this.controller.s("graphing-calculator-narration-unable-to-activate-account-menu"));
                        else {
                            var i = n(document).find(".dcg-sign-in");
                            this.triggerKeyboardTapEvent(i)
                        }
                    else
                        "L" === o.lookupChar(e) ? (e.preventDefault(),
                        e.stopPropagation(),
                        t = !0,
                        this.focusElement(n(document).find(".dcg-action-language"), this.controller.s("graphing-calculator-narration-unable-to-activate-language-menu"))) : "H" === o.lookupChar(e) ? (e.preventDefault(),
                        e.stopPropagation(),
                        t = !0,
                        this.focusElement(n(document).find(".dcg-action-help"), this.controller.s("graphing-calculator-narration-unable-to-activate-help-menu"))) : "S" === o.lookupChar(e) && (e.preventDefault(),
                        e.stopPropagation(),
                        t = !0,
                        this.focusElement(n(document).find(".dcg-action-share"), this.controller.s("graphing-calculator-narration-unable-to-activate-share-menu")))
            } else
                t = this.handleEscape(e);
            t || this.instanceHotkeys.handleKeydown(e)
        }
        ,
        e.prototype.handleEscape = function(e) {
            var o = !1
              , r = "none" !== this.headerController.getModalState().modal
              , i = "none" !== this.headerController.getOpenMenu()
              , a = !!n(".graph-preview").length
              , l = this.mygraphsController.isMygraphsOpen()
              , s = !1;
            if (r ? (this.headerController.dispatch({
                type: "close-modal"
            }),
            s = !0) : i ? (this.headerController.dispatch({
                type: "toggle-menu",
                payload: "none"
            }),
            s = !0) : a ? (this.triggerKeyboardTapEvent(n(".dcg-action-close-resources:visible")),
            s = !0) : l && (this.headerController.dispatch({
                type: "close-mygraphs"
            }),
            s = !0),
            s) {
                if (!t.IS_MOBILE)
                    if (a || r && l)
                        r && l && n(".new-blank-graph").trigger("focus");
                    else {
                        var c = this.controller.getSelectedItem();
                        if (c)
                            this.controller.dispatch({
                                type: "move-focus-to-item",
                                id: c.id
                            });
                        else {
                            var h = this.controller.getItemModelByIndex(0);
                            h && this.controller.dispatch({
                                type: "move-focus-to-item",
                                id: h.id
                            })
                        }
                    }
                e.preventDefault(),
                e.stopPropagation(),
                o = !0
            }
            return o
        }
        ,
        e.prototype.triggerKeyboardTapEvent = function(e) {
            var t = n.Event("dcg-tap");
            t.device = "keyboard",
            e.trigger(t)
        }
        ,
        e.prototype.focusElement = function(e, t) {
            e.length ? this.triggerKeyboardTapEvent(e) : t && r.alert(t)
        }
        ,
        e
    }();
    e.default = a
});
