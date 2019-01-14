import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { breadthFirstSearch } from "../breadthFirstSearch";

describe("breadthFirstSearch test", () => {
    it("breadthFirstSearch test" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        vertexA.addEdge(vertexB , 7);
        vertexA.addEdge(vertexC , 8);

        const vertexF = new GraphVertex("F");
        vertexB.addEdge(vertexF , 2);
        vertexF.addEdge(vertexC , 6);

        const vertexG = new GraphVertex("G");
        vertexC.addEdge(vertexG , 4);
        vertexG.addEdge(vertexF , 9);

        const vertexD = new GraphVertex("D");
        vertexF.addEdge(vertexD , 8);
        const vertexH = new GraphVertex("H");
        vertexF.addEdge(vertexH , 3);

        const vertexE = new GraphVertex("E");
        vertexH.addEdge(vertexE , 1);

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

        expect(breadthFirstSearch(graph)).toEqual(["A", "B", "C", "F", "G", "D", "H", "E"]);
        expect(breadthFirstSearch(graph, new GraphVertex("J"))).toEqual([]);
        expect(breadthFirstSearch(graph, vertexC)).toEqual(["C", "G", "F", "D", "H", "E"]);
        expect(breadthFirstSearch(new Graph())).toEqual([]);
    });
});
