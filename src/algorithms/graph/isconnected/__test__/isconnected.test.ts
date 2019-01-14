import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { isconnected } from "../isconnected";

describe("isconnected test", () => {
    it("should graph isconnected" , () => {
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
        expect(isconnected(graph)).toBe(true);
    });

    it("should graph is not connected" , () => {
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
        // vertexB.addEdge(vertexF , 4);
        vertexB.addUndirectedEdge(vertexH , 2);
        vertexC.addUndirectedEdge(vertexD , 1);
        vertexC.addUndirectedEdge(vertexE , 7);
        vertexD.addUndirectedEdge(vertexB , 1);
        vertexD.addUndirectedEdge(vertexE , 2);
        vertexE.addUndirectedEdge(vertexG , 2);
        vertexG.addUndirectedEdge(vertexH , 3);
        // vertexH.addEdge(vertexF , 1);
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
        expect(isconnected(graph)).toBe(false);
    });
});
