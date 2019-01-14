import { HashSet } from "../../../hashset/HashSet";
import { MinHeap } from "../../../heap/MinHeap";
export function prim(graph) {
    const edges = graph.getEdges();
    const startVertex = edges.reduce((ori, item) => {
        if (ori === null) {
            return item;
        }
        if (item.Weight < ori.Weight) {
            return item;
        }
        return ori;
    }, null).StartVertex;
    const visitedSet = new HashSet();
    const visitedVertices = [startVertex];
    const visitedEdges = new Array();
    visitedSet.add(startVertex.Key);
    traversal();
    visitedSet.clear();
    return {
        visitedVertices,
        visitedEdges,
    };
    function traversal() {
        let tempWeight = Infinity;
        let nextVertex;
        let nextEdge;
        for (const vertex of visitedVertices) {
            let head = vertex.getEdges().getHeadNode();
            while (head) {
                const edge = head.Value;
                if (!visitedSet.has(edge.EndVertex.Key) && head.Value.Weight < tempWeight) {
                    tempWeight = head.Value.Weight;
                    nextVertex = head.Value.EndVertex;
                    nextEdge = edge;
                }
                head = head.Next;
            }
        }
        if (nextVertex) {
            visitedSet.add(nextVertex.Key);
            visitedVertices.push(nextVertex);
            visitedEdges.push(nextEdge);
            traversal();
        }
    }
}
export function heap_prim(graph) {
    const edges = graph.getEdges();
    const startVertex = edges.reduce((ori, item) => {
        if (ori === null) {
            return item;
        }
        if (item.Weight < ori.Weight) {
            return item;
        }
        return ori;
    }, null).StartVertex;
    const verticeLength = graph.getVertexs().length;
    const visitedSet = new HashSet();
    const minHeap = new MinHeap("Weight");
    const visitedVertices = [startVertex];
    const visitedEdges = [];
    visitedSet.add(startVertex.Key);
    pushEdge(startVertex);
    while (!minHeap.isEmpty() && visitedVertices.length < verticeLength) {
        const edge = minHeap.poll();
        if (visitedSet.has(edge.EndVertex.Key)) {
            continue;
        }
        visitedVertices.push(edge.EndVertex);
        visitedSet.add(edge.EndVertex.Key);
        visitedEdges.push(edge);
        pushEdge(edge.EndVertex);
    }
    visitedSet.clear();
    return {
        visitedVertices,
        visitedEdges,
    };
    function pushEdge(vertex) {
        let head = vertex.getEdges().getHeadNode();
        let edge;
        while (head) {
            edge = head.Value;
            if (!visitedSet.has(edge.EndVertex.Key)) {
                minHeap.add(edge);
            }
            head = head.Next;
        }
    }
}
