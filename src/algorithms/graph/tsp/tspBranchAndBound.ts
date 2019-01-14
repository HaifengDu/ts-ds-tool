import { Graph } from "../../../graph/Graph";
import { GraphEdge } from "../../../graph/GraphEdge";
import { GraphVertex } from "../../../graph/GraphVertex";
import { HashSet } from "../../../hashset/HashSet";
import LinkList from "../../../linklist/LinkList";
import PriorityQueue from "../../../priorityqueue/PriorityQueue";

export function tspBranchAndBound<T>(graph: Graph<T>){
    if (!graph){
        return null;
    }
    const queue = new PriorityQueue<{vertex: GraphVertex<T>, visitedKeys: Array<string>}>();
    const vertices = graph.getVertexs();
    if (vertices.length <= 1){
        return { cost: 0, path: [] };
    }
    const min = getDown(vertices);
    queue.enqueue({vertex: vertices[0], visitedKeys: []}, -min);
    // 优先级取负数
    let globalMin = getUp(vertices[0], vertices.length);
    let globalMinPath;
    while (!queue.isEmpty()){
        const { Value : node, Priority: cost} = queue.dequeue();
        const currentVertex = node.vertex;
        const visitedKeys = [...node.visitedKeys];
        visitedKeys.push(currentVertex.Key);
        const visitedVertexSet = HashSet.fromArray(visitedKeys);
        let isHasNoVisitedNeighbors = true;
        currentVertex.getNeighbors().forEach(function(neighbor) {
            if (visitedVertexSet.has(neighbor.Key)) {
                return;
            }
            isHasNoVisitedNeighbors = false;
            const currentCost = getLb(graph, visitedKeys, neighbor, vertices);
            // 通过以求得的最优解判断上界
            if (currentCost <= globalMin) {
                queue.enqueue({vertex: neighbor, visitedKeys}, -currentCost);
            }
        });
        if (isHasNoVisitedNeighbors && globalMin <= Math.abs(cost)) {
            globalMin = Math.abs(cost);
            globalMinPath = visitedKeys;
        }
    }
    return { cost: globalMin, path: globalMinPath };
}

function getLb<T>(
    graph: Graph<T>,
    visitedKeys: Array<string>,
    currentVertex: GraphVertex<T>,
    vertices: Array<GraphVertex<T>>){
    let sumCost = 0;
    for (let index = 0; index < visitedKeys.length - 1; index++) {
        // tslint:disable-next-line:no-shadowed-variable
        const currentVertex = graph.findVertex(visitedKeys[index]);
        sumCost += currentVertex.getEdge(visitedKeys[index + 1]).Weight;
    }
    // 已经经历过的路径花费的两倍
    const firstVertex = graph.findVertex(visitedKeys[0]);
    const lastVertex = graph.findVertex(visitedKeys[visitedKeys.length - 1]);
    sumCost += lastVertex.getEdge(currentVertex.Key).Weight;
    sumCost *= 2;
    const tempSet = HashSet.fromArray(visitedKeys);
    tempSet.add(currentVertex.Key);
    // 起点最近花费
    let firstOutMin = getMin(firstVertex, tempSet);
    // 终点最近花费
    let lastOutMin = getMin(currentVertex, tempSet);
    // 都访问过，证明已回到起点
    if (!lastOutMin){
        firstOutMin = lastOutMin = currentVertex.getEdge(visitedKeys[0]);
    }
    if (!firstOutMin){
        return Infinity;
    }
    sumCost += (firstOutMin.Weight + lastOutMin.Weight);
    // 未经过点的最小的出度和入度
    vertices.forEach(function(vertex) {
        if (!tempSet.has(vertex.Key)) {
            const minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
            sumCost += (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
        }
    });
    return sumCost / 2;
}

function linkListToArray<T>(linkList: LinkList<T>){
    let head = linkList.getHeadNode();
    const arr: Array<T> = [];
    while (head){
        arr.push(head.Value);
        head = head.Next;
    }
    return arr;
}

function getDown<T>(vertices: Array<GraphVertex<T>>){
    return vertices.reduce(function(ori, vertex){
        const minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
        return ori + (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
    }, 0) / 2;
}

/**
 * 获取上界（贪心算法）
 * @param vertex
 * @param length
 */
function getUp<T>(vertex: GraphVertex<T>, length: number){
    let currentVertex = vertex;
    let lastEdge;
    const visitedSet = new HashSet(length);
    visitedSet.add(currentVertex.Key);
    let count = 1;
    let sumWeight = 0;
    while (count < length) {
        lastEdge = getMin(currentVertex, visitedSet);
        if (!lastEdge) {
            throw new Error("the graph is not connected");
        }
        currentVertex = lastEdge.EndVertex;
        visitedSet.add(currentVertex.Key);
        sumWeight += lastEdge.Weight;
        count++;
    }
    const circleEdge = currentVertex.getEdge(vertex.Key);
    if (!circleEdge) {
        throw new Error("the graph is not connected");
    }
    sumWeight += circleEdge.Weight;
    visitedSet.clear();
    return sumWeight;
}

function getMin<T>(vertex: GraphVertex<T>, visitedSet: HashSet<string>){
    let head = vertex.getEdges().getHeadNode();
    let min;
    while (head) {
        // tslint:disable-next-line:no-shadowed-variable
        const vertex = head.Value;
        head = head.Next;
        if (visitedSet.has(vertex.EndVertex.Key)) {
            continue;
        }
        if (!min || min.Weight > vertex.Weight) {
            min = vertex;
        }
    }
    return min;
}

/**
 * 获取下界
 * @param edges
 */
function getTwoMin<T>(edges: Array<GraphEdge<T>>){
    if (!edges.length){
        throw new Error("the vertex hasn't edges");
    }
    const length = edges.length;
    let firstMin: GraphEdge<T>, secondMin: GraphEdge<T>;
    let beginIndex = 0;
    // 奇数时从第二个开始
    if (length & 1){
        beginIndex = 1;
        firstMin = secondMin = edges[0];
    }else{
        // 偶数时从第三个开始
        beginIndex = 2;
        firstMin = edges[1].Weight > edges[0].Weight ? edges[1] : edges[0];
        secondMin = firstMin === edges[0] ? edges[1] : edges[0];
    }
    let lt: GraphEdge<T>, gt: GraphEdge<T>;
    for (let index = beginIndex; index < edges.length; index += 2) {
        const first = edges[beginIndex];
        const second = edges[beginIndex + 1];
        if (first.Weight > second.Weight){
            lt = second;
            gt = first;
        }else{
            lt = first;
            gt = second;
        }
        if (lt.Weight > secondMin.Weight){
            continue;
        }
        if (gt.Weight <= firstMin.Weight){
            firstMin = lt;
            secondMin = gt;
        }else{
            secondMin = lt;
        }
    }
    return {
        firstMin,
        secondMin,
    };
}
