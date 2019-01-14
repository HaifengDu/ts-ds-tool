import DisjointSet from "../../../disjointset/DisjointSet";
import { Graph } from "../../../graph/Graph";

/**
 * 无向图连通判断(可判断无向图中的环)
 */
export function isconnected<T>(graph: Graph<T>){
    const vertexs = graph.getVertexs();
    const disjoinSet = new DisjointSet();
    vertexs.forEach(vertex => {
        const neighbors = vertex.getNeighbors();
        if (neighbors && neighbors.length){
            neighbors.forEach(neighbor => {
                const startVertex = vertex;
                const endVertex = neighbor;

                if (!disjoinSet.find(startVertex.Key)){
                    disjoinSet.makeSet(startVertex.Key);
                }
                if (!disjoinSet.find(endVertex.Key)){
                    disjoinSet.makeSet(endVertex.Key);
                }
                disjoinSet.union(startVertex.Key , endVertex.Key);
            });
        }else{
            disjoinSet.makeSet(vertex.Key);
        }
    });

    const rootItems = disjoinSet.RootItems;
    if (Object.keys(rootItems).length > 1){
        return false;
    }
    return true;
}
