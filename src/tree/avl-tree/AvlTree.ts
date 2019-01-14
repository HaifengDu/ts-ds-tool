import { BasicBinaryTreeNode } from "../basic-binary-tree/BasicBinaryTreeNode";
import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
import { BinarySearchTreeNode } from "../binary-search-tree/BinarySearchTreeNode";

export class AvlTree<T> extends BinarySearchTree<T>{
    constructor(compareKey?: keyof T){
        super(compareKey);
    }

    public insert(value: T){
        if (value === null || value === undefined){
            return;
        }
        super.insert(value);
        let node = this.find(value);
        while (node){
            const temp = node.parent as BinarySearchTreeNode<T>;
            this.blanceNode(node);
            node = temp;
        }
        return node;
    }

    public remove(value: T){
        /**
         * 1、搜索给定的key，确定其是否在树中；
         * 2、如果不在树中，返回null；如果在树中，执行标准的BST删除操作，并返回该删除的结点；
         * 3、检查被删除结点的所有祖先结点是否平衡，如果不平衡，则执行重平衡操作
         */
        if (value === null || value === undefined){
            return false;
        }
        if (!this.Root){
            return false;
        }
        const node = this.find(value);
        const result = this.removeNode(node);
        if (typeof result === "boolean" && !result){
            return false;
        }
        let balanceNode = result.nodeSuccessor;
        while (balanceNode){
            const temp = balanceNode.parent as BinarySearchTreeNode<T>;
            this.blanceNode(balanceNode as BinarySearchTreeNode<T>);
            balanceNode = temp;
        }
        return true;
    }

    private blanceNode(node: BinarySearchTreeNode<T>){
        if (node.balanceFactor() > 1){
            // 左高，对左节点旋转
            if (node.Left.balanceFactor() > 0){
                // 左高  左旋改节点
                // LL
                this.rotateLeftLeft(node);
            }else{
                // 右高  右旋改节点
                // LR  RR-->LL
                this.rotateLeftRight(node);
            }
        }else if (node.balanceFactor() < -1){
            // 右高，对右节点旋转
            if (node.Right.balanceFactor() > 0){
                // 左高  左旋改节点
                this.rotateRightLeft(node);
                // RL
            }else{
                // 右高  右旋改节点
                // RR
                this.rotateRightRight(node);
            }
        }
    }

    private rotateLeftLeft(node: BasicBinaryTreeNode<T>){
        const left = node.Left;
        let nodeIsLeft = false;
        if (node.parent) {
            nodeIsLeft = node.parent.Left === node;
        }
        if (node.parent){
            if (nodeIsLeft){
                node.parent.setLeft(left);
            }else{
                node.parent.setRight(left);
            }
        }else{
            this.Root = left as BinarySearchTreeNode<T>;
            this.Root.parent = null;
        }
        node.setLeft(null);
        if (left.Right){
            node.setLeft(left.Right);
        }
        left.setRight(node);
    }

    private rotateLeftRight(node: BasicBinaryTreeNode<T>){
        const left = node.Left;
        // RR node的子node(left)
        const leftRightNode = left.Right;
        left.setRight(null);

        if (leftRightNode.Left){
            left.setRight(leftRightNode.Left);
        }
        leftRightNode.setLeft(left);
        node.setLeft(leftRightNode);
        this.rotateLeftLeft(node);
    }

    private rotateRightRight(node: BasicBinaryTreeNode<T>){
        const right = node.Right;
        let nodeIsLeft = false;
        if (node.parent) {
            nodeIsLeft = node.parent.Left === node;
        }
        if (node.parent){
            if (nodeIsLeft){
                node.parent.setRight(right);
            }else{
                node.parent.setLeft(right);
            }
        }else{
            this.Root = right as BinarySearchTreeNode<T>;
            this.Root.parent = null;
        }
        node.setRight(null);
        if (right.Left){
            node.setRight(right.Left);
        }
        right.setLeft(node);
    }

    private rotateRightLeft(node: BasicBinaryTreeNode<T>){
        const right = node.Right;
        const rightLeftNode = right.Left;
        right.setLeft(null);
        if (rightLeftNode.Right){
            right.setLeft(rightLeftNode.Right);
        }
        rightLeftNode.setRight(right);
        node.setRight(rightLeftNode);
        this.rotateRightRight(node);
    }
}
