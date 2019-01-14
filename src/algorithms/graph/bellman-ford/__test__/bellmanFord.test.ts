import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { bellmanFord, getPath } from "../bellmanFord";

describe("bellmanFord test", () => {
    it("bellmanFord test" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const vertexD = new GraphVertex("D");
        const vertexE = new GraphVertex("E");
        const vertexF = new GraphVertex("F");
        const vertexG = new GraphVertex("G");
        const vertexH = new GraphVertex("H");

        vertexA.addEdge(vertexC , 2);
        vertexA.addEdge(vertexB , -3);
        vertexB.addEdge(vertexF , -2);
        vertexB.addEdge(vertexH , -3);
        vertexC.addEdge(vertexD , 2);
        vertexC.addEdge(vertexE , 3);
        vertexD.addEdge(vertexB , -1);
        vertexD.addEdge(vertexE , -2);
        vertexE.addEdge(vertexG , 1);
        vertexG.addEdge(vertexH , 3);
        vertexH.addEdge(vertexF , -1);

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
        const result = bellmanFord(graph , vertexA);

        expect(getPath(vertexA.Key , result.prev)).toEqual(["A"]);
        expect(getPath(vertexB.Key , result.prev)).toEqual(["A", "B"]);
        expect(getPath(vertexC.Key , result.prev)).toEqual(["A", "C"]);
        expect(getPath(vertexD.Key , result.prev)).toEqual(["A", "C", "D"]);
        expect(getPath(vertexE.Key , result.prev)).toEqual(["A", "C", "D", "E"]);
        expect(getPath(vertexF.Key , result.prev)).toEqual(["A", "B", "H", "F"]);
        expect(getPath(vertexG.Key , result.prev)).toEqual(["A", "C", "D", "E", "G"]);
        expect(getPath(vertexH.Key , result.prev)).toEqual(["A", "B", "H"]);

        expect(result.distance).toEqual({A: 0, B: -3, C: 2, D: 4, E: 2, F: -7, G: 3, H: -6});
        expect(bellmanFord(graph).distance).toEqual({A: 0, B: -3, C: 2, D: 4, E: 2, F: -7, G: 3, H: -6});
        expect(bellmanFord(graph, new GraphVertex("J"))).toEqual({});
        expect(bellmanFord(new Graph())).toEqual({});
        expect(bellmanFord(graph, vertexC).distance).toEqual({A: Infinity, B: 1, C: 0, D: 2, E: 0, F: -3, G: 1, H: -2});
    });

    it("should find in graph with negative edge weights" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const vertexD = new GraphVertex("D");
        const vertexE = new GraphVertex("E");
        const vertexF = new GraphVertex("F");
        const vertexG = new GraphVertex("G");
        const vertexH = new GraphVertex("H");

        vertexA.addEdge(vertexC , 2);
        vertexB.addEdge(vertexF , -2);
        vertexB.addEdge(vertexH , -3);
        vertexB.addEdge(vertexA , -4);
        vertexC.addEdge(vertexD , 2);
        vertexC.addEdge(vertexE , 3);
        vertexD.addEdge(vertexB , -1);
        vertexD.addEdge(vertexE , -2);
        vertexE.addEdge(vertexG , 1);
        vertexG.addEdge(vertexH , 3);
        vertexH.addEdge(vertexF , -1);

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
        // A -> C -> D -> B -> A

        expect(() => bellmanFord(graph , vertexA)).toThrow("Graph contains negative weight cycle");
    });
});
