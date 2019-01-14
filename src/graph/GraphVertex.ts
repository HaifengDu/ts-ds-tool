import LinkList from "../linklist/LinkList";
import { toString } from "../util";
import { GraphEdge } from "./GraphEdge";

export class GraphVertex<T = string>{
    private node: T;
    private key: string;

    private edges: LinkList<GraphEdge<T>>;
    private indegree = 0;

    public set InDegree(value: number){
        this.indegree = value;
    }

    public get Key(){
        return this.key;
    }

    public get Node(){
        return this.node;
    }

    public get Property(){
        return this.property;
    }

    constructor(node: T , private property ?: keyof T){
        if (property){
            const key = node[property];
            this.key = toString(key);
        }else{
            this.key = toString(node);
        }
        this.node = node;
        this.edges = new LinkList();
    }

    public addUndirectedEdge(endVertex: GraphVertex<T>, weight?: number){
        if (!endVertex){
            throw new Error("end vertex is not empty");
        }
        const exist = this.edges.findNode(item => item.EndVertex.Key === endVertex.Key);
        if (exist){
            return false;
        }
        const edge = new GraphEdge(this , endVertex , weight);
        this.edges.append(edge);
        endVertex.addUndirectedEdge(this , weight);
    }

    public addEdge(endVertex: GraphVertex<T>, weight?: number){
        if (!endVertex){
            throw new Error("end vertex is not empty");
        }
        const exist = this.edges.findNode(item => item.EndVertex.Key === endVertex.Key);
        if (exist){
            return false;
        }
        const edge = new GraphEdge(this , endVertex , weight);
        this.edges.append(edge);
        endVertex.InDegree = endVertex.getInDegree() + 1;
        return true;
    }

    public getEdges(){
        return this.edges;
    }

    public getEdge(endKey: string){
        const edge = this.edges.findNode(item => item.EndVertex.Key === endKey);
        if (edge){
            return edge.Value;
        }
        return null;
    }

    public deleteEdgeByKey(endKey: string, directed = true){
        const edge = this.edges.findNode(item => item.EndVertex.key === endKey);
        const success = this.edges.deleteNode(item => item.EndVertex.Key === endKey);
        if (success){
            if (directed){
                edge.Value.EndVertex.InDegree = edge.Value.EndVertex.getInDegree() - 1;
            }else{
                edge.Value.EndVertex.deleteEdgeByKey(edge.Value.StartVertex.key , true);
            }
        }
        return success;
    }

    public deleteEdge(edge: GraphEdge<T>){
        const success = this.edges.deleteNode(edge);
        if (success){
            edge.EndVertex.InDegree = edge.EndVertex.getInDegree() - 1;
        }
        return success;
    }

    public hasEdge(){
        return !!this.edges.Size;
    }

    public getInDegree(){
        return this.indegree;
    }

    public getOutDegree(){
        return this.edges.Size;
    }

    public getDegree(){
        return this.getInDegree() + this.getOutDegree();
    }

    /**
     * 获取相邻节点
     */
    public getNeighbors() {
        const arr: Array<GraphVertex<T>> = [];
        let node = this.edges.getHeadNode();
        while (node){
            arr.push(node.Value.EndVertex);
            node = node.Next;
        }
        return arr;
    }
}
