import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";

/**
 * 判断图的连通分量
 * @param graph
 */
export function tarjan<T>(graph: Graph<T>){
    /**
     * 1、顶点所有孩子顶点V满足low[v] >= dnf[u]则改顶点为割点
     * 2、桥（割边）：low[v] > dnf[u] 就说明V-U是桥
     */
    const vertices = graph.getVertexs();
    const stack: Array<GraphVertex<T>> = [];
    const components: Array<Array<string>> = [];
    const visitedMap = new HashMap();
    vertices.forEach(item => stronglyConnect(item , stack));

    return components;

    function stronglyConnect<T>(
    vertex: GraphVertex<T> ,
    visitedStack: Array<GraphVertex<T>> ,
    dfn: HashMap<number> = new HashMap(),
    low: HashMap<number> = new HashMap(),
    index = 1){
        if (visitedMap.get(vertex.Key)){
            return;
        }
        index ++;
        visitedStack.push(vertex);
        dfn.put(vertex.Key , index);
        low.put(vertex.Key , index);
        const neighbors = vertex.getNeighbors();
        neighbors.forEach(item => {
            if (!dfn.get(item.Key)){
                stronglyConnect(item , visitedStack , dfn , low , index);
            }
            if (!visitedMap.get(item.Key)){
                const lowIndex = low.get(item.Key);
                const currentLowIndex = low.get(vertex.Key);
                low.put(vertex.Key , Math.min(currentLowIndex , lowIndex));
            }
        });

        const lowIndex = low.get(vertex.Key);
        const dfnIndex = dfn.get(vertex.Key);
        if (lowIndex === dfnIndex){
            let target;
            const smallComponents = [];
            do{
                target = visitedStack.pop().Key;
                visitedMap.put(target , true);
                smallComponents.push(target);

            }while (target !== vertex.Key);
            components.push(smallComponents);
        }
    }
}
