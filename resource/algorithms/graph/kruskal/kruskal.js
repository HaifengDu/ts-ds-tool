import DisjointSet from "../../../disjointset/DisjointSet";
export function kruskal(graph) {
    const edges = graph.getEdges().sort((a, b) => a.Weight > b.Weight ? 1 : -1);
    const verticeLength = graph.getVertexs().length;
    const visitedVertices = [];
    const visitedEdges = [];
    const disjointSet = new DisjointSet();
    for (const edge of edges) {
        if (!disjointSet.find(edge.StartVertex.Key)) {
            disjointSet.makeSet(edge.StartVertex.Key);
            visitedVertices.push(edge.StartVertex);
        }
        if (!disjointSet.find(edge.EndVertex.Key)) {
            disjointSet.makeSet(edge.EndVertex.Key);
            visitedVertices.push(edge.EndVertex);
        }
        if (!disjointSet.inSameSet(edge.StartVertex.Key, edge.EndVertex.Key)) {
            disjointSet.union(edge.StartVertex.Key, edge.EndVertex.Key);
            visitedEdges.push(edge);
        }
        if (visitedEdges.length === verticeLength - 1) {
            break;
        }
    }
    return {
        visitedVertices,
        visitedEdges,
    };
}
