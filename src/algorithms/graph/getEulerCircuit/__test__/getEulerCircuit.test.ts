import { Graph } from "../../../../graph/Graph";
import { GraphVertex } from "../../../../graph/GraphVertex";
import { getEulerCircuit } from "../getEulerCircuit";
describe("getEulerCircuit test", () => {
    it("getEulerCircuit test", () => {
        expect(getEulerCircuit(null)).toEqual([]);
        const graph = new Graph<string>(false);
        expect(getEulerCircuit(graph)).toEqual([]);

        const vertexs = Array.from({length: 10}, (item, index) => {
            return new GraphVertex((index + 1).toString());
        });
        vertexs.forEach(item => graph.addVertex(item));
        graph
        .addEdge(vertexs[0], vertexs[8])
        .addEdge(vertexs[0], vertexs[9])
        .addEdge(vertexs[8], vertexs[7])
        .addEdge(vertexs[9], vertexs[2])
        .addEdge(vertexs[9], vertexs[3])
        .addEdge(vertexs[2], vertexs[1])
        .addEdge(vertexs[3], vertexs[1])
        .addEdge(vertexs[9], vertexs[7])
        .addEdge(vertexs[7], vertexs[6])
        .addEdge(vertexs[7], vertexs[5])
        .addEdge(vertexs[6], vertexs[5]);
        const pathArr = [["1", "9"], ["9", "8"], ["8", "7"], ["7", "6"], ["6", "8"],
        ["8", "10"], ["10", "3"], ["3", "2"], ["2", "4"], ["4", "10"], ["10", "1"]];
        expect(getEulerCircuit(graph)
        .map(item => [item.StartVertex.Key, item.EndVertex.Key]))
        .toEqual(pathArr);
        expect(getEulerCircuit(graph, vertexs[0])
        .map(item => [item.StartVertex.Key, item.EndVertex.Key]))
        .toEqual(pathArr);
    });
});
