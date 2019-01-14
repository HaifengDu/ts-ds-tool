import { HashSet } from "../../hashset/HashSet";
import PriorityQueue from "../../priorityqueue/PriorityQueue";
export function tspBranchAndBound(graph) {
    if (!graph) {
        return null;
    }
    const queue = new PriorityQueue();
    const vertices = graph.getVertexs();
    if (vertices.length <= 1) {
        return { cost: 0, path: [] };
    }
    const min = getDown(vertices);
    queue.enqueue({ vertex: vertices[0], visitedKeys: [] }, -min);
    let globalMin = getUp(vertices[0], vertices.length);
    let globalMinPath;
    while (!queue.isEmpty()) {
        const { Value: node, Priority: cost } = queue.dequeue();
        const currentVertex = node.vertex;
        const visitedKeys = [...node.visitedKeys];
        visitedKeys.push(currentVertex.Key);
        const visitedVertexSet = HashSet.fromArray(visitedKeys);
        let isHasNoVisitedNeighbors = true;
        currentVertex.getNeighbors().forEach(function (neighbor) {
            if (visitedVertexSet.has(neighbor.Key)) {
                return;
            }
            isHasNoVisitedNeighbors = false;
            const currentCost = getLb(graph, visitedKeys, neighbor, vertices);
            if (currentCost <= globalMin) {
                queue.enqueue({ vertex: neighbor, visitedKeys }, -currentCost);
            }
        });
        if (isHasNoVisitedNeighbors && globalMin <= Math.abs(cost)) {
            globalMin = Math.abs(cost);
            globalMinPath = visitedKeys;
        }
    }
    return { cost: globalMin, path: globalMinPath };
}
function getLb(graph, visitedKeys, currentVertex, vertices) {
    let sumCost = 0;
    for (let index = 0; index < visitedKeys.length - 1; index++) {
        const currentVertex = graph.findVertex(visitedKeys[index]);
        sumCost += currentVertex.getEdge(visitedKeys[index + 1]).Weight;
    }
    const firstVertex = graph.findVertex(visitedKeys[0]);
    const lastVertex = graph.findVertex(visitedKeys[visitedKeys.length - 1]);
    sumCost += lastVertex.getEdge(currentVertex.Key).Weight;
    sumCost *= 2;
    const tempSet = HashSet.fromArray(visitedKeys);
    tempSet.add(currentVertex.Key);
    let firstOutMin = getMin(firstVertex, tempSet);
    let lastOutMin = getMin(currentVertex, tempSet);
    if (!lastOutMin) {
        firstOutMin = lastOutMin = currentVertex.getEdge(visitedKeys[0]);
    }
    if (!firstOutMin) {
        return Infinity;
    }
    sumCost += (firstOutMin.Weight + lastOutMin.Weight);
    vertices.forEach(function (vertex) {
        if (!tempSet.has(vertex.Key)) {
            const minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
            sumCost += (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
        }
    });
    return sumCost / 2;
}
function linkListToArray(linkList) {
    let head = linkList.getHeadNode();
    const arr = [];
    while (head) {
        arr.push(head.Value);
        head = head.Next;
    }
    return arr;
}
function getDown(vertices) {
    return vertices.reduce(function (ori, vertex) {
        const minVertices = getTwoMin(linkListToArray(vertex.getEdges()));
        return ori + (minVertices.firstMin.Weight + minVertices.secondMin.Weight);
    }, 0) / 2;
}
function getUp(vertex, length) {
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
function getMin(vertex, visitedSet) {
    let head = vertex.getEdges().getHeadNode();
    let min;
    while (head) {
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
function getTwoMin(edges) {
    if (!edges.length) {
        throw new Error("the vertex hasn't edges");
    }
    const length = edges.length;
    let firstMin, secondMin;
    let beginIndex = 0;
    if (length & 1) {
        beginIndex = 1;
        firstMin = secondMin = edges[0];
    }
    else {
        beginIndex = 2;
        firstMin = edges[1].Weight > edges[0].Weight ? edges[1] : edges[0];
        secondMin = firstMin === edges[0] ? edges[1] : edges[0];
    }
    let lt, gt;
    for (let index = beginIndex; index < edges.length; index += 2) {
        const first = edges[beginIndex];
        const second = edges[beginIndex + 1];
        if (first.Weight > second.Weight) {
            lt = second;
            gt = first;
        }
        else {
            lt = first;
            gt = second;
        }
        if (lt.Weight > secondMin.Weight) {
            continue;
        }
        if (gt.Weight <= firstMin.Weight) {
            firstMin = lt;
            secondMin = gt;
        }
        else {
            secondMin = lt;
        }
    }
    return {
        firstMin,
        secondMin,
    };
}
