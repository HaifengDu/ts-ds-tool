import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function dijkstra<T>(graph: Graph<T>, startVertex?: GraphVertex<T>): {
    distance?: undefined;
    prev?: undefined;
} | {
    distance: {};
    prev: {};
};
