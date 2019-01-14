import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { heap_prim , prim } from "../prim";

describe("prim test", () => {
    it("prim test" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const vertexD = new GraphVertex("D");
        const vertexE = new GraphVertex("E");
        const vertexF = new GraphVertex("F");
        const vertexG = new GraphVertex("G");
        const vertexH = new GraphVertex("H");

        vertexA.addUndirectedEdge(vertexC , 3);
        vertexA.addUndirectedEdge(vertexB , 5);
        vertexB.addUndirectedEdge(vertexF , 4);
        vertexB.addUndirectedEdge(vertexH , 2);
        vertexC.addUndirectedEdge(vertexD , 1);
        vertexC.addUndirectedEdge(vertexE , 7);
        vertexD.addUndirectedEdge(vertexB , 1);
        vertexD.addUndirectedEdge(vertexE , 2);
        vertexE.addUndirectedEdge(vertexG , 2);
        vertexG.addUndirectedEdge(vertexH , 3);
        vertexH.addUndirectedEdge(vertexF , 1);

        const graph = new Graph();
        graph
        .addVertex(vertexA)
        .addVertex(vertexB)
        .addVertex(vertexC)
        .addVertex(vertexD)
        .addVertex(vertexE)
        .addVertex(vertexF)
        .addVertex(vertexG)
        .addVertex(vertexH);

        const result = prim(graph);
        expect(result.visitedVertices.map(item => item.Key))
        .toEqual(["B", "D", "C", "H", "F", "E", "G", "A"]);

        expect(result.visitedEdges.length).toBe(result.visitedVertices.length - 1);

        let startVertex = result.visitedEdges[0].StartVertex;
        expect(startVertex.Key).toBe("B");
        let vertices = [
            ["B", "D"],
            ["D", "C"],
            ["B", "H"],
            ["H", "F"],
            ["D", "E"],
            ["E", "G"],
            ["C", "A"],
        ];
        result.visitedEdges.forEach((edge, index) => {
            expect([edge.StartVertex.Key, edge.EndVertex.Key]).toEqual(vertices[index]);
        });

        const heapResult = heap_prim(graph);

        expect(heapResult.visitedVertices.map(item => item.Key))
        .toEqual(["B", "D", "C", "E", "H", "F", "G", "A"]);

        expect(heapResult.visitedEdges.length).toBe(heapResult.visitedVertices.length - 1);

        vertices = [
            ["B", "D"],
            ["D", "C"],
            ["D", "E"],
            ["B", "H"],
            ["H", "F"],
            ["E", "G"],
            ["C", "A"],
        ];
        startVertex = heapResult.visitedEdges[0].StartVertex;
        expect(startVertex.Key).toBe("B");
        heapResult.visitedEdges.forEach((edge, index) => {
            expect([edge.StartVertex.Key, edge.EndVertex.Key]).toEqual(vertices[index]);
        });
    });
});
