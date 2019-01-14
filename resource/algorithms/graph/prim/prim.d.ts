import { GraphEdge } from "../../..";
import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function prim<T>(graph: Graph<T>): {
    visitedVertices: GraphVertex<T>[];
    visitedEdges: GraphEdge<T>[];
};
export declare function heap_prim<T>(graph: Graph<T>): {
    visitedVertices: GraphVertex<T>[];
    visitedEdges: GraphEdge<T>[];
};
