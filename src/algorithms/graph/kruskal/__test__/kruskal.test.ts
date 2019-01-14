import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { kruskal } from "../kruskal";

describe("kruskal test", () => {
    it("kruskal test" , () => {
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

        const result = kruskal(graph);

        expect(result.visitedVertices.length)
        .toBe(graph.getVertexs().length);

        expect(result.visitedEdges.length).toBe(result.visitedVertices.length - 1);

        const startVertex = result.visitedEdges[0].StartVertex;
        expect(startVertex.Key).toBe("H");
        const edges = result.visitedEdges.map(item => [item.StartVertex.Key , item.EndVertex.Key]);
        expect(edges).toContainEqual(["H", "F"]);
        expect(edges).toContainEqual(["D", "B"]);
        expect(edges).toContainEqual(["D", "C"]);
        expect(edges).toContainEqual(["H", "B"]);
        expect(edges).toContainEqual(["E", "D"]);
        expect(edges).toContainEqual(["E", "G"]);
        expect(edges).toContainEqual(["C", "A"]);
    });
});
