import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { topoSort } from "../topoSort";
describe("topoSort test", () => {
    it("should topo sort on empty graph", () => {
        expect(topoSort(null)).toEqual([]);
        expect(topoSort(undefined)).toEqual([]);
    });

    it("should topo sort on a graph which is not empty", () => {
        const graph = new Graph();
        expect(topoSort(graph)).toEqual([]);
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const vertexD = new GraphVertex("D");
        const vertexE = new GraphVertex("E");
        const vertexF = new GraphVertex("F");
        vertexA.addEdge(vertexB);
        vertexA.addEdge(vertexC);
        vertexA.addEdge(vertexD);
        vertexC.addEdge(vertexB);
        vertexC.addEdge(vertexE);
        vertexD.addEdge(vertexE);
        vertexF.addEdge(vertexD);
        vertexF.addEdge(vertexE);

        graph
        .addVertex(vertexA)
        .addVertex(vertexB)
        .addVertex(vertexC)
        .addVertex(vertexD)
        .addVertex(vertexE)
        .addVertex(vertexF);

        const vertexs = topoSort(graph);
        const values = vertexs.map(item => item.Node);
        // tslint:disable-next-line:no-console
        expect(values).toEqual(["A", "F", "C", "D", "B", "E"]);
    });

    it("should throw error on a graph with rings", () => {
        const graph = new Graph();
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        vertexA.addEdge(vertexB);
        vertexB.addEdge(vertexC);
        vertexC.addEdge(vertexA);

        graph.addVertex(vertexA);
        graph.addVertex(vertexB);
        graph.addVertex(vertexC);

        expect(() => topoSort(graph)).toThrowError();
    });
});
