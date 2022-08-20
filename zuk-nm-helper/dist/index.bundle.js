(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testpackage"] = factory();
	else
		root["TEST"] = factory();
})((typeof self!='undefined'?self:this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@alt1/base/dist/alt1api.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/alt1api.js ***!
  \**************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/declarations.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/declarations.js ***!
  \*******************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***************************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageData": () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedetect.js":
/*!******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedetect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDataSet": () => (/* binding */ ImageDataSet),
/* harmony export */   "asyncMap": () => (/* binding */ asyncMap),
/* harmony export */   "clearPngColorspace": () => (/* binding */ clearPngColorspace),
/* harmony export */   "coldif": () => (/* binding */ coldif),
/* harmony export */   "findSubbuffer": () => (/* binding */ findSubbuffer),
/* harmony export */   "findSubimage": () => (/* binding */ findSubimage),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromFileBuffer": () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   "imageDataFromUrl": () => (/* binding */ imageDataFromUrl),
/* harmony export */   "isPngBuffer": () => (/* binding */ isPngBuffer),
/* harmony export */   "simpleCompare": () => (/* binding */ simpleCompare),
/* harmony export */   "simpleCompareRMSE": () => (/* binding */ simpleCompareRMSE),
/* harmony export */   "webpackImages": () => (/* binding */ webpackImages)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Calculates the root mean square error between the two buffers at the given coordinate, this method can be used in situations with significant blur or
* transparency, it does not bail early on non-matching images like simpleCompare does so it can be expected to be much slower when called often.
* @returns The root mean square error beteen the images, high single pixel errors are penalized more than consisten low errors. return of 0 means perfect match.
*/
function simpleCompareRMSE(bigbuf, checkbuf, x, y) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    var dif = 0;
    var numpix = 0;
    for (var cx = 0; cx < checkbuf.width; cx++) {
        for (var cy = 0; cy < checkbuf.height; cy++) {
            var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
            var i2 = cx * 4 + cy * checkbuf.width * 4;
            var d = 0;
            d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
            d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
            var weight = checkbuf.data[i2 + 3] / 255;
            numpix += weight;
            dif += d * d * weight;
        }
    }
    return Math.sqrt(dif / numpix);
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imgref.js":
/*!*************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imgref.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgRef": () => (/* binding */ ImgRef),
/* harmony export */   "ImgRefBind": () => (/* binding */ ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* binding */ ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/index.js":
/*!************************************************!*\
  !*** ../node_modules/@alt1/base/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   "ImageData": () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   "ImageDetect": () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "ImageStreamReader": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   "ImgRef": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   "ImgRefBind": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   "NoAlt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   "NodePolyfill": () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "PasteInput": () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Rect": () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "addResizeElement": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   "capture": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   "captureAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   "captureHold": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   "captureStream": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   "decodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   "encodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   "mixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   "newestversion": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   "on": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   "once": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   "openbrowser": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   "removeListener": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   "requireAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   "skinName": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   "transferImageData": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   "unmixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/@alt1/base/dist/nodepolyfill.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromBuffer": () => (/* binding */ imageDataFromBuffer),
/* harmony export */   "imageDataToDrawable": () => (/* binding */ imageDataToDrawable),
/* harmony export */   "imageDataToFileBytes": () => (/* binding */ imageDataToFileBytes),
/* harmony export */   "polyfillRequire": () => (/* binding */ polyfillRequire),
/* harmony export */   "requireElectronCommon": () => (/* binding */ requireElectronCommon),
/* harmony export */   "requireNodeCanvas": () => (/* binding */ requireNodeCanvas),
/* harmony export */   "requireSharp": () => (/* binding */ requireSharp)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/pasteinput.js":
/*!*****************************************************!*\
  !*** ../node_modules/@alt1/base/dist/pasteinput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileDialog": () => (/* binding */ fileDialog),
/* harmony export */   "lastref": () => (/* binding */ lastref),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "startDragNDrop": () => (/* binding */ startDragNDrop),
/* harmony export */   "triggerPaste": () => (/* binding */ triggerPaste),
/* harmony export */   "unlisten": () => (/* binding */ unlisten)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/rect.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/base/dist/rect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/wrapper.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/wrapper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alt1Error": () => (/* binding */ Alt1Error),
/* harmony export */   "ImageStreamReader": () => (/* binding */ ImageStreamReader),
/* harmony export */   "NoAlt1Error": () => (/* binding */ NoAlt1Error),
/* harmony export */   "addResizeElement": () => (/* binding */ addResizeElement),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "captureAsync": () => (/* binding */ captureAsync),
/* harmony export */   "captureHold": () => (/* binding */ captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* binding */ captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* binding */ captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* binding */ captureMultiAsync),
/* harmony export */   "captureStream": () => (/* binding */ captureStream),
/* harmony export */   "decodeImageString": () => (/* binding */ decodeImageString),
/* harmony export */   "encodeImageString": () => (/* binding */ encodeImageString),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* binding */ getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* binding */ hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* binding */ hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* binding */ identifyApp),
/* harmony export */   "mixColor": () => (/* binding */ mixColor),
/* harmony export */   "newestversion": () => (/* binding */ newestversion),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "openbrowser": () => (/* binding */ openbrowser),
/* harmony export */   "removeListener": () => (/* binding */ removeListener),
/* harmony export */   "requireAlt1": () => (/* binding */ requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* binding */ resetEnvironment),
/* harmony export */   "skinName": () => (/* binding */ skinName),
/* harmony export */   "transferImageData": () => (/* binding */ transferImageData),
/* harmony export */   "unmixColor": () => (/* binding */ unmixColor)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "./images/wave_interface.data.png":
/*!****************************************!*\
  !*** ./images/wave_interface.data.png ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAEcAAAAHCAYAAABa6FBzAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAGKSURBVEhL5ZAxSwNREITvTyjRqLlLIiik0GhQCIKEaCGIoATUUisLwUKLM13Ef6CNhYWFf3PDHHzn3uOd2FvM7czu7Lx3Lxlnm+axl2Y2TLsF+s3VotKTHqylRWXmfR54mMU8HsqN6TBHd/FZsVy/s5O2yh3/b8D3eIOTrGfn7W1L9JEYZT9Dv6xLEsAs9EjLIy9+9chUlU8zOJ4wJ9R+X9z/jO/VnQ3w+iwy8OodeJjK4wDCxFkihNlvHO0ruf4M9ZXvz2Qn5oXX+cXRsSr4PFWfJS7wMOXjXHYHBWhirAOB/oCwCn/JwsOO+Flnq+LxWfjwxqrg/aoe4Y68+OH56a4lw2bbjlY2bNRcr0D9/wL/33oL9e7GPUve7vv28TS0z/ygqO8P+xUtfE0PC6CBPCDswVXJVPVeUNf7fjmunOu55iDsweu85HCvGDRLpldL9nixYPmkYeKq0oI08+fJYqnphb5whtauQI85+vWmU3qZz25bNrternjxhzrc9f2Qcw+Bf4758knD5g7iRgVQARd9AAAAAElFTkSuQmCC")

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**********************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!******************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "./emojiLUT.js":
/*!*********************!*\
  !*** ./emojiLUT.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emojiLUT": () => (/* binding */ emojiLUT)
