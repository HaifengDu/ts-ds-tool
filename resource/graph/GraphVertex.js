import LinkList from "../linklist/LinkList";
import { toString } from "../util";
import { GraphEdge } from "./GraphEdge";
export class GraphVertex {
    constructor(node, property) {
        this.indegree = 0;
        if (property) {
            const key = node[property];
            this.key = toString(key);
        }
        else {
            this.key = toString(node);
        }
        this.node = node;
        this.edges = new LinkList();
    }
    set InDegree(value) {
        this.indegree = value;
    }
    get Key() {
        return this.key;
    }
    get Node() {
        return this.node;
    }
    addUndirectedEdge(endVertex, weight) {
        if (!endVertex) {
            throw new Error("end vertex is not empty");
        }
        const exist = this.edges.findNode(item => item.EndVertex.Key === endVertex.Key);
        if (exist) {
            return false;
        }
        const edge = new GraphEdge(this, endVertex, weight);
        this.edges.append(edge);
        endVertex.addUndirectedEdge(this, weight);
    }
    addEdge(endVertex, weight) {
        if (!endVertex) {
            throw new Error("end vertex is not empty");
        }
        const exist = this.edges.findNode(item => item.EndVertex.Key === endVertex.Key);
        if (exist) {
            return false;
        }
        const edge = new GraphEdge(this, endVertex, weight);
        this.edges.append(edge);
        endVertex.InDegree = endVertex.getInDegree() + 1;
        return true;
    }
    getEdges() {
        return this.edges;
    }
    getEdge(endKey) {
        const edge = this.edges.findNode(item => item.EndVertex.Key === endKey);
        if (edge) {
            return edge.Value;
        }
        return null;
    }
    deleteEdgeByKey(endKey, directed = true) {
        const edge = this.edges.findNode(item => item.EndVertex.key === endKey);
        const success = this.edges.deleteNode(item => item.EndVertex.Key === endKey);
        if (success) {
            if (directed) {
                edge.Value.EndVertex.InDegree = edge.Value.EndVertex.getInDegree() - 1;
            }
            else {
                edge.Value.EndVertex.deleteEdgeByKey(edge.Value.StartVertex.key, true);
            }
        }
        return success;
    }
    deleteEdge(edge) {
        const success = this.edges.deleteNode(edge);
        if (success) {
            edge.EndVertex.InDegree = edge.EndVertex.getInDegree() - 1;
        }
        return success;
    }
    hasEdge() {
        return !!this.edges.Size;
    }
    getInDegree() {
        return this.indegree;
    }
    getOutDegree() {
        return this.edges.Size;
    }
    getDegree() {
        return this.getInDegree() + this.getOutDegree();
    }
    getNeighbors() {
        const arr = [];
        let node = this.edges.getHeadNode();
        while (node) {
            arr.push(node.Value.EndVertex);
            node = node.Next;
        }
        return arr;
    }
}
