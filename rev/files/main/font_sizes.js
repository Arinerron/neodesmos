
define('main/font_sizes', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.VERY_LARGE = e.LARGE = e.MEDIUM = e.SMALL = e.VERY_SMALL = void 0,
    e.VERY_SMALL = 9,
    e.SMALL = 12,
    e.MEDIUM = 16,
    e.LARGE = 20,
    e.VERY_LARGE = 24
});
!function(t) {
    "use strict";
    var e = function(t, n, r) {
        var o, i, a = document.createElement("img");
        if (a.onerror = n,
        a.onload = function() {
            !i || r && r.noRevoke || e.revokeObjectURL(i),
            n && n(e.scale(a, r))
        }
        ,
        e.isInstanceOf("Blob", t) || e.isInstanceOf("File", t))
            o = i = e.createObjectURL(t),
            a._type = t.type;
        else {
            if ("string" != typeof t)
                return !1;
            o = t,
            r && r.crossOrigin && (a.crossOrigin = r.crossOrigin)
        }
        return o ? (a.src = o,
        a) : e.readFile(t, function(t) {
            var e = t.target;
            e && e.result ? a.src = e.result : n && n(t)
        })
    }
      , n = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    e.isInstanceOf = function(t, e) {
        return Object.prototype.toString.call(e) === "[object " + t + "]"
    }
    ,
    e.transformCoordinates = function() {}
    ,
    e.getTransformedOptions = function(t) {
        return t
    }
    ,
    e.renderImageToCanvas = function(t, e, n, r, o, i, a, c, s, d) {
        return t.getContext("2d").drawImage(e, n, r, o, i, a, c, s, d),
        t
    }
    ,
    e.hasCanvasOption = function(t) {
        return t.canvas || t.crop
    }
    ,
    e.scale = function(t, n) {
        n = n || {};
        var r, o, i, a, c, s, d, u, f, h = document.createElement("canvas"), g = t.getContext || e.hasCanvasOption(n) && h.getContext, v = t.naturalWidth || t.width, l = t.naturalHeight || t.height, m = v, O = l, b = function() {
            var t = Math.max((i || m) / m, (a || O) / O);
            t > 1 && (m = Math.ceil(m * t),
            O = Math.ceil(O * t))
        }, w = function() {
            var t = Math.min((r || m) / m, (o || O) / O);
            t < 1 && (m = Math.ceil(m * t),
            O = Math.ceil(O * t))
        };
        return g && (d = (n = e.getTransformedOptions(n)).left || 0,
        u = n.top || 0,
        n.sourceWidth ? (c = n.sourceWidth,
        void 0 !== n.right && void 0 === n.left && (d = v - c - n.right)) : c = v - d - (n.right || 0),
        n.sourceHeight ? (s = n.sourceHeight,
        void 0 !== n.bottom && void 0 === n.top && (u = l - s - n.bottom)) : s = l - u - (n.bottom || 0),
        m = c,
        O = s),
        r = n.maxWidth,
        o = n.maxHeight,
        i = n.minWidth,
        a = n.minHeight,
        g && r && o && n.crop ? (m = r,
        O = o,
        (f = c / s - r / o) < 0 ? (s = o * c / r,
        void 0 === n.top && void 0 === n.bottom && (u = (l - s) / 2)) : f > 0 && (c = r * s / o,
        void 0 === n.left && void 0 === n.right && (d = (v - c) / 2))) : ((n.contain || n.cover) && (i = r = r || i,
        a = o = o || a),
        n.cover ? (w(),
        b()) : (b(),
        w())),
        g ? (h.width = m,
        h.height = O,
        e.transformCoordinates(h, n),
        e.renderImageToCanvas(h, t, d, u, c, s, 0, 0, m, O)) : (t.width = m,
        t.height = O,
        t)
    }
    ,
    e.createObjectURL = function(t) {
        return !!n && n.createObjectURL(t)
    }
    ,
    e.revokeObjectURL = function(t) {
        return !!n && n.revokeObjectURL(t)
    }
    ,
    e.readFile = function(t, e, n) {
        if (window.FileReader) {
            var r = new FileReader;
            if (r.onload = r.onerror = e,
            r[n = n || "readAsDataURL"])
                return r[n](t),
                r
        }
        return !1
    }
    ,
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image', [], function() {
        return e
    }) : t.loadImage = e
}(this);
!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image-orientation', ["./load-image"], t) : t(window.loadImage)
}(function(t) {
    "use strict";
    var e = t.hasCanvasOption;
    t.hasCanvasOption = function(t) {
        return e(t) || t.orientation
    }
    ,
    t.transformCoordinates = function(t, e) {
        var a = t.getContext("2d")
          , o = t.width
          , i = t.height
          , r = e.orientation;
        if (r)
            switch (r > 4 && (t.width = i,
            t.height = o),
            r) {
            case 2:
                a.translate(o, 0),
                a.scale(-1, 1);
                break;
            case 3:
                a.translate(o, i),
                a.rotate(Math.PI);
                break;
            case 4:
                a.translate(0, i),
                a.scale(1, -1);
                break;
            case 5:
                a.rotate(.5 * Math.PI),
                a.scale(1, -1);
                break;
            case 6:
                a.rotate(.5 * Math.PI),
                a.translate(0, -i);
                break;
            case 7:
                a.rotate(.5 * Math.PI),
                a.translate(o, -i),
                a.scale(-1, 1);
                break;
            case 8:
                a.rotate(-.5 * Math.PI),
                a.translate(-o, 0)
            }
    }
    ,
    t.getTransformedOptions = function(t) {
        if (!t.orientation || 1 === t.orientation)
            return t;
        var e, a = {};
        for (e in t)
            t.hasOwnProperty(e) && (a[e] = t[e]);
        switch (t.orientation) {
        case 2:
            a.left = t.right,
            a.right = t.left;
            break;
        case 3:
            a.left = t.right,
            a.top = t.bottom,
            a.right = t.left,
            a.bottom = t.top;
            break;
        case 4:
            a.top = t.bottom,
            a.bottom = t.top;
            break;
        case 5:
            a.left = t.top,
            a.top = t.left,
            a.right = t.bottom,
            a.bottom = t.right;
            break;
        case 6:
            a.left = t.top,
            a.top = t.right,
            a.right = t.bottom,
            a.bottom = t.left;
            break;
        case 7:
            a.left = t.bottom,
            a.top = t.right,
            a.right = t.top,
            a.bottom = t.left;
            break;
        case 8:
            a.left = t.bottom,
            a.top = t.left,
            a.right = t.top,
            a.bottom = t.right
        }
        return t.orientation > 4 && (a.maxWidth = t.maxHeight,
        a.maxHeight = t.maxWidth,
        a.minWidth = t.minHeight,
        a.minHeight = t.minWidth,
        a.sourceWidth = t.sourceHeight,
        a.sourceHeight = t.sourceWidth),
        a
    }
});
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image-meta', ["./load-image"], e) : e(window.loadImage)
}(function(e) {
    "use strict";
    var i = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    e.blobSlice = i && function() {
        var e = this.slice || this.webkitSlice || this.mozSlice;
        return e.apply(this, arguments)
    }
    ,
    e.metaDataParsers = {
        jpeg: {
            65505: []
        }
    },
    e.parseMetaData = function(i, a, t) {
        var l = this
          , n = (t = t || {}).maxMetaDataSize || 262144
          , o = {};
        !!(window.DataView && i && i.size >= 12 && "image/jpeg" === i.type && e.blobSlice) && e.readFile(e.blobSlice.call(i, 0, n), function(i) {
            var n, r, s, c, g = i.target.result, d = new DataView(g), f = 2, b = d.byteLength - 4, m = f;
            if (65496 === d.getUint16(0)) {
                for (; f < b && ((n = d.getUint16(f)) >= 65504 && n <= 65519 || 65534 === n); ) {
                    if (f + (r = d.getUint16(f + 2) + 2) > d.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (s = e.metaDataParsers.jpeg[n])
                        for (c = 0; c < s.length; c += 1)
                            s[c].call(l, d, f, r, o, t);
                    m = f += r
                }
                !t.disableImageHead && m > 6 && (g.slice ? o.imageHead = g.slice(0, m) : o.imageHead = new Uint8Array(g).subarray(0, m))
            } else
                console.log("Invalid JPEG file: Missing JPEG marker.");
            a(o)
        }, "readAsArrayBuffer") || a(o)
    }
});
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image-ios', ["./load-image"], e) : e(window.loadImage)
}(function(e) {
    "use strict";
    if (window.navigator && window.navigator.platform && /iP(hone|od|ad)/.test(window.navigator.platform)) {
        var t = e.renderImageToCanvas;
        e.detectSubsampling = function(e) {
            var t, a;
            return e.width * e.height > 1048576 && ((t = document.createElement("canvas")).width = t.height = 1,
            (a = t.getContext("2d")).drawImage(e, 1 - e.width, 0),
            0 === a.getImageData(0, 0, 1, 1).data[3])
        }
        ,
        e.detectVerticalSquash = function(e, t) {
            var a, n, i, r, d = e.naturalHeight || e.height, o = document.createElement("canvas"), g = o.getContext("2d");
            for (t && (d /= 2),
            o.width = 1,
            o.height = d,
            g.drawImage(e, 0, 0),
            a = g.getImageData(0, 0, 1, d).data,
            n = 0,
            i = d,
            r = d; r > n; )
                0 === a[4 * (r - 1) + 3] ? i = r : n = r,
                r = i + n >> 1;
            return r / d || 1
        }
        ,
        e.renderImageToCanvas = function(a, n, i, r, d, o, g, c, m, h) {
            if ("image/jpeg" === n._type) {
                var u, f, w, s, l = a.getContext("2d"), v = document.createElement("canvas"), I = 1024, p = v.getContext("2d");
                if (v.width = I,
                v.height = I,
                l.save(),
                (u = e.detectSubsampling(n)) && (i /= 2,
                r /= 2,
                d /= 2,
                o /= 2),
                f = e.detectVerticalSquash(n, u),
                u || 1 !== f) {
                    for (r *= f,
                    m = Math.ceil(I * m / d),
                    h = Math.ceil(I * h / o / f),
                    c = 0,
                    s = 0; s < o; ) {
                        for (g = 0,
                        w = 0; w < d; )
                            p.clearRect(0, 0, I, I),
                            p.drawImage(n, i, r, d, o, -w, -s, d, o),
                            l.drawImage(v, 0, 0, I, I, g, c, m, h),
                            w += I,
                            g += m;
                        s += I,
                        c += h
                    }
                    return l.restore(),
                    a
                }
            }
            return t(a, n, i, r, d, o, g, c, m, h)
        }
    }
});
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image-exif', ["./load-image", "./load-image-meta"], e) : e(window.loadImage)
}(function(e) {
    "use strict";
    e.ExifMap = function() {
        return this
    }
    ,
    e.ExifMap.prototype.map = {
        Orientation: 274
    },
    e.ExifMap.prototype.get = function(e) {
        return this[e] || this[this.map[e]]
    }
    ,
    e.getExifThumbnail = function(e, i, t) {
        var n, a, f;
        if (t && !(i + t > e.byteLength)) {
            for (n = [],
            a = 0; a < t; a += 1)
                f = e.getUint8(i + a),
                n.push((f < 16 ? "0" : "") + f.toString(16));
            return "data:image/jpeg,%" + n.join("%")
        }
        console.log("Invalid Exif data: Invalid thumbnail data.")
    }
    ,
    e.exifTagTypes = {
        1: {
            getValue: function(e, i) {
                return e.getUint8(i)
            },
            size: 1
        },
        2: {
            getValue: function(e, i) {
                return String.fromCharCode(e.getUint8(i))
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function(e, i, t) {
                return e.getUint16(i, t)
            },
            size: 2
        },
        4: {
            getValue: function(e, i, t) {
                return e.getUint32(i, t)
            },
            size: 4
        },
        5: {
            getValue: function(e, i, t) {
                return e.getUint32(i, t) / e.getUint32(i + 4, t)
            },
            size: 8
        },
        9: {
            getValue: function(e, i, t) {
                return e.getInt32(i, t)
            },
            size: 4
        },
        10: {
            getValue: function(e, i, t) {
                return e.getInt32(i, t) / e.getInt32(i + 4, t)
            },
            size: 8
        }
    },
    e.exifTagTypes[7] = e.exifTagTypes[1],
    e.getExifValue = function(i, t, n, a, f, g) {
        var s, r, o, l, u, d, x = e.exifTagTypes[a];
        if (x) {
            if (!((r = (s = x.size * f) > 4 ? t + i.getUint32(n + 8, g) : n + 8) + s > i.byteLength)) {
                if (1 === f)
                    return x.getValue(i, r, g);
                for (o = [],
                l = 0; l < f; l += 1)
                    o[l] = x.getValue(i, r + l * x.size, g);
                if (x.ascii) {
                    for (u = "",
                    l = 0; l < o.length && "\0" !== (d = o[l]); l += 1)
                        u += d;
                    return u
                }
                return o
            }
            console.log("Invalid Exif data: Invalid data offset.")
        } else
            console.log("Invalid Exif data: Invalid tag type.")
    }
    ,
    e.parseExifTag = function(i, t, n, a, f) {
        var g = i.getUint16(n, a);
        f.exif[g] = e.getExifValue(i, t, n, i.getUint16(n + 2, a), i.getUint32(n + 4, a), a)
    }
    ,
    e.parseExifTags = function(e, i, t, n, a) {
        var f, g, s;
        if (t + 6 > e.byteLength)
            console.log("Invalid Exif data: Invalid directory offset.");
        else {
            if (!((g = t + 2 + 12 * (f = e.getUint16(t, n))) + 4 > e.byteLength)) {
                for (s = 0; s < f; s += 1)
                    this.parseExifTag(e, i, t + 2 + 12 * s, n, a);
                return e.getUint32(g, n)
            }
            console.log("Invalid Exif data: Invalid directory size.")
        }
    }
    ,
    e.parseExifData = function(i, t, n, a, f) {
        if (!f.disableExif) {
            var g, s, r, o = t + 10;
            if (1165519206 === i.getUint32(t + 4))
                if (o + 8 > i.byteLength)
                    console.log("Invalid Exif data: Invalid segment size.");
                else if (0 === i.getUint16(t + 8)) {
                    switch (i.getUint16(o)) {
                    case 18761:
                        g = !0;
                        break;
                    case 19789:
                        g = !1;
                        break;
                    default:
                        return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                    }
                    42 === i.getUint16(o + 2, g) ? (s = i.getUint32(o + 4, g),
                    a.exif = new e.ExifMap,
                    (s = e.parseExifTags(i, o, o + s, g, a)) && !f.disableExifThumbnail && (r = {
                        exif: {}
                    },
                    s = e.parseExifTags(i, o, o + s, g, r),
                    r.exif[513] && (a.exif.Thumbnail = e.getExifThumbnail(i, o + r.exif[513], r.exif[514]))),
                    a.exif[34665] && !f.disableExifSub && e.parseExifTags(i, o, o + a.exif[34665], g, a),
                    a.exif[34853] && !f.disableExifGps && e.parseExifTags(i, o, o + a.exif[34853], g, a)) : console.log("Invalid Exif data: Missing TIFF marker.")
                } else
                    console.log("Invalid Exif data: Missing byte alignment offset.")
        }
    }
    ,
    e.metaDataParsers.jpeg[65505].push(e.parseExifData)
});
!function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define('vendor/load-image/load-image-exif-map', ["./load-image", "./load-image-exif"], e) : e(window.loadImage)
}(function(e) {
    "use strict";
    e.ExifMap.prototype.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        42240: "Gamma",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubSecTime",
        37521: "SubSecTimeOriginal",
        37522: "SubSecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "PhotographicSensitivity",
        34856: "OECF",
        34864: "SensitivityType",
        34865: "StandardOutputSensitivity",
        34866: "RecommendedExposureIndex",
        34867: "ISOSpeed",
        34868: "ISOSpeedLatitudeyyy",
        34869: "ISOSpeedLatitudezzz",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRatio",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        42016: "ImageUniqueID",
        42032: "CameraOwnerName",
        42033: "BodySerialNumber",
        42034: "LensSpecification",
        42035: "LensMake",
        42036: "LensModel",
        42037: "LensSerialNumber",
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
        31: "GPSHPositioningError"
    },
    e.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        ComponentsConfiguration: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        },
        Orientation: {
            1: "top-left",
            2: "top-right",
            3: "bottom-right",
            4: "bottom-left",
            5: "left-top",
            6: "right-top",
            7: "right-bottom",
            8: "left-bottom"
        }
    },
    e.ExifMap.prototype.getText = function(e) {
        var t = this.get(e);
        switch (e) {
        case "LightSource":
        case "Flash":
        case "MeteringMode":
        case "ExposureProgram":
        case "SensingMethod":
        case "SceneCaptureType":
        case "SceneType":
        case "CustomRendered":
        case "WhiteBalance":
        case "GainControl":
        case "Contrast":
        case "Saturation":
        case "Sharpness":
        case "SubjectDistanceRange":
        case "FileSource":
        case "Orientation":
            return this.stringValues[e][t];
        case "ExifVersion":
        case "FlashpixVersion":
            return String.fromCharCode(t[0], t[1], t[2], t[3]);
        case "ComponentsConfiguration":
            return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
        case "GPSVersionID":
            return t[0] + "." + t[1] + "." + t[2] + "." + t[3]
        }
        return String(t)
    }
    ,
    function(e) {
        var t, i = e.tags, r = e.map;
        for (t in i)
            i.hasOwnProperty(t) && (r[i[t]] = t)
    }(e.ExifMap.prototype),
    e.ExifMap.prototype.getAll = function() {
        var e, t, i = {};
        for (e in this)
            this.hasOwnProperty(e) && (t = this.tags[e]) && (i[t] = this.getText(t));
        return i
    }
});