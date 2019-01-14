import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { isDirectedEulerGraph, isUndirectedEulerGraph } from "../isEulerGraph";

function getGraph(directed: boolean){
    const graph = new Graph(directed);
    const vertex1 = new GraphVertex("1");
    const vertex2 = new GraphVertex("2");
    const vertex3 = new GraphVertex("3");
    const vertex4 = new GraphVertex("4");
    const vertex5 = new GraphVertex("5");
    const vertex6 = new GraphVertex("6");
    graph
        .addVertex(vertex1)
        .addVertex(vertex2)
        .addVertex(vertex3)
        .addVertex(vertex4)
        .addVertex(vertex5)
        .addVertex(vertex6);
    graph
        .addEdge(vertex1, vertex2)
        .addEdge(vertex2, vertex3)
        .addEdge(vertex3, vertex4)
        .addEdge(vertex4, vertex5)
        .addEdge(vertex5, vertex6)
        .addEdge(vertex6, vertex1);
    return graph;
}
describe("isEulerGraph test", () => {
    it("should undirected graph is an euler graph", () => {
        expect(isUndirectedEulerGraph(null)).toBe(false);
        expect(isUndirectedEulerGraph(getGraph(true))).toBe(false);
        const notConnectedGraph = new Graph(false);
        notConnectedGraph
        .addVertex(new GraphVertex("1"))
        .addVertex(new GraphVertex("2"));
        expect(isUndirectedEulerGraph(notConnectedGraph)).toBe(false);

        const graph = getGraph(false);
        expect(isUndirectedEulerGraph(graph)).toBe(true);

        graph.deleteEdgeByKey("3", "4");
        expect(isUndirectedEulerGraph(graph)).toBe(false);

        graph.addEdgeByKey("3", "4");
        graph.addEdgeByKey("2", "5");
        expect(isUndirectedEulerGraph(graph)).toBe(false);
    });

    it("should directed graph is an euler graph", () => {
        expect(isDirectedEulerGraph(null)).toBe(false);
        expect(isDirectedEulerGraph(getGraph(false))).toBe(false);

        const graph = getGraph(true);
        expect(isDirectedEulerGraph(graph)).toBe(true);

        graph.deleteEdgeByKey("3", "4");
        expect(isDirectedEulerGraph(graph)).toBe(false);
        graph.deleteEdgeByKey("4", "5");
        graph.addEdgeByKey("2", "4");
        graph.addEdgeByKey("4", "2");
        graph.addEdgeByKey("3", "2");
        graph.addEdgeByKey("2", "5");
        expect(isDirectedEulerGraph(graph)).toBe(true);
    });
});
