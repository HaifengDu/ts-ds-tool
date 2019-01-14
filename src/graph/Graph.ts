import { LinkList } from "../linklist/LinkList";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphVertex";

export class Graph<T = string>{
    private vertices: {[index: string]: GraphVertex<T>};
    private edges: {[index: string]: LinkList<GraphEdge<T>>};
    constructor(private directed = true){
        this.vertices = {};
        this.edges = {};
    }

    public get Directed(){
        return this.directed;
    }

    public addVertex(vertex: GraphVertex<T>){
        this.vertices[vertex.Key] = vertex;
        this.edges[vertex.Key] = vertex.getEdges();
        return this;
    }

    public addEdgeByKey(start: string, end: string, weight?: number){
        const startVertex = this.findVertex(start);
        const endVertex = this.findVertex(end);
        if (!startVertex || !endVertex){
            throw new Error("vertex has not found");
        }
        return this.addEdge(startVertex, endVertex, weight);
    }

    public addEdge(start: GraphVertex<T>, end: GraphVertex<T>, weight?: number){
        if (!start){
            throw new Error("vertex is not empty");
        }
        if (this.directed){
            start.addEdge(end, weight);
        }else{
            start.addUndirectedEdge(end, weight);
        }
        return this;
    }

    public deleteEdge(start: GraphVertex<T>, end: string){
        if (!start){
            throw new Error("vertex is not empty");
        }
        return start.deleteEdgeByKey(end, this.directed);
    }

    public deleteEdgeByKey(start: string, end: string){
        const startVertex = this.findVertex(start);
        if (startVertex){
            return this.deleteEdge(startVertex, end);
        }
        return false;
    }

    public getVertexs(){
        const arr: Array<GraphVertex<T>> = [];
        // tslint:disable-next-line:forin
        for (const key in this.vertices){
            arr.push(this.vertices[key]);
        }
        return arr;
    }

    public getKeys(){
        return Object.keys(this.vertices);
    }

    public getEdges(){
        let arr: Array<GraphEdge<T>> = [];
        // tslint:disable-next-line:forin
        for (const key in this.edges){
            arr = [...arr, ...this.edges[key].toArray().map(item => item.Value)];
        }
        return arr;
    }

    public findVertex(key: string){
        return this.vertices[key];
    }

    public findEdge(key: string){
        return this.edges[key];
    }

    public deleteVertex(key: string){
        if (!(key in this.vertices)){
            return false;
        }
        delete this.vertices[key];
        delete this.edges[key];
        // 有关联的边删除
        // tslint:disable-next-line:forin
        for (const tempKey in this.vertices){
            const element = this.vertices[tempKey];
            element.deleteEdgeByKey(key);
        }
        return true;
    }

    public toAdjacencyMatrix(){
        const keys = this.getKeys();
        const matrix: Array<Array<number>> = new Array(keys.length)
        .fill(0).map(() => new Array(keys.length).fill(Infinity));
        const keyIndexs: {[index: string]: number} = {};
        let index = 0;
        // tslint:disable-next-line:forin
        for (const key in this.vertices) {
            keyIndexs[key] = index;
            matrix[index][index] = 0;
            index ++;
        }
        // tslint:disable-next-line:forin
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

    public clone(){
        const vertices = this.getVertexs();
        const edges = this.getEdges();
        const graph = new Graph<T>(this.directed);
        vertices.forEach(item => graph.addVertex(new GraphVertex(item.Node, item.Property)));
        edges.forEach(item => {
            const startVertex = graph.findVertex(item.StartVertex.Key);
            const endVertex = graph.findVertex(item.EndVertex.Key);
            graph.addEdge(startVertex, endVertex, item.Weight);
        });
        return graph;
    }
}
