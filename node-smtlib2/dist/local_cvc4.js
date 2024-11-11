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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = __importStar(require("child_process"));
const byline_1 = __importDefault(require("byline"));
const smt = __importStar(require("./smtlib"));
const base_solver_1 = __importDefault(require("./base_solver"));
class LocalCVC4Solver extends base_solver_1.default {
    constructor(logic) {
        super(logic);
        this.setOption('strings-exp');
        this.setOption('strings-guess-model');
    }
    checkSat() {
        return new Promise((callback, errback) => {
            this.add(smt.CheckSat());
            const args = ['--lang', 'smt2.6', '--tlimit=' + this.timeLimit, '--cpu-time'];
            if (this.withAssignments)
                args.push('--dump-models');
            const now = new Date;
            const child = child_process.spawn('cvc4', args);
            child.stdin.setDefaultEncoding('utf8');
            this.forEachStatement((stmt) => child.stdin.write(stmt.toString()));
            child.stdin.end();
            child.stderr.setEncoding('utf8');
            const stderr = byline_1.default(child.stderr);
            stderr.on('data', (data) => {
                console.error('SMT-ERR:', data);
            });
            child.stdout.setEncoding('utf8');
            const stdout = byline_1.default(child.stdout);
            let sat = undefined;
            const assignment = {};
            let cidx = 0;
            const constants = {};
            stdout.on('data', (line) => {
                //console.log('SMT:', line);
                if (line === 'sat') {
                    sat = true;
                    return;
                }
                if (line === 'unsat') {
                    sat = false;
                    return;
                }
                if (line === 'unknown') {
                    sat = true;
                    console.error('SMT TIMED OUT');
                    this.dump();
                    return;
                }
                if (line.startsWith('(error')) {
                    errback(new Error('SMT error: ' + line));
                    return;
                }
                const CONSTANT_REGEX = /; rep: @uc_([A-Za-z0-9_]+)$/;
                let match = CONSTANT_REGEX.exec(line);
                if (match !== null) {
                    constants[match[1]] = cidx++;
                    return;
                }
                const ASSIGN_CONST_REGEX = /\(define-fun ([A-Za-z0-9_.]+) \(\) ([A-Za-z0-9_]+) @uc_([A-Za-z0-9_]+)\)$/;
                match = ASSIGN_CONST_REGEX.exec(line);
                if (match !== null) {
                    assignment[match[1]] = constants[match[3]];
                    return;
                }
                const ASSIGN_BOOL_REGEX = /\(define-fun ([A-Za-z0-9_.]+) \(\) Bool (true|false)\)$/;
                match = ASSIGN_BOOL_REGEX.exec(line);
                if (match !== null)
                    assignment[match[1]] = (match[2] === 'true');
                // ignore everything else
            });
            stdout.on('end', () => {
                console.log('SMT elapsed time: ' + ((new Date).getTime() - now.getTime()));
                if (sat)
                    callback([true, assignment]);
                else
                    callback([false, undefined]);
            });
            child.stdout.on('error', errback);
        });
    }
}
exports.default = LocalCVC4Solver;
//# sourceMappingURL=local_cvc4.js.map