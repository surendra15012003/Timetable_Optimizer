"use strict";
// -*- mode: typescript; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// Copyright 2017-2020 Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See LICENSE for details
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalCVC4Solver = exports.BaseSolver = void 0;
__exportStar(require("./smtlib"), exports);
var base_solver_1 = require("./base_solver");
Object.defineProperty(exports, "BaseSolver", { enumerable: true, get: function () { return __importDefault(base_solver_1).default; } });
var local_cvc4_1 = require("./local_cvc4");
Object.defineProperty(exports, "LocalCVC4Solver", { enumerable: true, get: function () { return __importDefault(local_cvc4_1).default; } });
//# sourceMappingURL=index.js.map