import { GraphVertex } from "./GraphVertex";
export class Graph {
    constructor(directed = true) {
        this.directed = directed;
        this.vertices = {};
        this.edges = {};
    }
    get Directed() {
        return this.directed;
    }
    addVertex(vertex) {
        this.vertices[vertex.Key] = vertex;
        this.edges[vertex.Key] = vertex.getEdges();
        return this;
    }
    addEdgeByKey(start, end, weight) {
        const startVertex = this.findVertex(start);
        const endVertex = this.findVertex(end);
        if (!startVertex || !endVertex) {
            throw new Error("vertex has not found");
        }
        return this.addEdge(startVertex, endVertex, weight);
    }
    addEdge(start, end, weight) {
        if (!start) {
            throw new Error("vertex is not empty");
        }
        if (this.directed) {
            start.addEdge(end, weight);
        }
        else {
            start.addUndirectedEdge(end, weight);
        }
        return this;
    }
    deleteEdge(start, end) {
        if (!start) {
            throw new Error("vertex is not empty");
        }
        return start.deleteEdgeByKey(end, this.directed);
    }
    deleteEdgeByKey(start, end) {
        const startVertex = this.findVertex(start);
        if (startVertex) {
            return this.deleteEdge(startVertex, end);
        }
        return false;
    }
    getVertexs() {
        const arr = [];
        for (const key in this.vertices) {
            arr.push(this.vertices[key]);
        }
        return arr;
    }
    getKeys() {
        return Object.keys(this.vertices);
    }
    getEdges() {
        let arr = [];
        for (const key in this.edges) {
            arr = [...arr, ...this.edges[key].toArray().map(item => item.Value)];
        }
        return arr;
    }
    findVertex(key) {
        return this.vertices[key];
    }
    findEdge(key) {
        return this.edges[key];
    }
    deleteVertex(key) {
        if (!(key in this.vertices)) {
            return false;
        }
        delete this.vertices[key];
        delete this.edges[key];
        for (const tempKey in this.vertices) {
            const element = this.vertices[tempKey];
            element.deleteEdgeByKey(key);
        }
        return true;
    }
    toAdjacencyMatrix() {
        const keys = this.getKeys();
        const matrix = new Array(keys.length)
            .fill(0).map(() => new Array(keys.length).fill(Infinity));
        const keyIndexs = {};
        let index = 0;
        for (const key in this.vertices) {
            keyIndexs[key] = index;
            matrix[index][index] = 0;
            index++;
        }
        for (const key in this.vertices) {
            const vertex = this.vertices[key];
            const edges = vertex.getEdges().toArray();
            for (const edgeNode of edges) {
                const edge = edgeNode.Value;
                matrix[keyIndexs[key]][keyIndexs[edge.EndVertex.Key]] = edge.Weight;
            }
        }
        return {
            matrix,
            keyIndexs,
        };
    }
    clone() {
        const vertices = this.getVertexs();
        const edges = this.getEdges();
        const graph = new Graph(this.directed);
        vertices.forEach(item => graph.addVertex(new GraphVertex(item.Node, item.Property)));
        edges.forEach(item => {
            const startVertex = graph.findVertex(item.StartVertex.Key);
            const endVertex = graph.findVertex(item.EndVertex.Key);
            graph.addEdge(startVertex, endVertex, item.Weight);
        });
        return graph;
    }
}
