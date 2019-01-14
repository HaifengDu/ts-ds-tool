import { HashMap } from "../../../hashmap/HashMap";
export function bellmanFord(graph, startVertex) {
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return {};
    }
    const vertices = graph.getVertexs();
    const hashMap = new HashMap(vertices.length);
    const prevMap = new HashMap(vertices.length);
    for (const vertex of vertices) {
        if (vertex === startVertex) {
            hashMap.put(vertex.Key, 0);
        }
        else {
            hashMap.put(vertex.Key, Infinity);
        }
    }
    const edges = graph.getEdges();
    for (const {} of vertices) {
        for (const edge of edges) {
            const prevWeight = hashMap.get(edge.StartVertex.Key);
            const desc = edge.EndVertex;
            if (hashMap.get(desc.Key) > prevWeight + edge.Weight) {
                prevMap.put(desc.Key, edge.StartVertex);
                hashMap.put(desc.Key, prevWeight + edge.Weight);
            }
        }
    }
    for (const edge of edges) {
        const prevWeight = hashMap.get(edge.StartVertex.Key);
        const endWeight = hashMap.get(edge.EndVertex.Key);
        if (endWeight > prevWeight + edge.Weight) {
            throw new Error("Graph contains negative weight cycle");
        }
    }
    const prevKeys = prevMap.keys();
    const prev = prevKeys.reduce((ori, item) => {
        ori[item] = prevMap.get(item).Key;
        return ori;
    }, {});
    const keys = hashMap.keys();
    const distance = keys.reduce((ori, item) => {
        ori[item] = hashMap.get(item);
        return ori;
    }, {});
    return {
        distance,
        prev,
    };
}
export function getPath(vertextKey, prevDict) {
    const result = [vertextKey];
    let prev = prevDict[vertextKey];
    while (prev) {
        result.unshift(prev);
        prev = prevDict[prev];
    }
    return result;
}
