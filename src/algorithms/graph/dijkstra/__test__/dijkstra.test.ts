import { Graph } from "../../../../graph/Graph";
import {GraphVertex} from "../../../../graph/GraphVertex";
import { getPath } from "../../util";
import { dijkstra } from "../dijkstra";

describe("dijkstra test", () => {
    it("dijkstra test" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const vertexD = new GraphVertex("D");
        const vertexE = new GraphVertex("E");
        const vertexF = new GraphVertex("F");
        const vertexG = new GraphVertex("G");
        const vertexH = new GraphVertex("H");

        vertexA.addEdge(vertexC , 3);
        vertexA.addEdge(vertexB , 5);
        vertexB.addEdge(vertexF , 4);
        vertexB.addEdge(vertexH , 2);
        vertexC.addEdge(vertexD , 1);
        vertexC.addEdge(vertexE , 7);
        vertexD.addEdge(vertexB , 1);
        vertexD.addEdge(vertexE , 2);
        vertexE.addEdge(vertexG , 2);
        vertexG.addEdge(vertexH , 3);
        vertexH.addEdge(vertexF , 1);

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
        const result = dijkstra(graph , vertexA);
        expect(result.distance).toEqual({A: 0, B: 5, C: 3, D: 4, E: 6, F: 8, G: 8, H: 7});
        expect(getPath(vertexA.Key, result.prev)).toEqual(["A"]);
        expect(getPath(vertexB.Key, result.prev)).toEqual(["A", "B"]);
        expect(getPath(vertexC.Key, result.prev)).toEqual(["A", "C"]);
        expect(getPath(vertexD.Key, result.prev)).toEqual(["A", "C", "D"]);
        expect(getPath(vertexE.Key, result.prev)).toEqual(["A", "C", "D", "E"]);
        expect(getPath(vertexF.Key, result.prev)).toEqual(["A", "B", "H", "F"]);
        expect(getPath(vertexG.Key, result.prev)).toEqual(["A", "C", "D", "E", "G"]);
        expect(getPath(vertexH.Key, result.prev)).toEqual(["A", "B", "H"]);

        expect(dijkstra(graph).distance).toEqual({A: 0, B: 5, C: 3, D: 4, E: 6, F: 8, G: 8, H: 7});
        expect(dijkstra(graph, new GraphVertex("J"))).toEqual({});
        expect(dijkstra(new Graph())).toEqual({});
        expect(dijkstra(graph, vertexC).distance).toEqual({A: Infinity, B: 2, C: 0, D: 1, E: 3, F: 5, G: 5, H: 4});
    });
});
