import { Graph } from "../../../graph/Graph";
import { GraphVertex } from "../../../graph/GraphVertex";

export function floydWarshall<T>(graph: Graph<T> , startVertex ?: GraphVertex<T>){
    /**
     * 有dp思想
     * 从i点到达j点两种情况
     *   1、经过路径中的一点k
     *   2、不经过路径中的k点
     * 递推公式
     *   d[i,j] = min(d[i,j] , d[i,k] + d[k,j])
     */
    if (!startVertex){
        startVertex = graph.getVertexs()[0];
    }
    if (!startVertex || !graph.findVertex(startVertex.Key)){
        return {};
    }
    const matrixResult = graph.toAdjacencyMatrix();
    const matrix = matrixResult.matrix;

    for (let k = 0 ; k < matrix.length ; k++){
        for (let i = 0 ; i < matrix.length ; i++){
            for (let j = 0 ; j < matrix.length ; j++){
                if (matrix[i][j] > matrix[i][k] + matrix[k][j]){
                    matrix[i][j] = matrix[i][k] + matrix[k][j];
                }
            }
            if (matrix[i][i] < 0){
                throw new Error("Graph contains negative weight cycle");
            }
        }
    }
    const keyIndexs = matrixResult.keyIndexs;
    const startIndex = keyIndexs[startVertex.Key];
    const distance: {[index: string]: number} = {};
    // tslint:disable-next-line:forin
    for (const key in keyIndexs) {
        distance[key] = matrix[startIndex][keyIndexs[key]];
    }
    // TODO:路径可根据矩阵搜索
    return {
        distance,
    };
}
