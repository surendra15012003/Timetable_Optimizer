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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const smt = __importStar(require("./smtlib"));
class BaseSmtSolver {
    constructor(logic) {
        this._statements = [
            smt.SetLogic('QF_ALL_SUPPORTED')
        ];
        this.withAssignments = false;
        this.timeLimit = 180000;
    }
    enableAssignments() {
        this.withAssignments = true;
        this.add(smt.SetOption('produce-assignments'));
        this.add(smt.SetOption('produce-models'));
    }
    dump() {
        for (const stmt of this._statements)
            console.log(stmt.toString());
    }
    forEachStatement(callback) {
        this._statements.forEach(callback);
    }
    async checkSat() {
        throw new Error('checkSat not implemented for this solver');
    }
    add(stmt) {
        this._statements.push(stmt);
    }
    assert(expr) {
        this.add(smt.Assert(expr));
    }
    setOption(opt, value = 'true') {
        this.add(smt.SetOption(opt, value));
    }
    declareFun(name, args, type) {
        this.add(smt.DeclareFun(name, args, type));
    }
}
exports.default = BaseSmtSolver;
//# sourceMappingURL=base_solver.js.map