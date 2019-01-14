import {Graph} from "../../../../graph/Graph";
import {GraphVertex} from "../../../../graph/GraphVertex";
import { tarjan } from "../tarjan";
interface INode{
    value: number;
    key: number;
}
describe("tarjan test", () => {
    it("tarjan test", () => {
        const vertices = Array.from({length: 6}
            , (item, index) => index + 1)
            .map(item => new GraphVertex<INode>({value: item, key: item}, "key"));

        vertices[0].addEdge(vertices[1]);
        vertices[0].addEdge(vertices[2]);
        vertices[1].addEdge(vertices[3]);
        vertices[2].addEdge(vertices[3]);
        vertices[2].addEdge(vertices[4]);
        vertices[3].addEdge(vertices[0]);
        vertices[3].addEdge(vertices[5]);
        vertices[4].addEdge(vertices[5]);

        const graph = new Graph<INode>();
        vertices.forEach(item => graph.addVertex(item));

        expect(tarjan(graph)).toHaveLength(3);
        expect(tarjan(graph)).toContainEqual(["5"]);
        expect(tarjan(graph)).toContainEqual(["6"]);
        expect(tarjan(graph)).toContainEqual(["3", "4", "2", "1"]);
    });
});
