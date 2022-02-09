
define('expressions/image-view', ["require", "exports", "tslib", "keys", "jquery", "underscore", "./abstract-item-view", "./smart_textarea", "dcgview", "dcgview-helpers/mathquill-view", "lib/conditional_blur", "expressions/promptslider_view", "./image-icon-view", "./image-upload-view", "main/mathquill-operators", "graphing-calc/models/image", "./expression-edit-actions", "../shared-components/mathquill-braille-wrapper", "./expression_view", "./action-info-view", "jquery.handleevent", "loadcss!./image-view"], function(require, e, t, n, o, r, i, l, c, a, s, d, u, p, g, m, h, f, y, b) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var E = c.Components
      , v = E.If
      , F = E.SwitchUnion
      , I = function(e) {
        function i() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(i, e),
        i.prototype.init = function() {
            this.model = this.props.model(),
            this.controller = this.props.controller()
        }
        ,
        i.prototype.template = function() {
            var e = this;
            return c.createElement("div", {
                class: function() {
                    return {
                        "dcg-image-input-mathquill": !0,
                        "dcg-suffix-degree": "angle" === e.props.name() && e.props.controller().getGraphSettings().degreeMode,
                        "dcg-suffix-radian": "angle" === e.props.name() && !e.props.controller().getGraphSettings().degreeMode
                    }
                }
            }, c.createElement(f.default, t.__assign({
                latex: function() {
                    return e.model[e.props.name()]
                },
                brailleShouldFocus: function() {
                    return e.props.focusedInput() === e.props.name()
                },
                selectOnFocus: this.const(!0),
                onBrailleInput: this.bindFn(this.handleLatexChanged),
                onBrailleFocusedChanged: this.bindFn(this.handleMQFocusedChanged),
                onBrailleKeydown: this.bindFn(this.handleBrailleKeydown),
                hasError: function() {
                    return m.hasInputError(e.model, e.props.name())
                },
                ariaLabel: function() {
                    return e.controller.raw(e.props.name())
                }
            }, y.getBrailleWrapperProps(this.props.controller())), c.createElement(a.default, {
                latex: function() {
                    return e.model[e.props.name()]
                },
                isFocused: function() {
                    return e.props.focusedInput() === e.props.name()
                },
                capExpressionSize: function() {
                    return e.controller.getCapExpressionSize()
                },
                selectOnFocus: this.const(!0),
                config: this.bindFn(this.getMQConfig),
                getAriaLabel: function() {
                    return e.controller.raw(e.props.name())
                },
                getAriaPostLabel: this.const(""),
                hasError: this.const(!1),
                onUserPressedKey: function(t, n) {
                    return e.handlePressedKey(t, n)
                },
                onUserChangedLatex: this.bindFn(this.handleLatexChanged),
                onExpressionSizeExceeded: function() {
                    return e.controller.dispatch({
                        type: "expression-size-exceeded"
                    })
                },
                onFocusedChanged: this.bindFn(this.handleMQFocusedChanged),
                needsSystemKeypad: function() {
                    return !e.controller.isKeypadEnabled()
                }
            }, c.createElement("span", {
                class: function() {
                    return {
                        "dcg-focus": e.props.focusedInput() === e.props.name(),
                        "dcg-invalid": m.hasInputError(e.model, e.props.name())
                    }
                }
            }))))
        }
        ,
        i.prototype.getInputs = function() {
            return ["center", "width", "angle", "height", "opacity"]
        }
        ,
        i.prototype.handlePressedKey = function(e, t) {
            var n = this.props.name()
              , r = a.default.getFocusedMathquill()
              , i = this.getInputs()
              , l = i.indexOf(n);
            if (!this.controller.isInEditListMode()) {
                if ("Enter" === e)
                    return this.controller.dispatch({
                        type: "on-special-key-pressed",
                        key: "Enter"
                    });
                if ("Esc" === e)
                    return void s.default()
            }
            var c = -1;
            "Up" === e && (c = 1 === l ? 4 : l - 2),
            "Down" === e && (c = 4 === l ? 1 : l + 2),
            "Left" === e && (c = l - 1),
            "Right" === e && (c = l + 1);
            var d = e;
            if (c >= 0 && c < i.length) {
                var u = !1;
                if (r)
                    u = a.default.applyArrowKeyAndReturnIfWasAtBounds(r, d, t);
                else if ("Up" === e || "Down" === e)
                    u = !0;
                else {
                    var p = f.getFocusedBrailleElement();
                    u = p && ("Left" === e && 0 === p.selectionStart || "Right" === e && p.selectionStart === o(p).val().length)
                }
                u && (this.focusInput(i[c]),
                t && t.preventDefault())
            } else
                r && (r.keystroke(e, t),
                this.handleLatexChanged(r.latex()))
        }
        ,
        i.prototype.handleBrailleKeydown = function(e) {
            var t = n.lookup(e);
            t && this.handlePressedKey(t, o.Event(e))
        }
        ,
        i.prototype.focusInput = function(e) {
            this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "image",
                    id: this.model.id,
                    location: e
                }
            })
        }
        ,
        i.prototype.anyInputHasError = function() {
            var e = this;
            return r.any(this.getInputs(), function(t) {
                return m.hasInputError(e.model, t)
            })
        }
        ,
        i.prototype.handleLatexChanged = function(e) {
            var t = this.props.name();
            this.model.draggingOnGraphpaper || m.getMQAttribute(this.model, t) !== e && this.controller.dispatch({
                type: "set-image-mq-attribute",
                id: this.model.id,
                attribute: t,
                latex: e
            })
        }
        ,
        i.prototype.handleMQFocusedChanged = function(e) {
            var t = this.props.name();
            e ? this.props.focusedInput() !== t && this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "image",
                    id: this.model.id,
                    location: t
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "image",
                    id: this.model.id,
                    location: t
                }
            })
        }
        ,
        i.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: g.getAutoOperators()
            }
        }
        ,
        i
    }(c.Class)
      , x = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.didMount = function() {
            this.onItemViewMounted()
        }
        ,
        n.prototype.willUnmount = function() {
            this.onItemViewUnmounted()
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return c.createElement("div", {
                class: function() {
                    return {
                        "dcg-do-not-blur": !0,
                        "dcg-expressionitem": !0,
                        "dcg-expressionimage": !0,
                        "dcg-inFolder": !!e.model.folderId,
                        "dcg-selected": e.controller.isItemSelected(e.id),
                        "dcg-dragging": !!e.controller.isItemBeingDragged(e.id),
                        "dcg-input-focused": e.getFocusedInput() && "name" !== e.getFocusedInput()
                    }
                },
                "expr-id": function() {
                    return e.model.id
                },
                onTapStart: this.bindFn(this.onMouseSelect),
                onTap: this.bindFn(this.onMouseSelect)
            }, c.createElement("div", {
                class: c.const("dcg-fade-container")
            }, c.createElement("div", {
                class: c.const("dcg-main")
            }, F(function() {
                return e.model.loadStatus
            }, {
                failed: function() {
                    return c.createElement("div", null, c.createElement("div", {
                        class: c.const("dcg-image-failed")
                    }, function() {
                        return e.controller.s("graphing-calculator-error-failed-to-load-image")
                    }), c.createElement("div", {
                        role: c.const("button"),
                        tabindex: c.const(0),
                        class: c.const("dcg-retry-loading-image"),
                        onTap: e.bindFn(e.onRetryLoad)
                    }, function() {
                        return e.controller.s("graphing-calculator-button-load-image-retry")
                    }))
                },
                loading: function() {
                    return c.createElement("div", null, c.createElement("div", {
                        class: c.const("dcg-image-loading")
                    }, function() {
                        return e.controller.s("graphing-calculator-text-loading-image")
                    }), c.createElement("div", {
                        role: c.const("button"),
                        tabindex: c.const(0),
                        class: c.const("dcg-retry-loading-image"),
                        onTap: e.bindFn(e.onRetryLoad)
                    }, function() {
                        return e.controller.s("graphing-calculator-button-load-image-retry")
                    }))
                },
                loaded: function() {
                    return c.createElement("div", {
                        class: c.const("dcg-image-loaded")
                    }, c.createElement("div", {
                        class: c.const("dcg-image-title-row")
                    }, c.createElement(l.default, {
                        shouldFocus: function() {
                            return "name" === e.getFocusedInput()
                        },
                        text: function() {
                            return e.model.name
                        },
                        placeholder: function() {
                            return e.controller.s("graphing-calculator-text-image-enter-note-placeholder")
                        },
                        showLinks: function() {
                            return e.controller.areLinksEnabled()
                        },
                        onInput: e.bindFn(e.onNameInput),
                        onFocusChange: e.bindFn(e.onNameFocusChange),
                        onSpecialKey: e.bindFn(e.onNameSpecialKey),
                        readonly: e.const(!1)
                    }), c.createElement(v, {
                        predicate: function() {
                            return e.controller.areImagesEnabled()
                        }
                    }, function() {
                        return c.createElement(p.ImageUploadView, {
                            controller: function() {
                                return e.controller
                            },
                            ariaLabel: function() {
                                return e.controller.s("graphing-calculator-button-change-image")
                            },
                            onFileChange: function(t) {
                                return e.insertFiles(t)
                            },
                            location: e.const({
                                type: "change-image-btn",
                                id: e.id
                            })
                        }, c.createElement("div", {
                            class: c.const("dcg-action-changeimage")
                        }, function() {
                            return e.controller.s("graphing-calculator-button-change-image")
                        }))
                    })), c.createElement("div", {
                        class: function() {
                            return {
                                "dcg-do-blur": !0,
                                "dcg-image-input-grid": !0
                            }
                        },
                        handleEvent: c.const("true")
                    }, c.createElement("div", {
                        class: c.const("dcg-image-input-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-image-center")
                    }), c.createElement(I, {
                        name: e.const("center"),
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        },
                        focusedInput: e.bindFn(e.getFocusedInput)
                    }), c.createElement("div", {
                        class: c.const("dcg-image-input-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-image-width")
                    }), c.createElement(I, {
                        name: e.const("width"),
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        },
                        focusedInput: e.bindFn(e.getFocusedInput)
                    }), c.createElement("div", {
                        class: c.const("dcg-image-input-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-image-angle")
                    }), c.createElement(I, {
                        name: e.const("angle"),
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        },
                        focusedInput: e.bindFn(e.getFocusedInput)
                    }), c.createElement("div", {
                        class: c.const("dcg-image-input-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-image-height")
                    }), c.createElement(I, {
                        name: e.const("height"),
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        },
                        focusedInput: e.bindFn(e.getFocusedInput)
                    }), c.createElement("div", {
                        class: c.const("dcg-image-input-name")
                    }, function() {
                        return e.controller.s("graphing-calculator-label-image-opacity")
                    }), c.createElement(I, {
                        name: e.const("opacity"),
                        controller: function() {
                            return e.controller
                        },
                        model: function() {
                            return e.model
                        },
                        focusedInput: e.bindFn(e.getFocusedInput)
                    })))
                }
            })), c.createElement("span", {
                class: c.const("dcg-fadeout")
            }), c.createElement("i", {
                class: c.const("dcg-icon-remove dcg-top-level-delete"),
                handleEvent: c.const("true"),
                onTap: this.bindFn(this.onDelete)
            }), c.createElement(v, {
                predicate: this.bindFn(this.shouldShowBrailleError)
            }, function() {
                return c.createElement("div", {
                    class: e.getFooterClass()
                }, c.createElement("div", {
                    tabindex: c.const(0),
                    class: c.const("dcg-expression-braille-error"),
                    "aria-roledescription": c.const("error"),
                    "aria-label": function() {
                        return e.controller.unpack(e.model.error)
                    }
                }, c.createElement("i", {
                    class: c.const("dcg-icon-error")
                }), function() {
                    return e.controller.unpack(e.model.error)
                }))
            }), c.createElement(v, {
                predicate: function() {
                    return m.getMissingVariables(e.model).length > 0 && e.controller.areSlidersEnabled()
                }
            }, function() {
                return c.createElement("div", {
                    class: e.getFooterClass()
                }, c.createElement(d.default, {
                    model: e.props.model,
                    controller: e.props.controller
                }))
            }), c.createElement(v, {
                predicate: this.bindFn(this.shouldShowActionInfo)
            }, function() {
                return c.createElement("div", {
                    class: e.getFooterClass()
                }, c.createElement(b.default, {
                    model: e.props.model,
                    controller: e.props.controller
                }))
            })), c.createElement("span", {
                class: c.const("dcg-tab dcg-action-drag dcg-action-icon-touch"),
                handleevent: c.const("true"),
                tapboundary: c.const("true"),
                disablescroll: c.const("true"),
                style: c.const("touch-action:none"),
                onTapStart: this.bindFn(this.onDragPending)
            }, c.createElement("span", {
                class: c.const("dcg-num")
            }, function() {
                return e.model.displayIndex
            }), c.createElement("div", {
                class: c.const("dcg-tab-interior dcg-action-icon-mouse")
            }, c.createElement(u.default, {
                model: this.props.model,
                controller: this.props.controller
            }))), c.createElement(h.ExpressionEditActions, {
                controller: this.props.controller,
                id: function() {
                    return e.model.id
                }
            }))
        }
        ,
        n.prototype.shouldShowActionInfo = function() {
            return !!(this.model.clickableInfo && this.model.clickableInfo.enabled && this.model.clickableInfo.latex)
        }
        ,
        n.prototype.getFooterClass = function() {
            return this.isFirstRender() ? this.const("dcg-expression-bottom dcg-indent-in-folder") : this.const("dcg-expression-bottom dcg-fadein-bottom dcg-indent-in-folder")
        }
        ,
        n.prototype.onNameInput = function(e) {
            this.controller.dispatch({
                type: "set-image-name",
                id: this.id,
                name: e
            })
        }
        ,
        n.prototype.onNameFocusChange = function(e) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "image",
                    id: this.id,
                    location: "name"
                }
            }) : "name" === this.getFocusedInput() && this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "image",
                    id: this.id,
                    location: "name"
                }
            })
        }
        ,
        n.prototype.onNameSpecialKey = function(e) {
            return this.controller.dispatch({
                type: "on-special-key-pressed",
                key: e
            })
        }
        ,
        n.prototype.getFocusedInput = function() {
            var e = this.controller.getFocusLocation();
            if (e && "image" === e.type && e.id === this.model.id)
                return e.location
        }
        ,
        n.prototype.onRetryLoad = function() {
            this.controller.dispatch({
                type: "image-retry-loading",
                id: this.id
            })
        }
        ,
        n.prototype.shouldShowBrailleError = function() {
            return "none" !== this.controller.getBrailleMode() && !!this.model.error
        }
        ,
        n.prototype.insertFiles = function(e) {
            this.controller.dispatch({
                type: "change-image",
                files: e,
                id: this.id
            })
        }
        ,
        n.prototype.onMouseSelect = function(e) {
            "dcg-tap" === e.type && "mouse" === e.device || "dcg-tapstart" === e.type && "touch" === e.device || e.wasHandled() || (e.handle(),
            this.controller.dispatch({
                type: "set-selected-id",
                id: this.id
            }))
        }
        ,
        n
    }(i.default);
    e.default = x
});