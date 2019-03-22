import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashMap } from "../../../hashmap/HashMap";

type enterVertex<T> = (vertex: GraphVertex<T>) => void;

export function depthFirstSearch<T>(
    graph: Graph<T>,
    startVertex ?: GraphVertex<T>,
    beforeEnter?: enterVertex<T>,
    afterEnter?: enterVertex<T>){
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return [];
    }
    const stack: Array<GraphVertex<T>> = [];
    stack.push(startVertex);
    const existHashMap = new HashMap<boolean>(graph.getKeys().length);
    const arr: Array<T> = [];
    while (stack.length){
        const vertex = stack.pop();
        if (!existHashMap.get(vertex.Key)){
            // tslint:disable-next-line:no-unused-expression
            beforeEnter && beforeEnter(vertex);
            arr.push(vertex.Node);
            // tslint:disable-next-line:no-unused-expression
            afterEnter && afterEnter(vertex);
            existHashMap.put(vertex.Key , true);
        }
        const nextNodes = vertex.getNeighbors().reverse();
        for (const element of nextNodes) {
            if (!existHashMap.get(element.Key)){
                stack.push(element);
            }
        }
    }
    return arr;
}

export function depthFirstSearchReverse<T>(
    graph: Graph<T>,
    startVertex ?: GraphVertex<T> ,
    existHashMap ?: HashMap<boolean>){
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return [];
    }
    existHashMap = existHashMap || new HashMap<boolean>(graph.getKeys().length);
    const nextNodes = startVertex.getNeighbors();
    let arr = [startVertex.Node];
    existHashMap.put(startVertex.Key , true);
    nextNodes.forEach(item => {
        if (!existHashMap.get(item.Key)){
            arr = arr.concat(depthFirstSearchReverse(graph , item , existHashMap));
        }
    });
    return arr;
}
