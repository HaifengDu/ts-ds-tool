import { Graph } from "../../../graph/Graph";
import { GraphEdge } from "../../../graph/GraphEdge";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function kruskal<T>(graph: Graph<T>): {
    visitedVertices: GraphVertex<T>[];
    visitedEdges: GraphEdge<T>[];
};
