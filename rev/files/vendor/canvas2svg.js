
define('vendor/canvas2svg', [], function() {
    "use strict";
    var t, e, r, i, s;
    function n(t, e) {
        var r, i = Object.keys(e);
        for (r = 0; r < i.length; r++)
            t = t.replace(new RegExp("\\{" + i[r] + "\\}","gi"), e[i[r]]);
        return t
    }
    function a(t) {
        var e, r, i;
        if (!t)
            throw new Error("cannot create a random attribute name for an undefined object");
        e = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
        r = "";
        do {
            for (r = "",
            i = 0; i < 12; i++)
                r += e[Math.floor(Math.random() * e.length)]
        } while (t[r]);
        return r
    }
    s = function(t, e) {
        var r, i, s, n = {};
        for (t = t.split(","),
        e = e || 10,
        r = 0; r < t.length; r += 2)
            i = "&" + t[r + 1] + ";",
            s = parseInt(t[r], e),
            n[i] = "&#" + s + ";";
        return n["\\xa0"] = "&#160;",
        n
    }("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro", 32),
    t = {
        strokeStyle: {
            svgAttr: "stroke",
            canvas: "#000000",
            svg: "none",
            apply: "stroke"
        },
        fillStyle: {
            svgAttr: "fill",
            canvas: "#000000",
            svg: null,
            apply: "fill"
        },
        lineCap: {
            svgAttr: "stroke-linecap",
            canvas: "butt",
            svg: "butt",
            apply: "stroke"
        },
        lineJoin: {
            svgAttr: "stroke-linejoin",
            canvas: "miter",
            svg: "miter",
            apply: "stroke"
        },
        miterLimit: {
            svgAttr: "stroke-miterlimit",
            canvas: 10,
            svg: 4,
            apply: "stroke"
        },
        lineWidth: {
            svgAttr: "stroke-width",
            canvas: 1,
            svg: 1,
            apply: "stroke"
        },
        globalAlpha: {
            svgAttr: "opacity",
            canvas: 1,
            svg: 1,
            apply: "fill stroke"
        },
        font: {
            canvas: "10px sans-serif"
        },
        shadowColor: {
            canvas: "#000000"
        },
        shadowOffsetX: {
            canvas: 0
        },
        shadowOffsetY: {
            canvas: 0
        },
        shadowBlur: {
            canvas: 0
        },
        textAlign: {
            canvas: "start"
        },
        textBaseline: {
            canvas: "alphabetic"
        },
        lineDash: {
            svgAttr: "stroke-dasharray",
            canvas: [],
            svg: null,
            apply: "stroke"
        }
    },
    (r = function(t, e) {
        this.__root = t,
        this.__ctx = e
    }
    ).prototype.addColorStop = function(t, e) {
        var r, i = this.__ctx.__createElement("stop");
        i.setAttribute("offset", t),
        -1 !== e.indexOf("rgba") ? (r = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(e),
        i.setAttribute("stop-color", n("rgb({r},{g},{b})", {
            r: r[1],
            g: r[2],
            b: r[3]
        })),
        i.setAttribute("stop-opacity", r[4])) : i.setAttribute("stop-color", e),
        this.__root.appendChild(i)
    }
    ,
    i = function(t, e) {
        this.__root = t,
        this.__ctx = e
    }
    ,
    (e = function(t) {
        var r, i = {
            width: 500,
            height: 500,
            enableMirroring: !1
        };
        if (arguments.length > 1 ? ((r = i).width = arguments[0],
        r.height = arguments[1]) : r = t || i,
        !(this instanceof e))
            return new e(r);
        this._randomPostfix = "-" + "xxxxxxxx".replace(/x/g, function(t) {
            return (16 * Math.random() | 0).toString(16)
        }),
        this._svgClassNames = [],
        this.width = r.width || i.width,
        this.height = r.height || i.height,
        this.enableMirroring = void 0 !== r.enableMirroring ? r.enableMirroring : i.enableMirroring,
        this.canvas = this,
        this.__document = r.document || document,
        r.ctx ? this.__ctx = r.ctx : (this.__canvas = this.__document.createElement("canvas"),
        this.__ctx = this.__canvas.getContext("2d")),
        this.__setDefaultStyles(),
        this.__stack = [this.__getStyleState()],
        this.__groupStack = [],
        this.__root = this.__document.createElementNS("http://www.w3.org/2000/svg", "svg"),
        this.__root.setAttribute("version", 1.1),
        this.__root.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
        this.__root.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"),
        this.__root.setAttribute("width", this.width),
        this.__root.setAttribute("height", this.height),
        this.__ids = {},
        this.__defs = this.__document.createElementNS("http://www.w3.org/2000/svg", "defs"),
        this.__root.appendChild(this.__defs),
        this.__currentElement = this.__document.createElementNS("http://www.w3.org/2000/svg", "g"),
        this.__root.appendChild(this.__currentElement)
    }
    ).prototype.__createElement = function(t, e, r) {
        void 0 === e && (e = {});
        var i, s, n = this.__document.createElementNS("http://www.w3.org/2000/svg", t), a = Object.keys(e);
        for (r && (n.setAttribute("fill", "none"),
        n.setAttribute("stroke", "none")),
        i = 0; i < a.length; i++)
            s = a[i],
            n.setAttribute(s, e[s]);
        var o = this._svgClassNames && this._svgClassNames[this._svgClassNames.length - 1];
        return o && n.setAttribute("class", o),
        n
    }
    ,
    e.prototype.__setDefaultStyles = function() {
        var e, r, i = Object.keys(t);
        for (e = 0; e < i.length; e++)
            this[r = i[e]] = t[r].canvas
    }
    ,
    e.prototype.__applyStyleState = function(t) {
        var e, r, i = Object.keys(t);
        for (e = 0; e < i.length; e++)
            this[r = i[e]] = t[r]
    }
    ,
    e.prototype.__getStyleState = function() {
        var e, r, i = {}, s = Object.keys(t);
        for (e = 0; e < s.length; e++)
            i[r = s[e]] = this[r];
        return i
    }
    ,
    e.prototype.__applyStyleToCurrentElement = function(e) {
        var s = this.__currentElement
          , a = this.__currentElementsToStyle;
        a && (s.setAttribute(e, ""),
        s = a.element,
        a.children.forEach(function(t) {
            t.setAttribute(e, "")
        }));
        var o, h, l, c, _, p = Object.keys(t);
        for (o = 0; o < p.length; o++)
            if (h = t[p[o]],
            l = this[p[o]],
            h.apply)
                if (l instanceof i) {
                    if (l.__ctx)
                        for (; l.__ctx.__defs.childNodes.length; )
                            c = l.__ctx.__defs.childNodes[0].getAttribute("id"),
                            this.__ids[c] = c,
                            this.__defs.appendChild(l.__ctx.__defs.childNodes[0]);
                    s.setAttribute(h.apply, n("url(#{id})", {
                        id: l.__root.getAttribute("id")
                    }))
                } else if (l instanceof r)
                    s.setAttribute(h.apply, n("url(#{id})", {
                        id: l.__root.getAttribute("id")
                    }));
                else if (-1 !== h.apply.indexOf(e) && h.svg !== l)
                    if ("stroke" !== h.svgAttr && "fill" !== h.svgAttr || -1 === l.indexOf("rgba")) {
                        var u = h.svgAttr;
                        if ("globalAlpha" === p[o] && (u = e + "-" + h.svgAttr,
                        s.getAttribute(u)))
                            continue;
                        s.setAttribute(u, l)
                    } else {
                        _ = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi.exec(l),
                        s.setAttribute(h.svgAttr, n("rgb({r},{g},{b})", {
                            r: _[1],
                            g: _[2],
                            b: _[3]
                        }));
                        var d = _[4]
                          , g = this.globalAlpha;
                        null != g && (d *= g),
                        s.setAttribute(h.svgAttr + "-opacity", d)
                    }
    }
    ,
    e.prototype.__closestGroupOrSvg = function(t) {
        return "g" === (t = t || this.__currentElement).nodeName || "svg" === t.nodeName ? t : this.__closestGroupOrSvg(t.parentNode)
    }
    ,
    e.prototype.getSerializedSvg = function(t) {
        var e, r, i, n, a, o = (new XMLSerializer).serializeToString(this.__root);
        if (/xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi.test(o) && (o = o.replace('xmlns="http://www.w3.org/2000/svg', 'xmlns:xlink="http://www.w3.org/1999/xlink')),
        t)
            for (e = Object.keys(s),
            r = 0; r < e.length; r++)
                i = e[r],
                n = s[i],
                (a = new RegExp(i,"gi")).test(o) && (o = o.replace(a, n));
        return o
    }
    ,
    e.prototype.getSvg = function() {
        return this.__root
    }
    ,
    e.prototype._dcgStartNamedGroup = function(t) {
        var e = this.__createElement("g");
        e.setAttribute("id", t + this._randomPostfix);
        var r = this.__closestGroupOrSvg();
        this.__groupStack.push(r),
        r.appendChild(e),
        this.__currentElement = e
    }
    ,
    e.prototype._dcgEndNamedGroup = function() {
        this.__currentElement = this.__groupStack.pop(),
        this.__currentElement || (this.__currentElement = this.__root.childNodes[1])
    }
    ,
    e.prototype._dcgSaveClassName = function(t) {
        this._svgClassNames.push(t),
        this.__currentElement && "path" === this.__currentElement.tagName && !this.__currentDefaultPath && (this.__currentElement.getAttribute("class") || this.__currentElement.setAttribute("class", t))
    }
    ,
    e.prototype._dcgRestoreClassName = function() {
        this._svgClassNames.pop()
    }
    ,
    e.prototype.save = function() {
        var t = this.__createElement("g")
          , e = this.__closestGroupOrSvg();
        this.__groupStack.push(e),
        e.appendChild(t),
        this.__currentElement = t,
        this.__stack.push(this.__getStyleState())
    }
    ,
    e.prototype.restore = function() {
        this.__currentElement = this.__groupStack.pop(),
        this.__currentElementsToStyle = null,
        this.__currentElement || (this.__currentElement = this.__root.childNodes[1]);
        var t = this.__stack.pop();
        this.__applyStyleState(t)
    }
    ,
    e.prototype.__addTransform = function(t) {
        var e = this.__closestGroupOrSvg();
        if (e.childNodes.length > 0) {
            "path" === this.__currentElement.nodeName && (this.__currentElementsToStyle || (this.__currentElementsToStyle = {
                element: e,
                children: []
            }),
            this.__currentElementsToStyle.children.push(this.__currentElement),
            this.__applyCurrentDefaultPath());
            var r = this.__createElement("g");
            e.appendChild(r),
            this.__currentElement = r
        }
        var i = this.__currentElement.getAttribute("transform");
        i ? i += " " : i = "",
        i += t,
        this.__currentElement.setAttribute("transform", i)
    }
    ,
    e.prototype.scale = function(t, e) {
        void 0 === e && (e = t),
        this.__addTransform(n("scale({x},{y})", {
            x: t,
            y: e
        }))
    }
    ,
    e.prototype.rotate = function(t) {
        var e = 180 * t / Math.PI;
        this.__addTransform(n("rotate({angle},{cx},{cy})", {
            angle: e,
            cx: 0,
            cy: 0
        }))
    }
    ,
    e.prototype.translate = function(t, e) {
        this.__addTransform(n("translate({x},{y})", {
            x: t,
            y: e
        }))
    }
    ,
    e.prototype.transform = function(t, e, r, i, s, a) {
        this.__addTransform(n("matrix({a},{b},{c},{d},{e},{f})", {
            a: t,
            b: e,
            c: r,
            d: i,
            e: s,
            f: a
        }))
    }
    ,
    e.prototype.beginPath = function() {
        var t;
        this.__currentDefaultPath = "",
        this.__currentPosition = {},
        t = this.__createElement("path", {}, !0),
        this.__closestGroupOrSvg().appendChild(t),
        this.__currentElement = t
    }
    ,
    e.prototype.__applyCurrentDefaultPath = function() {
        var t = this.__currentElement;
        "path" === t.nodeName ? t.setAttribute("d", this.__currentDefaultPath) : console.error("Attempted to apply path command to node", t.nodeName)
    }
    ,
    e.prototype.__addPathCommand = function(t) {
        this.__currentDefaultPath += " ",
        this.__currentDefaultPath += t
    }
    ,
    e.prototype.moveTo = function(t, e) {
        "path" !== this.__currentElement.nodeName && this.beginPath(),
        this.__currentPosition = {
            x: t,
            y: e
        },
        this.__addPathCommand(n("M {x} {y}", {
            x: t,
            y: e
        }))
    }
    ,
    e.prototype.closePath = function() {
        this.__currentDefaultPath && this.__addPathCommand("Z")
    }
    ,
    e.prototype.lineTo = function(t, e) {
        this.__currentPosition = {
            x: t,
            y: e
        },
        this.__currentDefaultPath.indexOf("M") > -1 ? this.__addPathCommand(n("L {x} {y}", {
            x: t,
            y: e
        })) : this.__addPathCommand(n("M {x} {y}", {
            x: t,
            y: e
        }))
    }
    ,
    e.prototype.bezierCurveTo = function(t, e, r, i, s, a) {
        this.__currentPosition = {
            x: s,
            y: a
        },
        this.__addPathCommand(n("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}", {
            cp1x: t,
            cp1y: e,
            cp2x: r,
            cp2y: i,
            x: s,
            y: a
        }))
    }
    ,
    e.prototype.quadraticCurveTo = function(t, e, r, i) {
        this.__currentPosition = {
            x: r,
            y: i
        },
        this.__addPathCommand(n("Q {cpx} {cpy} {x} {y}", {
            cpx: t,
            cpy: e,
            x: r,
            y: i
        }))
    }
    ;
    var o = function(t) {
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
        return [t[0] / e, t[1] / e]
    };
    return e.prototype.arcTo = function(t, e, r, i, s) {
        var n = this.__currentPosition && this.__currentPosition.x
          , a = this.__currentPosition && this.__currentPosition.y;
        if (void 0 !== n && void 0 !== a) {
            if (s < 0)
                throw new Error("IndexSizeError: The radius provided (" + s + ") is negative.");
            if (n === t && a === e || t === r && e === i || 0 === s)
                this.lineTo(t, e);
            else {
                var h = o([n - t, a - e])
                  , l = o([r - t, i - e]);
                if (h[0] * l[1] != h[1] * l[0]) {
                    var c = h[0] * l[0] + h[1] * l[1]
                      , _ = Math.acos(Math.abs(c))
                      , p = o([h[0] + l[0], h[1] + l[1]])
                      , u = s / Math.sin(_ / 2)
                      , d = t + u * p[0]
                      , g = e + u * p[1]
                      , m = [-h[1], h[0]]
                      , f = [l[1], -l[0]]
                      , y = function(t) {
                        var e = t[0];
                        return t[1] >= 0 ? Math.acos(e) : -Math.acos(e)
                    }
                      , v = y(m)
                      , x = y(f);
                    this.lineTo(d + m[0] * s, g + m[1] * s),
                    this.arc(d, g, s, v, x)
                } else
                    this.lineTo(t, e)
            }
        }
    }
    ,
    e.prototype.stroke = function() {
        "path" === this.__currentElement.nodeName && this.__currentElement.setAttribute("paint-order", "fill stroke markers"),
        this.__applyCurrentDefaultPath(),
        this.__applyStyleToCurrentElement("stroke")
    }
    ,
    e.prototype.fill = function() {
        "path" === this.__currentElement.nodeName && this.__currentElement.setAttribute("paint-order", "stroke fill markers"),
        this.__applyCurrentDefaultPath(),
        this.__applyStyleToCurrentElement("fill")
    }
    ,
    e.prototype.rect = function(t, e, r, i) {
        "path" !== this.__currentElement.nodeName && this.beginPath(),
        this.moveTo(t, e),
        this.lineTo(t + r, e),
        this.lineTo(t + r, e + i),
        this.lineTo(t, e + i),
        this.lineTo(t, e),
        this.closePath()
    }
    ,
    e.prototype.fillRect = function(t, e, r, i) {
        var s;
        s = this.__createElement("rect", {
            x: t,
            y: e,
            width: r,
            height: i
        }, !0),
        this.__closestGroupOrSvg().appendChild(s),
        this.__currentElement = s,
        this.__applyStyleToCurrentElement("fill")
    }
    ,
    e.prototype.strokeRect = function(t, e, r, i) {
        var s;
        s = this.__createElement("rect", {
            x: t,
            y: e,
            width: r,
            height: i
        }, !0),
        this.__closestGroupOrSvg().appendChild(s),
        this.__currentElement = s,
        this.__applyStyleToCurrentElement("stroke")
    }
    ,
    e.prototype.__clearCanvas = function() {
        for (var t = this.__closestGroupOrSvg().getAttribute("transform"), e = this.__root.childNodes[1], r = e.childNodes, i = r.length - 1; i >= 0; i--)
            r[i] && e.removeChild(r[i]);
        this.__currentElement = e,
        this.__groupStack = [],
        t && this.__addTransform(t)
    }
    ,
    e.prototype.clearRect = function(t, e, r, i) {
        if (0 !== t || 0 !== e || r !== this.width || i !== this.height) {
            var s, n = this.__closestGroupOrSvg();
            s = this.__createElement("rect", {
                x: t,
                y: e,
                width: r,
                height: i,
                fill: "#FFFFFF"
            }, !0),
            n.appendChild(s)
        } else
            this.__clearCanvas()
    }
    ,
    e.prototype.createLinearGradient = function(t, e, i, s) {
        var n = this.__createElement("linearGradient", {
            id: a(this.__ids),
            x1: t + "px",
            x2: i + "px",
            y1: e + "px",
            y2: s + "px",
            gradientUnits: "userSpaceOnUse"
        }, !1);
        return this.__defs.appendChild(n),
        new r(n,this)
    }
    ,
    e.prototype.createRadialGradient = function(t, e, i, s, n, o) {
        var h = this.__createElement("radialGradient", {
            id: a(this.__ids),
            cx: s + "px",
            cy: n + "px",
            r: o + "px",
            fx: t + "px",
            fy: e + "px",
            gradientUnits: "userSpaceOnUse"
        }, !1);
        return this.__defs.appendChild(h),
        new r(h,this)
    }
    ,
    e.prototype.__parseFont = function() {
        var t = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i.exec(this.font)
          , e = {
            style: t[1] || "normal",
            size: t[4] || "10px",
            family: t[6] || "sans-serif",
            weight: t[3] || "normal",
            decoration: t[2] || "normal",
            href: null
        };
        return "underline" === this.__fontUnderline && (e.decoration = "underline"),
        this.__fontHref && (e.href = this.__fontHref),
        e
    }
    ,
    e.prototype.__wrapTextLink = function(t, e) {
        if (t.href) {
            var r = this.__createElement("a");
            return r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", t.href),
            r.appendChild(e),
            r
        }
        return e
    }
    ,
    e.prototype.__applyText = function(t, e, r, i) {
        var s, n, a = this.__parseFont(), o = this.__closestGroupOrSvg(), h = this.__createElement("text", {
            "font-family": a.family,
            "font-size": a.size,
            "font-style": a.style,
            "font-weight": a.weight,
            "text-decoration": a.decoration,
            x: e,
            y: r,
            "text-anchor": (s = this.textAlign,
            n = {
                left: "start",
                right: "end",
                center: "middle",
                start: "start",
                end: "end"
            },
            n[s] || n.start)
        }, !0);
        h.appendChild(this.__document.createTextNode(t)),
        this.__currentElement = h,
        this.__applyStyleToCurrentElement(i),
        o.appendChild(this.__wrapTextLink(a, h))
    }
    ,
    e.prototype.fillText = function(t, e, r) {
        this.__applyText(t, e, r, "fill")
    }
    ,
    e.prototype.strokeText = function(t, e, r) {
        this.__applyText(t, e, r, "stroke")
    }
    ,
    e.prototype.measureText = function(t) {
        return this.__ctx.font = this.font,
        this.__ctx.measureText(t)
    }
    ,
    e.prototype.arc = function(t, e, r, i, s, a) {
        if (i !== s) {
            (i %= 2 * Math.PI) === (s %= 2 * Math.PI) && (s = (s + 2 * Math.PI - .001 * (a ? -1 : 1)) % (2 * Math.PI));
            var o = t + r * Math.cos(s)
              , h = e + r * Math.sin(s)
              , l = t + r * Math.cos(i)
              , c = e + r * Math.sin(i)
              , _ = a ? 0 : 1
              , p = 0
              , u = s - i;
            u < 0 && (u += 2 * Math.PI),
            p = a ? u > Math.PI ? 0 : 1 : u > Math.PI ? 1 : 0,
            this.lineTo(l, c),
            this.__addPathCommand(n("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}", {
                rx: r,
                ry: r,
                xAxisRotation: 0,
                largeArcFlag: p,
                sweepFlag: _,
                endX: o,
                endY: h
            })),
            this.__currentPosition = {
                x: o,
                y: h
            }
        }
    }
    ,
    e.prototype.clip = function() {
        var t = this.__closestGroupOrSvg()
          , e = this.__createElement("clipPath")
          , r = a(this.__ids)
          , i = this.__createElement("g");
        this.__applyCurrentDefaultPath(),
        t.removeChild(this.__currentElement),
        e.setAttribute("id", r),
        e.appendChild(this.__currentElement),
        this.__defs.appendChild(e),
        t.setAttribute("clip-path", n("url(#{id})", {
            id: r
        })),
        t.appendChild(i),
        this.__currentElement = i
    }
    ,
    e.prototype.drawImage = function() {
        var t, r, i, s, n, a, o, h, l, c, _, p, u, d = Array.prototype.slice.call(arguments), g = d[0], m = 0, f = 0;
        if (3 === d.length)
            t = d[1],
            r = d[2],
            i = n = g.width,
            s = a = g.height;
        else if (5 === d.length)
            t = d[1],
            r = d[2],
            i = d[3],
            s = d[4],
            n = g.width,
            a = g.height;
        else {
            if (9 !== d.length)
                throw new Error("Invalid number of arguments passed to drawImage: " + arguments.length);
            m = d[1],
            f = d[2],
            n = d[3],
            a = d[4],
            t = d[5],
            r = d[6],
            i = d[7],
            s = d[8]
        }
        o = this.__closestGroupOrSvg(),
        this.__currentElement;
        var y = "translate(" + t + ", " + r + ")";
        if (g instanceof e) {
            if ((h = g.getSvg().cloneNode(!0)).childNodes && h.childNodes.length > 1) {
                for (l = h.childNodes[0]; l.childNodes.length; )
                    u = l.childNodes[0].getAttribute("id"),
                    this.__ids[u] = u,
                    this.__defs.appendChild(l.childNodes[0]);
                if (c = h.childNodes[1]) {
                    var v, x = c.getAttribute("transform");
                    v = x ? x + " " + y : y,
                    c.setAttribute("transform", v),
                    o.appendChild(c)
                }
            }
        } else
            "CANVAS" !== g.nodeName && "IMG" !== g.nodeName || ((_ = this.__createElement("image")).setAttribute("width", i),
            _.setAttribute("height", s),
            _.setAttribute("opacity", this.globalAlpha),
            _.setAttribute("preserveAspectRatio", "none"),
            (m || f || n !== g.width || a !== g.height) && ((p = this.__document.createElement("canvas")).width = i,
            p.height = s,
            p.getContext("2d").drawImage(g, m, f, n, a, 0, 0, i, s),
            g = p),
            _.setAttribute("transform", y),
            _.setAttribute("xlink:href", "CANVAS" === g.nodeName ? g.toDataURL() : g.getAttribute("src")),
            o.appendChild(_))
    }
    ,
    e.prototype.createPattern = function(t, r) {
        var s, n = this.__document.createElementNS("http://www.w3.org/2000/svg", "pattern"), o = a(this.__ids);
        return n.setAttribute("id", o),
        n.setAttribute("width", t.width),
        n.setAttribute("height", t.height),
        "CANVAS" === t.nodeName || "IMG" === t.nodeName ? ((s = this.__document.createElementNS("http://www.w3.org/2000/svg", "image")).setAttribute("width", t.width),
        s.setAttribute("height", t.height),
        s.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "CANVAS" === t.nodeName ? t.toDataURL() : t.getAttribute("src")),
        n.appendChild(s),
        this.__defs.appendChild(n)) : t instanceof e && (n.appendChild(t.__root.childNodes[1]),
        this.__defs.appendChild(n)),
        new i(n,this)
    }
    ,
    e.prototype.setLineDash = function(t) {
        t && t.length > 0 ? this.lineDash = t.join(",") : this.lineDash = null
    }
    ,
    e.prototype.ellipse = function(t, e, r, i, s, a, o, h) {
        if (a !== o) {
            (a %= 2 * Math.PI) === (o %= 2 * Math.PI) && (o = (o + 2 * Math.PI - .001 * (h ? -1 : 1)) % (2 * Math.PI));
            var l = t + Math.cos(-s) * r * Math.cos(o) + Math.sin(-s) * i * Math.sin(o)
              , c = e - Math.sin(-s) * r * Math.cos(o) + Math.cos(-s) * i * Math.sin(o)
              , _ = t + Math.cos(-s) * r * Math.cos(a) + Math.sin(-s) * i * Math.sin(a)
              , p = e - Math.sin(-s) * r * Math.cos(a) + Math.cos(-s) * i * Math.sin(a)
              , u = h ? 0 : 1
              , d = 0
              , g = o - a;
            g < 0 && (g += 2 * Math.PI),
            d = h ? g > Math.PI ? 0 : 1 : g > Math.PI ? 1 : 0,
            this.lineTo(_, p),
            this.__addPathCommand(n("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}", {
                rx: r,
                ry: i,
                xAxisRotation: s * (180 / Math.PI),
                largeArcFlag: d,
                sweepFlag: u,
                endX: l,
                endY: c
            })),
            this.__currentPosition = {
                x: l,
                y: c
            }
        }
    }
    ,
    e.prototype._dcgSetTitle = function(t) {
        var e, r = this.__currentElement, i = !1, s = r.getElementsByTagName("title");
        s.length > 0 ? e = s[0] : (e = this.__document.createElementNS("http://www.w3.org/2000/svg", "title"),
        i = !0),
        e.textContent = t,
        i && r.appendChild(e)
    }
    ,
    e.prototype.drawFocusRing = function() {}
    ,
    e.prototype.createImageData = function() {}
    ,
    e.prototype.getImageData = function() {}
    ,
    e.prototype.putImageData = function() {}
    ,
    e.prototype.globalCompositeOperation = function() {}
    ,
    e.prototype.setTransform = function() {}
    ,
    e
});