import PriorityQueue from "../../../priorityqueue/PriorityQueue";
export function topoSort(graph) {
    if (!graph) {
        return [];
    }
    const clonedGraph = graph.clone();
    const vertices = clonedGraph.getVertexs();
    const queue = new PriorityQueue();
    vertices.forEach(item => queue.enqueue(item, -item.getInDegree()));
    const topoSortedArr = [];
    while (!queue.isEmpty()) {
        const { Value: vertex, Priority: indegree } = queue.dequeue();
        if (indegree < 0) {
            throw new Error("Cyclic dependency " + vertex.Key);
        }
        topoSortedArr.push(vertex);
        const head = vertex.getEdges();
        while (head.Size) {
            const edge = head.getHeadNode().Value;
            vertex.deleteEdge(edge);
            queue.changePriority(edge.EndVertex, -edge.EndVertex.getInDegree());
        }
    }
    return topoSortedArr;
}
