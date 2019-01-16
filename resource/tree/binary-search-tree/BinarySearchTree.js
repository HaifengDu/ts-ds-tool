import { BasicBinaryTree } from "../basic-binary-tree/BasicBinaryTree";
import { BinarySearchTreeNode } from "./BinarySearchTreeNode";
export class BinarySearchTree {
    constructor(compareKey) {
        this.compareKey = compareKey;
    }
    get Root() {
        return this.root;
    }
    set Root(node) {
        this.root = node;
    }
    insert(value) {
        if (value === null || value === undefined) {
            return;
        }
        if (!this.root) {
            this.root = new BinarySearchTreeNode(value);
            return this.root;
        }
        return this.root.insert(value, this.compareKey);
    }
    remove(value) {
        const node = this.find(value);
        if (!node) {
            return false;
        }
        this.removeNode(node);
        return true;
    }
    clear() {
        this.Root = null;
    }
    removeNode(node) {
        if (!node) {
            return false;
        }
        let nodeSuccessor;
        let successorChild = null;
        if (!node.Left || !node.Right) {
            nodeSuccessor = node;
        }
        else {
            nodeSuccessor = this.successor(node);
        }
        if (nodeSuccessor.Left) {
            successorChild = nodeSuccessor.Left;
        }
        else {
            successorChild = nodeSuccessor.Right;
        }
        if (successorChild) {
            successorChild.parent = nodeSuccessor.parent;
        }
        if (!nodeSuccessor.parent) {
            this.root = successorChild;
        }
        else if (nodeSuccessor.parent.Left === nodeSuccessor) {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setLeft(successorChild);
        }
        else {
            nodeSuccessor = this.copyNode(nodeSuccessor);
            nodeSuccessor.parent.setRight(successorChild);
        }
        node.setValue(nodeSuccessor.Value);
        return { successorChild, nodeSuccessor };
    }
    successor(node) {
        let nodeSuccessor = node.Right;
        while (nodeSuccessor.Left) {
            nodeSuccessor = nodeSuccessor.Left;
        }
        return nodeSuccessor;
    }
    copyNode(source) {
        const node = new BinarySearchTreeNode(source.Value);
        for (const key in source) {
            node[key] = source[key];
        }
        return node;
    }
    contains(value) {
        if (!this.root) {
            return false;
        }
        return this.root.contains(value, this.compareKey);
    }
    find(value) {
        if (!this.root) {
            return null;
        }
        return this.root.find(value, this.compareKey);
    }
    getAscSeq() {
        return BasicBinaryTree.inTraversal(this.root);
    }
    toString() {
        if (!this.root) {
            return "";
        }
        return this.root.toString();
    }
}
