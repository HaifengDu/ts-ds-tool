
const {Queue , HashMap , dijkstra , PriorityQueue , isconnected 
    , Graph , GraphVertex , HashSet , MinHeap} = require("./dist/data-structure");

function topoSort(graph){
    if (!graph){
        return [];
    }
    const clonedGraph = graph;
    const vertices = clonedGraph.getVertexs();
    const queue = new PriorityQueue();
    vertices.forEach(item => queue.enqueue(item, -item.getInDegree()));
    const topoSortedArr = [];
    while (!queue.isEmpty()){
        const {Value: vertex , Priority: indegree} = queue.dequeue();
        if (indegree < 0){
            throw new Error("Cyclic dependency " + vertex.Key);
        }
        topoSortedArr.push(vertex);
        const head = vertex.getEdges();
        while (head.Size){
            const edge = head.getHeadNode().Value;
            vertex.deleteEdge(edge);
            queue.changePriority(edge.EndVertex, -edge.EndVertex.getInDegree());
        }
    }
    return topoSortedArr;
}

const vertexA = new GraphVertex("A");
const vertexB = new GraphVertex("B");
const vertexC = new GraphVertex("C");
const vertexD = new GraphVertex("D");
const vertexE = new GraphVertex("E");
const vertexF = new GraphVertex("F");
vertexA.addEdge(vertexB);
vertexA.addEdge(vertexC);
vertexA.addEdge(vertexD);
vertexC.addEdge(vertexB);
vertexC.addEdge(vertexE);
vertexD.addEdge(vertexE);
vertexF.addEdge(vertexD);
vertexF.addEdge(vertexE);
const graph = new Graph();
graph
.addVertex(vertexA)
.addVertex(vertexB)
.addVertex(vertexC)
.addVertex(vertexD)
.addVertex(vertexE)
.addVertex(vertexF);

const vertexs = topoSort(graph);

// const edgeSet = new HashSet();
// function getEulerCircuit(
//     graph,
//     edges,
//     startVertex,
//     existHashMap,
//     prevKey){
//     if (!startVertex){
//         startVertex = graph.getVertexs()[0];
//     }
//     if (!edges){
//         edges = [];
//     }
//     if (!startVertex || !graph.findVertex(startVertex.Key)){
//         return [];
//     }
//     existHashMap = existHashMap || new HashMap(graph.getKeys().length);
//     const nextNodes = startVertex.getNeighbors();
//     existHashMap.put(startVertex.Key , true);
//     nextNodes.forEach(item => {
//         if(item.Key === prevKey){
//             return;
//         }
//         const edgeKey = JSON.stringify([startVertex.Key,item.Key].sort((a,b) => a>b?1:-1));
//         if(!edgeSet.has(edgeKey)){
//             if (existHashMap.get(item.Key)){
//                 edges.push(startVertex.getEdge(item.Key));
//             }else{
//                 existHashMap.put(item.Key,true);
//                 getEulerCircuit(graph , edges, item , existHashMap , startVertex.Key);
//                 edges.push(startVertex.getEdge(item.Key));
//             }
//             edgeSet.add(edgeKey);
//         }
//     });
//     return edges;
// }
// const graph = new Graph(false);
// const vertexs = Array.from({length:10},(item,index) => new GraphVertex(index.toString()));
// vertexs.forEach(item => graph.addVertex(item));
// graph
// .addEdge(vertexs[0],vertexs[8])
// .addEdge(vertexs[0],vertexs[9])
// .addEdge(vertexs[8],vertexs[7])
// .addEdge(vertexs[9],vertexs[2])
// .addEdge(vertexs[9],vertexs[3])
// .addEdge(vertexs[2],vertexs[1])
// .addEdge(vertexs[3],vertexs[1])
// .addEdge(vertexs[9],vertexs[7])
// .addEdge(vertexs[7],vertexs[6])
// .addEdge(vertexs[7],vertexs[5])
// .addEdge(vertexs[6],vertexs[5]);
// const edges = getEulerCircuit(graph);
// console.log(edges);
// const map = edges.map(item => [item.StartVertex.Key,item.EndVertex.Key]);
// console.log(map);
