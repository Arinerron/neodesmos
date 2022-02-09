
define('calculator-shell/contest-submission-dialog', ["require", "exports", "text!data/list-of-countries.json", "tslib", "dcgview", "analytics/looker", "../dcgview-helpers/searchable-dropdown", "dcgview-helpers/checkbox", "lib/aria", "./modal", "main/account_backend", "shared/dcgviews/localize", "loadcss!spinner", "loadcss!./contest-submission-dialog"], function(require, t, e, n, o, s, r, i, c, a, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    for (var d = o.Components, h = d.If, g = d.IfElse, m = d.Input, p = d.SwitchUnion, f = d.Textarea, b = JSON.parse(e).map(function(t) {
        return {
            id: t,
            label: t
        }
    }), y = [], v = 2020; v >= 1900; v--)
        y.push({
            id: v + "",
            label: v + ""
        });
    var S = {
        China: 14,
        "Hong Kong": 18,
        India: 18,
        Indonesia: 18,
        Phillipines: 18,
        Russia: 18,
        Austria: 14,
        Belgium: 13,
        Bulgaria: 14,
        Croatia: 16,
        Cyprus: 14,
        "Czech Republic": 15,
        Denmark: 13,
        Estonia: 13,
        Finland: 13,
        France: 15,
        Germany: 16,
        Greece: 15,
        Hungary: 16,
        Ireland: 16,
        Italy: 14,
        Latvia: 13,
        Lithuania: 14,
        Luxembourg: 16,
        Malta: 13,
        Netherlands: 16,
        Norway: 13,
        Poland: 16,
        Portugal: 13,
        Romania: 16,
        Slovakia: 16,
        Slovenia: 15,
        Spain: 14,
        Sweden: 13,
        Switzerland: 16,
        "United Kingdom": 13,
        Canada: 13,
        "United States": 13
    }
      , E = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return n.__extends(e, t),
        e.prototype.didUnmount = function() {
            this.unmounted = !0
        }
        ,
        e.prototype.init = function() {
            this.controller = this.props.controller(),
            this.selectedData = {},
            this.userOwnsGraph = !1,
            this.isSubmittingEntry = !1,
            this.isVerifyingEligility = !1,
            this.controller.state.artContestURLFromShareMenu && (this.overwriteGraphURL = this.controller.state.artContestURLFromShareMenu,
            this.controller.state.artContestURLFromShareMenu = void 0),
            s.logJSON("art-contest::open-modal", {
                from: this.overwriteGraphURL ? "share" : "top-bar"
            })
        }
        ,
        e.prototype.getScreen = function() {
            return this.shouldShowSaveAnimation() ? "saving" : this.shouldShowSaveFailed() ? "save-failed" : this.didSubmissionFail ? "submit-failed" : this.isSubmittingEntry ? "submitting" : this.didSubmissionSucceed ? "submitted" : this.isVerifyingEligility || this.userOwnsGraph && this.isLoggedIn() ? "form" : "ask-intention"
        }
        ,
        e.prototype.template = function() {
            var t = this;
            return o.createElement(a.Modal, {
                controller: this.props.controller
            }, o.createElement("div", {
                class: o.const("dcg-contest-submission-dialog")
            }, p(function() {
                return t.getScreen()
            }, {
                saving: function() {
                    return o.createElement("div", {
                        class: o.const("dcg-save-animation-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-saving")
                    }, o.createElement("div", {
                        class: o.const("dcg-save-animation"),
                        "aria-live": o.const("polite"),
                        "aria-atomic": o.const("true")
                    }, o.createElement("span", {
                        class: o.const("dcg-spinner")
                    }), function() {
                        return t.controller.s("account-shell-label-saving-graph")
                    })))
                },
                "save-failed": function() {
                    return o.createElement("div", {
                        class: o.const("dcg-save-animation-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-saving")
                    }, o.createElement("div", {
                        class: o.const("dcg-save-animation"),
                        "aria-live": o.const("polite"),
                        "aria-atomic": o.const("true")
                    }, function() {
                        return t.controller.s("account-shell-error-save-art-contest")
                    })))
                },
                submitting: function() {
                    return o.createElement("div", {
                        class: o.const("dcg-save-animation-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-saving")
                    }, o.createElement("div", {
                        class: o.const("dcg-save-animation"),
                        "aria-live": o.const("polite"),
                        "aria-atomic": o.const("true")
                    }, o.createElement("span", {
                        class: o.const("dcg-spinner")
                    }), function() {
                        return t.controller.s("account-shell-label-submitting")
                    })))
                },
                "submit-failed": function() {
                    return o.createElement("div", {
                        class: o.const("dcg-save-animation-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-saving")
                    }, o.createElement("div", {
                        class: o.const("dcg-save-animation"),
                        "aria-live": o.const("polite"),
                        "aria-atomic": o.const("true")
                    }, function() {
                        return t.controller.s("account-shell-error-submitting")
                    })))
                },
                submitted: function() {
                    return o.createElement("div", {
                        class: o.const("dcg-save-animation-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-art-contest-success-image")
                    }, o.createElement("img", {
                        src: o.const("/assets/img/contest/submitted.jpg"),
                        alt: function() {
                            return t.controller.s("account-shell-text-alt-text-success")
                        }
                    })), o.createElement("div", {
                        class: o.const("dcg-save-success"),
                        "aria-live": o.const("polite"),
                        "aria-atomic": o.const("true")
                    }, function() {
                        return t.controller.s("account-shell-label-submission-received")
                    }, o.createElement("div", {
                        class: o.const("dcg-save-animation-content")
                    }, o.createElement("div", null, o.createElement("div", {
                        class: o.const("dcg-congrats-message")
                    }, o.createElement(u.Localize, {
                        i18n: t.const(t.controller),
                        key: t.const("account-shell-text-art-contest-success-paragraph")
                    }, o.const("If you'd like to revise your submission, feel free to resubmit anytime before"), o.createElement("span", {
                        class: o.const("bold-text")
                    }, o.const(" January 15th")), o.const(". We'll only look at the most recent submission."))), o.createElement("div", {
                        class: o.const("dcg-congrats-message")
                    }, function() {
                        return t.controller.s("account-shell-text-art-contest-congratulations")
                    })))))
                },
                "ask-intention": function() {
                    return o.createElement("div", {
                        class: o.const("dcg-art-contest-info-container")
                    }, o.createElement("div", {
                        class: o.const("dcg-art-contest-world-image")
                    }, o.createElement("img", {
                        src: o.const("/assets/img/contest/world.jpg"),
                        alt: function() {
                            return t.controller.s("account-shell-text-alt-text-art-contest")
                        }
                    })), o.createElement("div", {
                        class: o.const("dcg-contest-about")
                    }, o.createElement("div", {
                        role: o.const("heading"),
                        "aria-level": o.const("1"),
                        class: o.const("dcg-contest-submission-title")
                    }, function() {
                        return t.controller.s("account-shell-heading-math-art-contest")
                    }), o.createElement("div", {
                        class: o.const("dcg-contest-text")
                    }, o.createElement(u.Localize, {
                        i18n: t.const(t.controller),
                        key: t.const("account-shell-text-art-contest-about-paragraph")
                    }, o.const("Want to share your awesome graph with the world? Students ages 13+ can enter the Desmos Global Math Art Contest before"), o.createElement("span", {
                        class: o.const("bold-text")
                    }, o.const(" January 15th ")), o.const("for a chance to be featured on our website and win other prizes!"), o.const(" "), o.createElement("a", {
                        class: o.const("dcg-shared-blue-link dcg-learn-more-link"),
                        href: function() {
                            return t.getBlogPostURL()
                        },
                        target: o.const("_blank"),
                        didMount: function(t) {
                            return t.focus()
                        }
                    }, o.const("Learn more")))), o.createElement("div", null, o.createElement("div", {
                        class: function() {
                            return {
                                "dcg-btn-blue": !0,
                                "dcg-submit-this-graph-btn": !0,
                                "dcg-disabled": t.shouldDisableSubmitThisGraph()
                            }
                        },
                        onTap: t.bindFn(t.chooseSubmitThisGraph),
                        tabindex: o.const(0),
                        role: o.const("button")
                    }, function() {
                        return t.controller.s("account-shell-button-submit-graph")
                    }), o.createElement(h, {
                        predicate: function() {
                            return !!t.getCannotSubmitReason()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-login-notice")
                        }, function() {
                            return t.getCannotSubmitReason()
                        })
                    }), o.createElement("div", {
                        class: o.const("age-check-container")
                    }, function() {
                        return t.controller.s("account-shell-text-contest-under-16")
                    }, o.const(" "), o.createElement("a", {
                        class: o.const("dcg-shared-blue-link"),
                        onTap: t.bindFn(t.chooseVerifyEligibility)
                    }, function() {
                        return t.controller.s("account-shell-text-contest-verify-eligibility")
                    })), o.createElement("div", {
                        class: o.const("dcg-submit-for-others")
                    }, function() {
                        return t.controller.s("account-shell-text-contest-submit-by-teacher")
                    }, o.const(" "), o.createElement("a", {
                        class: o.const("dcg-shared-blue-link"),
                        href: function() {
                            return t.getABActivityURL()
                        },
                        target: o.const("_blank")
                    }, function() {
                        return t.controller.s("account-shell-button-create-own-activity")
                    })))))
                },
                form: function() {
                    return o.createElement("div", null, o.createElement("div", {
                        role: o.const("heading"),
                        "aria-level": o.const("1"),
                        class: o.const("dcg-contest-submission-title")
                    }, function() {
                        return t.controller.s("account-shell-heading-submit-graph")
                    }), o.createElement("div", {
                        class: o.const("dcg-submission-form")
                    }, o.createElement("div", {
                        class: o.const("dcg-country-and-year")
                    }, o.createElement("div", {
                        class: o.const("dcg-form-section")
                    }, o.createElement("div", {
                        class: o.const("dcg-section-title")
                    }, function() {
                        return t.controller.s("account-shell-heading-country")
                    }), o.createElement(h, {
                        predicate: function() {
                            return !!t.getSelectedCountry()
                        }
                    }, function() {
                        return o.createElement("span", {
                            class: o.const("dcg-shared-blue-link dcg-clear-country"),
                            onTap: function() {
                                return t.setSelectedCountry(void 0)
                            },
                            tabindex: o.const(0),
                            role: o.const("button"),
                            "aria-label": function() {
                                return t.controller.s("account-shell-narration-clear-selected-country")
                            }
                        }, function() {
                            return t.controller.s("account-shell-button-clear")
                        })
                    }), g(function() {
                        return !!t.getSelectedCountry()
                    }, {
                        true: function() {
                            return o.createElement("div", {
                                class: o.const("dcg-your-country-name")
                            }, function() {
                                return t.getSelectedCountry()
                            })
                        },
                        false: function() {
                            return o.createElement(r.default, {
                                options: function() {
                                    return t.getListOfCountries()
                                },
                                onChange: function(e) {
                                    return t.setSelectedCountry(e.value)
                                },
                                onCancel: function() {
                                    return t.setSelectedCountry(void 0)
                                },
                                renderWithInput: function() {
                                    return !0
                                },
                                placeholder: function() {
                                    return t.controller.s("account-shell-label-country-placeholder")
                                }
                            })
                        }
                    })), o.createElement(h, {
                        predicate: function() {
                            return t.shouldShowAgeOptions()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-form-section")
                        }, o.createElement("div", {
                            class: o.const("dcg-section-title")
                        }, function() {
                            return t.controller.s("account-shell-heading-birth-year")
                        }), g(function() {
                            return !!t.getSelectedYear()
                        }, {
                            true: function() {
                                return o.createElement("div", {
                                    class: o.const("dcg-your-birth-year")
                                }, function() {
                                    return t.getSelectedYear()
                                })
                            },
                            false: function() {
                                return o.createElement(r.default, {
                                    options: function() {
                                        return t.getListOfYears()
                                    },
                                    onChange: function(e) {
                                        return t.setSelectedYear(e.value)
                                    },
                                    onCancel: function() {
                                        return t.setSelectedYear(void 0)
                                    },
                                    renderWithInput: function() {
                                        return !0
                                    },
                                    placeholder: function() {
                                        return t.controller.s("account-shell-label-birth-year-placeholder")
                                    }
                                })
                            }
                        }))
                    })), o.createElement(h, {
                        predicate: function() {
                            return t.shouldShowEligible() && !t.getCannotSubmitReason()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-eligible-message dcg-teal-notice")
                        }, o.const("🎉 "), function() {
                            return t.controller.s("account-shell-label-you-are-eligible")
                        })
                    }), o.createElement(h, {
                        predicate: function() {
                            return t.shouldShowConsentOptions()
                        }
                    }, function() {
                        return o.createElement("div", null, o.createElement("div", {
                            class: o.const("dcg-form-section")
                        }, o.createElement("div", {
                            class: o.const("dcg-section-title")
                        }, function() {
                            return t.controller.s("account-shell-heading-name-email")
                        }), o.createElement(m, {
                            class: t.const("dcg-shared-input-blue-outline"),
                            onInput: function(e) {
                                return t.setUserName(e)
                            },
                            value: t.bindFn(t.getUserName),
                            placeholder: function() {
                                return t.controller.s("account-shell-label-full-name")
                            },
                            disabled: function() {
                                return !1
                            }
                        }), o.createElement(m, {
                            class: t.const("dcg-shared-input-blue-outline"),
                            onInput: function(e) {
                                return t.setUserEmail(e)
                            },
                            value: t.bindFn(t.getUserEmail),
                            placeholder: function() {
                                return t.controller.s("account-shell-label-email-address")
                            },
                            disabled: function() {
                                return !1
                            }
                        })), o.createElement("div", {
                            class: o.const("dcg-form-section")
                        }, o.createElement("div", {
                            class: o.const("dcg-section-title")
                        }, function() {
                            return t.controller.s("account-shell-heading-artist-statement")
                        }), o.createElement("div", {
                            class: o.const("dcg-section-subtitle")
                        }, function() {
                            return t.controller.s("account-shell-label-artiist-statement-description")
                        }), o.createElement(f, {
                            class: t.const("dcg-shared-input-blue-outline dcg-artist-statement-input"),
                            onInput: function(e) {
                                return t.setArtistStatement(e)
                            },
                            value: t.bindFn(t.getArtistStatement),
                            maxlength: t.const(900),
                            placeholder: function() {
                                return t.controller.s("account-shell-label-artist-statement-placeholder")
                            }
                        })), o.createElement(i.Checkbox, {
                            checked: t.bindFn(t.getConsentTicked),
                            onChange: t.bindFn(t.toggleConsent),
                            ariaLabel: function() {
                                return t.controller.s("account-shell-text-art-contest-copyright-agreement")
                            }
                        }, function() {
                            return t.controller.s("account-shell-text-art-contest-copyright-agreement")
                        }), o.createElement("div", {
                            class: function() {
                                return {
                                    "dcg-btn-blue": !0,
                                    "dcg-disabled": t.isSubmitButtonDisabled(),
                                    "dcg-submit-this-graph-btn": !0
                                }
                            },
                            onTap: t.bindFn(t.submitEntry),
                            tabindex: o.const(0)
                        }, function() {
                            return t.controller.s("account-shell-button-submit-graph")
                        }))
                    }), o.createElement(h, {
                        predicate: function() {
                            return t.shouldShowEligible() && !!t.getCannotSubmitReason()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-login-notice dcg-teal-notice")
                        }, o.const("🎉 "), function() {
                            return t.controller.s("account-shell-label-you-are-eligible")
                        }, o.const(" "), function() {
                            return t.getCannotSubmitReason()
                        })
                    }), o.createElement(h, {
                        predicate: function() {
                            return t.shouldShowIneligible()
                        }
                    }, function() {
                        return o.createElement("div", {
                            class: o.const("dcg-ineligible-container")
                        }, o.createElement("i", {
                            class: o.const("dcg-icon-error")
                        }), o.createElement(u.Localize, {
                            i18n: t.const(t.controller),
                            key: t.const("account-shell-text-artcontest-ineligible")
                        }, o.createElement("div", {
                            class: o.const("dcg-ineligible-text-container")
                        }, o.createElement("div", {
                            class: o.const("dcg-ineligible-text")
                        }, o.const("Based on your age and location, we aren’t able to accept a graph submission from you this year. Save it for another year, or ask your teacher to assign the art contest activity.")), o.createElement("div", {
                            class: o.const("dcg-ineligible-text")
                        }, o.const("Keep up the awesome graphing!")))))
                    })))
                }
            })))
        }
        ,
        e.prototype.getABActivityURL = function() {
            return "https://teacher.desmos.com/activitybuilder/custom/618be410b284c40a2c7b9111"
        }
        ,
        e.prototype.getBlogPostURL = function() {
            return "https://help.desmos.com/hc/en-us/articles/4413417019533"
        }
        ,
        e.prototype.returnToOpeningScreen = function() {
            this.isVerifyingEligility = !1,
            this.userOwnsGraph = !1,
            this.selectedData = {
                email: this.selectedData.email,
                name: this.selectedData.name
            },
            this.update()
        }
        ,
        e.prototype.getGraphURL = function() {
            if (this.overwriteGraphURL)
                return this.overwriteGraphURL;
            var t = this.controller.graphsController.currentGraph;
            return "https://www.desmos.com/calculator/" + (t && t.hash || "")
        }
        ,
        e.prototype.overwriteEntry = function() {
            this.selectedData.overwrite = !0,
            this.submitEntry()
        }
        ,
        e.prototype.submitEntry = function() {
            var t = this;
            if (!this.isSubmitButtonDisabled()) {
                this.didSubmissionFail = !1,
                this.isSubmittingEntry = !0;
                var e = {
                    name: this.getUserName(),
                    email: this.getUserEmail(),
                    url: this.getGraphURL(),
                    year: this.getSelectedYear(),
                    ageGroup: this.getSelectedAgeGroup(),
                    country: this.getSelectedCountry(),
                    artistStatement: this.getArtistStatement(),
                    overwrite: !0,
                    lang: this.controller.getLanguage()
                };
                this.update(),
                s.logJSON("art-contest::submit-sending", e),
                l.submitArtContestEntry(e).done(function(e) {
                    e.previousSubmissionURL || (e.success ? (t.didSubmissionSucceed = !0,
                    s.logJSON("art-contest::submit-success", {})) : (t.didSubmissionFail = !0,
                    s.logJSON("art-contest::submit-failed", {}),
                    c.alert(t.controller.s("account-shell-error-submitting"))))
                }).fail(function() {
                    c.alert(t.controller.s("account-shell-error-submitting")),
                    t.didSubmissionFail = !0,
                    s.logJSON("art-contest::submit-failed", {})
                }).always(function() {
                    t.isSubmittingEntry = !1,
                    t.unmounted || t.update()
                })
            }
        }
        ,
        e.prototype.shouldShowSaveAnimation = function() {
            return !!this.saveInProgress
        }
        ,
        e.prototype.shouldShowSaveFailed = function() {
            return !!this.didSaveFail
        }
        ,
        e.prototype.chooseVerifyEligibility = function() {
            this.isVerifyingEligility = !0,
            this.update()
        }
        ,
        e.prototype.chooseSubmitThisGraph = function() {
            var t = this;
            if (!this.shouldDisableSubmitThisGraph()) {
                if (this.isVerifyingEligility = !1,
                this.overwriteGraphURL || !this.controller.graphsController.hasUnsavedChanges())
                    return this.userOwnsGraph = !0,
                    this.update(),
                    void s.logJSON("art-contest::choose-form", {});
                this.saveInProgress = !0,
                s.logJSON("art-contest::save-sending", {}),
                this.update(),
                this.controller.graphsController.shareGraph().done(function(e) {
                    t.didSaveFail = !1,
                    t.saveInProgress = !1,
                    t.userOwnsGraph = !0,
                    t.overwriteGraphURL = "https://www.desmos.com/calculator/" + e.hash,
                    s.logJSON("art-contest::save-success", {
                        url: t.overwriteGraphURL
                    })
                }).fail(function() {
                    t.didSaveFail = !0,
                    s.logJSON("art-contest::save-failed", {})
                }).always(function() {
                    t.saveInProgress = !1,
                    t.unmounted || t.update()
                })
            }
        }
        ,
        e.prototype.isLoggedIn = function() {
            return this.controller.isLoggedIn()
        }
        ,
        e.prototype.getCannotSubmitReason = function() {
            return this.isLoggedIn() ? this.controller.isGraphComplexEnoughForContest() ? "" : this.controller.s("account-shell-text-art-contest-notice-default") : this.controller.s("account-shell-text-art-contest-notice-login")
        }
        ,
        e.prototype.shouldDisableSubmitThisGraph = function() {
            return !!this.getCannotSubmitReason()
        }
        ,
        e.prototype.shouldShowSubmissionOptions = function() {
            return !this.isVerifyingEligility && (!this.userOwnsGraph || !this.isLoggedIn())
        }
        ,
        e.prototype.shouldShowCountryOptions = function() {
            return !this.shouldShowSubmissionOptions()
        }
        ,
        e.prototype.shouldShowAgeOptions = function() {
            return !!this.shouldShowCountryOptions() && !!this.getSelectedCountry()
        }
        ,
        e.prototype.shouldShowIneligible = function() {
            return !!this.getSelectedCountry() && (!!this.getSelectedYear() && !this.isSubmissionEligible())
        }
        ,
        e.prototype.shouldShowEligible = function() {
            return !!this.isVerifyingEligility && this.isSubmissionEligible()
        }
        ,
        e.prototype.setArtistStatement = function(t) {
            this.selectedData.artistStatement = t,
            this.update()
        }
        ,
        e.prototype.setSelectedYear = function(t) {
            this.selectedData.year !== t && (this.selectedData.year = t,
            this.update(),
            s.logJSON("art-contest::select-year", {
                year: t
            }))
        }
        ,
        e.prototype.setSelectedCountry = function(t) {
            this.selectedData = {
                country: t,
                name: this.controller.userController.name,
                email: this.controller.userController.email
            },
            this.update(),
            s.logJSON("art-contest::select-country", {
                country: t
            })
        }
        ,
        e.prototype.getArtistStatement = function() {
            return this.selectedData.artistStatement || ""
        }
        ,
        e.prototype.getSelectedCountry = function() {
            return this.selectedData.country
        }
        ,
        e.prototype.getSelectedYear = function() {
            return this.selectedData.year
        }
        ,
        e.prototype.getUserAgeInYears = function() {
            return 2021 - parseFloat(this.selectedData.year || "")
        }
        ,
        e.prototype.getSelectedAgeGroup = function() {
            var t = this.getUserAgeInYears();
            return t >= 19 ? "19+" : t >= 17 ? "17-18" : t >= 15 ? "15-16" : t >= 13 ? "13-14" : ""
        }
        ,
        e.prototype.getUserName = function() {
            return this.selectedData.name || ""
        }
        ,
        e.prototype.setUserName = function(t) {
            this.selectedData.name = t,
            this.update()
        }
        ,
        e.prototype.getUserEmail = function() {
            return this.selectedData.email || ""
        }
        ,
        e.prototype.setUserEmail = function(t) {
            this.selectedData.email = t,
            this.update()
        }
        ,
        e.prototype.getConsentTicked = function() {
            return !!this.selectedData.consent
        }
        ,
        e.prototype.getOverwriteTicked = function() {
            return !!this.selectedData.overwrite
        }
        ,
        e.prototype.toggleConsent = function() {
            this.selectedData.consent = !this.selectedData.consent,
            this.update(),
            s.logJSON("art-contest::toggle-consent", {
                consent: this.selectedData.consent
            })
        }
        ,
        e.prototype.isSubmitButtonDisabled = function() {
            return !!this.isSubmittingEntry || (!this.selectedData.country || (!this.selectedData.year || (!this.selectedData.email || (!this.selectedData.artistStatement || (!this.selectedData.name || !this.selectedData.consent)))))
        }
        ,
        e.prototype.isSubmissionEligible = function() {
            if (!this.selectedData.country)
                return !1;
            if (!this.selectedData.year)
                return !1;
            var t = S[this.selectedData.country] || 16;
            return this.getUserAgeInYears() >= t
        }
        ,
        e.prototype.shouldShowConsentOptions = function() {
            return (!this.isVerifyingEligility || !this.getCannotSubmitReason()) && this.isSubmissionEligible()
        }
        ,
        e.prototype.getListOfCountries = function() {
            return b
        }
        ,
        e.prototype.getListOfYears = function() {
            return y
        }
        ,
        e
    }(o.Class);
    t.default = E
});