import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";

export function bellmanFord<T>(graph: Graph<T>, startVertex ?: GraphVertex<T>){
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return {};
    }
    const vertices = graph.getVertexs();

    // init min values

    const hashMap = new HashMap<number>(vertices.length);
    const prevMap = new HashMap<GraphVertex<T>>(vertices.length);
    // prevMap.put(startVertex.Key,startVertex);

    for (const vertex of vertices) {
        if (vertex === startVertex){
            hashMap.put(vertex.Key , 0);
        }else{
            hashMap.put(vertex.Key , Infinity);
        }
    }

    // 松弛每条边 v-1 点与点直接最远为v-1个节点否则不能抵达
    const edges = graph.getEdges();
    for (const {} of vertices) {
        for (const edge of edges) {
            const prevWeight = hashMap.get(edge.StartVertex.Key);
            const desc = edge.EndVertex;

            if (hashMap.get(desc.Key) > prevWeight + edge.Weight){
                prevMap.put(desc.Key , edge.StartVertex);
                hashMap.put(desc.Key , prevWeight + edge.Weight);
            }
        }
    }

    // 存在负向环的原因   可以从环中最后一点  更新 环中的起点  使起点更小
    for (const edge of edges) {
        const prevWeight = hashMap.get(edge.StartVertex.Key);
        const endWeight = hashMap.get(edge.EndVertex.Key);
        if (endWeight > prevWeight + edge.Weight){
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

export function getPath(vertextKey: string , prevDict: {[indeX: string]: string}){
    const result = [vertextKey];
    let prev = prevDict[vertextKey];
    while (prev){
        result.unshift(prev);
        prev = prevDict[prev];
    }
    return result;
}
