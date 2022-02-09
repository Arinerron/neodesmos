define('calculator-shell/controller', ["require", "exports", "config", "jquery", "underscore", "flux", "browser", "keys", "bugsnag", "lib/i18n", "../analytics/looker", "../lib/parse-json-errors", "../lib/parse-query-params", "../api/graphing"], function(require, e, t, o, r, n, s, i, a, l, c, h, u, p) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Controller = void 0;
    var d = 3e5;
    u.getQueryParams().fastAutoSave && (d = 5e3);
    var g = function() {
        function e(e) {
            var t = this;
            this.defaultModalDevice = "mouse",
            this.userControllerState = "uninitialized",
            this.lastIsShowingActionsUI = !1,
            this.userController = e.userController,
            this.graphsController = e.graphsController,
            this.tourController = e.tourController,
            this.languageController = e.languageController,
            this.mygraphsController = e.mygraphsController,
            this.api = e.api,
            this.raw = e.raw,
            this.s = e.s,
            this.getLanguage = e.getLanguage,
            this.unpack = e.unpack,
            this.product = e.product,
            this.SOMETHING_WENT_WRONG = this.s("account-shell-error-unknown"),
            this._openMenu = "none",
            this._requestedContactForm = !1,
            this._feedbackMessage = "",
            this.state = {},
            this.countryCode = o("body").attr("data-country"),
            this.languageController && this.languageController.setHeaderController(this),
            this.hookupControllers(),
            this.hookupHotkeys(),
            this.dispatcher = new n.Dispatcher,
            this.dispatch = function(e) {
                return a.leaveBreadcrumb("dispatch::header-controller", {
                    type: e.type
                }),
                t.dispatcher.dispatch(e)
            }
            ,
            this.dispatcher.register(function(e) {
                switch (e.type) {
                case "save-graph":
                    t.saveGraph(e.device, e.payload);
                    break;
                case "edit-title":
                    t.launchEditTitle();
                    break;
                case "close-modal":
                    t.closeModal();
                    break;
                case "toggle-menu":
                    t.setOpenMenu(e.payload);
                    break;
                case "open-mygraphs":
                    t.mygraphsController.openMygraphs(e);
                    break;
                case "close-mygraphs":
                    t.mygraphsController.closeMygraphs();
                    break;
                case "render":
                    break;
                case "show-modal":
                    t.showModal(e);
                    break;
                case "show-contact-form":
                    t._requestedContactForm = e.showForm;
                    break;
                default:
                    return e
                }
                return t.triggerRender()
            }),
            this.lastRecoveryState = {},
            this.checkRecoveryState()
        }
        return e.prototype.triggerRender = function() {}
        ,
        e.prototype.hookupControllers = function() {
            var e = this;
            this.mygraphsController.observeEvent("onOpenMygraphs", function() {
                if (e.isLoggedIn() && e.graphsController.millisecondsSinceSync() > 12e4)
                    return e.graphsController.refreshGraphs()
            }),
            this.mygraphsController.observeEvent("triggerRender", function() {
                e.triggerRender()
            }),
            this.userController.observeEvent("loginChanged", function() {
                e.userControllerState = "initialized",
                e.mygraphsController.recoveryAttempted = !1,
                e.isLoggedIn() ? e.graphsController.refreshGraphs() : e.graphsController.clear(),
                e.mustConsentToCollection() && e.showModal({
                    modal: "consent",
                    device: e.defaultModalDevice
                })
            }),
            this.userController.observeEvent("userUpdated", function() {
                "consent" === e.getOpenModal() && e.closeModal(),
                void 0 === t.get("actions") && e.api instanceof p.default && e.api._calc.setOption("actions", !!e.isActionsFlagEnabled() || "auto")
            }),
            this.userController.observeEvent("triggerRender", function() {
                e.triggerRender()
            }),
            this.graphsController.observeEvent("triggerRender", function() {
                e.triggerRender()
            }),
            this.api instanceof p.default && this.api._calc.controller.subToChanges(function() {
                return e.maybeShowAdvancedFeaturesToast()
            })
        }
        ,
        e.prototype.hookupHotkeys = function() {
            var e = this;
            o(document).on("keydown", function(t) {
                var o = t.altKey
                  , r = t.ctrlKey
                  , n = t.metaKey
                  , a = t.shiftKey;
                if (s.IS_APPLE ? !r && n && !o && !a : r && !n && !o && !a)
                    switch (i.lookupChar(t)) {
                    case "S":
                        return e.simpleSave("keyboard"),
                        !1;
                    case "O":
                        return e.dispatch({
                            type: "open-mygraphs",
                            device: "keyboard"
                        }),
                        !1
                    }
            })
        }
        ,
        e.prototype.disablePrintAndExport = function() {
            this._disablePrintAndExport = !0
        }
        ,
        e.prototype.shouldDisablePrintAndExport = function() {
            return !!this._disablePrintAndExport
        }
        ,
        e.prototype.getOpenMenu = function() {
            return this._openMenu
        }
        ,
        e.prototype.getModalState = function() {
            return this._openModal || {
                modal: "none"
            }
        }
        ,
        e.prototype.getOpenModal = function() {
            var e, t;
            return null !== (t = null === (e = this._openModal) || void 0 === e ? void 0 : e.modal) && void 0 !== t ? t : "none"
        }
        ,
        e.prototype.hasOpenModal = function() {
            return !!this._openModal
        }
        ,
        e.prototype.getModalDevice = function() {
            var e;
            return null === (e = this._openModal) || void 0 === e ? void 0 : e.device
        }
        ,
        e.prototype.getModalStartingError = function() {
            var e;
            return (null === (e = this._openModal) || void 0 === e ? void 0 : e.error) || ""
        }
        ,
        e.prototype.closeModal = function() {
            this._openModal = this.mustConsentToCollection() ? {
                modal: "consent",
                device: this.defaultModalDevice
            } : void 0,
            this.triggerRender()
        }
        ,
        e.prototype.closeMenu = function() {
            this._openMenu = "none",
            this.maybeResetContactForm()
        }
        ,
        e.prototype.showModal = function(e) {
            this.closeMenu(),
            this._openModal = e,
            this.defaultModalDevice = e.device
        }
        ,
        e.prototype.setOpenMenu = function(e) {
            var t = this.getOpenMenu();
            this._openMenu = e === t ? "none" : e,
            this.maybeResetContactForm()
        }
        ,
        e.prototype.getFeedbackMessage = function() {
            return this._feedbackMessage
        }
        ,
        e.prototype.setFeedbackMessage = function(e) {
            this._feedbackMessage = e
        }
        ,
        e.prototype.maybeResetContactForm = function() {
            "help" !== this.getOpenMenu() && (this.getFeedbackMessage().trim().length || (this.setFeedbackMessage(""),
            this._requestedContactForm = !1))
        }
        ,
        e.prototype.getProduct = function() {
            return this.product
        }
        ,
        e.prototype.saveRecoveryState = function() {
            var e = o.Deferred();
            e.reject();
            var t = e.promise();
            if (!this.userController.isLoggedIn() || !this.graphsController.hasUnsavedChanges())
                return t;
            var n = this.graphsController.api.getState();
            if (r.isEqual(n, this.lastRecoveryState))
                return t;
            var s = this.graphsController.saveRecoveryGraph();
            return this.lastRecoveryState = n,
            s
        }
        ,
        e.prototype.checkRecoveryState = function() {
            var e = this;
            setTimeout(function() {
                e.checkRecoveryState(),
                e.saveRecoveryState()
            }, d)
        }
        ,
        e.prototype.isLoggedIn = function() {
            return this.userController.isLoggedIn()
        }
        ,
        e.prototype.hasConsentedToCollection = function() {
            return this.userController.hasConsentedToCollection()
        }
        ,
        e.prototype.isInMaintenanceMode = function() {
            return t.get("maintenance")
        }
        ,
        e.prototype.getPreviewParams = function() {
            return t.get("previewMode") ? {
                url: t.get("previewFeedbackUrl"),
                message: t.get("previewMessage")
            } : null
        }
        ,
        e.prototype.isDecimalToFractionEnabled = function() {
            return !!t.get("decimalToFraction")
        }
        ,
        e.prototype.isSaveEnabled = function() {
            return !this.graphsController.wasCurrentGraphEverSaved() || this.graphsController.hasUnsavedChanges()
        }
        ,
        e.prototype.saveGraph = function(e, t) {
            this.isLoggedIn() ? (this.graphsController.save({
                newTitle: null == t ? void 0 : t.title,
                saveCopy: !!(null == t ? void 0 : t.saveAs)
            }),
            this.closeModal(),
            this.closeMenu()) : this.showModal({
                modal: "signup",
                device: e
            })
        }
        ,
        e.prototype.simpleSave = function(e) {
            void 0 === e && (e = this.defaultModalDevice),
            this.graphsController.isCurrentGraphTitled() ? (this.saveGraph(e || "mouse"),
            this.dispatch({
                type: "render"
            })) : this.openSaveDialog({
                device: e
            })
        }
        ,
        e.prototype.openSaveDialog = function(e) {
            void 0 === e && (e = {}),
            this.showModal({
                modal: "save",
                device: e.device || this.defaultModalDevice,
                fromSaveInProgress: e.fromSaveInProgress
            }),
            this.dispatch({
                type: "render"
            })
        }
        ,
        e.prototype.launchEditTitle = function() {
            this.closeMenu(),
            null != this.getPreviewParams() || this.isInMaintenanceMode() || (this.isLoggedIn() ? "geometry" === this.product ? this.showModal({
                modal: "save",
                device: this.defaultModalDevice
            }) : this.showModal({
                modal: "rename",
                device: this.defaultModalDevice
            }) : this.showModal({
                modal: "signup",
                device: this.defaultModalDevice
            }))
        }
        ,
        e.prototype.getOpenText = function() {
            return "graphing" === this.product || "graphing3d" === this.product ? this.s("account-shell-button-open-graph") : "geometry" === this.product ? this.s("account-shell-button-open-construction") : ""
        }
        ,
        e.prototype.isConsentingToCollection = function() {
            return this.userController.isConsentingToPrivacy()
        }
        ,
        e.prototype.privacyConsentFailed = function() {
            return this.userController.didPrivacyConsentFail()
        }
        ,
        e.prototype.mustConsentToCollection = function() {
            return this.isLoggedIn() && !this.hasConsentedToCollection()
        }
        ,
        e.prototype.isArtContestEnabled = function() {
            return !1
        }
        ,
        e.prototype.isGraphComplexEnoughForContest = function() {
            if (!(this.api instanceof p.default))
                return !1;
            var e = this.api.getState().expressions.list;
            return 1 !== e.length || ("expression" !== e[0].type || !!e[0].latex)
        }
        ,
        e.prototype.shouldShowArtContestNudge = function() {
            return !!this.isArtContestEnabled() && (this.isGraphComplexEnoughForContest() && this.isLoggedIn())
        }
        ,
        e.prototype.getLimitedSignupRole = function() {
            return "student"
        }
        ,
        e.prototype.wasModalOpenedWithKeyboard = function() {
            var e;
            return "keyboard" === (null === (e = this._openModal) || void 0 === e ? void 0 : e.device)
        }
        ,
        e.prototype.allowSignInWithApple = function() {
            return !0
        }
        ,
        e.prototype.getSomethingWentWrongText = function() {
            return this.s("account-shell-error-unknown")
        }
        ,
        e.prototype.logJSON = function(e, t) {
            c.logJSON(e, t)
        }
        ,
        e.prototype.parseJSONErrors = function(e) {
            return h.parseJSONErrors(e)
        }
        ,
        e.prototype.requestedContactForm = function() {
            return this._requestedContactForm
        }
        ,
        e.prototype.isActionsFlagEnabled = function() {
            return this.userController.hasFeatureFlag("dcg-actions")
        }
        ,
        e.prototype.maybeShowAdvancedFeaturesToast = function() {
            var e = this
              , t = this.api;
            if (t instanceof p.default) {
                var o = t._calc.controller.areActionsEnabled();
                if (o && "uninitialized" === this.userControllerState)
                    return this.userControllerState = "loading",
                    void this.userController.askServerIfLoggedIn().then(function() {
                        e.userControllerState = "initialized",
                        e.maybeShowAdvancedFeaturesToast()
                    });
                "loading" !== this.userControllerState && (this.isActionsFlagEnabled() || (o && !this.lastIsShowingActionsUI && this.userController.isLoggedIn() && t._calc.controller.runAfterDispatch(function() {
                    t._calc.controller.dispatch({
                        type: "toast/show",
                        toast: {
                            message: l.s("account-shell-text-graph-uses-advanced-features"),
                            hideAfter: 0,
                            learnMoreCallback: function() {
                                e.dispatch({
                                    type: "show-modal",
                                    modal: "account-settings",
                                    initialTab: "advanced",
                                    device: e.defaultModalDevice
                                })
                            }
                        }
                    })
                }),
                this.lastIsShowingActionsUI = o))
            }
        }
        ,
        e
    }();
    e.Controller = g
});