import { breadthFirstSearch } from "../breadth-first-search/breadthFirstSearch";
import { isconnected } from "../isconnected/isconnected";
export function isUndirectedEulerGraph(graph) {
    if (!graph) {
        return false;
    }
    if (graph.Directed) {
        return false;
    }
    if (!isconnected(graph)) {
        return false;
    }
    const vertices = graph.getVertexs();
    return vertices.every(item => !(item.getDegree() & 1));
}
export function isDirectedEulerGraph(graph) {
    if (!graph) {
        return false;
    }
    if (!graph.Directed) {
        return false;
    }
    const vertices = graph.getVertexs();
    const traversalVertices = breadthFirstSearch(graph);
    if (traversalVertices.length === vertices.length) {
        return vertices.every(item => item.getInDegree() === item.getOutDegree());
    }
    return false;
}
