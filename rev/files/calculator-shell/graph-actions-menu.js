define('calculator-shell/graph-actions-menu', ["require", "exports", "tslib", "dcgview", "./menu", "../shared-components/shared-options-dropdown", "jquery", "loadcss!./graph-actions-menu"], function(require, t, o, e, n, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.GraphActionsMenu = void 0;
    var s = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(s, t),
        s.prototype.template = function() {
            var t = this;
            return e.createElement(n.Menu, {
                type: this.const("graph-actions"),
                label: function() {
                    return t.props.controller().s("account-shell-label-graph-actions")
                },
                controller: this.props.controller,
                left: function() {
                    return t.left
                },
                arrowLeft: function() {
                    return t.arrowLeft
                }
            }, e.createElement(r.OptionsDropdownList, {
                class: this.const("dcg-graph-actions-list"),
                options: this.bindFn(this.getOptions),
                onTap: this.bindFn(this.tapOption)
            }))
        }
        ,
        s.prototype.didMount = function() {
            var t, o, e, n, r = i(".dcg-graph-actions-dropdown-anchor"), s = (null !== (o = null === (t = r.offset()) || void 0 === t ? void 0 : t.left) && void 0 !== o ? o : 0) + (null !== (e = r.width()) && void 0 !== e ? e : 0) / 2, c = (null !== (n = i(".dcg-graph-actions-container").width()) && void 0 !== n ? n : 0) - 14 - 10;
            s <= c + 4 ? (this.left = "4px",
            this.arrowLeft = s - 4 + "px") : (this.left = s - c + "px",
            this.arrowLeft = c + "px"),
            this.update()
        }
        ,
        s.prototype.getOptions = function() {
            var t = this
              , o = [];
            return o.push({
                title: function() {
                    return t.props.controller().s("account-shell-button-rename")
                },
                icon: "dcg-icon-pencil",
                class: "blue-link",
                action: function() {
                    t.props.controller().dispatch({
                        type: "show-modal",
                        modal: "rename",
                        device: "mouse"
                    })
                }
            }),
            this.props.controller().graphsController.wasCurrentGraphEverSaved() && o.push({
                title: function() {
                    return t.props.controller().s("account-shell-button-duplicate")
                },
                icon: "dcg-icon-duplicate",
                action: function() {
                    return t.props.controller().dispatch({
                        type: "show-modal",
                        modal: "duplicate",
                        device: "mouse"
                    })
                }
            }, {
                title: function() {
                    return t.props.controller().s("account-shell-button-delete")
                },
                icon: "dcg-icon-remove",
                class: "red-link",
                action: function() {
                    t.props.controller().dispatch({
                        type: "show-modal",
                        modal: "delete",
                        device: "mouse"
                    })
                }
            }),
            o
        }
        ,
        s.prototype.tapOption = function(t) {
            var o = this;
            void 0 !== t.action && t.action(),
            t.preventClose || ("href"in t ? t.isDeepLink && setTimeout(function() {
                return o.closeMenu()
            }) : this.closeMenu())
        }
        ,
        s.prototype.closeMenu = function() {
            this.props.controller().dispatch({
                type: "toggle-menu",
                payload: "graph-actions"
            })
        }
        ,
        s
    }(e.Class);
    t.GraphActionsMenu = s
});