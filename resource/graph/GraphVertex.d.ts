import LinkList from "../linklist/LinkList";
import { GraphEdge } from "./GraphEdge";
export declare class GraphVertex<T = string> {
    private node;
    private key;
    private edges;
    private indegree;
    InDegree: number;
    readonly Key: string;
    readonly Node: T;
    constructor(node: T, property?: keyof T);
    addUndirectedEdge(endVertex: GraphVertex<T>, weight?: number): boolean;
    addEdge(endVertex: GraphVertex<T>, weight?: number): boolean;
    getEdges(): LinkList<GraphEdge<T>>;
    getEdge(endKey: string): GraphEdge<T>;
    deleteEdgeByKey(endKey: string, directed?: boolean): boolean;
    deleteEdge(edge: GraphEdge<T>): boolean;
    hasEdge(): boolean;
    getInDegree(): number;
    getOutDegree(): number;
    getDegree(): number;
    getNeighbors(): GraphVertex<T>[];
}
