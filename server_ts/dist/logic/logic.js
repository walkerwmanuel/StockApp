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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSmaOfDay = void 0;
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const date_fns_1 = require("date-fns");
const dateFormat = "yyyy-MM-dd";
const findSmaOfDay = (day, ticker, n, onErr, onSuccess) => __awaiter(void 0, void 0, void 0, function* () {
    const startingDate = (0, date_fns_1.format)(new Date(day), dateFormat);
    const targetDate = (0, date_fns_1.format)((0, date_fns_1.sub)(new Date(startingDate), { days: n * 3 }), dateFormat);
    try {
        console.log("STARTING DATE:", targetDate);
        console.log("ENDING DATE:", startingDate);
        const result = yield yahoo_finance2_1.default.historical(ticker, { period1: targetDate, period2: startingDate });
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
});
exports.findSmaOfDay = findSmaOfDay;
//# sourceMappingURL=logic.js.map