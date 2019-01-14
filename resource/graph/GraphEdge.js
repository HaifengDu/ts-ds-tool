export class GraphEdge {
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }
    get Weight() {
        return this.weight;
    }
    get EndVertex() {
        return this.endVertex;
    }
    get StartVertex() {
        return this.startVertex;
    }
}
