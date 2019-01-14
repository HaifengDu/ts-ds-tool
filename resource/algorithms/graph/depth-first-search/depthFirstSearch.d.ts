import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";
export declare function depthFirstSearch<T>(graph: Graph<T>, startVertex?: GraphVertex<T>): T[];
export declare function depthFirstSearchReverse<T>(graph: Graph<T>, startVertex?: GraphVertex<T>, existHashMap?: HashMap<boolean>): T[];
