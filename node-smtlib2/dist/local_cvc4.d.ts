import BaseSolver from './base_solver';
export default class LocalCVC4Solver extends BaseSolver {
    constructor(logic: string);
    checkSat(): Promise<[boolean, Record<string, number | boolean> | undefined]>;
}
