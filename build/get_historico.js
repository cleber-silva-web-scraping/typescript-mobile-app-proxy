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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistorico = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var avg_consumo = function (historico) {
    var grafico = historico['Graficos'].filter(function (grafico) { return grafico['TipoGrafico'] === 'HistoricoConsumo'; });
    var total = grafico[0]['Dados'].reduce(function (acc, dado) {
        return acc + parseFloat(dado['MediaConsumo']);
    }, 0.0);
    if (grafico[0]['Dados'].length > 0)
        return (total / grafico[0]['Dados'].length).toFixed(2);
    return 0.0;
};
var getHistorico = function (dados) { return __awaiter(void 0, void 0, void 0, function () {
    var chave, histBody, token, headers, url, response, retorno, media;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chave = dados.chave, histBody = dados.histBody, token = dados.token;
                headers = {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E269 Safari/602.1',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer ".concat(token),
                    'Cookie': "rxvt=".concat(chave),
                };
                url = 'https://servicosonline.cpfl.com.br/agencia-webapi/api/historico-consumo/busca-graficos';
                return [4 /*yield*/, (0, node_fetch_1.default)(url, { method: 'POST', body: JSON.stringify(histBody), headers: headers })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                retorno = _a.sent();
                media = avg_consumo(retorno);
                return [2 /*return*/, media];
        }
    });
}); };
exports.getHistorico = getHistorico;
