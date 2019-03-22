import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { depthFirstSearch, depthFirstSearchReverse } from "../depthFirstSearch";

describe("depthFirstSearch test", () => {
    it("depthFirstSearch test" , () => {
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

        expect(depthFirstSearch(graph)).toEqual(["A", "B", "F", "C", "G", "D", "H", "E"]);
        expect(depthFirstSearch(graph, new GraphVertex("J"))).toEqual([]);
        expect(depthFirstSearch(graph, vertexC)).toEqual(["C", "G", "F", "D", "H", "E"]);
        const shouldEnterVertexs: Array<string> = [];
        const shouldLeaveVertexs: Array<string> = [];
        expect(depthFirstSearch(graph, null, vertex => {
            shouldEnterVertexs.push(vertex.Key);
        }, vertex => {
            shouldLeaveVertexs.push(vertex.Key);
        }));
        expect(shouldEnterVertexs).toEqual(["A", "B", "F", "C", "G", "D", "H", "E"]);
        expect(shouldLeaveVertexs).toEqual(["A", "B", "F", "C", "G", "D", "H", "E"]);
        shouldEnterVertexs.length = 0;
        shouldLeaveVertexs.length = 0;
        expect(depthFirstSearch(graph, vertexC, vertex => {
            shouldEnterVertexs.push(vertex.Key);
        }, vertex => {
            shouldLeaveVertexs.push(vertex.Key);
        }));
        expect(shouldEnterVertexs).toEqual(["C", "G", "F", "D", "H", "E"]);
        expect(shouldLeaveVertexs).toEqual(["C", "G", "F", "D", "H", "E"]);
        expect(depthFirstSearch(new Graph())).toEqual([]);
        expect(depthFirstSearchReverse(graph)).toEqual(["A", "B", "F", "C", "G", "D", "H", "E"]);
        expect(depthFirstSearchReverse(graph, new GraphVertex("J"))).toEqual([]);
        expect(depthFirstSearchReverse(graph, vertexC)).toEqual(["C", "G", "F", "D", "H", "E"]);
        expect(depthFirstSearchReverse(new Graph())).toEqual([]);
    });
});
