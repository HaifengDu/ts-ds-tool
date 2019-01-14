import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";
import { Queue } from "../../../queue/Queue";

export function breadthFirstSearch<T>(graph: Graph<T> , startVertex ?: GraphVertex<T>){
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return [];
    }
    const queue = new Queue<GraphVertex<T>>();
    queue.enqueue(startVertex);
    const existHashMap = new HashMap<boolean>(graph.getKeys().length);
    const arr: Array<T> = [];
    while (!queue.isEmpty()){
        const vertex = queue.dequeue();
        existHashMap.put(vertex.Key, true);
        arr.push(vertex.Node);
        const nextNodes = vertex.getNeighbors();
        for (const element of nextNodes) {
            if (!existHashMap.get(element.Key)){
                queue.enqueue(element);
            }
        }
    }
    return arr;
}
