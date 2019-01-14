import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { floydWarshall } from "../floydWarshall";

describe("floydWarshall test", () => {
    it("floydWarshall test" , () => {
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

        const result = floydWarshall(graph , vertexA);
        expect(result.distance).toEqual({A: 0, B: -3, C: 2, D: 4, E: 2, F: -7, G: 3, H: -6});
        expect(floydWarshall(graph).distance).toEqual({A: 0, B: -3, C: 2, D: 4, E: 2, F: -7, G: 3, H: -6});
        expect(floydWarshall(graph, new GraphVertex("J"))).toEqual({});
        expect(floydWarshall(new Graph())).toEqual({});
        expect(floydWarshall(graph, vertexC).distance)
        .toEqual({A: Infinity, B: 1, C: 0, D: 2, E: 0, F: -3, G: 1, H: -2});
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

        expect(() => floydWarshall(graph , vertexA)).toThrow("Graph contains negative weight cycle");
    });
});
