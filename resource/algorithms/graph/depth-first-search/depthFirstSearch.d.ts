import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";
declare type enterVertex<T> = (vertex: GraphVertex<T>) => void;
export declare function depthFirstSearch<T>(graph: Graph<T>, startVertex?: GraphVertex<T>, beforeEnter?: enterVertex<T>, afterEnter?: enterVertex<T>): T[];
export declare function depthFirstSearchReverse<T>(graph: Graph<T>, startVertex?: GraphVertex<T>, existHashMap?: HashMap<boolean>): T[];
export {};
