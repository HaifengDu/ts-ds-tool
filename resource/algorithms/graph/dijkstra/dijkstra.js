import { HashMap } from "../../../hashmap/HashMap";
import PriorityQueue from "../../../priorityqueue/PriorityQueue";
export function dijkstra(graph, startVertex) {
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return {};
    }
    const vertices = graph.getVertexs();
    const weightMap = new HashMap(vertices.length);
    const visitedMap = new HashMap(vertices.length);
    const prevMap = new HashMap(vertices.length);
    prevMap.put(startVertex.Key, startVertex);
    for (const vertex of vertices) {
        if (vertex.Key === startVertex.Key) {
            weightMap.put(vertex.Key, 0);
        }
        else {
            weightMap.put(vertex.Key, Infinity);
        }
    }
    const queue = new PriorityQueue();
    queue.enqueue(startVertex, 0);
    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().Value;
        const currentDistance = weightMap.get(currentVertex.Key);
        currentVertex.getNeighbors().forEach(neighbor => {
            if (visitedMap.get(neighbor.Key)) {
                return;
            }
            const prevDistance = weightMap.get(neighbor.Key);
            const weight = currentVertex.getEdge(neighbor.Key).Weight;
            if (prevDistance > currentDistance + weight) {
                weightMap.put(neighbor.Key, currentDistance + weight);
                if (queue.has(neighbor)) {
                    queue.changePriority(neighbor, currentDistance + weight);
                    prevMap.put(neighbor.Key, currentVertex);
                }
            }
            if (!queue.has(neighbor)) {
                queue.enqueue(neighbor, -weightMap.get(neighbor.Key));
                prevMap.put(neighbor.Key, currentVertex);
            }
        });
        visitedMap.put(currentVertex.Key, true);
    }
    const keys = weightMap.keys();
    const distance = keys.reduce((ori, item) => {
        ori[item] = weightMap.get(item);
        return ori;
    }, {});
    const prevKeys = prevMap.keys();
    const prev = prevKeys.reduce((ori, item) => {
        ori[item] = prevMap.get(item).Key;
        return ori;
    }, {});
    return {
        distance,
        prev,
    };
}
