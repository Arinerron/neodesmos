define('expressions/image_file_to_data_url', ["require", "exports", "loadImage"], function(require, t, e) {
    "use strict";
    function a(t, e) {
        for (var a, n = [.92, .86, .8, .7, .6, .5, .4, .3, .2, .1], i = 0; i < n.length; i++)
            if ((a = t.toDataURL("image/jpeg", n[i])).length < e)
                return a;
        return a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.imageFileToDataURL = void 0,
    t.imageFileToDataURL = function(t, n) {
        e(t, function(e) {
            if (e.toDataURL) {
                var i, r = 2e5;
                if ("image/jpeg" === t.type)
                    i = a(e, r);
                else if ((i = e.toDataURL()).length > r)
                    i = i.length > .75 * e.width * e.height && !function(t) {
                        for (var e = t.getContext("2d").getImageData(0, 0, t.width, t.height).data, a = 3; a < e.length; a += 4)
                            if (255 !== e[a])
                                return !0;
                        return !1
                    }(e) ? a(e, r) : function(t, e) {
                        for (var a, n = t.toDataURL().length, i = t.width, r = t.height, o = document.createElement("canvas"), g = 0; g < 2; g++) {
                            var h = Math.sqrt(e / n);
                            if (i = Math.round(h * i),
                            r = Math.round(h * r),
                            o.height = r,
                            o.width = i,
                            o.getContext("2d").drawImage(t, 0, 0, i, r),
                            (n = (a = o.toDataURL()).length) < e)
                                return a
                        }
                        return a
                    }(e, r);
                n(null, i)
            } else
                n(!0)
        }, {
            orientation: !0,
            canvas: !0,
            maxWidth: 1600,
            maxHeight: 1600
        })
    }
});