/* harmony export */ });
const emojiLUT = [['superiorzurielsrobebottom', '<:SuperiorZurielsrobebottom:556591275604836395>'], ['superiorstatiussplatelegs', '<:SuperiorStatiussPlatelegs:556591276859064340>'], ['fracturedstabilisationgem', '<:fracturedstabilisationgem:869284271393751084>'], ['superiorvestasplateskirt', '<:SuperiorVestasPlateskirt:556591275969609748>'], ['kineticcycloneupgradekit', '<:kineticcycloneupgradekit:869284271733481493>'], ['abyssalarmourspikesalloy', '<:abyssalarmourspikesalloy:947871842541129768>'], ['barrowselitesirenicbody', '<:barrowselitesirenicbody:580177522445254667>'], ['barrowselitesireniclegs', '<:barrowselitesireniclegs:580177522914885632>'], ['barrowselitesirenicmask', '<:barrowselitesirenicmask:643846679862444035>'], ['superiorseasingeraonori', '<:Superiorseasingeraonori:556588694979739652>'], ['portentofitemprotection', '<:portentitemprotection:925366289629859860>'], ['shadowelitesireniclegs', '<:shadowelitesireniclegs:580176956960669717>'], ['shadowelitesirenicmask', '<:shadowelitesirenicmask:580176957296345091>'], ['shadowelitesirenicbody', '<:shadowelitesirenicbody:580176957405265930>'], ['superiormorriganschaps', '<:SuperiorMorrigansChaps:556591276137512961>'], ['attunedcrystaldaggeroh', '<:attunedcrystaldaggeroh:925794592945737818>'], ['vestmentsofhavocbottom', '<:vestmentsofhavocbottom:994189293515980902>'], ['bloodelitesirenicbody', '<:bloodelitesirenicbody:580176857199280148>'], ['bloodelitesireniclegs', '<:bloodelitesireniclegs:580176857232834560>'], ['bloodelitesirenicmask', '<:bloodelitesirenicmask:580176857618579468>'], ['shadowdrygorerapieroh', '<:shadowdrygorerapieroh:581180470809722882>'], ['shadowdrygorerapiermh', '<:shadowdrygorerapiermh:581180471011180585>'], ['superiormorrigansbody', '<:SuperiorMorrigansBody:556586036885717012>'], ['portentitemprotection', '<:portentitemprotection:925366289629859860>'], ['vestmentsofhavocboots', '<:vestmentsofhavocboots:994189291515285544>'], ['blooddrygorerapiermh', '<:blooddrygorerapiermh:581180203041292299>'], ['barrowsdrygoremacemh', '<:barrowsdrygoremacemh:580177522621284353>'], ['barrowselitetectbody', '<:barrowselitetectbody:580177522633998351>'], ['barrowselitetectmask', '<:barrowselitetectmask:580177522659033098>'], ['barrowselitetectlegs', '<:barrowselitetectlegs:580177522700976138>'], ['conservationofenergy', '<:conservationofenergy:697808773711921195>'], ['superiordragonclawoh', '<:superiordragonclawoh:779048040761655316>'], ['superiordragondagger', '<:superiordragondagger:779048040832696330>'], ['seasingersrobebottom', '<:Seasingersrobebottom:556592058958348298>'], ['pristinecorbiculaegg', '<:pristinecorbiculaegg:855865893808504873>'], ['amuletoftheforesaken', '<:amuletoftheforesaken:855865893934334012>'], ['atrociousroguegloves', '<:Atrociousroguegloves:556588709634375701>'], ['superiorstatiussbody', '<:SuperiorStatiussBody:556586036923203584>'], ['croesussenrichedroot', '<:croesussenrichedroot:892819107244810311>'], ['tzkalzuksarmourpiece', '<:tzkalzuksarmourpiece:902209626513227806>'], ['attunedcrystaldagger', '<:attunedcrystaldagger:925794593050624040>'], ['upgradedboneblowpipe', '<:upgradedboneblowpipe:925794591830056961>'], ['bowofthelastguardian', '<:bolg:994189289623662702>'], ['vestmentsofhavochood', '<:vestmentsofhavochood:994189297659940904>'], ['shadowelitetectlegs', '<:shadowelitetectlegs:580177811956957196>'], ['shadowelitetectbody', '<:shadowelitetectbody:580177812040843265>'], ['iceelitesirenicbody', '<:iceelitesirenicbody:580177620818329614>'], ['iceelitesireniclegs', '<:iceelitesireniclegs:580177620839170051>'], ['shadowdrygoremacemh', '<:shadowdrygoremacemh:580176957430431744>'], ['shadowdrygoremacemh', '<:shadowdrygoremacemh:580176957514186782>'], ['staffoflimitlessair', '<:staffoflimitlessair:864235608237801473>'], ['iceelitesirenicmask', '<:iceelitesirenicmask:643846680097325066>'], ['shadowelitetectmask', '<:shadowelitetectmask:643846710153707551>'], ['superiorzurielstaff', '<:superiorzurielstaff:860891361594966067>'], ['superiormorriganaxe', '<:superiormorriganaxe:860891494969376798>'], ['superiormorriganjav', '<:superiormorriganjav:860891495033077810>'], ['ancientarmourgizmo2', '<:ancientarmourgizmo2:697405383685308547>'], ['ancientweapongizmo2', '<:ancientweapongizmo2:697405383706411018>'], ['elderrunegauntlets5', '<:Elderrunegauntlets5:556588710456590336>'], ['achtoprimevalgloves', '<:achtoprimevalgloves:641344842789814312>'], ['achtoteralithgloves', '<:achtoteralithgloves:583428622019461130>'], ['mercilesskiteshield', '<:merciless:583430258829688854>'], ['luminitestonespirit', '<:luminitestonespirit:643506831787819039>'], ['elysianspiritshield', '<:elysianspiritshield:690976217792250007>'], ['fracturedarmasymbol', '<:fracturedarmasymbol:869284271385346100>'], ['graspingpouchorange', '<:graspingpouchorange:892816437255766088>'], ['graspingpouchyellow', '<:graspingpouchyellow:892816437507416124>'], ['graspingpouchpurple', '<:graspingpouchpurple:892816437343846440>'], ['pernixsquiverorange', '<:pernixsquiverorange:923269338851598367>'], ['pernixsquiveryellow', '<:pernixsquiveryellow:923269339136798800>'], ['pernixsquiverpurple', '<:pernixsquiverpurple:923269338885148714>'], ['attunedcrystalstaff', '<:attunedcrystalstaff:925794592920592394>'], ['abyssalarmourspikes', '<:abyssalarmourspikesalloy:947871842541129768>'], ['vestmentsofhavoctop', '<:vestmentsofhavoctop:994189295592161291>'], ['celestialhandwraps', '<:Celestialhandwraps:513190158716239885>'], ['nightmaregauntlets', '<:nightmaregauntlets:513190159441723392>'], ['2ndageplatelegsaug', '<:2ndageplatelegsaug:581180159042912262>'], ['2ndagerangelegsaug', '<:2ndagerangelegsaug:581180159286312962>'], ['2ndageplatebodyaug', '<:2ndageplatebodyaug:581180160410255398>'], ['blessingsofthesand', '<:blessingsofthesand:581180179716767764>'], ['blooddrygoremaceoh', '<:blooddrygoremaceoh:581180203078909965>'], ['blooddrygoremacemh', '<:blooddrygoremacemh:581180203154407443>'], ['barrowssireniclegs', '<:barrowssireniclegs:580177522726273024>'], ['barrowssirenicbody', '<:barrowssirenicbody:580177522776342548>'], ['eliteseasingerwand', '<:eliteseasingerwand:581180345978716170>'], ['blooddrygorelongmh', '<:blooddrygorelongmh:580176856808947719>'], ['3aelitesirenicmask', '<:3aelitesirenicmask:580176856809078796>'], ['3aelitesireniclegs', '<:3aelitesireniclegs:580176856838307871>'], ['3aelitesirenicbody', '<:3aelitesirenicbody:580176857119326241>'], ['blooddrygorelongoh', '<:blooddrygorelongoh:580176857211731988>'], ['bloodelitetectmask', '<:bloodelitetectmask:580176857283035146>'], ['bloodelitetectlegs', '<:bloodelitetectlegs:580176857316589571>'], ['bloodelitetectbody', '<:bloodelitetectbody:580176857370984458>'], ['barrowssirenicmask', '<:barrowssirenicmask:580176858558234634>'], ['icedrygorerapiermh', '<:icedrygorerapiermh:581180456268201985>'], ['icedrygorerapieroh', '<:icedrygorerapieroh:581180456435974145>'], ['ancientweapongizmo', '<:ancientweapongizmo:697405383752548382>'], ['ancientarmourgizmo', '<:ancientarmourgizmo:697405383769194516>'], ['augdrygorerapieroh', '<:augdrygorerapieroh:697485495718117536>'], ['superiordragonclaw', '<:superiordragonclaw:779048040425324585>'], ['superprayerrenewal', '<:SuperPrayerRenewal:547603714681339915>'], ['eliterobinhoodlegs', '<:EliteRobinHoodlegs:556592057456656399>'], ['pristinebagradaegg', '<:pristinebagradaegg:855865893895536661>'], ['elderruneplatelegs', '<:ElderRunePlatelegs:556591276082987012>'], ['achtoprimevalboots', '<:achtoprimevalboots:641346213299617825>'], ['superiorvestasbody', '<:SuperiorVestasBody:556586037149958175>'], ['superiorzurielstop', '<:SuperiorZurielstop:556586037216804864>'], ['achtotempestgloves', '<:achtotempestgloves:583428621889437708>'], ['achtoteralithboots', '<:achtoteralithboots:583428622090764308>'], ['vengefulkiteshield', '<:vengeful:583430259110576140>'], ['bloodsoakedfeather', '<:bloodsoakedfeather:643166859599806464>'], ['necritestonespirit', '<:necritestonespirit:643506831771303947>'], ['divinespiritshield', '<:divinespiritshield:690976217792249896>'], ['arcanespiritshield', '<:arcanespiritshield:690976219612708954>'], ['tightbindingsflank', '<:tightbindingsflank:867678154096640010>'], ['piercingenergising', '<:piercingenergising:867678153979854868>'], ['kerapacswristwraps', '<:kerapacswristwraps:869286640722513940>'], ['pontifexshadowring', '<:pontifexshadowring:870326852361789501>'], ['armadylbattlestaff', '<:armadylbattlestaff:881962727705280512>'], ['graspingpouchgreen', '<:graspingpouchgreen:892816437385756752>'], ['graspingpouchblack', '<:graspingpouchblack:892816436974735361>'], ['pernixsquivergreen', '<:pernixsquivergreen:923269339325554688>'], ['pernixsquiverblack', '<:pernixsquiverblack:923269339132608532>'], ['magmatempesttarget', '<:magmatempesttarget:924741973858996284>'], ['attunedcrystalwand', '<:attunedcrystalwand:925794593067401277>'], ['powderofprotection', '<:powderofprotection:933079947419983912>'], ['prismofrestoration', '<:prismofrestoration:938475261366784070>'], ['jasdragonbanearrow', '<:jasdragonbanearrow:971025697042755584>'], ['greaterdeathsswift', '<:gdeathsswift:994644354536837121>'], ['anticipatereflexes', '<:antireflexes:998692900135252078>'], ['intimidationtotem', '<:intimidationtotem:643507594794631198>'], ['kalphiterebounder', '<:kalphiterebounder:643846849223983125>'], ['2ndagerangetopaug', '<:2ndagerangetopaug:581180158946443275>'], ['2ndagemagelegsaug', '<:2ndagemagelegsaug:581180159449759758>'], ['blessingsofthesky', '<:blessingsofthesky:581180179515310081>'], ['blessingsofthesea', '<:blessingsofthesea:581180179515310131>'], ['3adrygorerapiermh', '<:3adrygorerapiermh:581180179544670209>'], ['3adrygorerapieroh', '<:3adrygorerapieroh:581180179880345610>'], ['shadowsirenicmask', '<:shadowsirenicmask:580177067933433876>'], ['shadowsirenicbody', '<:shadowsirenicbody:580177067933696030>'], ['shadowsireniclegs', '<:shadowsireniclegs:580177067933696068>'], ['eliteseasingerorb', '<:eliteseasingerorb:581180345345638423>'], ['ancienttoolgizmo2', '<:ancienttoolgizmo2:697405383572193311>'], ['adrenrenewalflask', '<:adrenrenewalflask:736298313980182541>'], ['gownofsubjugation', '<:GownofSubjugation:556592058824130589>'], ['superiortetsukote', '<:Superiortetsukote:556588695071752202>'], ['achtoprimevalhelm', '<:achtoprimevalhelm:641346213316395019>'], ['achtoprimevallegs', '<:achtoprimevallegs:641346213379047444>'], ['eliterobinhoodtop', '<:EliteRobinHoodTop:556585903489810454>'], ['enhancedexcalibur', '<:EnhancedExcalibur:513200949016264727>'], ['beastmasterdurzag', '<:BeastmasterDurzag:513212996948983809>'], ['greaterdazingshot', '<:mds:535541259033378827>'], ['achtotempestboots', '<:achtotempestboots:583428621692305429>'], ['achtoteralithlegs', '<:achtoteralithlegs:583428621881049090>'], ['achtoteralithhelm', '<:achtoteralithhelm:583428622015266846>'], ['achtoteralithbody', '<:achtoteralithbody:583428622136901633>'], ['attunedcrystalbow', '<:attunedcrystalbow:864235911914455040>'], ['kerapacsmaskpiece', '<:kerapacsmaskpiece:869284271435702272>'], ['orthenfurnacecore', '<:orthenfurnacecore:892342109892399125>'], ['graspingpouchblue', '<:graspingpouchblue:892816437406728252>'], ['graspingpouchpink', '<:graspingpouchpink:892816437503221830>'], ['splinteringarrows', '<:splinteringarrows:900758234246299649>'], ['magmatempestcodex', '<:magmatempestcodex:902209626332872744>'], ['corrupteddefender', '<:corrupteddefender:923248842000957480>'], ['blightedrebounder', '<:blightedrebounder:923248842101628989>'], ['pernixsquiverblue', '<:pernixsquiverblue:923269339203903488>'], ['attunedcrystalorb', '<:attunedcrystalorb:925794593050595348>'], ['jasdemonbanearrow', '<:jasdemonbanearrow:971025697055334491>'], ['kalphiterepriser', '<:kalphiterepriser:643846849362657280>'], ['elitesireniclegs', '<:elitesireniclegs:643846897525850165>'], ['elitesirenicbody', '<:elitesirenicbody:643846908305211413>'], ['elitesirenicmask', '<:elitesirenicmask:643846921944956929>'], ['eliterangerboots', '<:eliterangerboots:678156407668867082>'], ['2ndagemagetopaug', '<:2ndagemagetopaug:581180159370199040>'], ['bloodsirenicmask', '<:bloodsirenicmask:581180203100012553>'], ['barrowsmalevbody', '<:barrowsmalevbody:580177522453643306>'], ['ceremonialgloves', '<:CeremonialGloves:580177522633736214>'], ['barrowsmalevlegs', '<:barrowsmalevlegs:580177522831130634>'], ['bloodsirenicbody', '<:bloodsirenicbody:580177561024462848>'], ['dragonriderchaps', '<:DragonRiderChaps:580177561187909683>'], ['bloodsireniclegs', '<:bloodsireniclegs:580177561204686858>'], ['iceelitetectlegs', '<:iceelitetectlegs:580177621036302339>'], ['iceelitetectbody', '<:iceelitetectbody:580176956922920982>'], ['icedrygorelongoh', '<:icedrygorelongoh:581180369559093263>'], ['icedrygorelongmh', '<:icedrygorelongmh:581180369806688277>'], ['icedrygoremacemh', '<:icedrygoremacemh:581180369919803435>'], ['barrowskhopeshoh', '<:barrowskhopeshoh:580176857140428828>'], ['barrowskhopeshmh', '<:barrowskhopeshmh:580176857144492042>'], ['icedrygoremaceoh', '<:icedrygoremaceoh:581180456498626585>'], ['iceelitetectmask', '<:iceelitetectmask:643846710543777802>'], ['barrowsmalevhelm', '<:barrowsmalevhelm:643846763454791691>'], ['drakansmedallion', '<:drakansmedallion:855869058225274931>'], ['ancienttoolgizmo', '<:ancienttoolgizmo:697405383513473046>'], ['augdrygoremacemh', '<:augdrygoremacemh:697485495684431902>'], ['heightenedsenses', '<:heightenedsenses:697808773573771344>'], ['undeadslayerperk', '<:undeadslayerperk:689502804720615441>'], ['dragonslayerperk', '<:dragonslayerperk:689502927731163170>'], ['achtoprimevaltop', '<:achtoprimevaltop:641344704939819028>'], ['superprayerflask', '<:superprayerflask:851514430567350302>'], ['literallynothing', '<:literallynothing:513208026526908427>'], ['supremedagganoth', '<:SupremeDagganoth:513212948798504980>'], ['commanderzilyana', '<:CommanderZilyana:513212996437409793>'], ['kalphitedefender', '<:kalphitedefender:643151141382651907>'], ['dragonstonebakri', '<:DragonstoneBakri:565726489144852511>'], ['achtotempesthlem', '<:achtotempesthlem:583428621872660498>'], ['achtotempestlegs', '<:achtotempestlegs:583428622052753424>'], ['achtotempestbody', '<:achtotempestbody:583428622094958612>'], ['dragonriderlance', '<:dragonriderlance:643161541931171872>'], ['imbuedbladeslice', '<:imbuedbladeslice:643169149639589918>'], ['ancientsummstone', '<:ancientsummstone:643169166056095780>'], ['purplesmallpouch', '<:purplesmallpouch:690848914831704086>'], ['orangesmallpouch', '<:orangesmallpouch:690848914969985034>'], ['yellowsmallpouch', '<:yellowsmallpouch:690848914974310410>'], ['bindingshotflank', '<:bindingshotflank:867678153400647701>'], ['cannonupgradekit', '<:cannonupgradekit:869284271788023838>'], ['frozencoreofleng', '<:frozencoreofleng:884739993527025704>'], ['prismofsalvation', '<:prismofsalvation:892342109431029761>'], ['taggascorehammer', '<:taggascorehammer:892816536966950954>'], ['graspingpouchred', '<:graspingpouchred:892816437121515531>'], ['cryptbloomgloves', '<:cryptbloomgloves:892819106879922179>'], ['deathsporearrows', '<:deathsporearrows:900758234527301642>'], ['spacetimemattock', '<:spacetimemattock:900765150674555000>'], ['archoutfitjacket', '<:archoutfitjacket:900765150691360768>'], ['pernixsquiverred', '<:pernixsquiverred:923269339178758204>'], ['aggressionpotion', '<:aggressionpotion:925794592199147581>'], ['teamsplitredblue', '<:teamsplitredblue:956854185591197776>'], ['overpowerigneous', '<:overpowerigneous:959089455640215633>'], ['igneousoverpower', '<:overpowerigneous:959089455640215633>'], ['omnipowerigneous', '<:omnipowerigneous:959089455560540200>'], ['igneousomnipower', '<:omnipowerigneous:959089455560540200>'], ['disintegraterune', '<:disintegraterune:994206018680668171>'], ['ganodermicponcho', '<:ganobody:1003947805611655208>'], ['ganodermicgloves', '<:ganogloves:1003947799760617522>'], ['ancientdefender', '<:ancientdefender:643846874498990120>'], ['masterworkboots', '<:masterworkboots:643847030824894477>'], ['inquisitorstaff', '<:inquisitorstaff:694566917553520680>'], ['3adrygoremaceoh', '<:3adrygoremaceoh:581180179494338561>'], ['3adrygoremacemh', '<:3adrygoremacemh:581180179771293736>'], ['3aelitetectbody', '<:3aelitetectbody:580177522348785679>'], ['3aelitetectlegs', '<:3aelitetectlegs:580177522495455232>'], ['3aelitetectmask', '<:3aelitetectmask:580177522529140736>'], ['ceremonialboots', '<:CeremonialBoots:580177522575147018>'], ['barrowstectbody', '<:barrowstectbody:580177522835193869>'], ['dragonriderhelm', '<:DragonRiderHelm:580177561032720415>'], ['barrowstectlegs', '<:barrowstectlegs:580177561175457812>'], ['dragonriderbody', '<:DragonRiderBody:580177561347293185>'], ['shadowkhopeshoh', '<:shadowkhopeshoh:580176957195550723>'], ['shadowkhopeshmh', '<:shadowkhopeshmh:580176957392814090>'], ['shadowmalevhelm', '<:shadowmalevhelm:580176957451403309>'], ['shadowmalevlegs', '<:shadowmalevlegs:580177004150784020>'], ['shadowmalevbody', '<:shadowmalevbody:580177004209635358>'], ['3adrygorelongmh', '<:3adrygorelongmh:580176857060868107>'], ['3adrygorelongoh', '<:3adrygorelongoh:580176857090097162>'], ['barrowsseiswand', '<:barrowsseiswand:580176857157074945>'], ['barrowsseissing', '<:barrowsseissing:580176857207668736>'], ['barrowsnoxstaff', '<:barrowsnoxstaff:580176857375178788>'], ['shadowkhopeshoh', '<:shadowkhopeshoh:615620239970795578>'], ['fellstalksticks', '<:FellstalkSticks:690987265421213746>'], ['barrowstectmask', '<:barrowstectmask:643846732609749002>'], ['banelongswordmh', '<:banelongswordmh:859483155021692950>'], ['zamorakgodsword', '<:zamorakgodsword:860891314463834152>'], ['guthixsblessing', '<:GuthixsBlessing:553050196767145995>'], ['demonslayerperk', '<:demonslayerperk:689502842653900818>'], ['deathlotuschaps', '<:DeathLotuschaps:556592056995151892>'], ['animalegssliske', '<:AnimalegsSliske:556592073042821122>'], ['animalegsamorak', '<:Animalegsamorak:556592073374171146>'], ['ghosthunterhelm', '<:ghosthunterhelm:855865893808767016>'], ['ghosthunterbody', '<:ghosthunterbody:855865893815844914>'], ['pristinepavoegg', '<:pristinepavoegg:855865893849137182>'], ['ghosthunterlegs', '<:ghosthunterlegs:855865893854511144>'], ['masterworkglove', '<:masterworkglove:556588694837133343>'], ['glovesofpassage', '<:Glovesofpassage:556588694862037012>'], ['superantipoison', '<:superantipoison:841409588884406272>'], ['phoenixnecklace', '<:phoenixnecklace:852939844007231508>'], ['animahelmsliske', '<:animahelmsliske:643120082398085158>'], ['blackstonearrow', '<:blackstonearrow:785031580149743617>'], ['ancientrepriser', '<:ancientrepriser:643150658891153428>'], ['deathsswiftness', '<:deathsswift:994921434633744455>'], ['pestiferouscomp', '<:pestiferouscomp:583435544088936491>'], ['spiritualprayer', '<:spiritualprayer:651079281882955787>'], ['deflectingparts', '<:deflectingparts:583434317644955648>'], ['blackstoneheart', '<:blackstoneheart:643162243571122196>'], ['glimmeringscale', '<:glimmeringscale:643163068846702596>'], ['royalstabiliser', '<:royalstabiliser:643168122815381534>'], ['imbuedbarkshard', '<:imbuedbarkshard:643168158504583249>'], ['ancientartefact', '<:ancientartefact:643169166081130517>'], ['addystonespirit', '<:addystonespirit:643506831909584896>'], ['runestonespirit', '<:runestonespirit:643506831947464704>'], ['coalstonespirit', '<:coalstonespirit:643506832060710935>'], ['greensmallpouch', '<:greensmallpouch:690848914965921792>'], ['blacksmallpouch', '<:blacksmallpouch:690848915251134464>'], ['telekeneticgrab', '<:telekeneticgrab:866551637970255872>'], ['deepimpactflank', '<:deepimpactflank:867678153611018261>'], ['anticlearheaded', '<:anticlearheaded:867678154071998464>'], ['sliceenergising', '<:sliceenergising:867678153757294673>'], ['wrackenergising', '<:wrackenergising:867678153429221387>'], ['eldertrovejast1', '<:eldertrovejast1:869284271498625075>'], ['eldertrovejast2', '<:eldertrovejast2:869284271255326761>'], ['eldertrovejast3', '<:eldertrovejast3:869284271595065404>'], ['eldertrovebikt1', '<:eldertrovebikt1:869284271502803075>'], ['eldertrovebikt2', '<:eldertrovebikt2:869284271502802974>'], ['eldertrovebikt3', '<:eldertrovebikt3:869284271490220072>'], ['eldertrovewent1', '<:eldertrovewent1:869284271502790666>'], ['eldertrovewent2', '<:eldertrovewent2:869284271053996053>'], ['eldertrovewent3', '<:eldertrovewent3:869284271452479488>'], ['eldertrovefult1', '<:eldertrovefult1:869284271574102056>'], ['eldertrovefult2', '<:eldertrovefult2:869284271448272926>'], ['eldertrovefult3', '<:eldertrovefult3:869284271490236456>'], ['manuscriptofjas', '<:manuscriptofjas:869284373747343460>'], ['manuscriptofbik', '<:manuscriptofbik:869284373701226626>'], ['manuscriptofwen', '<:manuscriptofwen:869284373906735114>'], ['manuscriptofful', '<:manuscriptofful:869284373898334238>'], ['potionreservoir', '<:potionreservoir:878739200407654431>'], ['waterfiendpouch', '<:waterfiendpouch:892342109942743070>'], ['cryptbloomboots', '<:cryptbloomboots:892819107236433930>'], ['broochofthegods', '<:broochofthegods:900765150678777976>'], ['hellhoundscroll', '<:hellhoundscroll:922417969731088435>'], ['taintedrepriser', '<:taintedrepriser:923248841644466198>'], ['teamsplitredred', '<:teamsplitredred:923249948680675388>'], ['crystaldaggermh', '<:crystaldaggermh:925794592429838387>'], ['crystaldaggeroh', '<:crystaldaggeroh:925794592857665608>'], ['staffofdarkness', '<:staffofdarkness:925794592387907634>'], ['zamorakianspear', '<:zamorakianspear:925794592270475314>'], ['abyssalvinewhip', '<:abyssalvinewhip:925794592312418415>'], ['drygorerapiermh', '<:drygorerapiermh:925794592056545290>'], ['aggressionflask', '<:aggressionflask:925794591834275891>'], ['powderofpenance', '<:powderofpenance:928221126360969226>'], ['sixthagecircuit', '<:sixthagecircuit:937093290245894154>'], ['deadshotigneous', '<:deadshotigneous:959089455283728386>'], ['igneousdeadshot', '<:deadshotigneous:959089455283728386>'], ['brokenteamsplit', '<:brokents:975012160675647538>'], ['vestmentsbottom', '<:vestmentsofhavocbottom:994189293515980902>'], ['greatersunshine', '<:gsunshine:994644352871714836>'], ['ganodermicvisor', '<:ganohelm:1003947807754960896>'], ['ganodermicboots', '<:ganoboots:1003947801836789830>'], ['masterworklegs', '<:masterworklegs:643847042170355736>'], ['masterworkbody', '<:masterworkbody:643847056527458324>'], ['masterworkhelm', '<:masterworkhelm:643847068103737354>'], ['icesirenicbody', '<:icesirenicbody:580177781405515776>'], ['icesireniclegs', '<:icesireniclegs:580177781606973450>'], ['shadowtectlegs', '<:shadowtectlegs:580177811956957215>'], ['shadowtectbody', '<:Shadowtectbody:580177812170735617>'], ['2ndagefullhelm', '<:2ndagefullhelm:581180159005163533>'], ['2ndagerangeset', '<:2ndagerangeset:581180159324061728>'], ['2ndagemeleeset', '<:2ndagemeleeset:581180159328124929>'], ['2ndagestaffaug', '<:2ndagestaffaug:581180159349096449>'], ['2ndagemagemask', '<:2ndagemagemask:581180159743229960>'], ['2ndageswordaug', '<:2ndageswordaug:581180179628687371>'], ['bloodkhopeshoh', '<:bloodkhopeshoh:581180203401871373>'], ['shadowseiswand', '<:shadowseiswand:580177293717274633>'], ['ancientlantern', '<:ancientlantern:580177522503712781>'], ['ceremoniallegs', '<:CeremonialLegs:580177522533335051>'], ['wyverncrossbow', '<:wyverncrossbow:580177522587729940>'], ['ceremonialmask', '<:CeremonialMask:580177522629804062>'], ['bloodmalevbody', '<:bloodmalevbody:580177561028395028>'], ['bloodmalevlegs', '<:bloodmalevlegs:580177561175457802>'], ['shadowseissing', '<:shadowseissing:580177003890606101>'], ['shadownoxstaff', '<:shadownoxstaff:580177004150915072>'], ['bloodkhopeshmh', '<:bloodkhopeshmh:580176857308069888>'], ['shadowtectmask', '<:shadowtectmask:581180470964781057>'], ['saradominsword', '<:saradominsword:864235728228974592>'], ['bloodmalevhelm', '<:bloodmalevhelm:643846763358191617>'], ['kineticcyclone', '<:kineticcyclone:798285651405438997>'], ['polyporestrike', '<:polyporestrike:859483781487394826>'], ['bandosgodsword', '<:bandosgodsword:860891314376015892>'], ['furyofthesmall', '<:furyofthesmall:697808773917573233>'], ['berserkersfury', '<:berserkersfury:697808774106185768>'], ['persistentrage', '<:persistentrage:739965637056659567>'], ['masterworklegs', '<:Masterworklegs:556592058794770432>'], ['animalegszaros', '<:AnimaLegsZaros:556592072912797707>'], ['animalegsseren', '<:AnimalegsSeren:556592073340485639>'], ['ghosthunterbag', '<:ghosthunterbag:855865893829476352>'], ['berserkerheart', '<:berserkerheart:855865893899468810>'], ['pneumaticglove', '<:Pneumaticglove:556588694711304193>'], ['torvaplatelegs', '<:Torvaplatelegs:556591275843911710>'], ['tetsuplatelegs', '<:Tetsuplatelegs:556591275965546539>'], ['virtusrobelegs', '<:Virtusrobelegs:556591276036849682>'], ['insulatedboots', '<:insulatedboots:841409588876279819>'], ['crystalhalberd', '<:crystalhalberd:854475192721342465>'], ['deathlotushood', '<:DeathLotushood:556582802670485505>'], ['elderrunehelm5', '<:Elderrunehelm5:556582802678743040>'], ['seasingershood', '<:Seasingershood:556583076050763776>'], ['torvaplatebody', '<:TorvaPlatebody:556586038974480424>'], ['animahelmseren', '<:animahelmseren:643120081764745279>'], ['animahelmzaros', '<:animahelmzaros:643120081790042163>'], ['channellerring', '<:channellerring:839903943404027914>'], ['combatantscape', '<:combatantscape:839906296333598721>'], ['corporealbeast', '<:CorporealBeast:513212996726685749>'], ['kriltsutsaroth', '<:KrilTsutsaroth:513213018352386058>'], ['chaoselemental', '<:ChaosElemental:513222840414109706>'], ['treasurehunter', '<:TreasureHunter:513225181783654413>'], ['shadowtendrils', '<:shadowtend:642713547142332416>'], ['balancedstrike', '<:balancedstrike:535532854336290826>'], ['dragonfirecomp', '<:dragonfirecomp:583428397439516673>'], ['connectorparts', '<:connectorparts:583434183200866321>'], ['spiritualparts', '<:spiritualparts:583434317926105118>'], ['protectivecomp', '<:protectivecomp:583434604267175937>'], ['draconicenergy', '<:draconicenergy:643162228991983659>'], ['chippedcrystal', '<:chippedcrystal:643162482126356520>'], ['merethielstaff', '<:merethielstaff:643168594494226432>'], ['purplemushroom', '<:purplemushroom:643168594565267466>'], ['hruneplatesalv', '<:hruneplatesalv:643411151081963521>'], ['bluesmallpouch', '<:bluesmallpouch:690848914676383755>'], ['pinksmallpouch', '<:pinksmallpouch:690848914936430632>'], ['fbackhandflank', '<:fbackhandflank:867678153866870824>'], ['dismemberlunge', '<:dismemberlunge:867678153899769876>'], ['gchaincaroming', '<:gchaincaroming:867678153882861568>'], ['fracturedshaft', '<:fracturedshaft:869284271804801114>'], ['coilupgradekit', '<:coilupgradekit:869284271674785842>'], ['scriptureofjas', '<:scriptureofjas:869284342839513108>'], ['scriptureofwen', '<:scriptureofwen:883134307902816297>'], ['glacorremnants', '<:glacorremnants:884739993527013376>'], ['scriptureofbik', '<:scriptureofbik:892342109791735848>'], ['cryptbloombody', '<:cryptbloombody:892819107253194762>'], ['cryptbloomhelm', '<:cryptbloomhelm:892819107123195956>'], ['cryptbloomlegs', '<:cryptbloomlegs:892819107223851058>'], ['imcandomattock', '<:imcandomattock:900765150808784936>'], ['ringofwhispers', '<:ringofwhispers:900765150695550976>'], ['scriptureofful', '<:scriptureofful:902209626412560395>'], ['hellhoundpouch', '<:hellhoundpouch:921410226475925514>'], ['abyssalscourge', '<:abyssalscourge:947871842469834832>'], ['jawsoftheabyss', '<:jawsoftheabyss:947871842595639306>'], ['vestmentbottom', '<:vestmentsofhavocbottom:994189293515980902>'], ['vestmentsboots', '<:vestmentsofhavocboots:994189291515285544>'], ['chaostrapsrune', '<:chaostrapsrune:994206002658431016>'], ['afflictionrune', '<:afflictionrune:994205987663794206>'], ['sapphireaurora', '<:sapphireaurora:995711033480069130>'], ['ganodermichelm', '<:ganohelm:1003947807754960896>'], ['ganodermicbody', '<:ganobody:1003947805611655208>'], ['ganodermiclegs', '<:ganolegs:1003947803673903204>'], ['ilujankancomp', '<:Ilujankancomp:513190158674427906>'], ['drygorelongmh', '<:drygorelongmh:513190158900658180>'], ['explosivecomp', '<:Explosivecomp:513190158917566485>'], ['royalcrossbow', '<:royalcrossbow:798285340439871558>'], ['borrowedpower', '<:borrowedpower:657248051190300682>'], ['smoketendrils', '<:smoketendrils:536257336130404372>'], ['elitetectlegs', '<:elitetectlegs:580177869272121344>'], ['2ndagemageset', '<:2ndagemageset:581180159282118696>'], ['3asirenicmask', '<:3asirenicmask:581180180005912607>'], ['bloodtectmask', '<:bloodtectmask:581180203028447243>'], ['bloodseiswand', '<:bloodseiswand:581180203158732800>'], ['ceremonialtop', '<:CeremonialTop:580177522441060363>'], ['bloodtectbody', '<:bloodtectbody:580177560806096940>'], ['bloodtectlegs', '<:bloodtectlegs:580177561204555817>'], ['bloodnoxstaff', '<:bloodnoxstaff:580408868702781453>'], ['bloodseiswand', '<:bloodseiswand:581180345894961182>'], ['barrowsscythe', '<:barrowsscythe:580176857123651596>'], ['3asirenicbody', '<:3asirenicbody:580176857127976960>'], ['3asireniclegs', '<:3asireniclegs:580176857131909129>'], ['barrowsnoxbow', '<:barrowsnoxbow:580176857174114331>'], ['fleetingboots', '<:fleetingboots:789813993480388640>'], ['magicshortbow', '<:magicshortbow:796989663130026004>'], ['bloodseissing', '<:bloodseissing:643150590159093781>'], ['desertamulet4', '<:desertamulet4:859483155408224287>'], ['timeworncomps', '<:timeworncomps:697405254265864244>'], ['historiccomps', '<:historiccomps:697405254676906018>'], ['elitetectbody', '<:elitetectbody:552955120707698699>'], ['bandostassets', '<:Bandostassets:556592056953208852>'], ['trackingglove', '<:Trackingglove:556588694765699101>'], ['ed1luckycharm', '<:ed1luckycharm:841409588561707009>'], ['ed2luckycharm', '<:ed2luckycharm:841409588694876222>'], ['ed3luckycharm', '<:ed3luckycharm:841409588938276874>'], ['elementsscrim', '<:elementsscrim:841409588959510539>'], ['dragonhalberd', '<:dragonhalberd:841409589261238282>'], ['drygorelongoh', '<:drygorelongoh:852939843767369783>'], ['elitetectmask', '<:elitetectmask:556582803014418432>'], ['armadylhelmet', '<:Armadylhelmet:556582831527034919>'], ['chaoticcbowoh', '<:chaoticcbowoh:851514430633803786>'], ['clockworkcomp', '<:Clockworkcomp:513206171549696000>'], ['kalphitequeen', '<:KalphiteQueen:513212971024121895>'], ['reprisalcodex', '<:Reprisalcodex:517418828540542977>'], ['deflectpernix', '<:deflectpernix:519622413705805824>'], ['shadowbarrage', '<:ShadowBarrage:567727956567261184>'], ['greaterdazing', '<:mds:535541259033378827>'], ['bloodtendrils', '<:bloodtendrils:535532854327640064>'], ['superantifire', '<:superantifire:864492695997513748>'], ['harnessedcomp', '<:harnessedcomp:583428397296910356>'], ['elderovlsalve', '<:elderovlsalve:648976643687317532>'], ['fortunatecomp', '<:fortunatecomp:583435543845797891>'], ['araxytespider', '<:araxytespider:643507882150592553>'], ['delicateparts', '<:delicateparts:583434317301022723>'], ['flexibleparts', '<:flexibleparts:583434317699743754>'], ['metallicparts', '<:metallicparts:583434336553140224>'], ['enhancingcomp', '<:enhancingcomp:583434584113283072>'], ['brassicancomp', '<:brassicancomp:583435429638963205>'], ['saradomincomp', '<:Saradomincomp:583435429785632769>'], ['corporealcomp', '<:corporealcomp:583435429878038528>'], ['resilientcomp', '<:resilientcomp:583435452556640259>'], ['decayingtooth', '<:decayingtooth:643150841280200717>'], ['spectralsigil', '<:spectralsigil:643161640162033666>'], ['berserkerring', '<:berserkerring:643162129972723781>'], ['corporealbone', '<:corporealbone:643162604361089080>'], ['godswordshard', '<:godswordshard:643162769520066570>'], ['twistedantler', '<:twistedantler:643162907772846080>'], ['perfectchitin', '<:perfectchitin:643162983543078922>'], ['volcanicshard', '<:volcanicshard:643163634326962206>'], ['glovespassage', '<:glovespassage:643166351585706060>'], ['hydrixbolttip', '<:hydrixbolttip:643411126209609739>'], ['dwarfweedseed', '<:dwarfweedseed:643170895577219082>'], ['ancientemblem', '<:ancientemblem:643506778453049355>'], ['watertalisman', '<:watertalisman:643507123359318026>'], ['redsmallpouch', '<:redsmallpouch:690848915372638248>'], ['backhandflank', '<:backhandflank:867678153854025779>'], ['fragshotlunge', '<:fragshotlunge:867678154021273600>'], ['chaincaroming', '<:chaincaroming:867678153962684426>'], ['gricocaroming', '<:gricocaroming:867678153966878740>'], ['deathsswiftpf', '<:deathsswiftpf:994921597813137518>'], ['gathererscape', '<:gathererscape:892342110177624084>'], ['sanasfyrtorch', '<:sanasfyrtorch:892342109842079766>'], ['graspingpouch', '<:graspingpouch:892816437478051900>'], ['igneouskalket', '<:igneouskalket:902209626404192316>'], ['igneouskalmej', '<:igneouskalmej:902209626408382494>'], ['igneouskalxil', '<:igneouskalxil:902209626404171786>'], ['igneouskalzuk', '<:igneouskalzuk:902209626479685734>'], ['obsidianblade', '<:obsidianblade:902209626362216518>'], ['pernixsquiver', '<:pernixsquiver:902209626450296892>'], ['emeraldaurora', '<:emeraldaurora:914077639784935424>'], ['darkicesliver', '<:darkicesliver:915232153787334677>'], ['polyporestaff', '<:polyporestaff:925794592350162944>'], ['chaoticclawmh', '<:chaoticclawmh:925794592287244308>'], ['chaoticclawoh', '<:chaoticclawoh:925794591897182259>'], ['blessingofhet', '<:blessingofhet:934078945391947817>'], ['tsunamiincite', '<:tsunamiincite:958989794757730307>'], ['vestmentshood', '<:vestmentsofhavochood:994189297659940904>'], ['vestmentboots', '<:vestmentsofhavocboots:994189291515285544>'], ['dungeoneering', '<:dungeoneering:1003947795541143632>'], ['seasingerwand', '<:seasingerwand:1003947816525254685>'], ['ganodermictop', '<:ganobody:1003947805611655208>'], ['corruptblast', '<:corruptblast:513190159194259467>'], ['ancientshard', '<:ancientshard:656426717505650708>'], ['dominionmine', '<:dommine:662249620579155968>'], ['constitution', '<:Constitution:689509250887712902>'], ['thermalflask', '<:thermalflask:689530593796423724>'], ['rocktailsoup', '<:rocktailsoup:689530594412986389>'], ['blightlasher', '<:blightlasher:581180203062001664>'], ['icemalevlegs', '<:icemalevlegs:580177621099479042>'], ['icemalevbody', '<:icemalevbody:580177622080946187>'], ['icekhopeshmh', '<:icekhopeshmh:580176957287694358>'], ['icekhopeshoh', '<:icekhopeshoh:580176957304602641>'], ['shadowscythe', '<:shadowscythe:580177004180275230>'], ['elitetetsumh', '<:elitetetsumh:581180369580326923>'], ['hexhunterbow', '<:hexhunterbow:581180369911414794>'], ['elitetetsuoh', '<:elitetetsuoh:581180369924128788>'], ['barrowsascmh', '<:barrowsascmh:580176856838307881>'], ['barrowsascoh', '<:barrowsascoh:580176856968331277>'], ['barrowsbbcoh', '<:barrowsbbcoh:580176857123651584>'], ['barrowsbbcmh', '<:barrowsbbcmh:580176857148686358>'], ['icemalevhelm', '<:icemalevhelm:581180456456945715>'], ['shadownoxbow', '<:shadownoxbow:581180470965043200>'], ['ranarrsticks', '<:RanarrSticks:690987265186594857>'], ['annihilation', '<:annihilation:796989662983094275>'], ['korasissword', '<:korasissword:796989663139201034>'], ['zurielsstaff', '<:zurielsstaff:797895640154636328>'], ['icenoxscythe', '<:icenoxscythe:643115305886810133>'], ['exsanguinate', '<:exsanguinate:856635090745950258>'], ['wrackandruin', '<:wrackandruin:856662355912032256>'], ['saragodsword', '<:saragodsword:860891314257920001>'], ['armagodsword', '<:armagodsword:860891314379554846>'], ['obliteration', '<:obliteration:860891361641365515>'], ['vintagecomps', '<:vintagecomps:697405254098092063>'], ['classiccomps', '<:classiccomps:697405254337167401>'], ['ripperscroll', '<:ripperscroll:703581275155464203>'], ['dragondagger', '<:dragondagger:779048040644083733>'], ['dragonclawoh', '<:dragonclawoh:779048040865726485>'], ['deflectrange', '<:DeflectRange:544195488317046812>'], ['deflectmelee', '<:DeflectMelee:544195488447201300>'], ['warriorheart', '<:warriorheart:855865894081527838>'], ['pernixgloves', '<:Pernixgloves:556588696510529555>'], ['bandosgloves', '<:Bandosgloves:556588709890228252>'], ['animahelmzam', '<:animahelmzam:643120081446109203>'], ['championring', '<:championring:839903943630520350>'], ['staffoflight', '<:staffoflight:841419289319964763>'], ['kalphiteking', '<:KalphiteKing:513212971409866765>'], ['dagannothrex', '<:DagannothRex:513222840351195147>'], ['spiritsticks', '<:SpiritSticks:565726489136463894>'], ['kwuarmsticks', '<:KwuarmSticks:565726489341984779>'], ['sbsstandards', '<:SBSStandards:565726489526534154>'], ['smokebarrage', '<:SmokeBarrage:567727956588363786>'], ['loyaltypoint', '<:loyaltypoint:704657054987452447>'], ['reaperpoints', '<:Reaperpoints:704657943194501140>'], ['saltthewound', '<:stw:535541259109138463>'], ['sailfishsoup', '<:sailfishsoup:537336701933060106>'], ['bloodbarrage', '<:bloodbarrage:537338981747261446>'], ['bloodtendril', '<:bloodtendrils:535532854327640064>'], ['greaterbarge', '<:gbarge:535532879250456578>'], ['meteorstrike', '<:meteorstrike:535532879359377439>'], ['thirdagecomp', '<:thirdagecomp:583428397204766783>'], ['variablecomp', '<:variablecomp:583428408554291221>'], ['knightlycomp', '<:knightlycomp:583435544315559977>'], ['dextrouscomp', '<:dextrouscomp:607288026263191563>'], ['corruptedorb', '<:corruptedorb:626499494502203411>'], ['dragonslayer', '<:dragonslayer:641339921814126594>'], ['undeadslayer', '<:undeadslayer:641339922019516416>'], ['masterstroke', '<:masterstroke:651849969338286096>'], ['blessedflask', '<:blessedflask:659122178704408598>'], ['adrenrenewal', '<:adrenrenewal:736298121704767538>'], ['craftedparts', '<:craftedparts:583434317347291138>'], ['crystalparts', '<:crystalparts:583434317431046155>'], ['tensileparts', '<:tensileparts:583434317720584224>'], ['organicparts', '<:organicparts:583434337182154764>'], ['stunningcomp', '<:stunningcomp:583434584490770495>'], ['etherealcomp', '<:etherealcomp:583434584805343242>'], ['powerfulcomp', '<:powerfulcomp:583434604644663299>'], ['preciouscomp', '<:preciouscomp:583434604724224008>'], ['culinarycomp', '<:culinarycomp:583435429500551169>'], ['ascendedcomp', '<:ascendedcomp:583435429848678439>'], ['shiftingcomp', '<:shiftingcomp:583435429978570763>'], ['rumblingcomp', '<:rumblingcomp:583435452225421347>'], ['spiderlegtop', '<:spiderlegtop:643122501521768491>'], ['spiderlegmid', '<:spiderlegmid:643122511931768883>'], ['spiderlegbot', '<:spiderlegbot:643148153293373480>'], ['giantfeather', '<:giantfeather:643150840852512779>'], ['crestzamorak', '<:crestzamorak:643161512306933800>'], ['avaryssblade', '<:avaryssblade:643161612383158296>'], ['elysiansigil', '<:elysiansigil:643161640107245580>'], ['spiritshield', '<:spiritshield:643161660231516165>'], ['ancientscale', '<:ancientscale:643162215137935360>'], ['inertcrystal', '<:inertcrystal:643162334256431107>'], ['facelessmask', '<:facelessmask:643162907454210061>'], ['kalphiteclaw', '<:kalphiteclaw:643162983220117605>'], ['avaryssbraid', '<:avaryssbraid:643163423680757781>'], ['soulfragment', '<:soulfragment:643166372993564712>'], ['bloodtendril', '<:bloodtendril:643166809973063700>'], ['telostendril', '<:telostendril:643166833901568001>'], ['greatercodex', '<:greatercodex:643169137098752001>'], ['ascendribolt', '<:ascendribolt:643170748495691796>'], ['sirenicscale', '<:sirenicscale:643506778838925313>'], ['corruptsigil', '<:corruptsigil:643507237985452032>'], ['emeraldbakri', '<:emeraldbakri:866551637714665484>'], ['combustlunge', '<:combustlunge:867678153992437790>'], ['ricocaroming', '<:ricocaroming:867678153635004447>'], ['cadeturtling', '<:cadeturtling:867678153883516958>'], ['escapemobile', '<:escapemobile:867678153769877514>'], ['gbargemobile', '<:gbargemobile:867678153680617473>'], ['zamorakstaff', '<:zamorakstaff:873142795706179651>'], ['lengartefact', '<:lengartefact:884739993543782420>'], ['absorbative4', '<:absorbative4:890542428556230666>'], ['croesusflake', '<:croesusflake:892818988260806707>'], ['vampbloodess', '<:vampbloodess:895991792946782259>'], ['shadowsgrace', '<:shadowsgrace:895999229737185280>'], ['igneousstone', '<:igneousstone:902209626462879794>'], ['magmatempest', '<:magmatempest:902209626509025290>'], ['pernixquiver', '<:pernixsquiver:902209626450296892>'], ['darkiceshard', '<:darkiceshard:915232154160594974>'], ['crystalstaff', '<:crystalstaff:925794592551481414>'], ['chaoticstaff', '<:chaoticstaff:925794592643743815>'], ['callfollower', '<:callfollower:933299003121078332>'], ['abyssalflesh', '<:abyssalflesh:947871842520170576>'], ['vestmenthood', '<:vestmentsofhavochood:994189297659940904>'], ['vestmentstop', '<:vestmentsofhavoctop:994189295592161291>'], ['twinshotrune', '<:twinshotrune:994206062498549780>'], ['gdeathsswift', '<:gdeathsswift:994644354536837121>'], ['havocpassage', '<:havocgop:994920849117282365>'], ['smashpassage', '<:smashgop:994929821727604808>'], ['antireflexes', '<:antireflexes:998692900135252078>'], ['blackcrystal', '<:blackcrystal:1000328247441104917>'], ['seasingerorb', '<:seasingerorb:1003947814218383432>'], ['cinderbanes', '<:Cinderbanes:513190158355660812>'], ['armadylcomp', '<:Armadylcomp:513190158477033474>'], ['malevolence', '<:Malevolence:513190159416557573>'], ['subjugation', '<:Subjugation:513190159429402664>'], ['sireniclegs', '<:sireniclegs:643846938537623564>'], ['sirenicbody', '<:sirenicbody:643846948570267648>'], ['sirenicmask', '<:sirenicmask:643846959454617610>'], ['augseissing', '<:augseissing:656785077883109407>'], ['caloriebomb', '<:caloriebomb:656790558177755169>'], ['stormshards', '<:stormshards:536256663641128971>'], ['greatgunkan', '<:greatgunkan:689528927928188963>'], ['blueblubber', '<:blueblubber:689530593742291033>'], ['2ndagestaff', '<:2ndagestaff:581180159348965397>'], ['3akhopeshmh', '<:3akhopeshmh:581180179431292939>'], ['2ndagesword', '<:2ndagesword:581180179645202432>'], ['3asosbroken', '<:3asosbroken:581180179804717141>'], ['3akhopeshoh', '<:3akhopeshoh:581180179850854420>'], ['bloodnoxbow', '<:bloodnoxbow:581180203154276362>'], ['3amalevbody', '<:3amalevbody:580177522499518464>'], ['3amalevlegs', '<:3amalevlegs:580177522520489984>'], ['iceseiswand', '<:iceseiswand:580177621459927070>'], ['icetectlegs', '<:icetectlegs:580176957094756369>'], ['icetectbody', '<:icetectbody:580176957317054465>'], ['shadowbbcoh', '<:shadowbbcoh:580176957325705217>'], ['shadowbbcmh', '<:shadowbbcmh:580176957396877332>'], ['shadowpwand', '<:shadowpwand:580177004356304906>'], ['bloodnoxbow', '<:bloodnoxbow:581180345530187796>'], ['bloodscythe', '<:bloodscythe:580176856989433878>'], ['virtusboots', '<:virtusboots:569592271704424461>'], ['icenoxstaff', '<:icenoxstaff:581180456729444363>'], ['barrowscore', '<:barrowscore:615617138488639541>'], ['inspiration', '<:inspiration:643505652634746881>'], ['salveamulet', '<:salveamulet:797899945730244648>'], ['icetectmask', '<:icetectmask:643846732391907329>'], ['3amalevhelm', '<:3amalevhelm:643846763450597403>'], ['animatedead', '<:animatedead:856635090453135382>'], ['sbsancients', '<:sbsancients:859483781395120129>'], ['karilcbowmh', '<:karilcbowmh:860891494772899881>'], ['abyssalwhip', '<:abyssalwhip:860891494805536769>'], ['karilcbow2h', '<:karilcbow2h:860891494911311904>'], ['linzahammer', '<:linzahammer:860891494952861706>'], ['karilcbowoh', '<:karilcbowoh:860891495007911966>'], ['ripperpouch', '<:ripperpouch:703581275453128714>'], ['relentless5', '<:relentless5:712244800920748092>'], ['armourspike', '<:armourspike:756235792053174332>'], ['deflectmage', '<:DeflectMage:544195487926845462>'], ['hydrixbakri', '<:HydrixBakri:550834403136503822>'], ['transfigure', '<:Transfigure:553050196523876354>'], ['pernixchaps', '<:PernixChaps:556592058891239424>'], ['armadyllegs', '<:Armadyllegs:556592073340354574>'], ['shadownihil', '<:shadownihil:854475441946230855>'], ['archerheart', '<:archerheart:855865893715705857>'], ['staticglove', '<:Staticglove:556588694757179403>'], ['torvagloves', '<:Torvagloves:556588695117889536>'], ['abyssalwand', '<:abyssalwand:841409588590805043>'], ['zamorakbrew', '<:zamorakbrew:841409588632092694>'], ['summrenewal', '<:summrenewal:854475161809190913>'], ['reaverpouch', '<:reaverpouch:839903693837959228>'], ['stalkerring', '<:stalkerring:839903943601029120>'], ['shadowburst', '<:shadowburst:841419289461260329>'], ['energising4', '<:energising4:851514466818457640>'], ['titanscroll', '<:TitanScroll:513195712209485854>'], ['guthixstaff', '<:gstaff:513203008608141314>'], ['noxiouscomp', '<:Noxiouscomp:513203842473525248>'], ['lantasticks', '<:LantaSticks:565726489404899368>'], ['natinstinct', '<:nat:535541258131865633>'], ['deathsswift', '<:deathsswift:994921434633744455>'], ['corruptshot', '<:corruptshot:535541306294796299>'], ['bindingshot', '<:bindingshot:535541306563231790>'], ['healthycomp', '<:healthycomp:583428396994920521>'], ['escapecodex', '<:escapecodex:602561894443778115>'], ['vvasivecomp', '<:vvasivecomp:607288026087030815>'], ['oceaniccomp', '<:oceaniccomp:607288026229506058>'], ['zamorakcomp', '<:zamorakcomp:607288026334232576>'], ['facetedcomp', '<:facetedcomp:607288026355466299>'], ['volcanicorb', '<:volcanicorb:626499494661324840>'], ['demonslayer', '<:demonslayer:641339921675845633>'], ['spellcaster', '<:spellcaster:643214402169864213>'], ['evasivecomp', '<:evasivecomp:643829647049752586>'], ['primalfeast', '<:primalfeast:651079281849532416>'], ['paddedparts', '<:paddedparts:583434336397688834>'], ['smoothparts', '<:smoothparts:583434336674775050>'], ['platedparts', '<:platedparts:583434336737427475>'], ['simpleparts', '<:simpleparts:583434336741621761>'], ['spikedparts', '<:spikedparts:583434336842547200>'], ['refinedcomp', '<:refinedcomp:583434604501794883>'], ['precisecomp', '<:precisecomp:583434604711510026>'], ['averniccomp', '<:averniccomp:583435429840420865>'], ['severedhoof', '<:severedhoof:643150840860901449>'], ['dormantlegs', '<:dormantlegs:643150956502057000>'], ['dormantbody', '<:dormantbody:643150967335813141>'], ['dormanthelm', '<:dormanthelm:643150979671392278>'], ['bandoschest', '<:bandoschest:643151021748518917>'], ['crestsliske', '<:crestsliske:643161512172716038>'], ['nymorablade', '<:nymorablade:643161612819365888>'], ['divinesigil', '<:divinesigil:643161640342388767>'], ['arcanesigil', '<:arcanesigil:643161640350646293>'], ['warriorring', '<:warriorring:643162130002214912>'], ['mazcabcodex', '<:mazcabcodex:643162636447645714>'], ['ribsofchaos', '<:ribsofchaos:643162714557906965>'], ['statiusbody', '<:statiusbody:643162730827874324>'], ['sarawhisper', '<:sarawhisper:643162817603698688>'], ['kalphiteegg', '<:kalphiteegg:643163002794672130>'], ['nymorabraid', '<:nymorabraid:643163423235899402>'], ['shadowchest', '<:shadowchest:643166795561172992>'], ['masutaspear', '<:masutaspear:643166903220699137>'], ['royalspring', '<:royalspring:643168122848673842>'], ['torstolseed', '<:torstolseed:643170895879340043>'], ['malevenergy', '<:malevenergy:643207275670011908>'], ['orangepouch', '<:orangepouch:690848914685034507>'], ['yellowpouch', '<:yellowpouch:690848914949144616>'], ['impactflank', '<:impactflank:867678154369400862>'], ['flankimpact', '<:impactflank:867678154369400862>'], ['surgemobile', '<:surgemobile:867678153798975498>'], ['shadowamalg', '<:shadowamalg:878739232951255091>'], ['perfectplus', '<:perfectplus:892342110030798858>'], ['crystalmask', '<:crystalmask:892342109829464094>'], ['energising2', '<:energising2:896807169738014720>'], ['tonymattock', '<:tonymattock:900765150888480838>'], ['ancienthilt', '<:ancienthilt:902209626332880896>'], ['teamsplitrr', '<:teamsplitredred:923249948680675388>'], ['crystalwand', '<:crystalwand:925794592849281094>'], ['bloodreaver', '<:bloodreaver:929773044296216666>'], ['bookofdeath', '<:bookofdeath:937093437906374696>'], ['archaeology', '<:archaeology:941211288665739274>'], ['teamsplitrb', '<:teamsplitredblue:956854185591197776>'], ['vestmenttop', '<:vestmentsofhavoctop:994189295592161291>'], ['shadowspike', '<:shadowspike:1003947797491499098>'], ['affliction', '<:Affliction:513190158468907008>'], ['desolation', '<:Desolation:513190159018098713>'], ['flarefrost', '<:Flarefrost:513190159056109588>'], ['slayerhelm', '<:slayerhelm:798285340460449792>'], ['pernixbody', '<:Pernixbody:568260771159736350>'], ['decimation', '<:decimation:643848618477879328>'], ['stickybomb', '<:stickybomb:655341074306301964>'], ['poisonbomb', '<:poisonbomb:655341074591645707>'], ['luckpotion', '<:luckpotion:656426717295935500>'], ['blackpouch', '<:blackpouch:656786565359599626>'], ['astralrune', '<:Astralrune:536252658961481769>'], ['cosmicrune', '<:Cosmicrune:536252659615924258>'], ['naturerune', '<:Naturerune:536252660270104591>'], ['smoketends', '<:smoketendrils:536257336130404372>'], ['barrowsecb', '<:barrowsecb:581180179494338572>'], ['3atectmask', '<:3atectmask:581180179691339776>'], ['bloodascmh', '<:bloodascmh:581180202705485844>'], ['bloodascoh', '<:bloodascoh:581180202747559948>'], ['bloodpwand', '<:bloodpwand:581180203112333316>'], ['3aseiswand', '<:3aseiswand:580177522508038148>'], ['3aseissing', '<:3aseissing:580177522524684302>'], ['3atectbody', '<:3atectbody:580177522591924234>'], ['3atectlegs', '<:3atectlegs:580177522654969883>'], ['hoodedcomp', '<:HoodedComp:580177560886050828>'], ['phatpurple', '<:PhatPurple:580177003794137119>'], ['phatyellow', '<:PhatYellow:580177004167430145>'], ['bloodpwand', '<:bloodpwand:581180345932840990>'], ['barrowszgs', '<:barrowszgs:580176856917999660>'], ['barrowssgb', '<:barrowssgb:580176857241223200>'], ['barrowssos', '<:barrowssos:580176857484361761>'], ['bloodbbcmh', '<:bloodbbcmh:580176857488424960>'], ['bloodbbcoh', '<:bloodbbcoh:580176857563922452>'], ['barrowsdye', '<:barrowsdye:580168048888119306>'], ['signoflife', '<:SoL:595794858044686339>'], ['iritsticks', '<:IritSticks:690987265371144202>'], ['ripperclaw', '<:ripperclaw:797895640054759444>'], ['shadowcore', '<:shadowcore:657287032925585411>'], ['smokecloud', '<:smokecloud:856635090641879050>'], ['incitefear', '<:incitefear:856635090783567902>'], ['superwrack', '<:wrackandruin:856662355912032256>'], ['ahrimstaff', '<:ahrimstaff:860891494977634364>'], ['virtuswand', '<:virtuswand:860891495007780874>'], ['handcannon', '<:handcannon:860891495037272094>'], ['abyssalorb', '<:abyssalorb:860891495041073152>'], ['spiritcape', '<:spiritcape:697405301623619624>'], ['fontoflife', '<:fontoflife:698225967679930408>'], ['dragonmace', '<:dragonmace:779048040753004574>'], ['dragonclaw', '<:dragonclaw:779048041088024606>'], ['supremeovl', '<:supremeovl:641337551365472276>'], ['antitheism', '<:antitheism:787523880281047040>'], ['guthixbook', '<:GuthixBook:574290439356809216>'], ['bandosbook', '<:BandosBook:574290439473987628>'], ['rubyaurora', '<:RubyAurora:574292444791963659>'], ['silverloot', '<:silverloot:854335735825956864>'], ['bronzeloot', '<:bronzeloot:854335736315379772>'], ['veracflail', '<:veracflail:854475442018582549>'], ['bloodnihil', '<:bloodnihil:854475442169053194>'], ['smokenihil', '<:smokenihil:854475442227642388>'], ['spearshaft', '<:spearshaft:855865893714919465>'], ['spearplume', '<:spearplume:855865894033817610>'], ['armagloves', '<:Armagloves:556588709437243394>'], ['holywrench', '<:holywrench:841409588922417192>'], ['kalgscroll', '<:kalgscroll:841409588954923049>'], ['vestaspear', '<:vestaspear:852661743682846720>'], ['blackvirus', '<:blackvirus:853191855856287746>'], ['greenvirus', '<:greenvirus:853191856182657064>'], ['blackgolem', '<:blackgolem:854335415523868723>'], ['greengolem', '<:greengolem:854335415842373643>'], ['shadowrush', '<:shadowrush:839903691679072307>'], ['reaverring', '<:reaverring:839903943018283050>'], ['bloodburst', '<:bloodburst:841419289714098246>'], ['venomblood', '<:venomblood:841419289714229258>'], ['smokeburst', '<:smokeburst:841419289793265664>'], ['terrorbird', '<:Terrorbird:513195712243171358>'], ['deathlotus', '<:DeathLotus:513204675948838922>'], ['sliskebody', '<:SliskeBody:513204700980576266>'], ['gregorovic', '<:Gregorovic:513212998274383914>'], ['2arangetop', '<:2ARangeTop:513213829015011338>'], ['dharokhead', '<:Dharokhead:513222840162582541>'], ['pernixcowl', '<:PernixCowl:517417560434540545>'], ['dormantsgb', '<:DormantSGB:517418300481863681>'], ['dormantzgs', '<:DormantZGS:517418300548972554>'], ['dormantsos', '<:DormantSOS:517418300578201600>'], ['marksofwar', '<:MarksofWar:704701746869567551>'], ['demoralise', '<:demoralise:535541258559553546>'], ['rejuvenate', '<:rejuvenate:535541258873995284>'], ['debilitate', '<:debil:535541278264393729>'], ['anticipate', '<:anti:535541306475151390>'], ['bloodblitz', '<:bloodblitz:535616247807868938>'], ['icebarrage', '<:icebarrage:537340400185245701>'], ['shielddome', '<:shielddome:537341954392850442>'], ['shadowtend', '<:shadowtend:642713547142332416>'], ['deepimpact', '<:deep:535533833139912724>'], ['directcomp', '<:directcomp:583428397112492043>'], ['shadowcomp', '<:shadowcomp:583428397318012938>'], ['undeadcomp', '<:undeadcomp:583428397397573659>'], ['imbuedcomp', '<:imbuedcomp:583428397464682517>'], ['ambassador', '<:Ambassador:583430542809235458>'], ['bladeparts', '<:bladeparts:583434183465238536>'], ['clearparts', '<:clearparts:583434183674953728>'], ['surgecodex', '<:surgecodex:602561894414417944>'], ['laceration', '<:Laceration:602581988599398400>'], ['kilnranged', '<:KilnRanged:602582045541269567>'], ['subtlecomp', '<:subtlecomp:607288026305134608>'], ['fungalcomp', '<:fungalcomp:607289548661063688>'], ['pernixbody', '<:pernixbody:641672159051120651>'], ['supergrest', '<:supergrest:690140078407680059>'], ['staveparts', '<:staveparts:583434317728841765>'], ['coverparts', '<:coverparts:583434318848720906>'], ['magicparts', '<:magicparts:583434336263602187>'], ['livingcomp', '<:livingcomp:583434584679776256>'], ['strongcomp', '<:strongcomp:583434604632080387>'], ['silentcomp', '<:silentcomp:583435429563465730>'], ['bandoscomp', '<:bandoscomp:583435429861261322>'], ['snapdragon', '<:snapdragon:643119665979064370>'], ['araxxifang', '<:araxxifang:643148203604049940>'], ['araxyteegg', '<:araxyteegg:643149217313062913>'], ['auburnlock', '<:auburnlock:643150841292914718>'], ['tectenergy', '<:tectenergy:643161473375272990>'], ['crestseren', '<:crestseren:643161511937966122>'], ['crestzaros', '<:crestzaros:643161512177041428>'], ['holyelixir', '<:holyelixir:643161659984183351>'], ['archerring', '<:archerring:643162129603493901>'], ['rottenfang', '<:rottenfang:643162604725862410>'], ['durzaghelm', '<:durzaghelm:643162669783973943>'], ['saramurmur', '<:saramurmur:643162817419149353>'], ['zamorakess', '<:zamorakess:643162860754829315>'], ['phylactery', '<:phylactery:643166362361004042>'], ['bloodchest', '<:bloodchest:643166795208851467>'], ['smokechest', '<:smokechest:643166795901042701>'], ['fishytreat', '<:fishytreat:643167044887642122>'], ['royalframe', '<:royalframe:643168122689290244>'], ['royalsight', '<:royalsight:643168122815250445>'], ['crystalkey', '<:ckey:643171300134617100>'], ['greendhide', '<:greendhide:643506911404097568>'], ['blackdhide', '<:blackdhide:643506950016991243>'], ['royaldhide', '<:royaldhide:643506966186164235>'], ['darrowtips', '<:darrowtips:643507099602780200>'], ['dharokbody', '<:dharokbody:643507658267164672>'], ['vitalspark', '<:vitalspark:656426807893032963>'], ['malletops2', '<:malletops2:690136116900266075>'], ['corbicula2', '<:corbicula2:690136117269364768>'], ['greenpouch', '<:greenpouch:690848914638766082>'], ['sunshinepf', '<:sunshinepf:994921595489488927>'], ['animaofjas', '<:animaofjas:869284271532146768>'], ['animaofbik', '<:animaofbik:869284271502815292>'], ['animaofwen', '<:animaofwen:869284271498592296>'], ['animaofful', '<:animaofful:869284271569924146>'], ['gconccodex', '<:gconccodex:869284396111364126>'], ['bloodamalg', '<:bloodamalg:878739232447938670>'], ['smokeamalg', '<:smokeamalg:878739232607318086>'], ['glacorclaw', '<:glacorclaw:884739993229230092>'], ['archglacor', '<:archglacor:891948878583189514>'], ['proteanlog', '<:proteanlog:892342109930143784>'], ['aggression', '<:aggression:909338509234569216>'], ['aggrosigil', '<:aggression:909338509234569216>'], ['crystalbow', '<:crystalbow:925794592849285150>'], ['crystalorb', '<:crystalorb:925794592505356338>'], ['holyscarab', '<:holyscarab:929773040273862656>'], ['kethsiring', '<:kethsiring:937093437881192498>'], ['poisonicon', '<:poisonicon:944649693500154006>'], ['namiincite', '<:tsunamiincite:958989794757730307>'], ['ganoponcho', '<:ganobody:1003947805611655208>'], ['ganogloves', '<:ganogloves:1003947799760617522>'], ['bloodtend', '<:BloodTend:513190158431158274>'], ['emberkeen', '<:Emberkeen:513190158707720193>'], ['onslaught', '<:onsl:513190159085207555>'], ['corrblast', '<:corruptblast:513190159194259467>'], ['noxscythe', '<:noxscythe:513190159341322240>'], ['razorback', '<:Razorback:513190159366488065>'], ['malevkite', '<:malevkite:513190159412625411>'], ['compcapet', '<:compcapet:643413605139873802>'], ['berserker', '<:berserker:643505116347105290>'], ['summtotem', '<:summtotem:643507594811539499>'], ['auratotem', '<:auratotem:643507594811670538>'], ['yakahelm2', '<:yakahelm2:725230791260504144>'], ['augglaive', '<:augglaive:643846875681783824>'], ['malevlegs', '<:malevlegs:643846985513828400>'], ['malevbody', '<:malevbody:643846996842512405>'], ['malevhelm', '<:malevhelm:643847008066469908>'], ['tmwgloves', '<:tmwgloves:643847095375364097>'], ['purppouch', '<:purppouch:656786565149884427>'], ['pinkpouch', '<:pinkpouch:656786565397348361>'], ['bluepouch', '<:bluepouch:656786565527502858>'], ['bloodrune', '<:Bloodrune:536252658970001409>'], ['chaosrune', '<:Chaosrune:536252659422855188>'], ['deathrune', '<:Deathrune:536252659586433024>'], ['earthrune', '<:Earthrune:536252659808731137>'], ['waterrune', '<:Waterrune:536252660165115905>'], ['smokerune', '<:Smokerune:536252660299333632>'], ['steamrune', '<:Steamrune:536252660370898954>'], ['smoketend', '<:smoketendrils:536257336130404372>'], ['invention', '<:Invention:689509250946695292>'], ['weppoison', '<:weppoison:689525476158472288>'], ['hoodedmax', '<:HoodedMax:580177869284835328>'], ['shadowsgb', '<:shadowsgb:580177293750697984>'], ['phatgreen', '<:PhatGreen:580176958583734272>'], ['phatwhite', '<:PhatWhite:580177004159172658>'], ['shadowzgs', '<:shadowzgs:580177067598151691>'], ['shadowsos', '<:shadowsos:580177067627511809>'], ['zarytebow', '<:zarytebow:791280228377952276>'], ['icenoxbow', '<:icenoxbow:581180456494432310>'], ['shadowecb', '<:shadowecb:643113822529388569>'], ['caroming4', '<:caroming4:791281588792590336>'], ['oldakcoil', '<:oldakcoil:798285651387613194>'], ['ahrimwand', '<:ahrimwand:860891495052476437>'], ['ahrimbook', '<:ahrimbook:860891495078952970>'], ['deathward', '<:deathward:697808774068699286>'], ['ruthless3', '<:ruthless3:712244800572883025>'], ['ruthless1', '<:ruthless1:712244800924942396>'], ['eofyellow', '<:eofyellow:780401412902223892>'], ['eofpurple', '<:eofpurple:780401412936040478>'], ['firesurge', '<:FireSurge:543465116092334083>'], ['iceasylum', '<:IceAsylum:553050196817215491>'], ['replenpot', '<:replenpot:641337470491033600>'], ['genocidal', '<:genocidal:689503091539705870>'], ['zarosbook', '<:ZarosBook:574290439461404682>'], ['veraclegs', '<:veraclegs:854475442135236618>'], ['verachelm', '<:verachelm:854475442157256745>'], ['dharokaxe', '<:dharokaxe:854475442182029382>'], ['veracbody', '<:veracbody:854475442190549042>'], ['seerheart', '<:seerheart:855865894043254804>'], ['tetsuhelm', '<:Tetsuhelm:556583076029792256>'], ['tetsubody', '<:TetsuBody:556586038911565824>'], ['virtustop', '<:VirtusTop:556586038936600603>'], ['bloodrush', '<:bloodrush:839903691329896479>'], ['smokerush', '<:smokerush:839903691678810173>'], ['lanispear', '<:lanispear:839903893177106454>'], ['flankicon', '<:flankicon:841419289755385866>'], ['impatient', '<:impatient:848803118706720798>'], ['sacrifice', '<:Sacrifice:513201065907322880>'], ['vampscrim', '<:VampScrim:513201294262009874>'], ['khopeshoh', '<:khopeshoh:513206794752098327>'], ['khopeshmh', '<:khopeshmh:513206794844110858>'], ['strykebow', '<:strykebow:643109318845267988>'], ['giantmole', '<:GiantMole:513213159180337152>'], ['spiderleg', '<:Spiderleg:513224678807044096>'], ['onyxbakri', '<:OnyxBakri:565726489362956308>'], ['rubybakri', '<:RubyBakri:565726489413287956>'], ['summflask', '<:SummFlask:565726489438322688>'], ['sbslunars', '<:SBSLunars:565726489467682816>'], ['healother', '<:HealOther:567727985851891715>'], ['dungtoken', '<:dungtoken:762960358930907156>'], ['rapidfire', '<:rapid:535541270521708566>'], ['barricade', '<:cade:535541306353778689>'], ['fortitude', '<:fortitude:537341748180025365>'], ['enhreplen', '<:enhreplen:634350450887622656>'], ['supersara', '<:supersara:642708771344482314>'], ['bloodtend', '<:bloodtendrils:535532854327640064>'], ['pulverise', '<:pulverise:535532879053062146>'], ['slaughter', '<:slaughter:535532879237873666>'], ['overpower', '<:overpower:535532879334080517>'], ['fbackhand', '<:fbackhand:535532879346794516>'], ['dismember', '<:dismember:535532879376023572>'], ['wildmagic', '<:wm:535533809978966037>'], ['smoketend', '<:smoketend:583429557672083505>'], ['runepouch', '<:runepouch:583430011868938283>'], ['cywircomp', '<:cywircomp:583430147538026496>'], ['merciless', '<:merciless:583430258829688854>'], ['summoning', '<:Summoning:583430259064569856>'], ['baseparts', '<:baseparts:583434183448330270>'], ['terramaul', '<:terramaul:602561894829522954>'], ['detoboots', '<:detoboots:602581956072439828>'], ['kilnmelee', '<:KilnMelee:602582045553590274>'], ['soulsplit', '<:soulsplit:615613924506599497>'], ['limitless', '<:limitless:641339233638023179>'], ['headparts', '<:headparts:583434317686898716>'], ['swiftcomp', '<:swiftcomp:583434584717262855>'], ['heavycomp', '<:heavycomp:583434584730107904>'], ['lightcomp', '<:lightcomp:583434584792891452>'], ['piouscomp', '<:piouscomp:583434604363644929>'], ['sharpcomp', '<:sharpcomp:583434604766035970>'], ['serencomp', '<:serencomp:583435429877907456>'], ['zaroscomp', '<:zaroscomp:583435429949341697>'], ['lantadyme', '<:lantadyme:643119665551376456>'], ['dwarfweed', '<:dwarfweed:643119665828200469>'], ['cadantine', '<:cadantine:643119666272796722>'], ['pheromone', '<:pheromone:643122483641188372>'], ['araxxiweb', '<:araxxiweb:643148219030700102>'], ['araxxieye', '<:araxxieye:643148502804725769>'], ['armaplate', '<:armaplate:643150997828403231>'], ['cywirwand', '<:cywirwand:643161591571021824>'], ['seersring', '<:seersring:643162129645699078>'], ['umbralurn', '<:umbralurn:643162581522972722>'], ['sliskeess', '<:sliskeess:643162860867813396>'], ['impercore', '<:impercore:643166751067996160>'], ['praeswand', '<:praeswand:643166769518739477>'], ['torvabody', '<:torvabody:643166871285137458>'], ['magicseed', '<:magicseed:643170746524368927>'], ['lantaseed', '<:lantaseed:643170895543795732>'], ['bluedhide', '<:bluedhide:643506923735351306>'], ['corbicula', '<:corbicula:690136117273821280>'], ['malletops', '<:malletops:690136117374484508>'], ['darknilas', '<:darknilas:884739993527013426>'], ['airstrike', '<:airstrike:895600427930910730>'], ['magmacore', '<:magmacore:902209626425147493>'], ['kalgpouch', '<:kalgpouch:921410226484301925>'], ['waterfall', '<:waterfall:956816428730810398>'], ['smiterune', '<:smiterune:994206048334393385>'], ['covenrune', '<:covenrune:994206032773517364>'], ['chaosroar', '<:chaosroar:994644356671737966>'], ['gsunshine', '<:gsunshine:994644352871714836>'], ['ganovisor', '<:ganohelm:1003947807754960896>'], ['ganoboots', '<:ganoboots:1003947801836789830>'], ['armabook', '<:armabook:513190159051915264>'], ['noxstaff', '<:noxstaff:513190159294922753>'], ['reaperor', '<:Reaperor:513190159349448715>'], ['hailfire', '<:Hailfire:513190159366488101>'], ['reprisal', '<:Reprisal:513190159462694912>'], ['reckless', '<:reckless:643505179378974748>'], ['augcywir', '<:augcywir:643846874444595200>'], ['tmwboots', '<:tmwboots:643847084147081235>'], ['tectlegs', '<:tectlegs:643849257962438656>'], ['tectbody', '<:tectbody:643849268804714506>'], ['tectmask', '<:tectmask:643849283199696917>'], ['vulnbomb', '<:vulnbomb:655341074235129858>'], ['adrenurn', '<:adrenurn:656426717413507074>'], ['rapieroh', '<:rapieroh:656785061072338954>'], ['darkform', '<:darkform:659122103269982228>'], ['bodyrune', '<:Bodyrune:536252659301089280>'], ['dustrune', '<:Dustrune:536252659670188042>'], ['mindrune', '<:Mindrune:536252659783696387>'], ['firerune', '<:Firerune:536252659850674186>'], ['lavarune', '<:Lavarune:536252659938885633>'], ['mistrune', '<:Mistrune:536252660244807720>'], ['soulrune', '<:Soulrune:536252660333019136>'], ['jasboost', '<:jasboost:1006121672790773770>'], ['strength', '<:Strength:689509250879324165>'], ['herblore', '<:Herblore:689554435583508558>'], ['bloodecb', '<:bloodecb:581180203103944714>'], ['compcape', '<:compcape:580177561242435607>'], ['icepwand', '<:icepwand:580176957065527297>'], ['phatblue', '<:PhatBlue:580176957312860180>'], ['bloodzgs', '<:bloodzgs:580176857190891522>'], ['bloodsgb', '<:bloodsgb:580176857568378880>'], ['iceascmh', '<:iceascmh:580176857673105427>'], ['icebbcoh', '<:icebbcoh:580176894922719233>'], ['icebbcmh', '<:icebbcmh:580176894985764905>'], ['iceascoh', '<:iceascoh:580176894989828118>'], ['magekiln', '<:mageKiln:569592271922528271>'], ['mechchin', '<:mechchin:641669268722810881>'], ['sunspear', '<:sunspear:860891494977765446>'], ['eofgreen', '<:eofgreen:780401412727242773>'], ['eofblack', '<:eofblack:780401412915855380>'], ['airsurge', '<:AirSurge:543465115870035999>'], ['reaperor', '<:reaperor:544200033390690335>'], ['sarabook', '<:SaraBook:574290439482638346>'], ['goldloot', '<:goldloot:854335735838277632>'], ['icenihil', '<:icenihil:854475442164334592>'], ['speartip', '<:speartip:855865894114164736>'], ['spearcap', '<:spearcap:855865894146932766>'], ['redvirus', '<:redvirus:853191856350560266>'], ['redgolem', '<:redgolem:854335416294703135>'], ['reefcape', '<:reefcape:839906296290476033>'], ['stunicon', '<:stunicon:841419289428492369>'], ['iceburst', '<:iceburst:841419289797197824>'], ['elderovl', '<:elderovl:841419289831800882>'], ['3ascythe', '<:3ascythe:851514430600511538>'], ['scopulus', '<:scopulus:851518053430329384>'], ['tortoise', '<:Tortoise:513195712222068737>'], ['vindicta', '<:Vindicta:513212949385445376>'], ['twinfury', '<:TwinFury:513212995892019211>'], ['kreearra', '<:KreeArra:513212996353261568>'], ['graardor', '<:Graardor:513212997598969856>'], ['magister', '<:magister:643788569579618304>'], ['twinfury', '<:TwinFury:513213159209828373>'], ['tztokjad', '<:TzTokJad:513222840955174933>'], ['sailfish', '<:Sailfish:565726489363087360>'], ['enfeeble', '<:Enfeeble:567727986409734145>'], ['piercing', '<:piercing:535541258538450944>'], ['ricochet', '<:ricochet:535541259566186521>'], ['fragshot', '<:frag:535541273755385885>'], ['corrshot', '<:corruptshot:535541306294796299>'], ['deadshot', '<:deadshot:535541307666595870>'], ['iceblitz', '<:iceblitz:535613865912696883>'], ['backhand', '<:backhand:535532854302605333>'], ['massacre', '<:massacre:535532879384543253>'], ['detonate', '<:deto:535533833358016512>'], ['snapshot', '<:snap:535534127131394088>'], ['seiswand', '<:seiswand:583429704837758997>'], ['seissing', '<:seissing:583430011831189527>'], ['sunshine', '<:sunshine:994921119381463070>'], ['vengeful', '<:vengeful:583430259110576140>'], ['ovlsalve', '<:ovlsalve:642709927265304608>'], ['vitality', '<:vitality:654618235097972737>'], ['comptrim', '<:comptrim:654618235223932958>'], ['toadflax', '<:toadflax:643119665635131418>'], ['magiclog', '<:magiclog:643122455250206761>'], ['subjgarb', '<:subjgarb:643151011199975434>'], ['dagscale', '<:dagscale:643155113023635461>'], ['glaiveoh', '<:glaiveoh:643161561707446283>'], ['glaivemh', '<:glaivemh:643161561988595782>'], ['cywirorb', '<:cywirorb:643161591210049556>'], ['dhatchet', '<:dhatchet:643161693786210365>'], ['onyxdust', '<:onyxdust:643214800461103105>'], ['seercull', '<:seercull:643162166530146304>'], ['ecbstock', '<:ecbstock:643162308121460738>'], ['liltuzzy', '<:liltuzzy:643162658249375784>'], ['yakahelm', '<:yakahelm:643162695667023907>'], ['sarahiss', '<:sarahiss:643162817574207548>'], ['zarosess', '<:zarosess:643162860830326824>'], ['sereness', '<:sereness:643162860834390016>'], ['kbdscale', '<:kbdscale:643163047275266094>'], ['qbdscale', '<:qbdscale:643163068892708884>'], ['firecape', '<:firecape:643163634045812737>'], ['csignet1', '<:csignet1:643164866395504671>'], ['csignet2', '<:csignet2:643164877707280395>'], ['csignet3', '<:csignet3:643164886985342996>'], ['csignet4', '<:csignet4:643164897345011722>'], ['csignet5', '<:csignet5:643164906295787574>'], ['csignet6', '<:csignet6:643164916278362127>'], ['ascgrips', '<:ascgrips:643166338461859850>'], ['icechest', '<:icechest:643166795586338828>'], ['dbonekit', '<:dbonekit:643168136228634657>'], ['grimpage', '<:grimpage:643168594493964298>'], ['onyxbolt', '<:onyxbolt:643411078872694804>'], ['sarawine', '<:sarawine:643506779124400139>'], ['reddhide', '<:reddhide:643506936968511491>'], ['raxarrow', '<:raxarrow:643507040248922130>'], ['ddarttip', '<:ddarttip:643507083395727401>'], ['luminous', '<:luminous:643507168318062593>'], ['bagrada2', '<:bagrada2:690136117269626888>'], ['redpouch', '<:redpouch:690848915020447745>'], ['bdmobile', '<:bdmobile:867678153668820992>'], ['timewarp', '<:timewarp:870328868815396914>'], ['warptime', '<:timewarp:870328868815396914>'], ['zamstaff', '<:zamorakstaff:873142795706179651>'], ['iceamalg', '<:iceamalg:878739231785222154>'], ['queueing', '<:queueing:898660152025161778>'], ['taviarod', '<:taviarod:900765150817157150>'], ['bluebomb', '<:bluebomb:923249600276615200>'], ['mizuyari', '<:mizuyari:925794591691661373>'], ['tzkalzuk', '<:tzkalzuk:931175752651653121>'], ['highalch', '<:highalch:937093290631786496>'], ['critbuff', '<:critbuff:943518665842757644>'], ['reflexes', '<:reflexes:954725655927463966>'], ['bikarrow', '<:bikarrow:971025697235689513>'], ['wenarrow', '<:wenarrow:971025697046925362>'], ['fularrow', '<:fularrow:971025696958853180>'], ['mtxdummy', '<:mtxdummy:974503666407067738>'], ['brokents', '<:brokents:975012160675647538>'], ['havocgop', '<:havocgop:994920849117282365>'], ['smashgop', '<:smashgop:994929821727604808>'], ['ganohelm', '<:ganohelm:1003947807754960896>'], ['ganobody', '<:ganobody:1003947805611655208>'], ['ganolegs', '<:ganolegs:1003947803673903204>'], ['cinders', '<:Cinderbanes:513190158355660812>'], ['berserk', '<:Berserk:513190158468907012>'], ['cruelty', '<:Cruelty:513190159546712074>'], ['tmwlegs', '<:tmwlegs:643847107186524200>'], ['tmwbody', '<:tmwbody:643847118196441088>'], ['tmwhelm', '<:tmwhelm:643847130619969562>'], ['airrune', '<:Airrune:536252658986647589>'], ['mudrune', '<:Mudrune:536252660286881832>'], ['lawrune', '<:Lawrune:536252661406760970>'], ['shatter', '<:Shatter:536256673904328704>'], ['dommine', '<:dommine:662249620579155968>'], ['defence', '<:Defence:689509250979987525>'], ['blubber', '<:blueblubber:689530593742291033>'], ['holyovl', '<:holyovl:689551388463595590>'], ['aggrovl', '<:aggrovl:689551388576972805>'], ['mwspear', '<:mwspear:694566917456789554>'], ['maxcape', '<:maxcape:580177795703898117>'], ['phatred', '<:PhatRed:580177004083675147>'], ['icecore', '<:icecore:643108818460475430>'], ['3abbcoh', '<:3abbcoh:580176856662409252>'], ['cracker', '<:cracker:580176856980914208>'], ['3abbcmh', '<:3abbcmh:580176857094291486>'], ['penance', '<:penance:643505653062565907>'], ['eofspec', '<:eofspec:746403211908481184>'], ['redbomb', '<:redbomb:761711981186646096>'], ['eofpink', '<:eofpink:780401412865523722>'], ['eofblue', '<:eofblue:780401412906680330>'], ['strcape', '<:strcape:689503815296352308>'], ['enhdev4', '<:enhdev4:712073087507628035>'], ['biting4', '<:biting4:712073087809617931>'], ['zambook', '<:ZamBook:574290439461404672>'], ['icerush', '<:icerush:839903691234607136>'], ['mammoth', '<:Mammoth:513195712146702337>'], ['noxcomp', '<:Noxiouscomp:513203842473525248>'], ['mallory', '<:Mallory:513212580148543489>'], ['haraken', '<:HarAken:513212948781596682>'], ['farming', '<:Farming:513213693790519307>'], ['stagger', '<:Stagger:567727997545611277>'], ['freedom', '<:freedom:535541258240786434>'], ['reflect', '<:reflect:535541258786177064>'], ['provoke', '<:voke:535541259465392143>'], ['revenge', '<:revenge:535541259645878302>'], ['bombard', '<:bombard:535541306391265284>'], ['disrupt', '<:disrupt:535614336207552523>'], ['tmwbody', '<:tmwbody:536966366272552960>'], ['restore', '<:restore:642708657825644554>'], ['assault', '<:assault:535532853979512842>'], ['assault', '<:assault:535532855191928842>'], ['gflurry', '<:gflurry:535532879283879977>'], ['destroy', '<:destroy:535532879330148352>'], ['tsunami', '<:tsunami:535533809995874304>'], ['combust', '<:comb:535533833098100745>'], ['dbreath', '<:dbreath:535533833391702017>'], ['shatter', '<:Shatter:583429757761224715>'], ['turmoil', '<:turmoil:583429936606347280>'], ['anguish', '<:anguish:583429936665198592>'], ['torment', '<:torment:583429936958930964>'], ['brawler', '<:brawler:643505376917979138>'], ['pureorb', '<:pureorb:626499494686621716>'], ['avantoe', '<:avantoe:643119665962549258>'], ['torstol', '<:torstol:643119666042241044>'], ['dagclaw', '<:dagclaw:643155112809988118>'], ['ecblimb', '<:ecblimb:643162308247552021>'], ['ecbmech', '<:ecbmech:643162308255678494>'], ['sgshilt', '<:sgshilt:643162797940932619>'], ['zgshilt', '<:zgshilt:643162798095990788>'], ['bgshilt', '<:bgshilt:643162798112899079>'], ['agshilt', '<:agshilt:643162798125482014>'], ['kbdhead', '<:kbdhead:643163046969212946>'], ['signet1', '<:signet1:643164801685782538>'], ['signet2', '<:signet2:643164813559726115>'], ['signet3', '<:signet3:643164824896929837>'], ['signet4', '<:signet4:643164834283782147>'], ['signet5', '<:signet5:643164845398687744>'], ['signet6', '<:signet6:643164855410360330>'], ['bagrada', '<:bagrada:690136116992671875>'], ['kerapac', '<:kerapac:875443920673337344>'], ['fishing', '<:fishing:892342109938540564>'], ['seedbag', '<:seedbag:892819585470980126>'], ['zealots', '<:zealots:926021352626982942>'], ['vitalis', '<:vitalis:956889613962719293>'], ['zamorak', '<:zamorak:994914159969976440>'], ['tetsumh', '<:tetsumh:1003947812284813374>'], ['tetsuoh', '<:tetsuoh:1003947810372202538>'], ['ganotop', '<:ganobody:1003947805611655208>'], ['reaper', '<:Reaper:513190159412494367>'], ['noxbow', '<:noxbow:513190159425208342>'], ['maceoh', '<:maceoh:656785061059756032>'], ['drider', '<:drider:656785090994503700>'], ['quiver', '<:quiver:656863806080811038>'], ['spices', '<:spices:662038182807732255>'], ['attack', '<:Attack:689509250472476758>'], ['gunkan', '<:greatgunkan:689528927928188963>'], ['3acore', '<:3acore:580177522734661642>'], ['icezgs', '<:icezgs:580176957300539392>'], ['icesgb', '<:icesgb:580176957300539412>'], ['icesos', '<:icesos:580176895237292032>'], ['iceecb', '<:iceecb:580176895325503508>'], ['vorago', '<:vorago:572867742613635082>'], ['slayer', '<:slayer:797896049548066857>'], ['combat', '<:combat:797896050370281523>'], ['cannon', '<:cannon:869283142350041098>'], ['exsang', '<:exsanguinate:856635090745950258>'], ['bane2h', '<:bane2h:859483155210567741>'], ['lunge4', '<:lunge4:736522494315593759>'], ['eofred', '<:eofred:780401412839833601>'], ['rexuwu', '<:rexuwu:547553146650755100>'], ['incite', '<:Incite:553050196725071893>'], ['siphon', '<:Siphon:553050198012854275>'], ['invig3', '<:invig3:689851226426572848>'], ['invig1', '<:invig1:689851226741145617>'], ['crack4', '<:crack4:712073087662686249>'], ['invig4', '<:invig4:712073087859949570>'], ['flank4', '<:flank4:712073088296157185>'], ['pernix', '<:Pernix:574290544747085829>'], ['blight', '<:blight:851514430613487686>'], ['invig2', '<:invig2:851514467095019541>'], ['tuskas', '<:Tuskas:513201065513058306>'], ['gstaff', '<:gstaff:513203008608141314>'], ['legion', '<:Legion:513213018444922900>'], ['araxxi', '<:Araxxi:513213019543699466>'], ['helwyr', '<:Helwyr:513213019635843100>'], ['divert', '<:divert:787904334377648130>'], ['gchain', '<:gchain:787904334495088672>'], ['flurry', '<:flurry:864492981763702834>'], ['guthan', '<:Guthan:513226730002055169>'], ['reeves', '<:Reeves:513226730111238145>'], ['raksha', '<:raksha:789813907706478603>'], ['incend', '<:incend:535541258429661215>'], ['immort', '<:immort:535541258538582017>'], ['unload', '<:unload:535541258664411169>'], ['escape', '<:escape:535541258832052231>'], ['needle', '<:needle:535541259108876293>'], ['dazing', '<:dazing:535541307142307860>'], ['replen', '<:replen:634350514406162436>'], ['cleave', '<:cleave:535532878616985610>'], ['gbarge', '<:gbarge:535532879250456578>'], ['frenzy', '<:frenzy:535532879279554581>'], ['punish', '<:punish:535532879439069184>'], ['impact', '<:impact:535533809655873556>'], ['asphyx', '<:asphyx:535533833072672778>'], ['horror', '<:horror:535533833261547520>'], ['aoskit', '<:aoskit:583430147487563776>'], ['seiryu', '<:Seiryu:583430543321071626>'], ['vigour', '<:vigour:615613235512737792>'], ['ranged', '<:Ranged:689504724403486920>'], ['achiev', '<:achiev:641342351532621824>'], ['yewlog', '<:yewlog:643122455451533325>'], ['dagegg', '<:dagegg:643155112948400128>'], ['kqhead', '<:kqhead:643163003537063946>'], ['pcodex', '<:pcodex:643166740833894400>'], ['bstaff', '<:bstaff:643411126234644481>'], ['dstone', '<:dstone:643507025602543638>'], ['incand', '<:incand:643507182880686125>'], ['zstaff', '<:zamorakstaff:873142795706179651>'], ['lengmh', '<:lengmh:883134308146098227>'], ['lengoh', '<:lengoh:883134308070604870>'], ['lucky6', '<:lucky6:890542428287795221>'], ['zekkil', '<:zekkil:903244090953588787>'], ['eofkit', '<:eofkit:923248842068074527>'], ['lucky2', '<:lucky2:954725767772778496>'], ['ascmh', '<:ascmh:513190158468775936>'], ['ascoh', '<:ascoh:513190159362031631>'], ['bbcoh', '<:bbcoh:626714879230738434>'], ['vbomb', '<:vulnbomb:655341074235129858>'], ['vbook', '<:vbook:656785078160195615>'], ['dummy', '<:dummy:656844963522281473>'], ['salve', '<:salve:536257870178549781>'], ['grest', '<:grest:689530593901412578>'], ['2abow', '<:2ABow:581180092269723648>'], ['cease', '<:cease:864235458464186418>'], ['3asgb', '<:3asgb:580176856817598487>'], ['3azgs', '<:3azgs:580176857115262976>'], ['3aecb', '<:3aecb:580176857127845948>'], ['3asos', '<:3asos:580176857140428818>'], ['solak', '<:solak:580167371310891029>'], ['range', '<:range:580168050121113623>'], ['invig', '<:invig:643505652865695767>'], ['gmaul', '<:gmaul:796989663051120640>'], ['wrack', '<:wrack:856662355952795658>'], ['keris', '<:keris:859483155407699988>'], ['lung4', '<:lung4:712073737247260753>'], ['turt4', '<:turt4:712073737377284146>'], ['eofor', '<:eofor:745279787471470713>'], ['accel', '<:accel:756236265472524418>'], ['aosor', '<:aosor:544200033847869443>'], ['excal', '<:excal:641337999170207763>'], ['roots', '<:roots:848803062684581929>'], ['wrath', '<:Wrath:848803062700703784>'], ['titan', '<:Titan:513195724738002944>'], ['tuska', '<:Tuskas:513201065513058306>'], ['grips', '<:Grips:513204675881992205>'], ['telos', '<:Telos:513212949033123840>'], ['bolas', '<:bolas:785031580493807616>'], ['grico', '<:grico:787904334812807238>'], ['benis', '<:benis:568117404522119169>'], ['death', '<:death:641341976960172043>'], ['karil', '<:karil:641696573272621086>'], ['natty', '<:nat:535541258131865633>'], ['snipe', '<:snipe:535541258425204770>'], ['swift', '<:deathsswift:994921434633744455>'], ['rapid', '<:rapid:535541270521708566>'], ['tight', '<:tight:535541275957657600>'], ['debil', '<:debil:535541278264393729>'], ['barge', '<:barge:535532853916860437>'], ['havoc', '<:havoc:535532879300526080>'], ['gfury', '<:gfury:535532879334080527>'], ['quake', '<:quake:535532879506309150>'], ['stomp', '<:stomp:535532879552315412>'], ['sever', '<:sever:535532879577612298>'], ['slice', '<:slice:535532879594258432>'], ['smash', '<:smash:535532879820619786>'], ['sonic', '<:sonic:535533809924571136>'], ['shock', '<:shock:535533809932697610>'], ['surge', '<:surge:535533810004262912>'], ['chain', '<:chain:535533833056026624>'], ['shard', '<:Shard:583429757975396366>'], ['runic', '<:runic:643505377211842582>'], ['sharp', '<:sharp:643505377291534366>'], ['melee', '<:melee:615612332521029632>'], ['ingen', '<:ingen:641339234111848463>'], ['magic', '<:Magic:689504724159823906>'], ['coins', '<:coins:698816156961603654>'], ['acbmh', '<:acbmh:643162838466035712>'], ['acboh', '<:acboh:643162838709305384>'], ['grim2', '<:grim2:643168158613504031>'], ['trisk', '<:trisk:643215216934518815>'], ['sunpf', '<:sunshinepf:994921595489488927>'], ['pfsun', '<:sunshinepf:994921595489488927>'], ['gconc', '<:gconc:869285393223254107>'], ['botlg', '<:bolg:994189289623662702>'], ['devo', '<:devo:513190158728953857>'], ['onsl', '<:onsl:513190159085207555>'], ['sing', '<:sing:513190159261630467>'], ['core', '<:Core:625304432581672961>'], ['mani', '<:mani:643505153709965322>'], ['grim', '<:grim:568262896375824385>'], ['dbow', '<:dbow:643848618553507843>'], ['vamp', '<:vamp:643505653079343144>'], ['yaka', '<:yaka:861168002619015210>'], ['maul', '<:maul:736524968174682132>'], ['vuln', '<:Vuln:537349530551582720>'], ['cept', '<:Cept:543478434509357098>'], ['veng', '<:Veng:543478434953822208>'], ['dev2', '<:dev2:689503041996587073>'], ['dev3', '<:dev3:689503042265022495>'], ['dev4', '<:dev4:712073087713280033>'], ['imp4', '<:imp4:712073088204013640>'], ['iron', '<:iron:764086050959392778>'], ['bond', '<:Bond:513213538463121408>'], ['brew', '<:Brew:565726489400573962>'], ['lotd', '<:LotD:566453486913323042>'], ['prep', '<:prep:535541258546970624>'], ['rout', '<:rout:535541259268521994>'], ['voke', '<:voke:535541259465392143>'], ['rico', '<:ricochet:535541259566186521>'], ['frag', '<:frag:535541273755385885>'], ['cade', '<:cade:535541306353778689>'], ['anti', '<:anti:535541306475151390>'], ['bash', '<:bash:535541306546716692>'], ['next', '<:next:536014182626099201>'], ['spec', '<:spec:537340400273195028>'], ['zerk', '<:zerk:535532854004678657>'], ['cane', '<:cane:535532878969438210>'], ['kick', '<:kick:535532879132885025>'], ['deci', '<:deci:535532879325822986>'], ['fury', '<:fury:535532879510372352>'], ['omni', '<:omni:535533809664262179>'], ['nami', '<:tsunami:535533809995874304>'], ['meta', '<:meta:535533811304497183>'], ['comb', '<:comb:535533833098100745>'], ['conc', '<:conc:535533833106489365>'], ['deep', '<:deep:535533833139912724>'], ['deto', '<:deto:535533833358016512>'], ['snap', '<:snap:535534127131394088>'], ['junk', '<:Junk:583435544286068736>'], ['teci', '<:teci:641332337451204608>'], ['mahj', '<:mahj:643148943856762890>'], ['onyx', '<:onyx:643411078763511828>'], ['ckey', '<:ckey:643171300134617100>'], ['dspf', '<:deathsswiftpf:994921597813137518>'], ['pfds', '<:deathsswiftpf:994921597813137518>'], ['gote', '<:gote:900765150678749204>'], ['arch', '<:archaeology:941211288665739274>'], ['bolg', '<:bolg:994189289623662702>'], ['gsun', '<:gsunshine:994644352871714836>'], ['aos', '<:aos:513190158359724056>'], ['asr', '<:asr:513190158472839208>'], ['dtb', '<:DTB:513190159429271562>'], ['rod', '<:RoD:513190159462825984>'], ['bbc', '<:bbc:626714879218155521>'], ['jas', '<:jasboost:1006121672790773770>'], ['ovl', '<:ovl:689554436179361864>'], ['vls', '<:vls:841409238717956125>'], ['aod', '<:aod:580167371365548042>'], ['pol', '<:PoL:595794857688301570>'], ['sip', '<:SIP:595794857700622359>'], ['pod', '<:PoD:595794857805479977>'], ['sol', '<:SoL:595794858044686339>'], ['sod', '<:SoD:595794858048749568>'], ['ecb', '<:ecb:615618531937222657>'], ['as4', '<:as4:712074245202772009>'], ['sbs', '<:SBS:543875425055670275>'], ['swh', '<:swh:641670143197446182>'], ['mob', '<:mob:689501908628799488>'], ['eq2', '<:eq2:689502258424971564>'], ['as1', '<:as1:689502339891331093>'], ['cs1', '<:cs1:689502571890737219>'], ['ch4', '<:ch4:712073087864012840>'], ['eq4', '<:eq4:712073088589627505>'], ['yak', '<:Yak:513195712201228289>'], ['rov', '<:RoV:513201065877831680>'], ['qbd', '<:qbd:513212948194394113>'], ['kbd', '<:KBD:513213018054852648>'], ['nex', '<:Nex:513213159071547395>'], ['hsr', '<:HSR:513213693983588362>'], ['ent', '<:ent:567727987274022924>'], ['eof', '<:eof:787526151978614824>'], ['nat', '<:nat:535541258131865633>'], ['esc', '<:escape:535541258832052231>'], ['res', '<:res:535541258844635148>'], ['mds', '<:mds:535541259033378827>'], ['stw', '<:stw:535541259109138463>'], ['nip', '<:nip:537336877900890135>'], ['sun', '<:sunshine:994921119381463070>'], ['bsd', '<:BSD:583430542326759435>'], ['zgs', '<:zgs:626465964325601290>'], ['sos', '<:Sos:626466320132734976>'], ['sgb', '<:sgb:626466665848242186>'], ['dba', '<:DBA:603979368850653216>'], ['eq1', '<:eq1:689504357414207490>'], ['soa', '<:soa:869284271595069451>'], ['abs', '<:armadylbattlestaff:881962727705280512>'], ['ezk', '<:zekkil:903244090953588787>'], ['zuk', '<:tzkalzuk:931175752651653121>'], ['dm', '<:dm:643505652571963417>'], ['pf', '<:pf:689501925770919981>'], ['b3', '<:b3:689502516874051590>'], ['p6', '<:p6:712073088769982475>'], ['bd', '<:bd:535532854281764884>'], ['wm', '<:wm:535533809978966037>'], ['db', '<:dbreath:535533833391702017>'], ['gb', '<:gb:646794380623085579>'], ['pb', '<:pb:646794381055229953>'], ['p5', '<:p5:689504239025782825>'], ['p1', '<:p1:689504340813021223>'], ['bp', '<:bp:641305524884733970>']];

