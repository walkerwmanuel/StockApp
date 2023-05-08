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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var logic_1 = require("./src/logic/logic");
/*
    0) write a function to go through each day for the last 3 years
    3) Process for 3 years how it would do based on SMA buy/sell (golden cross)
    4) log each time it buys
    5) log each time it sells and the difference over starting amount
*/
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var startingMoney, bought, stock, netGain, today;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startingMoney = 10000;
                    bought = false;
                    stock = 'TSLA';
                    netGain = 0;
                    today = new Date().toISOString();
                    // await findSmaOfDay(new Date().toISOString(), 'SPY', 20, (err: any) => {}, (r: any) => {})
                    // await findSmaOfDay(new Date().toISOString(), 'SPY', 50, (err: any) => {}, (r: any) => {})
                    return [4 /*yield*/, (0, logic_1.goThroughDays)(today, 300, function (currDay) { return __awaiter(_this, void 0, void 0, function () {
                            var sma20Value, sma50Value;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, logic_1.findSmaOfDay)(currDay, stock, 20, function (err) { }, function (r) { })];
                                    case 1:
                                        sma20Value = _a.sent();
                                        return [4 /*yield*/, (0, logic_1.findSmaOfDay)(currDay, stock, 50, function (err) { }, function (r) { })];
                                    case 2:
                                        sma50Value = _a.sent();
                                        if (!bought) { // check if sma20 > sma50
                                            // console.log("Date:", currDay, "CHECKING TO BUY", sma20Value.value, sma50Value.value)
                                            if (sma20Value.value > sma50Value.value) {
                                                bought = true;
                                                console.log("BOUGHT AT:", sma20Value.closingPrice);
                                                netGain -= sma20Value.closingPrice;
                                            }
                                        }
                                        else { // check if sma20 < sma50
                                            if (sma20Value.value < sma20Value.closingPrice) {
                                                bought = false;
                                                console.log("SOLD AT:", sma20Value.closingPrice);
                                                netGain += sma20Value.closingPrice;
                                            }
                                        }
                                        console.log("Date:", currDay, "SMA-20 value", sma20Value.value, "SMA-50 value", sma50Value.value, "CLOSING PRICE", sma20Value.closingPrice, "NET GAIN", netGain);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    // await findSmaOfDay(new Date().toISOString(), 'SPY', 20, (err: any) => {}, (r: any) => {})
                    // await findSmaOfDay(new Date().toISOString(), 'SPY', 50, (err: any) => {}, (r: any) => {})
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
