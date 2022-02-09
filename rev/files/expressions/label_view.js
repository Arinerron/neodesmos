define('expressions/label_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/expression", "core/graphing-calc/json/expression", "loadcss!./label_view", "loadcss!toggle"], function(require, e, t, l, o, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = l.Components
      , i = a.Input
      , c = a.IfElse
      , r = function(e) {
        function a() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(a, e),
        a.prototype.template = function() {
            var e = this;
            return this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id,
            l.createElement("div", {
                class: function() {
                    return {
                        "dcg-label-visible": e.getShowLabel(),
                        "dcg-label-container": !0,
                        "dcg-do-blur": !0
                    }
                },
                tapboundary: l.const("true"),
                handleEvent: l.const("true")
            }, l.createElement("span", {
                role: l.const("checkbox"),
                "aria-checked": this.bindFn(this.getShowLabel),
                tabindex: l.const("0"),
                class: function() {
                    return {
                        "dcg-checkbox": !0,
                        "dcg-checkbox-label-colon": e.getShowLabel() && !e.hasEditableLabel()
                    }
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-button-label")
                },
                onTap: this.bindFn(this.onCheckboxInput)
            }, l.createElement("span", {
                class: function() {
                    return {
                        "dcg-checkbox-box": !0,
                        "dcg-checked": e.getShowLabel()
                    }
                }
            }, l.createElement("i", {
                class: l.const("dcg-icon-check")
            })), l.const(" "), l.createElement("span", {
                class: l.const("dcg-checkbox-label"),
                "aria-hidden": l.const("true")
            }, function() {
                return e.controller.s("graphing-calculator-button-label")
            })), c(this.bindFn(this.hasEditableLabel), {
                true: function() {
                    return l.createElement("div", {
                        class: l.const("dcg-editable-mode-toggle")
                    }, l.createElement("div", {
                        class: l.const("dcg-option-toggle-view")
                    }, l.createElement("div", {
                        class: l.const("dcg-toggle-container")
                    }, l.createElement("div", {
                        class: l.const("dcg-toggle")
                    }, l.createElement("div", {
                        class: function() {
                            return {
                                "dcg-toggle-option": !0,
                                "dcg-selected-toggle": e.model.editableLabelMode === n.EditableLabelMode.Math
                            }
                        },
                        role: l.const("button"),
                        tabindex: l.const(0),
                        "aria-pressed": function() {
                            return e.model.editableLabelMode === n.EditableLabelMode.Math
                        },
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-editable-label-mode-editable-math")
                        },
                        didMount: function(t) {
                            void 0 !== e.lastToggleOption && "math" === e.lastToggleOption && (e.lastToggleOption = void 0,
                            t.focus())
                        },
                        onTap: function() {
                            e.lastToggleOption = "Editable Math",
                            e.controller.dispatch({
                                type: "set-item-editable-label-mode",
                                id: e.id,
                                editableLabelMode: n.EditableLabelMode.Math
                            })
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-button-editable-math")
                    }), l.createElement("div", {
                        class: function() {
                            return {
                                "dcg-toggle-option": !0,
                                "dcg-selected-toggle": e.model.editableLabelMode === n.EditableLabelMode.Text
                            }
                        },
                        role: l.const("button"),
                        tabindex: l.const(0),
                        "aria-pressed": function() {
                            return e.model.editableLabelMode === n.EditableLabelMode.Text
                        },
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-editable-label-mode-editable-text")
                        },
                        didMount: function(t) {
                            void 0 !== e.lastToggleOption && "text" === e.lastToggleOption && (e.lastToggleOption = void 0,
                            t.focus())
                        },
                        onTap: function() {
                            e.lastToggleOption = "Editable Text",
                            e.controller.dispatch({
                                type: "set-item-editable-label-mode",
                                id: e.id,
                                editableLabelMode: n.EditableLabelMode.Text
                            })
                        }
                    }, function() {
                        return e.controller.s("graphing-calculator-button-editable-text")
                    })))))
                },
                false: function() {
                    return l.createElement(i, {
                        class: function() {
                            return {
                                "dcg-label-input": !0,
                                "dcg-disabled-input": e.getIsDisabled(),
                                "dcg-disabled-editable-input": e.hasEditableLabel()
                            }
                        },
                        "aria-label": function() {
                            return e.controller.s("graphing-calculator-narration-label-text")
                        },
                        "aria-disabled": function() {
                            return e.getIsDisabled() || e.hasEditableLabel()
                        },
                        value: e.bindFn(e.getLabel),
                        onInput: e.bindFn(e.onLabelInput)
                    })
                }
            }))
        }
        ,
        a.prototype.getLabel = function() {
            return this.model.label || ""
        }
        ,
        a.prototype.hasEditableLabel = function() {
            return o.hasEditableLabel(this.model)
        }
        ,
        a.prototype.getShowLabel = function() {
            return !!this.model.showLabel
        }
        ,
        a.prototype.getIsDisabled = function() {
            return 0 === this.getLabel().length && !this.getShowLabel()
        }
        ,
        a.prototype.onLabelInput = function(e) {
            var t = e;
            this.controller.dispatch({
                type: "set-item-label",
                id: this.id,
                label: t
            }),
            this.controller.dispatch({
                type: "set-item-showlabel",
                id: this.id,
                showLabel: !!t
            })
        }
        ,
        a.prototype.onCheckboxInput = function() {
            this.controller.dispatch({
                type: "set-item-showlabel",
                id: this.id,
                showLabel: !this.getShowLabel()
            })
        }
        ,
        a
    }(l.Class);
    e.default = r
});
