import { HashSet } from "../../../hashset/HashSet";
export function getEulerCircuit(graph, startVertex) {
    if (!graph) {
        return [];
    }
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return [];
    }
    const existHashMap = new HashSet();
    const edgeSet = new HashSet();
    const edges = [];
    getCircuit(startVertex);
    return edges.reverse();
    function getCircuit(vertex, prevKey) {
        const nextNodes = vertex.getNeighbors();
        existHashMap.add(vertex.Key);
        nextNodes.forEach(item => {
            if (item.Key === prevKey) {
                return;
            }
            const edgeKey = JSON.stringify([vertex.Key, item.Key].sort((a, b) => a > b ? 1 : -1));
            if (!edgeSet.has(edgeKey)) {
                if (existHashMap.has(item.Key)) {
                    edges.push(vertex.getEdge(item.Key));
                }
                else {
                    existHashMap.add(item.Key);
                    getCircuit(item, vertex.Key);
                    edges.push(vertex.getEdge(item.Key));
                }
                edgeSet.add(edgeKey);
            }
        });
    }
}
