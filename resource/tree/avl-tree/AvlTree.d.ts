import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
import { BinarySearchTreeNode } from "../binary-search-tree/BinarySearchTreeNode";
export declare class AvlTree<T> extends BinarySearchTree<T> {
    constructor(compareKey?: keyof T);
    insert(value: T): BinarySearchTreeNode<T>;
    remove(value: T): boolean;
    private blanceNode;
    private rotateLeftLeft;
    private rotateLeftRight;
    private rotateRightRight;
    private rotateRightLeft;
}
