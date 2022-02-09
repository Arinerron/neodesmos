define('lib/selectable-input', ["require", "exports", "tslib", "dcgview", "browser", "jquery", "loadcss!./selectable-input"], function(require, t, e, n, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.SelectableInput = void 0;
    var c = n.Components
      , a = c.Input
      , i = c.Switch
      , s = function(t) {
        function c() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.unmounted = !1,
            e
        }
        return e.__extends(c, t),
        c.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        c.prototype.template = function() {
            var t = this;
            return n.createElement("div", {
                class: n.const("dcg-selectable-input-container")
            }, n.createElement(a, {
                class: this.const("dcg-permalink select-all dcg-variable-permalink"),
                "aria-label": function() {
                    return t.props.controller().s("graphing-calculator-narration-share-graph-link")
                },
                name: function() {
                    return t.props.controller().s("graphing-calculator-text-share-graph-link")
                },
                value: this.props.link,
                didMount: function(e) {
                    t.inputEl = e,
                    r.IS_MOBILE || t.inputEl.focus()
                },
                onTap: function() {
                    return t.inputEl.select()
                },
                onInput: function() {}
            }), n.createElement("div", {
                role: n.const("button"),
                tabindex: n.const(0),
                class: n.const("dcg-copy-button"),
                onTap: this.bindFn(this.copyLink)
            }, n.createElement(i, {
                key: function() {
                    return t.copyStatus
                }
            }, function(e) {
                return "success" == e ? n.createElement("span", {
                    "aria-label": function() {
                        return t.props.controller().s("graphing-calculator-narration-share-graph-link-copied")
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-check")
                })) : "error" == e ? n.createElement("span", {
                    "aria-label": function() {
                        return t.props.controller().s("graphing-calculator-narration-share-graph-link-unable-to-copy")
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-error")
                })) : n.createElement("span", {
                    class: n.const("dcg-copy-text")
                }, function() {
                    return t.props.controller().s("graphing-calculator-button-share-graph-link-copy")
                })
            })))
        }
        ,
        c.prototype.copyLink = function() {
            var t = this;
            if (this.inputEl) {
                o(this.inputEl).trigger("focus").trigger("select"),
                this.copyStatus = "success";
                try {
                    document.execCommand("copy")
                } catch (t) {
                    this.copyStatus = "error"
                }
                this.unmounted || (this.update(),
                clearTimeout(this.copyStatusTimeout),
                this.copyStatusTimeout = setTimeout(function() {
                    t.copyStatus = null,
                    t.unmounted || t.update()
                }, 2500))
            }
        }
        ,
        c
    }(n.Class);
    t.SelectableInput = s
});
