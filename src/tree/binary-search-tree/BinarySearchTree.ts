import { BasicBinaryTree } from "../basic-binary-tree/BasicBinaryTree";
import { BinarySearchTreeNode } from "./BinarySearchTreeNode";

export class BinarySearchTree<T= number>{
    private root?: BinarySearchTreeNode<T>;
    constructor(private compareKey?: keyof T){
    }

    get Root(){
        return this.root;
    }

    set Root(node: BinarySearchTreeNode<T>){
        this.root = node;
    }

    insert(value: T){
        if (value === null || value === undefined){
            return;
        }
        if (!this.root){
            this.root = new BinarySearchTreeNode(value);
            return this.root;
        }
        return this.root.insert(value, this.compareKey);
    }

    remove(value: T){
        const node = this.find(value);
        if (!node){
            return false;
        }
        this.removeNode(node);
        return true;
    }

    clear(){
        this.Root = null;
    }

    /**
     * 删除节点
     * @param node
     * @returns 删除节点的父节点
     */
    protected removeNode(node: BinarySearchTreeNode<T>){
        if (!node) {
            return false;
        }
        let nodeSuccessor: BinarySearchTreeNode<T>;
        let successorChild: BinarySearchTreeNode<T> = null;
        if (!node.Left || !node.Right) {
            nodeSuccessor = node;
        } else {
            nodeSuccessor = this.successor(node);
        }
        if (nodeSuccessor.Left) {
            successorChild = nodeSuccessor.Left as BinarySearchTreeNode<T>;
        } else {
            successorChild = nodeSuccessor.Right as BinarySearchTreeNode<T>;
        }
        if (successorChild){
            successorChild.parent = nodeSuccessor.parent;
        }
        if (!nodeSuccessor.parent) {
            this.root = successorChild;
        } else if (nodeSuccessor.parent.Left === nodeSuccessor) {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setLeft(successorChild);
        } else {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setRight(successorChild);
        }
        node.setValue(nodeSuccessor.Value);
        return {successorChild, nodeSuccessor};
    }

    private successor(node: BinarySearchTreeNode<T>) {
        let nodeSuccessor = node.Right;
        while (nodeSuccessor.Left) {
          nodeSuccessor = nodeSuccessor.Left;
        }
        return nodeSuccessor as BinarySearchTreeNode<T>;
    }

    private copyNode(source: BinarySearchTreeNode<T>){
        const node = new BinarySearchTreeNode<T>(source.Value);
        // tslint:disable-next-line:forin
        for (const key in source){
            node[key] = source[key];
        }
        return node;
    }

    contains(value: T) {
        if (!this.root){
            return false;
        }
        return this.root.contains(value, this.compareKey);
    }

    find(value: T){
        if (!this.root){
            return null;
        }
        return this.root.find(value, this.compareKey);
    }

    getAscSeq(){
        return BasicBinaryTree.inTraversal(this.root);
    }

    toString(){
        if (!this.root){
            return "";
        }
        return this.root.toString();
    }
}
