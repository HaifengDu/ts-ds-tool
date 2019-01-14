import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function bellmanFord<T>(graph: Graph<T>, startVertex?: GraphVertex<T>): {
    distance?: undefined;
    prev?: undefined;
} | {
    distance: {};
    prev: {};
};
export declare function getPath(vertextKey: string, prevDict: {
    [indeX: string]: string;
}): string[];
