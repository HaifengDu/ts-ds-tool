import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { tspBranchAndBound } from "../tspBranchAndBound";

describe("tspBranchAndBound test", () => {
    it("should run tspBranchAndBound on empty graph", () => {
        expect(tspBranchAndBound(null)).toBe(null);
        const vertex = new GraphVertex("1");
        const graph = new Graph();
        graph
        .addVertex(vertex);
        expect(tspBranchAndBound(graph)).toEqual({ cost: 0, path: [] });
    });

    it("should run on graph which only has two vertices", () => {
        const vertex1 = new GraphVertex("1");
        const vertex2 = new GraphVertex("2");
        vertex1.addUndirectedEdge(vertex2, 22);
        const graph = new Graph();
        graph
        .addVertex(vertex1)
        .addVertex(vertex2);
        expect(tspBranchAndBound(graph)).toEqual({ cost: 44, path: ["1", "2"] });
    });

    it("should throw error on graph which hasn't Euler Circuit", () => {
        const vertex1 = new GraphVertex("1");
        const vertex2 = new GraphVertex("2");
        vertex1.addEdge(vertex2, 2);
        const graph = new Graph();
        graph
        .addVertex(vertex1)
        .addVertex(vertex2);
        expect(() => tspBranchAndBound(graph)).toThrow("the vertex hasn't edges");

        const vertex3 = new GraphVertex("3");
        vertex2.addUndirectedEdge(vertex3, 20);
        graph.addVertex(vertex3);
        expect(() => tspBranchAndBound(graph)).toThrow("the graph is not connected");

        const vertex4 = new GraphVertex("4");
        const vertex5 = new GraphVertex("5");
        vertex4.addUndirectedEdge(vertex5, 10);
        graph
        .addVertex(vertex4)
        .addVertex(vertex5);
        expect(() => tspBranchAndBound(graph)).toThrow("the graph is not connected");
    });

    it("should run method on graph which is not a complete graph", () => {
        const vertex1 = new GraphVertex("1");
        const vertex2 = new GraphVertex("2");
        const vertex3 = new GraphVertex("3");
        const vertex4 = new GraphVertex("4");
        const vertex5 = new GraphVertex("5");
        vertex1.addUndirectedEdge(vertex3, 5);
        vertex1.addUndirectedEdge(vertex4, 4);
        vertex1.addUndirectedEdge(vertex5, 7);
        vertex1.addEdge(vertex2, 2);
        vertex2.addUndirectedEdge(vertex3, 20);
        vertex3.addUndirectedEdge(vertex4, 8);
        vertex4.addUndirectedEdge(vertex5, 10);
        const graph = new Graph();
        graph
        .addVertex(vertex1)
        .addVertex(vertex2)
        .addVertex(vertex3)
        .addVertex(vertex4)
        .addVertex(vertex5);
        expect(tspBranchAndBound(graph)).toEqual({
            cost: 47,
            path: ["1", "2", "3", "4", "5"],
        });
    });

    it("tspBranchAndBound test", () => {
        const vertex1 = new GraphVertex("1");
        const vertex2 = new GraphVertex("2");
        const vertex3 = new GraphVertex("3");
        const vertex4 = new GraphVertex("4");
        const vertex5 = new GraphVertex("5");
        vertex1.addUndirectedEdge(vertex2, 3);
        vertex1.addUndirectedEdge(vertex3, 1);
        vertex1.addUndirectedEdge(vertex4, 5);
        vertex1.addUndirectedEdge(vertex5, 8);
        vertex2.addUndirectedEdge(vertex3, 6);
        vertex2.addUndirectedEdge(vertex4, 7);
        vertex2.addUndirectedEdge(vertex5, 9);
        vertex3.addUndirectedEdge(vertex4, 4);
        vertex3.addUndirectedEdge(vertex5, 2);
        vertex4.addUndirectedEdge(vertex5, 3);
        const graph = new Graph();
        graph
        .addVertex(vertex1)
        .addVertex(vertex2)
        .addVertex(vertex3)
        .addVertex(vertex4)
        .addVertex(vertex5);

        const result = tspBranchAndBound(graph);

        expect(result.cost).toBe(16);
        expect(result.path).toEqual(["1", "3", "5", "4", "2"]);
    });
});
