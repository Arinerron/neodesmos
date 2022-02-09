define('mygraphs/user-bar', ["require", "exports", "tslib", "dcgview", "jquery", "../calculator-shell/account-menu", "loadcss!./user-bar"], function(require, e, t, n, r, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.UserBar = void 0;
    var o = n.Components
      , a = o.Input
      , s = o.If
      , i = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.willUpdate = function() {
            this.props.isSearching() || this.setSearchValue("")
        }
        ,
        o.prototype.setSearchValue = function(e) {
            this.searchValue !== e && (this.searchValue = e,
            this.props.updateFilter(e))
        }
        ,
        o.prototype.init = function() {
            this.controller = this.props.controller(),
            this.searchValue = ""
        }
        ,
        o.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: n.const("dcg-user-bar")
            }, n.createElement(s, {
                predicate: function() {
                    return !e.props.isSearching()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-account-link-container")
                }, n.createElement("div", {
                    class: n.const("dcg-account-link"),
                    "dcg-menu-button": n.const("account"),
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-haspopup": n.const("true"),
                    "aria-expanded": function() {
                        return "account" === e.controller.getOpenMenu()
                    },
                    "aria-label": n.const("Account Information"),
                    onTap: function(t) {
                        if (e.measureAccountDropdownArrowOffset(),
                        e.props.controller().dispatch({
                            type: "toggle-menu",
                            payload: "account"
                        }),
                        "keyboard" == t.device) {
                            var n = "account" === e.props.controller().getOpenMenu();
                            r(n ? ".dcg-action-accountsettings" : ".dcg-account-link").trigger("focus")
                        }
                    }
                }, n.createElement("span", {
                    class: n.const("dcg-variable-name")
                }, function() {
                    return e.controller.userController.getFirstName()
                }), n.createElement("i", {
                    class: n.const("dcg-icon-caret-down")
                })), n.createElement(s, {
                    predicate: function() {
                        return "account" === e.controller.getOpenMenu() && e.controller.mygraphsController.isMygraphsOpen()
                    }
                }, function() {
                    return n.createElement(c.AccountMenu, {
                        controller: e.const(e.controller),
                        left: function() {
                            return "4px"
                        },
                        arrowLeft: function() {
                            return e.accountDropdownArrowOffset - 4 + "px"
                        }
                    })
                }))
            }), n.createElement(s, {
                predicate: function() {
                    return !e.props.isSearching()
                }
            }, function() {
                return n.createElement("div", {
                    role: n.const("link"),
                    tabindex: n.const("0"),
                    class: n.const("dcg-search-btn"),
                    onTap: function(t) {
                        t.preventDefault(),
                        e.props.openSearch(),
                        r(".search-container").find("input").trigger("focus")
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-search search-icon")
                }), n.createElement("span", {
                    class: n.const("dcg-menu-title")
                }, function() {
                    return e.props.s("account-shell-heading-title-mygraphs-search")
                }))
            }), n.createElement(s, {
                predicate: function() {
                    return e.props.isSearching()
                }
            }, function() {
                return n.createElement("div", {
                    role: n.const("search"),
                    class: n.const("search-container search-open")
                }, n.createElement("i", {
                    class: n.const("dcg-icon-search search-icon")
                }), n.createElement(a, {
                    placeholder: function() {
                        return e.props.s("account-shell-text-mygraphs-search-by-title")
                    },
                    onInput: e.bindFn(e.setSearchValue),
                    onFocus: e.props.openSearch,
                    value: function() {
                        return e.searchValue
                    },
                    didMount: e.bindFn(e.didMountSearch)
                }), n.createElement("span", {
                    role: n.const("button"),
                    tabindex: n.const(0),
                    "aria-label": function() {
                        return e.props.s("account-shell-heading-title-mygraphs-search")
                    },
                    class: n.const("dcg-icon-remove dcg-action-close-search"),
                    onTap: function(t) {
                        t.preventDefault(),
                        e.props.closeSearch()
                    }
                }))
            }))
        }
        ,
        o.prototype.didMountDropdown = function(e) {
            r(e).on("touchstart", function(e) {
                return e.preventDefault()
            })
        }
        ,
        o.prototype.didMountSearch = function(e) {
            var t = this;
            r(e).on("blur", function() {
                r(e).val() || t.props.closeSearch()
            })
        }
        ,
        o.prototype.measureAccountDropdownArrowOffset = function() {
            var e, t, n, c = r(".dcg-user-bar .dcg-account-link i"), o = (null !== (t = null === (e = c.offset()) || void 0 === e ? void 0 : e.left) && void 0 !== t ? t : 0) + (null !== (n = c.width()) && void 0 !== n ? n : 0) / 2;
            this.accountDropdownArrowOffset = o
        }
        ,
        o
    }(n.Class);
    e.UserBar = i
});
