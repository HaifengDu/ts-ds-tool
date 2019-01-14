import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
export class AvlTree extends BinarySearchTree {
    constructor(compareKey) {
        super(compareKey);
    }
    insert(value) {
        if (value === null || value === undefined) {
            return;
        }
        super.insert(value);
        let node = this.find(value);
        while (node) {
            const temp = node.parent;
            this.blanceNode(node);
            node = temp;
        }
        return node;
    }
    remove(value) {
        if (value === null || value === undefined) {
            return false;
        }
        if (!this.Root) {
            return false;
        }
        const node = this.find(value);
        const result = this.removeNode(node);
        if (typeof result === "boolean" && !result) {
            return false;
        }
        let balanceNode = result.nodeSuccessor;
        while (balanceNode) {
            const temp = balanceNode.parent;
            this.blanceNode(balanceNode);
            balanceNode = temp;
        }
        return true;
    }
    blanceNode(node) {
        if (node.galanceFactor() > 1) {
            if (node.Left.galanceFactor() > 0) {
                this.rotateLeftLeft(node);
            }
            else {
                this.rotateLeftRight(node);
            }
        }
        else if (node.galanceFactor() < -1) {
            if (node.Right.galanceFactor() > 0) {
                this.rotateRightLeft(node);
            }
            else {
                this.rotateRightRight(node);
            }
        }
    }
    rotateLeftLeft(node) {
        const left = node.Left;
        let nodeIsLeft = false;
        if (node.parent) {
            nodeIsLeft = node.parent.Left === node;
        }
        if (node.parent) {
            if (nodeIsLeft) {
                node.parent.setLeft(left);
            }
            else {
                node.parent.setRight(left);
            }
        }
        else {
            this.Root = left;
            this.Root.parent = null;
        }
        node.setLeft(null);
        if (left.Right) {
            node.setLeft(left.Right);
        }
        left.setRight(node);
    }
    rotateLeftRight(node) {
        const left = node.Left;
        const leftRightNode = left.Right;
        left.setRight(null);
        if (leftRightNode.Left) {
            left.setRight(leftRightNode.Left);
        }
        leftRightNode.setLeft(left);
        node.setLeft(leftRightNode);
        this.rotateLeftLeft(node);
    }
    rotateRightRight(node) {
        const right = node.Right;
        let nodeIsLeft = false;
        if (node.parent) {
            nodeIsLeft = node.parent.Left === node;
        }
        if (node.parent) {
            if (nodeIsLeft) {
                node.parent.setRight(right);
            }
            else {
                node.parent.setLeft(right);
            }
        }
        else {
            this.Root = right;
            this.Root.parent = null;
        }
        node.setRight(null);
        if (right.Left) {
            node.setRight(right.Left);
        }
        right.setLeft(node);
    }
    rotateRightLeft(node) {
        const right = node.Right;
        const rightLeftNode = right.Left;
        right.setLeft(null);
        if (rightLeftNode.Right) {
            right.setLeft(rightLeftNode.Right);
        }
        rightLeftNode.setRight(right);
        node.setRight(rightLeftNode);
        this.rotateRightRight(node);
    }
}
