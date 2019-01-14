export function floydWarshall(graph, startVertex) {
    if (!startVertex) {
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)) {
        return {};
    }
    const matrixResult = graph.toAdjacencyMatrix();
    const matrix = matrixResult.matrix;
    for (let k = 0; k < matrix.length; k++) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j] > matrix[i][k] + matrix[k][j]) {
                    matrix[i][j] = matrix[i][k] + matrix[k][j];
                }
            }
            if (matrix[i][i] < 0) {
                throw new Error("Graph contains negative weight cycle");
            }
        }
    }
    const keyIndexs = matrixResult.keyIndexs;
    const startIndex = keyIndexs[startVertex.Key];
    const distance = {};
    for (const key in keyIndexs) {
        distance[key] = matrix[startIndex][keyIndexs[key]];
    }
    return {
        distance,
    };
}
