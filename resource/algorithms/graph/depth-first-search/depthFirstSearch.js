import { HashMap } from "../../../hashmap/HashMap";
export function depthFirstSearch(graph, startVertex) {
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return [];
    }
    const stack = [];
    stack.push(startVertex);
    const existHashMap = new HashMap(graph.getKeys().length);
    const arr = [];
    while (stack.length) {
        const vertex = stack.pop();
        if (!existHashMap.get(vertex.Key)) {
            arr.push(vertex.Node);
            existHashMap.put(vertex.Key, true);
        }
        const nextNodes = vertex.getNeighbors().reverse();
        for (const element of nextNodes) {
            if (!existHashMap.get(element.Key)) {
                stack.push(element);
            }
        }
    }
    return arr;
}
export function depthFirstSearchReverse(graph, startVertex, existHashMap) {
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return [];
    }
    existHashMap = existHashMap || new HashMap(graph.getKeys().length);
    const nextNodes = startVertex.getNeighbors();
    let arr = [startVertex.Node];
    existHashMap.put(startVertex.Key, true);
    nextNodes.forEach(item => {
        if (!existHashMap.get(item.Key)) {
            arr = arr.concat(depthFirstSearchReverse(graph, item, existHashMap));
        }
    });
    return arr;
}
