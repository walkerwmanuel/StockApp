"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_1 = require("./src/logic/logic");
function main() {
    (0, logic_1.findSmaOfDay)(new Date().toISOString(), 'AAPL', 3, function (err) { }, function (r) { });
}
main();
