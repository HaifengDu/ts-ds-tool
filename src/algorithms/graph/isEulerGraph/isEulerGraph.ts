import { Graph } from "../../../graph/Graph";
import { breadthFirstSearch } from "../breadth-first-search/breadthFirstSearch";
import { isconnected } from "../isconnected/isconnected";

/**
 * 判断是否是欧拉图
 * @param graph
 */
export function isUndirectedEulerGraph<T>(graph: Graph<T>){
    // 无向连通图 G 是欧拉图，当且仅当 G 不含奇数度结点
    if (!graph){
        return false;
    }
    if (graph.Directed){
        return false;
    }
    if (!isconnected(graph)){
        return false;
    }
    const vertices = graph.getVertexs();
    return vertices.every(item => !(item.getDegree() & 1));
}

/**
 * 判断有向图中是否有欧拉通路
 * @param graph
 */
export function isDirectedEulerGraph<T>(graph: Graph<T>){
    /**
     * 有向连通图 D 是欧拉图，当且仅当该图为连通图且 D 中每个结点的入度=出度
     */
    if (!graph){
        return false;
    }
    if (!graph.Directed){
        return false;
    }
    const vertices = graph.getVertexs();
    const traversalVertices = breadthFirstSearch(graph);
    if (traversalVertices.length === vertices.length){
        return vertices.every(item => item.getInDegree() === item.getOutDegree());
    }
    return false;
}
