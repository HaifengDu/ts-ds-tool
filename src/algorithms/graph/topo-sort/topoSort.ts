import { GraphVertex } from "../../..";
import { Graph } from "../../../graph/Graph";
import PriorityQueue from "../../../priorityqueue/PriorityQueue";

export function topoSort<T>(graph: Graph<T>){
    if (!graph){
        return [];
    }
    const clonedGraph = graph.clone();
    const vertices = clonedGraph.getVertexs();
    const queue = new PriorityQueue<GraphVertex<T>>();
    vertices.forEach(item => queue.enqueue(item, item.InDegree));
    const topoSortedArr: Array<GraphVertex<T>> = [];
    while (!queue.isEmpty()){
        const {Value: vertex , Priority: indegree} = queue.dequeue();
        if (indegree > 0){
            throw new Error("Cyclic dependency " + vertex.Key);
        }
        topoSortedArr.push(vertex);
        const head = vertex.getEdges();
        while (head.Size){
            const edge = head.getHeadNode().Value;
            vertex.deleteEdge(edge);
            queue.changePriority(edge.EndVertex, edge.EndVertex.InDegree);
        }
    }
    return topoSortedArr;
}