const emojiSuggestions = ['bp', 'p1', 'p5', 'pb', 'gb', 'db', 'wm', 'bd', 'p6', 'b3', 'pf', 'dm', 'zuk', 'ezk', 'abs', 'soa', 'eq1', 'dba', 'sgb', 'sos', 'zgs', 'bsd', 'sun', 'nip', 'stw', 'mds', 'res', 'esc', 'nat', 'eof', 'ent', 'hsr', 'nex', 'kbd', 'qbd', 'rov', 'yak', 'eq4', 'ch4', 'cs1', 'as1', 'eq2', 'mob', 'swh', 'sbs', 'as4', 'ecb', 'sod', 'sol', 'pod', 'sip', 'pol', 'aod', 'vls', 'ovl', 'jas', 'bbc', 'rod', 'dtb', 'asr', 'aos', 'gsun', 'bolg', 'arch', 'gote', 'pfds', 'dspf', 'ckey', 'onyx', 'mahj', 'teci', 'junk', 'snap', 'deto', 'deep', 'conc', 'comb', 'meta', 'nami', 'omni', 'fury', 'deci', 'kick', 'cane', 'zerk', 'spec', 'next', 'bash', 'anti', 'cade', 'frag', 'rico', 'voke', 'rout', 'prep', 'lotd', 'brew', 'bond', 'iron', 'imp4', 'dev4', 'dev3', 'dev2', 'veng', 'cept', 'vuln', 'maul', 'yaka', 'vamp', 'dbow', 'grim', 'mani', 'core', 'sing', 'onsl', 'devo', 'botlg', 'gconc', 'pfsun', 'sunpf', 'trisk', 'grim2', 'acboh', 'acbmh', 'coins', 'magic', 'ingen', 'melee', 'sharp', 'runic', 'shard', 'chain', 'surge', 'shock', 'sonic', 'smash', 'slice', 'sever', 'stomp', 'quake', 'gfury', 'havoc', 'barge', 'debil', 'tight', 'rapid', 'swift', 'snipe', 'natty', 'karil', 'death', 'benis', 'grico', 'bolas', 'telos', 'grips', 'tuska', 'titan', 'wrath', 'roots', 'excal', 'aosor', 'accel', 'eofor', 'turt4', 'lung4', 'keris', 'wrack', 'gmaul', 'invig', 'range', 'solak', '3asos', '3aecb', '3azgs', '3asgb', 'cease', '2abow', 'grest', 'salve', 'dummy', 'vbook', 'vbomb', 'bbcoh', 'ascoh', 'ascmh', 'lucky2', 'eofkit', 'zekkil', 'lucky6', 'lengoh', 'lengmh', 'zstaff', 'incand', 'dstone', 'bstaff', 'pcodex', 'kqhead', 'dagegg', 'yewlog', 'achiev', 'ranged', 'vigour', 'seiryu', 'aoskit', 'horror', 'asphyx', 'impact', 'punish', 'frenzy', 'gbarge', 'cleave', 'replen', 'dazing', 'needle', 'escape', 'unload', 'immort', 'incend', 'raksha', 'reeves', 'guthan', 'flurry', 'gchain', 'divert', 'helwyr', 'araxxi', 'legion', 'gstaff', 'tuskas', 'invig2', 'blight', 'pernix', 'flank4', 'invig4', 'crack4', 'invig1', 'invig3', 'siphon', 'incite', 'rexuwu', 'eofred', 'lunge4', 'bane2h', 'exsang', 'cannon', 'combat', 'slayer', 'vorago', 'iceecb', 'icesos', 'icesgb', 'icezgs', '3acore', 'gunkan', 'attack', 'spices', 'quiver', 'drider', 'maceoh', 'noxbow', 'reaper', 'ganotop', 'tetsuoh', 'tetsumh', 'zamorak', 'vitalis', 'zealots', 'seedbag', 'fishing', 'kerapac', 'bagrada', 'signet6', 'signet5', 'signet4', 'signet3', 'signet2', 'signet1', 'kbdhead', 'agshilt', 'bgshilt', 'zgshilt', 'sgshilt', 'ecbmech', 'ecblimb', 'dagclaw', 'torstol', 'avantoe', 'pureorb', 'brawler', 'torment', 'anguish', 'turmoil', 'shatter', 'dbreath', 'combust', 'tsunami', 'destroy', 'gflurry', 'assault', 'assault', 'restore', 'tmwbody', 'disrupt', 'bombard', 'revenge', 'provoke', 'reflect', 'freedom', 'stagger', 'farming', 'haraken', 'mallory', 'noxcomp', 'mammoth', 'icerush', 'zambook', 'biting4', 'enhdev4', 'strcape', 'eofblue', 'eofpink', 'redbomb', 'eofspec', 'penance', '3abbcmh', 'cracker', '3abbcoh', 'icecore', 'phatred', 'maxcape', 'mwspear', 'aggrovl', 'holyovl', 'blubber', 'defence', 'dommine', 'shatter', 'lawrune', 'mudrune', 'airrune', 'tmwhelm', 'tmwbody', 'tmwlegs', 'cruelty', 'berserk', 'cinders', 'ganolegs', 'ganobody', 'ganohelm', 'smashgop', 'havocgop', 'brokents', 'mtxdummy', 'fularrow', 'wenarrow', 'bikarrow', 'reflexes', 'critbuff', 'highalch', 'tzkalzuk', 'mizuyari', 'bluebomb', 'taviarod', 'queueing', 'iceamalg', 'zamstaff', 'warptime', 'timewarp', 'bdmobile', 'redpouch', 'bagrada2', 'luminous', 'ddarttip', 'raxarrow', 'reddhide', 'sarawine', 'onyxbolt', 'grimpage', 'dbonekit', 'icechest', 'ascgrips', 'csignet6', 'csignet5', 'csignet4', 'csignet3', 'csignet2', 'csignet1', 'firecape', 'qbdscale', 'kbdscale', 'sereness', 'zarosess', 'sarahiss', 'yakahelm', 'liltuzzy', 'ecbstock', 'seercull', 'onyxdust', 'dhatchet', 'cywirorb', 'glaivemh', 'glaiveoh', 'dagscale', 'subjgarb', 'magiclog', 'toadflax', 'comptrim', 'vitality', 'ovlsalve', 'vengeful', 'sunshine', 'seissing', 'seiswand', 'snapshot', 'detonate', 'massacre', 'backhand', 'iceblitz', 'deadshot', 'corrshot', 'fragshot', 'ricochet', 'piercing', 'enfeeble', 'sailfish', 'tztokjad', 'twinfury', 'magister', 'graardor', 'kreearra', 'twinfury', 'vindicta', 'tortoise', 'scopulus', '3ascythe', 'elderovl', 'iceburst', 'stunicon', 'reefcape', 'redgolem', 'redvirus', 'spearcap', 'speartip', 'icenihil', 'goldloot', 'sarabook', 'reaperor', 'airsurge', 'eofblack', 'eofgreen', 'sunspear', 'mechchin', 'magekiln', 'iceascoh', 'icebbcmh', 'icebbcoh', 'iceascmh', 'bloodsgb', 'bloodzgs', 'phatblue', 'icepwand', 'compcape', 'bloodecb', 'herblore', 'strength', 'jasboost', 'soulrune', 'mistrune', 'lavarune', 'firerune', 'mindrune', 'dustrune', 'bodyrune', 'darkform', 'rapieroh', 'adrenurn', 'vulnbomb', 'tectmask', 'tectbody', 'tectlegs', 'tmwboots', 'augcywir', 'reckless', 'reprisal', 'hailfire', 'reaperor', 'noxstaff', 'armabook', 'ganoboots', 'ganovisor', 'gsunshine', 'chaosroar', 'covenrune', 'smiterune', 'waterfall', 'kalgpouch', 'magmacore', 'airstrike', 'darknilas', 'malletops', 'corbicula', 'bluedhide', 'lantaseed', 'magicseed', 'torvabody', 'praeswand', 'impercore', 'sliskeess', 'umbralurn', 'seersring', 'cywirwand', 'armaplate', 'araxxieye', 'araxxiweb', 'pheromone', 'cadantine', 'dwarfweed', 'lantadyme', 'zaroscomp', 'serencomp', 'sharpcomp', 'piouscomp', 'lightcomp', 'heavycomp', 'swiftcomp', 'headparts', 'limitless', 'soulsplit', 'kilnmelee', 'detoboots', 'terramaul', 'baseparts', 'summoning', 'merciless', 'cywircomp', 'runepouch', 'smoketend', 'wildmagic', 'dismember', 'fbackhand', 'overpower', 'slaughter', 'pulverise', 'bloodtend', 'supersara', 'enhreplen', 'fortitude', 'barricade', 'rapidfire', 'dungtoken', 'healother', 'sbslunars', 'summflask', 'rubybakri', 'onyxbakri', 'spiderleg', 'giantmole', 'strykebow', 'khopeshmh', 'khopeshoh', 'vampscrim', 'sacrifice', 'impatient', 'flankicon', 'lanispear', 'smokerush', 'bloodrush', 'virtustop', 'tetsubody', 'tetsuhelm', 'seerheart', 'veracbody', 'dharokaxe', 'verachelm', 'veraclegs', 'zarosbook', 'genocidal', 'replenpot', 'iceasylum', 'firesurge', 'eofpurple', 'eofyellow', 'ruthless1', 'ruthless3', 'deathward', 'ahrimbook', 'ahrimwand', 'oldakcoil', 'caroming4', 'shadowecb', 'icenoxbow', 'zarytebow', 'shadowsos', 'shadowzgs', 'phatwhite', 'phatgreen', 'shadowsgb', 'hoodedmax', 'weppoison', 'invention', 'smoketend', 'steamrune', 'smokerune', 'waterrune', 'earthrune', 'deathrune', 'chaosrune', 'bloodrune', 'bluepouch', 'pinkpouch', 'purppouch', 'tmwgloves', 'malevhelm', 'malevbody', 'malevlegs', 'augglaive', 'yakahelm2', 'auratotem', 'summtotem', 'berserker', 'compcapet', 'malevkite', 'razorback', 'noxscythe', 'corrblast', 'onslaught', 'emberkeen', 'bloodtend', 'ganogloves', 'ganoponcho', 'namiincite', 'poisonicon', 'kethsiring', 'holyscarab', 'crystalorb', 'crystalbow', 'aggrosigil', 'aggression', 'proteanlog', 'archglacor', 'glacorclaw', 'smokeamalg', 'bloodamalg', 'gconccodex', 'animaofful', 'animaofwen', 'animaofbik', 'animaofjas', 'sunshinepf', 'greenpouch', 'corbicula2', 'malletops2', 'vitalspark', 'dharokbody', 'darrowtips', 'royaldhide', 'blackdhide', 'greendhide', 'crystalkey', 'royalsight', 'royalframe', 'fishytreat', 'smokechest', 'bloodchest', 'phylactery', 'zamorakess', 'saramurmur', 'durzaghelm', 'rottenfang', 'archerring', 'holyelixir', 'crestzaros', 'crestseren', 'tectenergy', 'auburnlock', 'araxyteegg', 'araxxifang', 'snapdragon', 'bandoscomp', 'silentcomp', 'strongcomp', 'livingcomp', 'magicparts', 'coverparts', 'staveparts', 'supergrest', 'pernixbody', 'fungalcomp', 'subtlecomp', 'kilnranged', 'laceration', 'surgecodex', 'clearparts', 'bladeparts', 'ambassador', 'imbuedcomp', 'undeadcomp', 'shadowcomp', 'directcomp', 'deepimpact', 'shadowtend', 'shielddome', 'icebarrage', 'bloodblitz', 'anticipate', 'debilitate', 'rejuvenate', 'demoralise', 'marksofwar', 'dormantsos', 'dormantzgs', 'dormantsgb', 'pernixcowl', 'dharokhead', '2arangetop', 'gregorovic', 'sliskebody', 'deathlotus', 'terrorbird', 'smokeburst', 'venomblood', 'bloodburst', 'reaverring', 'shadowrush', 'greengolem', 'blackgolem', 'greenvirus', 'blackvirus', 'vestaspear', 'kalgscroll', 'holywrench', 'armagloves', 'spearplume', 'spearshaft', 'smokenihil', 'bloodnihil', 'veracflail', 'bronzeloot', 'silverloot', 'rubyaurora', 'bandosbook', 'guthixbook', 'antitheism', 'supremeovl', 'dragonclaw', 'dragonmace', 'fontoflife', 'spiritcape', 'abyssalorb', 'handcannon', 'virtuswand', 'ahrimstaff', 'superwrack', 'incitefear', 'smokecloud', 'shadowcore', 'ripperclaw', 'iritsticks', 'signoflife', 'barrowsdye', 'bloodbbcoh', 'bloodbbcmh', 'barrowssos', 'barrowssgb', 'barrowszgs', 'bloodpwand', 'phatyellow', 'phatpurple', 'hoodedcomp', '3atectlegs', '3atectbody', '3aseissing', '3aseiswand', 'bloodpwand', 'bloodascoh', 'bloodascmh', '3atectmask', 'barrowsecb', 'smoketends', 'naturerune', 'cosmicrune', 'astralrune', 'blackpouch', 'luckpotion', 'poisonbomb', 'stickybomb', 'decimation', 'pernixbody', 'slayerhelm', 'flarefrost', 'desolation', 'affliction', 'shadowspike', 'vestmenttop', 'teamsplitrb', 'archaeology', 'bookofdeath', 'bloodreaver', 'crystalwand', 'teamsplitrr', 'ancienthilt', 'tonymattock', 'energising2', 'crystalmask', 'perfectplus', 'shadowamalg', 'surgemobile', 'flankimpact', 'impactflank', 'yellowpouch', 'orangepouch', 'malevenergy', 'torstolseed', 'royalspring', 'masutaspear', 'shadowchest', 'nymorabraid', 'kalphiteegg', 'sarawhisper', 'statiusbody', 'ribsofchaos', 'mazcabcodex', 'warriorring', 'arcanesigil', 'divinesigil', 'nymorablade', 'crestsliske', 'bandoschest', 'dormanthelm', 'dormantbody', 'dormantlegs', 'severedhoof', 'averniccomp', 'precisecomp', 'refinedcomp', 'spikedparts', 'simpleparts', 'platedparts', 'smoothparts', 'paddedparts', 'primalfeast', 'evasivecomp', 'spellcaster', 'demonslayer', 'volcanicorb', 'facetedcomp', 'zamorakcomp', 'oceaniccomp', 'vvasivecomp', 'escapecodex', 'healthycomp', 'bindingshot', 'corruptshot', 'deathsswift', 'natinstinct', 'lantasticks', 'noxiouscomp', 'guthixstaff', 'titanscroll', 'energising4', 'shadowburst', 'stalkerring', 'reaverpouch', 'summrenewal', 'zamorakbrew', 'abyssalwand', 'torvagloves', 'staticglove', 'archerheart', 'shadownihil', 'armadyllegs', 'pernixchaps', 'transfigure', 'hydrixbakri', 'deflectmage', 'armourspike', 'relentless5', 'ripperpouch', 'karilcbowoh', 'linzahammer', 'karilcbow2h', 'abyssalwhip', 'karilcbowmh', 'sbsancients', 'animatedead', '3amalevhelm', 'icetectmask', 'salveamulet', 'inspiration', 'barrowscore', 'icenoxstaff', 'virtusboots', 'bloodscythe', 'bloodnoxbow', 'shadowpwand', 'shadowbbcmh', 'shadowbbcoh', 'icetectbody', 'icetectlegs', 'iceseiswand', '3amalevlegs', '3amalevbody', 'bloodnoxbow', '3akhopeshoh', '3asosbroken', '2ndagesword', '3akhopeshmh', '2ndagestaff', 'blueblubber', 'greatgunkan', 'stormshards', 'caloriebomb', 'augseissing', 'sirenicmask', 'sirenicbody', 'sireniclegs', 'subjugation', 'malevolence', 'armadylcomp', 'cinderbanes', 'seasingerorb', 'blackcrystal', 'antireflexes', 'smashpassage', 'havocpassage', 'gdeathsswift', 'twinshotrune', 'vestmentstop', 'vestmenthood', 'abyssalflesh', 'callfollower', 'chaoticstaff', 'crystalstaff', 'darkiceshard', 'pernixquiver', 'magmatempest', 'igneousstone', 'shadowsgrace', 'vampbloodess', 'croesusflake', 'absorbative4', 'lengartefact', 'zamorakstaff', 'gbargemobile', 'escapemobile', 'cadeturtling', 'ricocaroming', 'combustlunge', 'emeraldbakri', 'corruptsigil', 'sirenicscale', 'ascendribolt', 'greatercodex', 'telostendril', 'bloodtendril', 'soulfragment', 'avaryssbraid', 'kalphiteclaw', 'facelessmask', 'inertcrystal', 'ancientscale', 'spiritshield', 'elysiansigil', 'avaryssblade', 'crestzamorak', 'giantfeather', 'spiderlegbot', 'spiderlegmid', 'spiderlegtop', 'rumblingcomp', 'shiftingcomp', 'ascendedcomp', 'culinarycomp', 'preciouscomp', 'powerfulcomp', 'etherealcomp', 'stunningcomp', 'organicparts', 'tensileparts', 'crystalparts', 'craftedparts', 'adrenrenewal', 'blessedflask', 'masterstroke', 'undeadslayer', 'dragonslayer', 'corruptedorb', 'dextrouscomp', 'knightlycomp', 'variablecomp', 'thirdagecomp', 'meteorstrike', 'greaterbarge', 'bloodtendril', 'bloodbarrage', 'sailfishsoup', 'saltthewound', 'reaperpoints', 'loyaltypoint', 'smokebarrage', 'sbsstandards', 'kwuarmsticks', 'spiritsticks', 'dagannothrex', 'kalphiteking', 'staffoflight', 'championring', 'animahelmzam', 'bandosgloves', 'pernixgloves', 'warriorheart', 'deflectmelee', 'deflectrange', 'dragonclawoh', 'dragondagger', 'ripperscroll', 'classiccomps', 'vintagecomps', 'obliteration', 'armagodsword', 'saragodsword', 'wrackandruin', 'exsanguinate', 'icenoxscythe', 'zurielsstaff', 'korasissword', 'annihilation', 'ranarrsticks', 'shadownoxbow', 'icemalevhelm', 'barrowsbbcmh', 'barrowsbbcoh', 'barrowsascoh', 'barrowsascmh', 'elitetetsuoh', 'hexhunterbow', 'elitetetsumh', 'shadowscythe', 'icekhopeshoh', 'icekhopeshmh', 'icemalevbody', 'icemalevlegs', 'blightlasher', 'rocktailsoup', 'thermalflask', 'constitution', 'dominionmine', 'ancientshard', 'corruptblast', 'ganodermictop', 'seasingerwand', 'dungeoneering', 'vestmentboots', 'vestmentshood', 'tsunamiincite', 'blessingofhet', 'chaoticclawoh', 'chaoticclawmh', 'polyporestaff', 'darkicesliver', 'emeraldaurora', 'pernixsquiver', 'obsidianblade', 'igneouskalzuk', 'igneouskalxil', 'igneouskalmej', 'igneouskalket', 'graspingpouch', 'sanasfyrtorch', 'gathererscape', 'deathsswiftpf', 'gricocaroming', 'chaincaroming', 'fragshotlunge', 'backhandflank', 'redsmallpouch', 'watertalisman', 'ancientemblem', 'dwarfweedseed', 'hydrixbolttip', 'glovespassage', 'volcanicshard', 'perfectchitin', 'twistedantler', 'godswordshard', 'corporealbone', 'berserkerring', 'spectralsigil', 'decayingtooth', 'resilientcomp', 'corporealcomp', 'saradomincomp', 'brassicancomp', 'enhancingcomp', 'metallicparts', 'flexibleparts', 'delicateparts', 'araxytespider', 'fortunatecomp', 'elderovlsalve', 'harnessedcomp', 'superantifire', 'bloodtendrils', 'greaterdazing', 'shadowbarrage', 'deflectpernix', 'reprisalcodex', 'kalphitequeen', 'clockworkcomp', 'chaoticcbowoh', 'armadylhelmet', 'elitetectmask', 'drygorelongoh', 'dragonhalberd', 'elementsscrim', 'ed3luckycharm', 'ed2luckycharm', 'ed1luckycharm', 'trackingglove', 'bandostassets', 'elitetectbody', 'historiccomps', 'timeworncomps', 'desertamulet4', 'bloodseissing', 'magicshortbow', 'fleetingboots', 'barrowsnoxbow', '3asireniclegs', '3asirenicbody', 'barrowsscythe', 'bloodseiswand', 'bloodnoxstaff', 'bloodtectlegs', 'bloodtectbody', 'ceremonialtop', 'bloodseiswand', 'bloodtectmask', '3asirenicmask', '2ndagemageset', 'elitetectlegs', 'smoketendrils', 'borrowedpower', 'royalcrossbow', 'explosivecomp', 'drygorelongmh', 'ilujankancomp', 'ganodermiclegs', 'ganodermicbody', 'ganodermichelm', 'sapphireaurora', 'afflictionrune', 'chaostrapsrune', 'vestmentsboots', 'vestmentbottom', 'jawsoftheabyss', 'abyssalscourge', 'hellhoundpouch', 'scriptureofful', 'ringofwhispers', 'imcandomattock', 'cryptbloomlegs', 'cryptbloomhelm', 'cryptbloombody', 'scriptureofbik', 'glacorremnants', 'scriptureofwen', 'scriptureofjas', 'coilupgradekit', 'fracturedshaft', 'gchaincaroming', 'dismemberlunge', 'fbackhandflank', 'pinksmallpouch', 'bluesmallpouch', 'hruneplatesalv', 'purplemushroom', 'merethielstaff', 'chippedcrystal', 'draconicenergy', 'protectivecomp', 'spiritualparts', 'connectorparts', 'dragonfirecomp', 'balancedstrike', 'shadowtendrils', 'treasurehunter', 'chaoselemental', 'kriltsutsaroth', 'corporealbeast', 'combatantscape', 'channellerring', 'animahelmzaros', 'animahelmseren', 'torvaplatebody', 'seasingershood', 'elderrunehelm5', 'deathlotushood', 'crystalhalberd', 'insulatedboots', 'virtusrobelegs', 'tetsuplatelegs', 'torvaplatelegs', 'pneumaticglove', 'berserkerheart', 'ghosthunterbag', 'animalegsseren', 'animalegszaros', 'masterworklegs', 'persistentrage', 'berserkersfury', 'furyofthesmall', 'bandosgodsword', 'polyporestrike', 'kineticcyclone', 'bloodmalevhelm', 'saradominsword', 'shadowtectmask', 'bloodkhopeshmh', 'shadownoxstaff', 'shadowseissing', 'bloodmalevlegs', 'bloodmalevbody', 'ceremonialmask', 'wyverncrossbow', 'ceremoniallegs', 'ancientlantern', 'shadowseiswand', 'bloodkhopeshoh', '2ndageswordaug', '2ndagemagemask', '2ndagestaffaug', '2ndagemeleeset', '2ndagerangeset', '2ndagefullhelm', 'shadowtectbody', 'shadowtectlegs', 'icesireniclegs', 'icesirenicbody', 'masterworkhelm', 'masterworkbody', 'masterworklegs', 'ganodermicboots', 'ganodermicvisor', 'greatersunshine', 'vestmentsbottom', 'brokenteamsplit', 'igneousdeadshot', 'deadshotigneous', 'sixthagecircuit', 'powderofpenance', 'aggressionflask', 'drygorerapiermh', 'abyssalvinewhip', 'zamorakianspear', 'staffofdarkness', 'crystaldaggeroh', 'crystaldaggermh', 'teamsplitredred', 'taintedrepriser', 'hellhoundscroll', 'broochofthegods', 'cryptbloomboots', 'waterfiendpouch', 'potionreservoir', 'manuscriptofful', 'manuscriptofwen', 'manuscriptofbik', 'manuscriptofjas', 'eldertrovefult3', 'eldertrovefult2', 'eldertrovefult1', 'eldertrovewent3', 'eldertrovewent2', 'eldertrovewent1', 'eldertrovebikt3', 'eldertrovebikt2', 'eldertrovebikt1', 'eldertrovejast3', 'eldertrovejast2', 'eldertrovejast1', 'wrackenergising', 'sliceenergising', 'anticlearheaded', 'deepimpactflank', 'telekeneticgrab', 'blacksmallpouch', 'greensmallpouch', 'coalstonespirit', 'runestonespirit', 'addystonespirit', 'ancientartefact', 'imbuedbarkshard', 'royalstabiliser', 'glimmeringscale', 'blackstoneheart', 'deflectingparts', 'spiritualprayer', 'pestiferouscomp', 'deathsswiftness', 'ancientrepriser', 'blackstonearrow', 'animahelmsliske', 'phoenixnecklace', 'superantipoison', 'glovesofpassage', 'masterworkglove', 'ghosthunterlegs', 'pristinepavoegg', 'ghosthunterbody', 'ghosthunterhelm', 'animalegsamorak', 'animalegssliske', 'deathlotuschaps', 'demonslayerperk', 'guthixsblessing', 'zamorakgodsword', 'banelongswordmh', 'barrowstectmask', 'fellstalksticks', 'shadowkhopeshoh', 'barrowsnoxstaff', 'barrowsseissing', 'barrowsseiswand', '3adrygorelongoh', '3adrygorelongmh', 'shadowmalevbody', 'shadowmalevlegs', 'shadowmalevhelm', 'shadowkhopeshmh', 'shadowkhopeshoh', 'dragonriderbody', 'barrowstectlegs', 'dragonriderhelm', 'barrowstectbody', 'ceremonialboots', '3aelitetectmask', '3aelitetectlegs', '3aelitetectbody', '3adrygoremacemh', '3adrygoremaceoh', 'inquisitorstaff', 'masterworkboots', 'ancientdefender', 'ganodermicgloves', 'ganodermicponcho', 'disintegraterune', 'igneousomnipower', 'omnipowerigneous', 'igneousoverpower', 'overpowerigneous', 'teamsplitredblue', 'aggressionpotion', 'pernixsquiverred', 'archoutfitjacket', 'spacetimemattock', 'deathsporearrows', 'cryptbloomgloves', 'graspingpouchred', 'taggascorehammer', 'prismofsalvation', 'frozencoreofleng', 'cannonupgradekit', 'bindingshotflank', 'yellowsmallpouch', 'orangesmallpouch', 'purplesmallpouch', 'ancientsummstone', 'imbuedbladeslice', 'dragonriderlance', 'achtotempestbody', 'achtotempestlegs', 'achtotempesthlem', 'dragonstonebakri', 'kalphitedefender', 'commanderzilyana', 'supremedagganoth', 'literallynothing', 'superprayerflask', 'achtoprimevaltop', 'dragonslayerperk', 'undeadslayerperk', 'heightenedsenses', 'augdrygoremacemh', 'ancienttoolgizmo', 'drakansmedallion', 'barrowsmalevhelm', 'iceelitetectmask', 'icedrygoremaceoh', 'barrowskhopeshmh', 'barrowskhopeshoh', 'icedrygoremacemh', 'icedrygorelongmh', 'icedrygorelongoh', 'iceelitetectbody', 'iceelitetectlegs', 'bloodsireniclegs', 'dragonriderchaps', 'bloodsirenicbody', 'barrowsmalevlegs', 'ceremonialgloves', 'barrowsmalevbody', 'bloodsirenicmask', '2ndagemagetopaug', 'eliterangerboots', 'elitesirenicmask', 'elitesirenicbody', 'elitesireniclegs', 'kalphiterepriser', 'jasdemonbanearrow', 'attunedcrystalorb', 'pernixsquiverblue', 'blightedrebounder', 'corrupteddefender', 'magmatempestcodex', 'splinteringarrows', 'graspingpouchpink', 'graspingpouchblue', 'orthenfurnacecore', 'kerapacsmaskpiece', 'attunedcrystalbow', 'achtoteralithbody', 'achtoteralithhelm', 'achtoteralithlegs', 'achtotempestboots', 'greaterdazingshot', 'beastmasterdurzag', 'enhancedexcalibur', 'eliterobinhoodtop', 'achtoprimevallegs', 'achtoprimevalhelm', 'superiortetsukote', 'gownofsubjugation', 'adrenrenewalflask', 'ancienttoolgizmo2', 'eliteseasingerorb', 'shadowsireniclegs', 'shadowsirenicbody', 'shadowsirenicmask', '3adrygorerapieroh', '3adrygorerapiermh', 'blessingsofthesea', 'blessingsofthesky', '2ndagemagelegsaug', '2ndagerangetopaug', 'kalphiterebounder', 'intimidationtotem', 'anticipatereflexes', 'greaterdeathsswift', 'jasdragonbanearrow', 'prismofrestoration', 'powderofprotection', 'attunedcrystalwand', 'magmatempesttarget', 'pernixsquiverblack', 'pernixsquivergreen', 'graspingpouchblack', 'graspingpouchgreen', 'armadylbattlestaff', 'pontifexshadowring', 'kerapacswristwraps', 'piercingenergising', 'tightbindingsflank', 'arcanespiritshield', 'divinespiritshield', 'necritestonespirit', 'bloodsoakedfeather', 'vengefulkiteshield', 'achtoteralithboots', 'achtotempestgloves', 'superiorzurielstop', 'superiorvestasbody', 'achtoprimevalboots', 'elderruneplatelegs', 'pristinebagradaegg', 'eliterobinhoodlegs', 'superprayerrenewal', 'superiordragonclaw', 'augdrygorerapieroh', 'ancientarmourgizmo', 'ancientweapongizmo', 'icedrygorerapieroh', 'icedrygorerapiermh', 'barrowssirenicmask', 'bloodelitetectbody', 'bloodelitetectlegs', 'bloodelitetectmask', 'blooddrygorelongoh', '3aelitesirenicbody', '3aelitesireniclegs', '3aelitesirenicmask', 'blooddrygorelongmh', 'eliteseasingerwand', 'barrowssirenicbody', 'barrowssireniclegs', 'blooddrygoremacemh', 'blooddrygoremaceoh', 'blessingsofthesand', '2ndageplatebodyaug', '2ndagerangelegsaug', '2ndageplatelegsaug', 'nightmaregauntlets', 'celestialhandwraps', 'vestmentsofhavoctop', 'abyssalarmourspikes', 'attunedcrystalstaff', 'pernixsquiverpurple', 'pernixsquiveryellow', 'pernixsquiverorange', 'graspingpouchpurple', 'graspingpouchyellow', 'graspingpouchorange', 'fracturedarmasymbol', 'elysianspiritshield', 'luminitestonespirit', 'mercilesskiteshield', 'achtoteralithgloves', 'achtoprimevalgloves', 'elderrunegauntlets5', 'ancientweapongizmo2', 'ancientarmourgizmo2', 'superiormorriganjav', 'superiormorriganaxe', 'superiorzurielstaff', 'shadowelitetectmask', 'iceelitesirenicmask', 'staffoflimitlessair', 'shadowdrygoremacemh', 'shadowdrygoremacemh', 'iceelitesireniclegs', 'iceelitesirenicbody', 'shadowelitetectbody', 'shadowelitetectlegs', 'vestmentsofhavochood', 'bowofthelastguardian', 'upgradedboneblowpipe', 'attunedcrystaldagger', 'tzkalzuksarmourpiece', 'croesussenrichedroot', 'superiorstatiussbody', 'atrociousroguegloves', 'amuletoftheforesaken', 'pristinecorbiculaegg', 'seasingersrobebottom', 'superiordragondagger', 'superiordragonclawoh', 'conservationofenergy', 'barrowselitetectlegs', 'barrowselitetectmask', 'barrowselitetectbody', 'barrowsdrygoremacemh', 'blooddrygorerapiermh', 'vestmentsofhavocboots', 'portentitemprotection', 'superiormorrigansbody', 'shadowdrygorerapiermh', 'shadowdrygorerapieroh', 'bloodelitesirenicmask', 'bloodelitesireniclegs', 'bloodelitesirenicbody', 'vestmentsofhavocbottom', 'attunedcrystaldaggeroh', 'superiormorriganschaps', 'shadowelitesirenicbody', 'shadowelitesirenicmask', 'shadowelitesireniclegs', 'portentofitemprotection', 'superiorseasingeraonori', 'barrowselitesirenicmask', 'barrowselitesireniclegs', 'barrowselitesirenicbody', 'abyssalarmourspikesalloy', 'kineticcycloneupgradekit', 'superiorvestasplateskirt', 'fracturedstabilisationgem', 'superiorstatiussplatelegs', 'superiorzurielsrobebottom'];

