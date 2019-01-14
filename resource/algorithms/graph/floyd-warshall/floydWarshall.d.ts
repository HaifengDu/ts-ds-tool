import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function floydWarshall<T>(graph: Graph<T>, startVertex?: GraphVertex<T>): {
    distance?: undefined;
} | {
    distance: {
        [index: string]: number;
    };
};
