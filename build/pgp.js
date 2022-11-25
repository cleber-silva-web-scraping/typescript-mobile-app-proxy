"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encript = void 0;
var openpgp = require('openpgp');
var b = "\r\n-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: BCPG C# v5.1.3.0\r\n\r\nmIsEWT628gEEAJPGzsdUlxSKYPs4o2a1xWViHymgNgE+7vd+HmH1XWQewpu3I4sy\r\n3XJomBe441SEWfrbF6z/4ICL3JXgUNH8Ls7O1QM3Pqx6sImqRIQQuIKiun7R6x1n\r\nMwrIU2cFtUu7UEptpWICgspopNZEZYR8u5Tp1OIatjPG9IBTHMLmCoiPAAUTtBth\r\nZ2VuY2lhLXZpcnR1YWwtY3BmbC13ZWJhcGmInAQQAQIABgUCWT7hIgAKCRD4KPZo\r\noijkWdr8A/48trmfxuaLsJ+DLOJlrxrupsvwvVVqBo7eTcSthm5w62qtOapYQ9WF\r\nixjh6qrhwlFIudEW4BKU8K2PuHY82FMOzGQsgMl57l+sz+kQFKD6v+o0dGK7oZ61\r\nqP+PnmKTTTG4SUgLpqkkebGmF6pcO3DPV9Rm2O9JiQeOrtm36KT7pg==\r\n=22pB\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n\r\n\r\n";
var f = function (a) {
    var b = JSON.stringify(a);
    var c = b.substr(1, b.length - 2)
        .replace(new RegExp('\\\\r', 'g'), '\r')
        .replace(new RegExp('\\\\n', 'g'), '\n');
    return btoa(c);
};
function encript(a) {
    return __awaiter(this, void 0, void 0, function () {
        var c;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    c = { data: a, publicKeys: openpgp.key.readArmored(b).keys };
                    return [4 /*yield*/, openpgp.encrypt(c).then(function (a) {
                            return f(a.data);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.encript = encript;
