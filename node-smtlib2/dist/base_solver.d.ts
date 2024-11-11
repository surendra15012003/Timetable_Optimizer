import * as smt from './smtlib';
export default class BaseSmtSolver {
    private _statements;
    withAssignments: boolean;
    timeLimit: number;
    constructor(logic: string);
    enableAssignments(): void;
    dump(): void;
    forEachStatement(callback: (cb: smt.SNode, idx: number) => void): void;
    checkSat(): Promise<[boolean, Record<string, number | boolean> | undefined]>;
    add(stmt: smt.SNode): void;
    assert(expr: smt.SNode): void;
    setOption(opt: string, value?: smt.SNode): void;
    declareFun(name: string, args: smt.SNode[], type: smt.SNode): void;
}