/***/ }),

/***/ "./jquery.js":
/*!*******************!*\
  !*** ./jquery.js ***!
  \*******************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict"; true&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B, true&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return r}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});

/***/ }),

/***/ "./wavetexts.js":
/*!**********************!*\
  !*** ./wavetexts.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wave_text": () => (/* binding */ wave_text)
/* harmony export */ });
const wave_text = {
"1": `
⬥ Start of encounter
    • :vulnbomb: northwest where Hur spawns
    • TC + :wm: → :dbreath: northwest Hur

⬥ Walk [1]
    • :vulnbomb: + :gconc: → :asphyx: northwest Hur
    • :vulnbomb: under yourself as 3 southern Hurs approach → full channel :bloodbarrage: + :deto: + :dbreath:

⬥ While walking [2]
    • :gchain: → :gstaff: :eofspec: → :gconc: to finish off Kih
    `,
"2": `
⬥ Start by :vulnbomb: + TC + :wm: → :dbreath: northeast Xil

⬥ :bd: west to other Xil [1]
    • :vulnbomb: + :gconc: → :asphyx:

⬥ Walk [2]
    •  :comb: far west Hur → :bloodbarrage: + :sonic:

⬥ :bd: southeast [3]
    • :vulnbomb: + :magmatempest: as 3 Hur cluster → :bloodbarrage: + :deto: + :dbreath: when all Hurs are in range (should hit Yt-Mejkot)
    • Target Yt-Mejkot :gchain: → :omni:
    • Finish off Kih with basics and :gstaff: :eofspec:
`,
"3": `
⬥ Start by :vulnbomb: + TC + :asphyx: 4 hit Yt-Mejkot → :magmatempest: under it
    • Target Kih behind Yt-Mejkot :dbreath: → :bloodbarrage: + :sonic:

⬥ Move north [1]
    • target Xil :vulnbomb: → :wm: → :gconc:
    • :gchaincaroming: → wait 1t → :omni:
    • :comb: south Yt-Mejkot

⬥ Move east , south of lure rock [2]
    • :vulnbomb: + :dbreath: Xil → :gchaincaroming: → :bloodbarrage: + :wm:

⬥ Move out and :bd: + :surge: north [3]
`,
"4": `
⬥ Start by pre :magmatempest: + :vulnbomb: Hur spawn → target Hur + 4-hit :asphyx: → :gconc: → :comb:

⬥ Immediately :surge: to igneous Xil [1]
    • :vulnbomb: it → :bloodbarrage: + :sonic: → :gconc: → :omni: → :gchain: (should tag Igneous Hur) → :dbreath: → :gconc: (→ :Tuskas: basics on Hur if Hur not dead)

⬥ :surge: + :bd: to igneous Mej [2]
    • :vulnbomb: + :corruptblast: → walk around it → :bloodbarrage: + :tsunami: → :soa: :spec: → :gconc: → :freedom: + :bloodbarrage: → step east → :dbreath: + :gconc:

⬥ :surge: north + :bd: infront of Zuk throne [3]
    • :vulnbomb: + target Zuk → :smokecloud: + :sunshinepf: → Extra action button → :gconc: → (:limitless: anywhere if needed) :wm: → :smoketendrils: → :asphyx: → :Shard: Zuk after hitting 1100k HP
`,
"5": `
⬥ No dummy strat :dummy: :x:: :magmatempest: between the two northwest Hurs, target southeast Hur and :gchain: → :omni: to clear 3 southeast Hurs. Clear a secondary target using :gconc: and the other using :dbreath:

⬥ Dummy strat :dummy:: Drop dummy mid, :gchaincaroming: → :gconc: → wait 1t → :omni: when Hurs spawn

⬥ Walk to northeast to prepare to wave 6 [1]
`,
"6": `
⬥ Start by :vulnbomb: Xil infront of Zuk chair → TC + :wm:
    • Target se Xil and :bloodbarrage: + 4-hit :asphyx:
    • Northeast Xil: :vulnbomb: + :gconc: → :comb:

⬥ Immediately :bd: west [1]
    • Target north Xil and :gchain: → :gconc: → wait 1t → :gstaff: :eofspec:
    • TC closest Xil :bloodbarrage: + :sonic:
    • Step east from behind rock :gchaincaroming: Yt-Mejkot → return to safespot + :wm: → 4-hit :asphyx:

⬥ Step east from behind rock [2]
    • Target Jad + :vulnbomb: + :magmatempest: (can :SBSLunars: :Veng: a Jad hit for extra damage here) → :gchaincaroming: → :gconc: → wait 1t :omni: → :gstaff: :eofspec: → :bloodbarrage: + :dbreath:
    • Target Yt-Mejkot :gconc: → :Tuskas:

⬥ :bd: south east and prepare for wave 7 [3]
`,
"7": `
⬥ :vulnbomb: east Kih → TC + :bloodbarrage: + :gconc:

⬥ Step west to target north Mej [1]
    • :vulnbomb: + :bloodbarrage: + :wm:
    • Target mid Kih :comb: → :bloodbarrage: + :sonic:
    • Step west and :magmatempest: + :vulnbomb: between all 3 targets → :gstaff: :eofspec: south east Tok-Xil → :bloodbarrage: + :gconc: → :dbreath:

⬥ :surge: south [2]
    • Target Yt-Mejkot + :vulnbomb: + :gchaincaroming: → :gconc: → wait 1t :omni:

⬥ Walk out [3]
    • Target west Tok-Xil :bloodbarrage: + :sonic: → :magmatempest:
    • :vulnbomb: between 3 Xil + :gchain: another Xil → :bloodbarrage: + :deto: + :dbreath:

⬥ Walk up to north of middle east lure rock [4]
`,
"8": `
⬥ Start by :vulnbomb: east Mej → TC + :wm: → :icebarrage: + :wrack:
    • Path north and :vulnbomb: middle Xil + :gconc: → :asphyx:
    • Target west Mej and :comb:

⬥ Walk the :comb: by stepping southeast [1]
    • :bloodbarrage: + :gstaff: :eofspec: Mej to finish off
    • Target Xil :vulnbomb: → :bloodbarrage: + :gstaff: :eofspec: → :gconc: → :dbreath: (→ :Tuskas: if needed)

⬥ :surge: south [2]
    • Target Yt-Mejkot → :vulnbomb: → :gchaincaroming: → :gconc: → wait 1t → :omni:
    • TC west Xil :devo: → :bloodbarrage: + :dbreath:

⬥ Move northwest [3]
    • :magmatempest: + :vulnbomb: between 4 spawns → target furtherst north and :gchaincaroming: → :gconc: → wait 1t → :wm: → :dbreath: remaining Xils

⬥ :surge: north to prepare for wave 9 [4]
`,
"9": `
⬥ Start by pre :magmatempest: + :vulnbomb: Hur spawn → target Hur + 4-hit :asphyx: → :gconc: → :comb:

⬥ Immediately :surge: to igneous Xil [1]
    • :vulnbomb: it → :bloodbarrage: + :sonic: → :gconc: → :omni: → :gchain: (should tag Igneous Hur) → :dbreath: → :gconc: (→ :Tuskas: basics on Hur if Hur not dead)

⬥ :surge: + :bd: to igneous Mej [2]
    • :vulnbomb: + :corruptblast: → walk around it → :bloodbarrage: + :tsunami: → :soa: :spec: → :gconc: → :freedom: + :bloodbarrage: → step east → :dbreath: + :gconc:

⬥ :surge: north + :bd: infront of Zuk throne [3]
    • :vulnbomb: + target Zuk → :smokecloud: + :sunshinepf: → Extra action button → :gconc: → (:limitless: anywhere if needed) :wm: → :smoketendrils: → :asphyx: or basics to phase → :Shard: Zuk after hitting 1000k HP
`,
"10": `
⬥ (In :sunshine:) :vulnbomb: + TC → :smokecloud: + :omni: → :gstaff: :eofspec: → :adrenrenewal: + :dbreath:

⬥ :bd: southeast [1] and walk south [2]
`,
"11": `
⬥ Start by :vulnbomb: Kih  → :bloodbarrage: + :gconc: → :Tuskas:

⬥ Run north to middle Mej [1]
    • :vulnbomb: + :bloodbarrage: + :comb:

⬥ Walk south to walk combust to fissue [2]
    • :vulnbomb: + :magmatempest: other Mej → :bloodbarrage: + :gchain: → :wm: → wait behind south rock until Mej alights with Yt-Mejkot
    • Target Yt-Mejkot :bloodbarrage: + :gconc: → :asphyx: → target Mej behind + :dbreath: → :bloodbarrage: + :sonic: → :vulnbomb: other Mej → :gchaincaroming: → :gstaff: :eofspec: → :comb:

⬥ Move north to attack Jad + Mej [3]
    • :vulnbomb: + :magmatempest: under Jad + Mej → target Mej + :corruptblast: → target Jad + :gchain: → :omni: → :ingen: + :sgb: :spec: → :gconc: → :dbreath: → :bloodbarrage: + :tsunami:
​
⬥ :bd: northwest [4]
    • :vulnbomb: + :magmatempest: + target Jad → :corruptblast: → :SBSLunars: + :Veng: + :gconc: → :wm: → 3t :deto: + :bloodbarrage: + :gconc: → 4-hit :asphyx: → :gstaff: :eofspec:

⬥ :surge: southwest [5]
    • Target Kih + :gconc: → :dbreath:

⬥ :bd: east [6]
`,
"12": `
⬥ Start by :vulnbomb: south geyser + TC Mej + :bloodbarrage: + :wm: → :gconc:

⬥ Walk north and target Kih [1]
    • :bloodbarrage: + :comb: → :magmatempest: between Kih and Xil
    • target Xil + :vulnbomb: + :corruptblast: → :bloodbarrage: + :gchaincaroming: → :gconc: → wait 1t → :gstaff: :eofspec:

⬥ Move into south corner [2]
    • TC Kih + :dbreath: → :bloodbarrage: + :sonic:


⬥ Run against west wall [3]
    • :magmatempest: between Xil and Mej → target Xil + :vulnbomb: → :gchaincaroming: → :bloodbarrage: + :omni: → target Mej + :dbreath: → :bloodbarrage: + :sonic:
​
⬥ Run north [4]
    • Target Mej + :vulnbomb: + :corruptblast: → :gchain: → 3t :bloodbarrage: + :deto: + :dbreath:

⬥ :bd: northwest [5]
    • TC Ket-Zek + :vulnbomb: + :wm: → 4-hit :asphyx:

⬥ :surge: back to southeast corner to prepare for wave 13 [6]
`,
"13": `
⬥ Start by TC Ket-Zek + :vulnbomb: + :bloodbarrage: + :gstaff: :eofspec: → :gconc: → :tuskas:

⬥ Run north [1]
    • Finish Ket-Zek with :dbreath: → :gconc:
    • Target Xil + :vulnbomb: → :gchaincaroming: → :gconc: → wait 1t → :wm: → :comb:

⬥ Immediately :bd: back south to walk :comb: [2]
    • Reach south of lure rock → target north Mej + :bloodbarrage: + :sonic: → :tuskas: (→ basics if not dead)

⬥ Walk north [3]
    • Target west Mej → :gconc:
    • :vulnbomb: + :magmatempest: in middle of Xil + 3 Mej → target Xil + :gchaincaroming: → :gconc: → wait 1t → :omni:
    • Target Ket-Zek → :dbreath:
​
⬥ Move north [4]
    • :vulnbomb: other Mej → :corruptblast: → :gchain: → 3t :bloodbarrage: + :deto: → :dbreath:

⬥ :bd: northwest [5]
    • :vulnbomb: Ket-Zek → :bloodbarrage: + :wm: → :asphyx:
`,
"14": `
⬥ Start by pre :magmatempest: + :vulnbomb: Hur spawn → target Hur + 4-hit :asphyx: → :gconc: → :comb:

⬥ Immediately :surge: to igneous Xil [1]
    • :vulnbomb: it → :bloodbarrage: + :sonic: → :gconc: → :omni: → :gchain: (should tag Igneous Hur) → :dbreath: → :gconc: (→ :Tuskas: basics on Hur if Hur not dead)

⬥ :surge: + :bd: to igneous Mej [2]
    • :vulnbomb: + :corruptblast: → walk around it → :bloodbarrage: + :tsunami: → :soa: :spec: → :gconc: → :freedom: + :bloodbarrage: → step east → :dbreath: + :gconc:

⬥ :surge: north + :bd: infront of Zuk throne [3]
    • :vulnbomb: + target Zuk → :smokecloud: + :meta: → Extra action button → :gconc: → (:limitless: anywhere if needed) :wm: → :smoketendrils: → basics to phase → :Shard: Zuk after hitting 900k HP
`,
"15": `
⬥ Build to 100% whenever possible and :SBSLunars: + :disrupt: + :cade: before second hit

⬥ Build adren again and dismiss :Mammoth: + summon :kalgpouch:

⬥ Pick up food → :res: after :cade: if needed

⬥ Walk into corner of middle north east lure rock [1]
`,
"16": `
⬥ Start by pre :magmatempest: + :vulnbomb: + TC Jad → :wm: → :omni: → :ingen: + :sgb: :spec: → :gconc: → :dbreath: → :bloodbarrage: + :gstaff: :eofspec: → :gconc:

⬥ Step out north [1]
    • TC Jad + :vulnbomb: + :corruptblast: → :bloodbarrage: + :magmatempest: between Jads → :gconc: → :dbreath: → 3t :bloodbarrage: + :deto: + :sonic: south Jad
    • :gconc: → :corruptblast: north Jad → :magmatempest: between 2 Jads → :gchain: south Jad → :omni: → :dbreath: → :bloodbarrage: + :sonic: (→ basics to finish if needed)
    • :Shard: and use defensive basic to get 100% adren if needed

⬥ Move to west area where TzekHaar-Aken will spawn [2]
    • Make sure :grim: is equipped and turned on at this point
`,
"17": `
⬥ :kalgpouch: spec + :vulnbomb: + TC + :smokecloud: → :sunshinepf: + :adrenrenewal: → :gconc: → :dbreath: → :tsunami:

⬥ Move 3 north [1]
    • :soa: :spec: → :gconc: → (:limitless: + ):wm:

⬥ Move 3 south [2]
    • :sonic: → :smoketendrils: → :omni: → :armadylbattlestaff: :eofspec: → :asphyx: → :armadylbattlestaff: :eofspec: → :dbreath: → kill boss when :soa: :spec: has 1s left

⬥ :bd: to Zuk [3]
`,
"18": `
⬥ Start by equipping :elitetectmask: + :Shard: → :smokecloud: + :vulnbomb: → built to 100% → :nat: → build to 100% again → :SBSLunars: + :Veng: + :comb:

⬥ :bd: to middle [1]
    • :magmatempest: → :sunshinepf: → :bloodbarrage: + :gconc: → :dbreath: → :tsunami: → (basic →) :soa: :spec: → :gconc: → :wm: → :omni:

⬥ At this point in the rotation, which should be after 6 auto attacks from the start, :surge: through Zuk → :surge: back to :sunshine: [2 & 3]
    • :gconc: → :smoketendrils: → :asphyx: → (:SBSLunars: :disrupt: bomb) :armadylbattlestaff: :eofspec: → :armadylbattlestaff: :eofspec: → :wm: → :tuskas: → :Shard: → :freedom:

⬥ Rotate and kill igneous minions [green arrows starting east]
    • Igneous Hur: TC + :deep: → :gconc: → :dbreath: → basic on Zuk for adren if needed → :bd: to igneous Xil
    • Igneous Xil: TC + :wm: → :bloodbarrage: + :gconc: → :dbreath: → :sonic: → :smokecloud: Zuk → :Shard: → :bd: to igneous Mej
​    • Igneous Mej: TC + :bloodbarrage: → :corruptblast: → :gconc: → :dbreath: → :bloodbarrage: + :sonic:

⬥ TC Zuk + :vulnbomb: + :SBSLunars: :Veng: + :sunshinepf: + :adrenrenewal: → :magmatempest: + Extra Action button → :gconc: → :dbreath: → :tsunami: → :soa: :spec: → :gconc: → :wm: → :Shatter: → :omni: → :smoketendrils: → :armadylbattlestaff: :eofspec: → :asphyx: → :surge: through Zuk after 8 autos from start → :surge: back on slam → :armadylbattlestaff: :eofspec: → :gconc: → :wm:

After conduit:
⬥ Rotate in a rectangle while doing the following rotation to kill the first conduit [1 → 2 → 3 → 4]
    • :vulnbomb: + :sgb: :spec: → :sonic: → :gconc: → :gstaff: :eofspec: → :dbreath: → :bloodbarrage: → :tuskas: → basics to kill

⬥ From here onwards alternate between [5] and [6] while staying in :sunshine:
    • :vulnbomb: + :corruptblast: → :res: → :sunshinepf: (start moving between edges of :sunshine: to dodge blasts) → basics → :tsunami: → :soa: :spec:
    • :vulnbomb: + :SBSLunars: :disrupt: → :gconc: → :dbreath: → :wm: → :asphyx:
    • :vulnbomb: → :vitality: + :smoketendrils:
    • :omni: → :armadylbattlestaff: :eofspec: → finish kill
`,




}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _emojiLUT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emojiLUT */ "./emojiLUT.js");
/* harmony import */ var _wavetexts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wavetexts */ "./wavetexts.js");
/* harmony import */ var _jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jquery */ "./jquery.js");
/* harmony import */ var _jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jquery__WEBPACK_IMPORTED_MODULE_3__);
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api




