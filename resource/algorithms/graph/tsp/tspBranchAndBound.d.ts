import { Graph } from "../../../graph/Graph";
export declare function tspBranchAndBound<T>(graph: Graph<T>): {
    cost: number;
    path: any;
};
