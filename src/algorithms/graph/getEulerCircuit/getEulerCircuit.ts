import { Graph } from "../../../graph/Graph";
import { GraphEdge } from "../../../graph/GraphEdge";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashSet } from "../../../hashset/HashSet";

/**
 * 获取欧拉回路（dfs）
 * @param graph
 */
export function getEulerCircuit<T>(graph: Graph<T>, startVertex ?: GraphVertex<T>){
    if (!graph){
        return [];
    }
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return [];
    }
    const existHashMap = new HashSet();
    const edgeSet = new HashSet();
    const edges: Array<GraphEdge<T>> = [];
    getCircuit(startVertex);
    return edges.reverse();
    function getCircuit(vertex: GraphVertex<T>, prevKey?: string){
        const nextNodes = vertex.getNeighbors();
        existHashMap.add(vertex.Key);
        nextNodes.forEach(item => {
            if (item.Key === prevKey){
                return;
            }
            const edgeKey = JSON.stringify([vertex.Key, item.Key].sort((a, b) => a > b ? 1 : -1));
            if (!edgeSet.has(edgeKey)){
                if (existHashMap.has(item.Key)){
                    edges.push(vertex.getEdge(item.Key));
                }else{
                    existHashMap.add(item.Key);
                    getCircuit(item, vertex.Key);
                    edges.push(vertex.getEdge(item.Key));
                }
                edgeSet.add(edgeKey);
            }
        });
    }
}
