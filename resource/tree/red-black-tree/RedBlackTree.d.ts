import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
import { BinarySearchTreeNode } from "../binary-search-tree/BinarySearchTreeNode";
export declare class RedBlackTree<T> extends BinarySearchTree<T> {
    constructor(compareKey?: keyof T);
    clear(): void;
    insert(value: T): BinarySearchTreeNode<T>;
    remove(value: T): boolean;
    getSuccessor(t: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>;
    private deleteFixUp;
    private blance;
    private rightRotate;
    private leftRightRotate;
    private leftRotate;
    private rightLeftRotate;
    private swapColor;
}