//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
let imgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    "wave": __webpack_require__(/*! ./images/wave_interface.data.png */ "./images/wave_interface.data.png"),
});
function debug() {
    let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    let pos = {};
    var poslist = img.findSubimage(imgs["wave"]);
    if (poslist.length != 0) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.capture(poslist[0].x - 10, poslist[0].y - 24, 90, 24);
        ctx.drawImage(img.toImage(), 0, 0);
        pos = {
            x: poslist[0].x - 10,
            y: poslist[0].y - 24,
            w: 90,
            h: 24,
            xos: 59,
            yos: 12,
        };
        let img2 = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHold(poslist[0].x - 10, poslist[0].y - 24, 90, 24);
        for (let xos = 0; xos < img2.width; xos++) {
            for (let yos = 0; yos < img2.height; yos++) {
                var str = alt1.bindReadColorString(img2.handle, "chat", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 255, 255), xos, yos);
                // xos: 59 yos: 12 to get the number (only)
                if (str.match(/Wave/)) {
                    console.log("str: " + str + " xos: " + xos + " yos: " + yos);
                }
                if (str.match(/\d+/)) {
                    console.log("str: " + str + " xos: " + xos + " yos: " + yos);
                }
            }
        }
    }
}
function find() {
    let img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    var poslist = img.findSubimage(imgs["wave"]);
    if (poslist.length == 0)
        return null;
    let pos = {
        x: poslist[0].x - 10,
        y: poslist[0].y - 24,
        w: 90,
        h: 24,
        xos: 24,
        yos: 12,
    };
    console.log(pos);
    return pos;
}
function read(pos) {
    let img2 = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHold(pos.x, pos.y, pos.w, pos.h);
    var str = alt1.bindReadColorString(img2.handle, "chat", _alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(255, 255, 255), pos.xos, pos.yos);
    var match = str.match(/(\d+)/);
    if (match) {
        console.log(+match[1]);
        return +match[1];
    }
    return null;
}
let wave = 1;
let img_el = document.getElementById("bg");
function slideShow() {
    img_el.src = "./images/wave" + wave + ".png";
    const discordEmojiRegex = new RegExp("<:([^:]{2,}):([0-9]+)>", 'i');
    let txt = _wavetexts__WEBPACK_IMPORTED_MODULE_2__.wave_text[wave.toString()];
    // Add tabs and remove colons
    txt = txt.replace(/•/g, "&emsp;•");
    txt = txt.replace(/:/g, "");
    for (const emoji of _emojiLUT__WEBPACK_IMPORTED_MODULE_1__.emojiLUT) {
        if (txt.toLowerCase().includes(emoji[0])) {
            txt = txt.replace(new RegExp(emoji[0], "igm"), '<img class="disc-emoji" src="https://cdn.discordapp.com/emojis/' + discordEmojiRegex.exec(emoji[1])[2] + '.png?v=1">');
        }
    }
    document.getElementById("rotation").innerHTML = txt.replace(/\n/g, "<br>");
    var winhei = window.innerHeight;
    var nonhei = _jquery__WEBPACK_IMPORTED_MODULE_3__('#bg').height();
    var newhei = winhei - nonhei - 20;
    _jquery__WEBPACK_IMPORTED_MODULE_3__("#rotation").height(newhei);
}
img_el.onclick = function () {
    wave++;
    if (wave > 18)
        wave = 18;
    slideShow();
};
img_el.oncontextmenu = function (e) {
    e.preventDefault();
    wave--;
    if (wave < 1)
        wave = 1;
    slideShow();
};
// check if we are running inside alt1 by checking if the alt1 global exists
if (window.alt1) {
    alt1.identifyAppUrl("./appconfig.json");
    let findInterface = setInterval(function () {
        let pos = find();
        let old_wave = -1;
        let timer; // Timer for stand-by
        if (pos) {
            clearInterval(findInterface);
            setInterval(function () {
                let new_wave = read(pos);
                if (new_wave != null && old_wave != new_wave) {
                    wave = new_wave;
                    old_wave = new_wave;
                    slideShow();
                    // Clear stand-by timer if it was active
                    clearTimeout(timer);
                }
                if (new_wave == null && old_wave != -1) {
                    // Reset wave number if no wave is detected, also prevents starting mutliple timers
                    old_wave = -1;
                    // No wave found, start stand-by timer
                    timer = setTimeout(function () {
                        img_el.src = "./images/Zuk_NM_Standby.png";
                    }, 5000);
                }
            }, 600);
        }
    }, 1000);
    // setInterval(debug, 1000);
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});