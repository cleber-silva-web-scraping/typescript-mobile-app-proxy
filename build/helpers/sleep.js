"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var sleep = function (ms) { return new Promise(function (r) {
    return setTimeout(r, ms * 1000);
}); };
exports.sleep = sleep;
