import { LinkList } from "../linklist/LinkList";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphVertex";
export declare class Graph<T = string> {
    private directed;
    private vertices;
    private edges;
    constructor(directed?: boolean);
    readonly Directed: boolean;
    addVertex(vertex: GraphVertex<T>): this;
    addEdgeByKey(start: string, end: string, weight?: number): this;
    addEdge(start: GraphVertex<T>, end: GraphVertex<T>, weight?: number): this;
    deleteEdge(start: GraphVertex<T>, end: string): boolean;
    deleteEdgeByKey(start: string, end: string): boolean;
    getVertexs(): GraphVertex<T>[];
    getKeys(): string[];
    getEdges(): GraphEdge<T>[];
    findVertex(key: string): GraphVertex<T>;
    findEdge(key: string): LinkList<GraphEdge<T>>;
    deleteVertex(key: string): boolean;
    toAdjacencyMatrix(): {
        matrix: number[][];
        keyIndexs: {
            [index: string]: number;
        };
    };
    clone(): Graph<T>;
}
