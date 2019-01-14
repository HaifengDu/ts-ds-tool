import { Graph } from "../../../graph/Graph";
import { GraphEdge } from "../../../graph/GraphEdge";
import { GraphVertex } from "../../../graph/GraphVertex";
export declare function getEulerCircuit<T>(graph: Graph<T>, startVertex?: GraphVertex<T>): GraphEdge<T>[];
