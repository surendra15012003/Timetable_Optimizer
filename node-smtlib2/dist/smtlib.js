"use strict";
// -*- mode: typescript; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// Copyright 2017-2020 Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See LICENSE for details
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSat = exports.Sum = exports.Minimize = exports.Maximize = exports.StringLiteral = exports.SetType = exports.Named = exports.GT = exports.LT = exports.GEq = exports.LEq = exports.NEq = exports.PbLe = exports.PbGe = exports.PbEq = exports.Eq = exports.Not = exports.If = exports.Or = exports.BVAnd = exports.And = exports.Implies = exports.Predicate = exports.AssertSoft = exports.Assert = exports.DefineFun = exports.DeclareFun = exports.DeclareDatatype = exports.DeclareSort = exports.SetOption = exports.SetLogic = exports.SExpr = void 0;
function stringEscape(str) {
    return '"' + str.replace(/(["\\])/g, '\\$1').replace(/\n/g, '\\n') + '"';
    // the following comment fixes broken syntax highlighting in GtkSourceView
    //]/
}
class SExpr {
    constructor(...children) {
        this._children = children;
    }
    toString() {
        return '(' + this._children.join(' ') + ')';
    }
}
exports.SExpr = SExpr;
function SetLogic(logic) {
    return new SExpr('set-logic', logic);
}
exports.SetLogic = SetLogic;
function SetOption(opt, value = 'true') {
    return new SExpr('set-option', ':' + opt, value);
}
exports.SetOption = SetOption;
function DeclareDatatype(name, constructors) {
    const sortdec = new SExpr(name, '0');
    const datatypedec = new SExpr(...constructors.map((c) => Array.isArray(c) ? new SExpr(...c) : new SExpr(c)));
    return new SExpr('declare-datatypes', new SExpr(sortdec), new SExpr(datatypedec));
}
exports.DeclareDatatype = DeclareDatatype;
function DeclareSort(name) {
    return new SExpr('declare-sort', name, '0');
}
exports.DeclareSort = DeclareSort;
function DeclareFun(name, args, ret) {
    return new SExpr('declare-fun', name, new SExpr(...args), ret);
}
exports.DeclareFun = DeclareFun;
function DefineFun(name, args, ret, def) {
    return new SExpr('define-fun', name, new SExpr(...args), ret, def);
}
exports.DefineFun = DefineFun;
function Assert(assert) {
    return new SExpr('assert', assert);
}
exports.Assert = Assert;
function AssertSoft(assert, weight, id) {
    return new SExpr('assert-soft', assert, ":weight", weight.toString(), ":id", id);
}
exports.AssertSoft = AssertSoft;
function Predicate(pred, ...args) {
    if (args.length === 0)
        return pred;
    else
        return new SExpr(pred, ...args);
}
exports.Predicate = Predicate;
function Implies(lhs, rhs) {
    return new SExpr('=>', lhs, rhs);
}
exports.Implies = Implies;
function If(conditional, iftrue, iffalse) {
    return new SExpr('ite', conditional, iftrue, iffalse);
}
exports.If = If;
function And(...args) {
    if (args.length === 1)
        return args[0];
    return new SExpr('and', ...args);
}
exports.And = And;
function BVAnd(...args) {
    if (args.length === 1)
        return args[0];
    return new SExpr('bvand', ...args);
}
exports.BVAnd = BVAnd;
function Or(...args) {
    if (args.length === 1)
        return args[0];
    return new SExpr('or', ...args);
}
exports.Or = Or;
function Not(expr) {
    return new SExpr('not', expr);
}
exports.Not = Not;
function Eq(lhs, rhs) {
    return new SExpr('=', lhs, rhs);
}
exports.Eq = Eq;
//  ((_ pbeq N 1 1) SL_somename SL_somename2) ==> select N out of equally weighted SL_somename and SL_somename2
function PbEq(clauses, weights, N) {
    const strWeights = weights.map(x => x.toString());
    return new SExpr(new SExpr("_", "pbeq", N.toString(), ...strWeights), ...clauses);
}
exports.PbEq = PbEq;
//  ((_ pbge N 1 1) SL_somename SL_somename2) ==> select at least N out of equally weighted SL_somename and SL_somename2
function PbGe(clauses, weights, N) {
    const strWeights = weights.map(x => x.toString());
    return new SExpr(new SExpr("_", "pbge", N.toString(), ...strWeights), ...clauses);
}
exports.PbGe = PbGe;
//  ((_ pble N 1 1) SL_somename SL_somename2) ==> select at most N out of equally weighted SL_somename and SL_somename2
function PbLe(clauses, weights, N) {
    const strWeights = weights.map(x => x.toString());
    return new SExpr(new SExpr("_", "pble", N.toString(), ...strWeights), ...clauses);
}
exports.PbLe = PbLe;
function NEq(lhs, rhs) {
    return Not(Eq(lhs, rhs));
}
exports.NEq = NEq;
function LEq(lhs, rhs) {
    return new SExpr('<=', lhs, rhs);
}
exports.LEq = LEq;
function GEq(lhs, rhs) {
    return new SExpr('>=', lhs, rhs);
}
exports.GEq = GEq;
function LT(lhs, rhs) {
    return new SExpr('<', lhs, rhs);
}
exports.LT = LT;
function GT(lhs, rhs) {
    return new SExpr('>', lhs, rhs);
}
exports.GT = GT;
function SetType(elementType) {
    return new SExpr('Set', elementType);
}
exports.SetType = SetType;
function StringLiteral(str) {
    return stringEscape(str);
}
exports.StringLiteral = StringLiteral;
function Named(name, expr) {
    return new SExpr('!', expr, ':named', name);
}
exports.Named = Named;
function Maximize(term) {
    return new SExpr('maximize', term);
}
exports.Maximize = Maximize;
function Minimize(term) {
    return new SExpr('minimize', term);
}
exports.Minimize = Minimize;
function Sum(...args) {
    if (args.length === 1)
        return args[0];
    return new SExpr('+', ...args);
}
exports.Sum = Sum;
function CheckSat() {
    return new SExpr('check-sat');
}
exports.CheckSat = CheckSat;
//# sourceMappingURL=smtlib.js.map