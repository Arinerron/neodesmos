define('tours/trip', ['require', 'jquery', 'pjs', 'mathquill', 'scroll_helpers', 'bugsnag'], function(require) {
    "use strict";
    var t = require("jquery")
      , i = require("pjs")
      , e = require("mathquill")
      , s = require("scroll_helpers")
      , o = require("bugsnag");
    return i({
        init: function(t) {
            this.settings = t,
            this.__cachedStepName = null
        },
        ensureTripBlock: function() {
            if (!this.$tripBlock) {
                var i = ['<div class="trip-block">', '<div class="trip-interior">', '<a class="trip-close">&times;</a>', '<div class="trip-content"></div>', "</div>", '<div class="trip-arrow"></div>', "</div>"].join("")
                  , e = this
                  , s = this.$tripBlock = t(i);
                s.css({
                    top: "-100px"
                }),
                t("body").append(s),
                s.find(".trip-close").on("dcg-tap", function(t) {
                    t.preventDefault(),
                    e.stop()
                }),
                this.bindKeyEvents()
            }
        },
        cleanup: function() {
            return this.unbindKeyEvents(),
            this.hideTripBlock(),
            !1
        },
        bindKeyEvents: function() {
            var i = this;
            t(document).on({
                "keydown.Trip": function(t) {
                    i.keyEvent.call(i, t)
                }
            })
        },
        unbindKeyEvents: function() {
            t(document).off("keydown.Trip")
        },
        keyEvent: function(t) {
            27 === t.which && this.stop()
        },
        stop: function() {
            this.hideTripBlock(),
            this.settings.onTripStop()
        },
        exitTourBecauseOfError: function(t, i) {
            var e = ""
              , s = i;
            do {
                e = s.selector + e
            } while (s = s.prevObject);
            this.stop(),
            o.notify("TourError: could not find $sel.offset()", {
                metaData: {
                    message: t,
                    selector: e
                }
            })
        },
        showTripBlock: function(i) {
            this.ensureTripBlock(),
            "string" == typeof i.sel && (i.sel = t(i.sel)),
            i.sel = i.sel.filter(":visible"),
            i.scrollContainer && s.scrollVisible(i.sel, i.scrollContainer, 0);
            var o = this.$tripBlock;
            o.find(".trip-content").html(i.content),
            o.toggleClass("trip-hidden", !!i.hidden);
            var n = i.sel
              , r = n.outerWidth()
              , l = n.outerHeight()
              , c = o.outerWidth()
              , a = o.outerHeight();
            if (n.offset()) {
                this.__cachedMissingSelTime = void 0,
                o.removeClass("trip-e trip-s trip-w trip-n");
                var p = 0;
                switch (i.position) {
                case "e":
                    o.addClass("trip-e"),
                    o.css({
                        left: n.offset().left + r + 10,
                        top: n.offset().top - (a - l) / 2
                    });
                    break;
                case "s":
                    o.addClass("trip-s");
                    var d = n.offset().left + (r - c) / 2;
                    o.css({
                        left: d,
                        top: n.offset().top + l + 10
                    }),
                    d + c > t(window).width() - 1 && (p = t(window).width() - 1 - d - c),
                    d < 1 && (p = 1 - d);
                    break;
                case "w":
                    o.addClass("trip-w"),
                    o.css({
                        left: n.offset().left - (10 + c),
                        top: n.offset().top - (a - l) / 2
                    });
                    break;
                default:
                    o.addClass("trip-n"),
                    o.css({
                        left: n.offset().left + (r - c) / 2,
                        top: n.offset().top - 10 - a
                    })
                }
                o.find(".trip-interior").css("transform", "translate(" + p + "px, 0)"),
                o.css({
                    display: "inline-block"
                }),
                o.find(".trip-math:not(.dcg-mq-math-mode)").each(function() {
                    e.StaticMath(this)
                })
            } else
                this.__cachedMissingSelTime ? Date.now() - this.__cachedMissingSelTime > 1e3 && (i.final ? this.stop() : this.exitTourBecauseOfError(i.content, n)) : this.__cachedMissingSelTime = Date.now()
        },
        fadeInTripBlock: function() {
            this.ensureTripBlock();
            var t = this.$tripBlock;
            setTimeout(function() {
                t.addClass("trip-is-loaded")
            }, 0)
        },
        hideTripBlock: function() {
            this.$tripBlock && this.$tripBlock.removeClass("trip-is-loaded")
        }
    })
});