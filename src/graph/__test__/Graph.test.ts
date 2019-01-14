import { Graph } from "../Graph";
import { GraphVertex } from "../GraphVertex";

describe("Graph test", () => {
    it("should create empty graph" , () => {
        const graph = new Graph();
        expect(graph.getEdges().length).toBe(0);
        expect(graph.getVertexs().length).toBe(0);
        expect(graph.getKeys().length).toBe(0);
    });

    it("should add into graph" , () => {
        const graph = new Graph();
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");

        graph.addVertex(vertexA);
        graph.addVertex(vertexB);
        graph.addVertex(vertexC);

        expect(graph.getVertexs().length).toBe(3);
        expect(graph.getEdges().length).toBe(0);
        expect(graph.getKeys().length).toBe(3);

        expect(graph.getKeys()).toEqual(["A", "B", "C"]);
    });

    it("should find vertex in graph" , () => {
        const graph = new Graph();
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        vertexA.addEdge(vertexB, 3);
        const vertexC = new GraphVertex("C");
        vertexB.addEdge(vertexC, 3);
        vertexC.addEdge(vertexA, 2);
        expect(vertexC.addEdge(vertexA, 4)).toBe(false);

        graph.addVertex(vertexA);
        graph.addVertex(vertexB);
        graph.addVertex(vertexC);

        expect(graph.findVertex(vertexA.Key)).toBe(vertexA);
        expect(graph.findVertex(vertexB.Key)).toBe(vertexB);
        expect(graph.findEdge(vertexA.Key).Size).toBe(1);
        expect(graph.findEdge(vertexB.Key).Size).toBe(1);
        expect(graph.findEdge(vertexB.Key).getHeadNode().Value.StartVertex).toBe(vertexB);
        expect(graph.findEdge(vertexB.Key).getHeadNode().Value.EndVertex).toBe(vertexC);

        expect(graph.getEdges().length).toBe(3);
        expect(graph.getKeys()).toEqual(["A", "B", "C"]);
        expect(graph.getVertexs().length).toBe(3);
    });

    it("should delete vertex in graph" , () => {
        const graph = new Graph();
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        vertexA.addEdge(vertexB, 3);
        const vertexC = new GraphVertex("C");
        vertexB.addEdge(vertexC, 3);
        vertexC.addEdge(vertexA, 2);

        graph.addVertex(vertexA);
        graph.addVertex(vertexB);
        graph.addVertex(vertexC);

        expect(graph.deleteVertex(vertexA.Key)).toBe(true);
        expect(graph.getEdges().length).toBe(1);
        expect(graph.getKeys().length).toBe(2);
        expect(graph.getVertexs().length).toBe(2);
        expect(graph.findVertex(vertexA.Key)).toBeUndefined();
        expect(graph.findEdge(vertexA.Key)).toBeUndefined();

        expect(graph.deleteVertex(vertexA.Key)).toBe(false);

        expect(graph.deleteVertex(vertexC.Key)).toBe(true);
        expect(graph.getEdges().length).toBe(0);
        expect(graph.getKeys().length).toBe(1);
        expect(graph.getVertexs().length).toBe(1);
        expect(graph.findVertex(vertexC.Key)).toBeUndefined();
        expect(graph.findEdge(vertexC.Key)).toBeUndefined();
    });

    it("should create vertex" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        expect(vertexA.hasEdge()).toBe(false);
        vertexA.addEdge(vertexB, 3);
        const vertexC = new GraphVertex("C");
        expect(vertexB.addEdge(vertexC, 3)).toBe(true);
        vertexC.addEdge(vertexA, 2);

        expect(vertexA.Key).toBe("A");
        expect(vertexA.Node).toBe("A");
        expect(vertexB.getEdge("C").StartVertex).toBe(vertexB);
        expect(vertexB.getEdge("C").EndVertex).toBe(vertexC);
        expect(vertexA.getEdge("C")).toBeNull();

        expect(vertexA.getDegree()).toBe(2);
        expect(vertexA.getInDegree()).toBe(1);
        expect(vertexA.getOutDegree()).toBe(1);

        expect(vertexA.hasEdge()).toBe(true);
        expect(vertexA.deleteEdge(vertexA.getEdge("B"))).toBe(true);
        expect(vertexA.hasEdge()).toBe(false);
        expect(vertexA.getDegree()).toBe(1);
        expect(vertexA.getInDegree()).toBe(1);
        expect(vertexA.getOutDegree()).toBe(0);
        expect(vertexB.getInDegree()).toBe(0);
        expect(vertexB.getOutDegree()).toBe(1);
        expect(vertexA.getDegree()).toBe(1);
        expect(vertexA.deleteEdge(vertexA.getEdge("B"))).toBe(false);

        expect(vertexB.addEdge(vertexC, 3)).toBe(false);
        expect(() => vertexA.addEdge(null, 3)).toThrowError("end vertex is not empty");

        const vertex4 = new GraphVertex({key: "A", value: 2}, "key");
        expect(vertex4.Key).toBe("A");
        expect(vertex4.Node).toEqual({key: "A", value: 2});
    });

    it("should add edge" , () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        vertexA.addEdge(vertexB, 3);
        const vertexC = new GraphVertex("C");
        vertexB.addEdge(vertexC, 3);
        vertexC.addEdge(vertexA);

        const edgeAB = vertexA.getEdge("B");
        expect(edgeAB.Weight).toBe(3);
        expect(edgeAB.StartVertex).toBe(vertexA);
        expect(edgeAB.EndVertex).toBe(vertexB);
        expect(vertexC.getEdge("A").Weight).toBe(0);

        expect(vertexA.getNeighbors()).toEqual([vertexB]);
        expect(vertexB.getNeighbors()).toEqual([vertexC]);
        vertexA.deleteEdgeByKey("B");
        expect(vertexA.getNeighbors()).toEqual([]);
    });

    test("should add edge by graph", () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const graph = new Graph();
        graph
        .addVertex(vertexA)
        .addVertex(vertexB)
        .addVertex(vertexC);
        graph
        .addEdge(vertexA, vertexB, 3)
        .addEdgeByKey("B", "C", 2)
        .addEdge(vertexC, vertexA, 1);
        const edgeAB = vertexA.getEdge("B");
        expect(edgeAB.Weight).toBe(3);
        expect(edgeAB.StartVertex).toBe(vertexA);
        expect(edgeAB.EndVertex).toBe(vertexB);
        expect(vertexC.getEdge("A").Weight).toBe(1);

        expect(vertexA.getNeighbors()).toEqual([vertexB]);
        expect(vertexB.getNeighbors()).toEqual([vertexC]);
        graph.deleteEdge(vertexA, "B");
        expect(vertexA.getNeighbors()).toEqual([]);
        graph.deleteEdgeByKey("B", "C");
        expect(vertexB.getNeighbors()).toEqual([]);
    });

    test("should add undirected edge by graph", () => {
        const vertexA = new GraphVertex("A");
        const vertexB = new GraphVertex("B");
        const vertexC = new GraphVertex("C");
        const graph = new Graph(false);
        graph
        .addVertex(vertexA)
        .addVertex(vertexB)
        .addVertex(vertexC);
        graph
        .addEdge(vertexA, vertexB, 3)
        .addEdge(vertexB, vertexC, 1)
        .addEdge(vertexC, vertexA, 2);

        const edgeAB = vertexA.getEdge("B");
        expect(edgeAB.Weight).toBe(3);
        expect(edgeAB.StartVertex).toBe(vertexA);
        expect(edgeAB.EndVertex).toBe(vertexB);
        expect(vertexC.getEdge("A").Weight).toBe(2);

        expect(vertexA.getNeighbors()).toEqual([vertexB, vertexC]);
        expect(vertexB.getNeighbors()).toEqual([vertexA, vertexC]);
        graph.deleteEdge(vertexA, "B");
        expect(vertexA.getNeighbors()).toEqual([vertexC]);
        expect(vertexB.getNeighbors()).toEqual([vertexC]);

        expect(() => graph.addEdge(null, null, 2)).toThrow("vertex is not empty");
        expect(() => graph.addEdge(vertexA, null, 2)).toThrow("end vertex is not empty");
        expect(() => graph.addEdgeByKey(null, null, 2)).toThrow("vertex has not found");
        expect(() => vertexA.addUndirectedEdge(null, 2)).toThrow("end vertex is not empty");
        expect(() => graph.deleteEdge(null, "B")).toThrow("vertex is not empty");
        expect(graph.deleteEdgeByKey(null, "B")).toBe(false);
        expect(graph.deleteEdgeByKey("AB", "B")).toBe(false);
    });
});
