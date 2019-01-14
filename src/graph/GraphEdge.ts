import { GraphVertex } from "./GraphVertex";

export class GraphEdge<T>{

    public get Weight() {
        return this.weight;
    }
    public get EndVertex(): GraphVertex<T> {
        return this.endVertex;
    }
    public get StartVertex(): GraphVertex<T> {
        return this.startVertex;
    }

    public constructor(
        private startVertex: GraphVertex<T>,
        private endVertex: GraphVertex<T>,
        private weight = 0){

    }
}
