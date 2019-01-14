import { GraphVertex } from "./GraphVertex";
export declare class GraphEdge<T> {
    private startVertex;
    private endVertex;
    private weight;
    readonly Weight: number;
    readonly EndVertex: GraphVertex<T>;
    readonly StartVertex: GraphVertex<T>;
    constructor(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>, weight?: number);
}
