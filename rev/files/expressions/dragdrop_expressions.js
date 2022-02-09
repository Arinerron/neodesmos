define('expressions/dragdrop_expressions', ["require", "exports", "tslib", "jquery", "expressions/measure-expressions", "jquery.handleevent"], function(require, e, t, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function e(e) {
            this.active = !1,
            this.controller = e;
            var t = r.getExppanelSelector(e);
            t && (this.$exppanel = t)
        }
        return e.prototype.startDragging = function(e) {
            this.active = !0,
            this.mouseY = e,
            this.setupEventListeners()
        }
        ,
        e.prototype.applyDrag = function() {
            var e = this.controller.getListModel().dragState;
            if (e) {
                this.scheduleUpdateScroll();
                var o = this.measureDOM(e);
                if (o) {
                    var r = o.floatingPreviewRect
                      , i = this.controller.getItemModel(e.firstItemId);
                    if (i) {
                        for (var n, d, l = i.index, s = 0, a = o.visibleRects; s < a.length; s++) {
                            var p = a[s]
                              , c = p.id
                              , h = p.rect;
                            if (c !== i.id) {
                                var u = this.controller.getItemModel(c);
                                if (!u)
                                    return;
                                if (u.index < i.index) {
                                    if (r.top < h.top + h.height / 2) {
                                        l = u.index;
                                        break
                                    }
                                } else
                                    r.bottom > h.top + h.height / 2 && (l = u.index,
                                    "folder" === u.type && u.collapsed && (l += this.controller.getNumberOfItemsInFolder(u.id)))
                            }
                        }
                        l > i.index ? (n = l,
                        d = l + 1) : l < i.index ? (n = l - 1,
                        d = l) : (n = l - 1,
                        d = l + 1);
                        var f = this.controller.getItemModelByIndex(n)
                          , g = this.controller.getItemModelByIndex(d)
                          , v = ""
                          , m = "";
                        f && (v = "folder" === f.type ? f.id : f.folderId),
                        g && (m = "folder" === g.type ? g.id : g.folderId);
                        var x = "";
                        return v && (m === v ? "folder" === i.type ? l = i.index : x = v : "folder" !== i.type && this.isPreviewTopContainedInFolder(o, v) && (x = v)),
                        {
                            dragState: t.__assign({}, o.dragState),
                            newIndex: l,
                            folderId: x
                        }
                    }
                }
            }
        }
        ,
        e.prototype.measureDOM = function(e) {
            var o = r.getExppanelScrolledTop(this.controller)
              , i = r.getExpListHeight(this.controller);
            if (void 0 !== o && void 0 !== i) {
                var n = r.getDragContainerHeight(this.controller)
                  , d = e.mouseY - e.grabOffset + 2
                  , l = d - o;
                l = Math.max(l, -n / 2),
                l = Math.min(l, i - n);
                var s = {
                    top: d,
                    bottom: d + n,
                    height: n
                }
                  , a = this.controller.findFirstVisibleItem()
                  , p = this.controller.findLastVisibleItem();
                if (a && p) {
                    for (var c = [], h = a.index; h <= p.index; h++) {
                        var u = this.controller.getItemModelByIndex(h);
                        if (u) {
                            var f = this.controller.getItemRootNodeById(u.id);
                            if (f && u.id !== e.firstItemId) {
                                var g = f.getBoundingClientRect();
                                c.push({
                                    id: u.id,
                                    rect: g
                                })
                            }
                        }
                    }
                    if (0 !== c.length)
                        return {
                            dragState: t.__assign(t.__assign({}, e), {
                                itemTop: l
                            }),
                            floatingPreviewRect: s,
                            visibleRects: c
                        }
                }
            }
        }
        ,
        e.prototype.isPreviewTopContainedInFolder = function(e, t) {
            for (var o = e.visibleRects, r = e.floatingPreviewRect, i = 0, n = o; i < n.length; i++) {
                var d = n[i]
                  , l = d.id
                  , s = d.rect;
                if (s.top <= r.top && s.bottom >= r.top) {
                    var a = this.controller.getItemModel(l);
                    if (!a)
                        return !1;
                    if ("folder" === a.type && a.id === t)
                        return !0;
                    if ("folder" !== a.type && a.folderId === t)
                        return !0
                }
            }
            return !1
        }
        ,
        e.prototype.scheduleUpdateScroll = function() {
            var e = this;
            this.updateScrollScheduled || (this.updateScrollScheduled = !0,
            requestAnimationFrame(function() {
                e.updateScroll(),
                e.updateScrollScheduled = !1
            }))
        }
        ,
        e.prototype.stop = function() {
            this.active = !1,
            this.tearDownEventListeners(),
            this.controller.dispatch({
                type: "stop-dragdrop"
            })
        }
        ,
        e.prototype.setupEventListeners = function() {
            var e = this;
            o(document).on("dcg-tapmove.dragdrop", function(t) {
                e.mouseY = t.changedTouches[0].clientY,
                e.controller.dispatch({
                    type: "update-dragdrop",
                    mouseY: e.mouseY
                })
            }),
            o(document).on("dcg-tapend.dragdrop", function(t) {
                e.stop(),
                t.handle("dragdrop")
            })
        }
        ,
        e.prototype.tearDownEventListeners = function() {
            o(document).off(".dragdrop")
        }
        ,
        e.prototype.updateScroll = function() {
            if (this.active) {
                var e = this.$exppanel[0].getBoundingClientRect()
                  , t = 0;
                t = Math.min(t, this.mouseY - e.top),
                (t = (t = Math.max(t, this.mouseY - e.bottom + 30)) * e.height / 900) && this.$exppanel.scrollTop(this.$exppanel.scrollTop() + t)
            }
        }
        ,
        e
    }();
    e.default = i
});