"use strict";
//import express from 'express'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_historico_1 = require("./get_historico");
var get_participacao_1 = require("./get_participacao");
var get_quitada_1 = require("./get_quitada");
var get_token_1 = require("./get_token");
var pgp_1 = require("./pgp");
var express_1 = __importDefault(require("express"));
var PORT = Number(process.env.PORT) || 3088;
var feitos = 0;
var refeitos = 0;
var runner = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var crypted, dados, quitada, participacao, participacao, media, quitada, participacao, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                feitos++;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                console.log('Processando: ', payload);
                return [4 /*yield*/, (0, pgp_1.encript)(payload.chave)];
            case 2:
                crypted = _a.sent();
                return [4 /*yield*/, (0, get_token_1.getToken)({ chave: payload.chave, crypted: crypted })];
            case 3:
                dados = _a.sent();
                if (!(payload.status === 1)) return [3 /*break*/, 6];
                refeitos++;
                return [4 /*yield*/, (0, get_quitada_1.getQuitada)(__assign(__assign({}, dados), { partBody: payload.body }))];
            case 4:
                quitada = _a.sent();
                return [4 /*yield*/, (0, get_participacao_1.getParticipacao)(__assign(__assign({}, dados), quitada))];
            case 5:
                participacao = _a.sent();
                return [2 /*return*/, (__assign(__assign({}, payload), participacao))];
            case 6:
                if (!(payload.status === 2)) return [3 /*break*/, 8];
                refeitos++;
                console.log('Only participacao');
                return [4 /*yield*/, (0, get_participacao_1.getParticipacao)(__assign(__assign({}, dados), { partBody: payload.body }))];
            case 7:
                participacao = _a.sent();
                return [2 /*return*/, (__assign(__assign({}, payload), participacao))];
            case 8:
                if (!(!payload.status || payload.status === 0)) return [3 /*break*/, 12];
                if (payload.status)
                    refeitos++;
                return [4 /*yield*/, (0, get_historico_1.getHistorico)(dados)];
            case 9:
                media = _a.sent();
                return [4 /*yield*/, (0, get_quitada_1.getQuitada)(dados)];
            case 10:
                quitada = _a.sent();
                return [4 /*yield*/, (0, get_participacao_1.getParticipacao)(__assign(__assign({}, dados), quitada))];
            case 11:
                participacao = _a.sent();
                return [2 /*return*/, (__assign(__assign(__assign({}, payload), { media: media }), participacao))];
            case 12: return [3 /*break*/, 14];
            case 13:
                err_1 = _a.sent();
                return [2 /*return*/, (__assign(__assign({}, payload), { status: 0 }))];
            case 14: return [2 /*return*/];
        }
    });
}); };
var app = (0, express_1.default)();
app.get('/', function (_, res) {
    res.json({ status: 'ok', feitos: feitos, refeitos: refeitos, agent: "".concat(process.env.AGENT_NAME) });
});
app.get('/api/:instalacao/:documento', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, calculado;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = {
                    times: 0,
                    from: "".concat(process.env.AGENT_NAME || 'AGENT_NODE_001'),
                    chave: "".concat(req.params.instalacao, "|").concat(req.params.documento),
                };
                return [4 /*yield*/, runner(payload)];
            case 1:
                calculado = _a.sent();
                res.json(calculado);
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Express server is listening on ".concat(PORT));
});
