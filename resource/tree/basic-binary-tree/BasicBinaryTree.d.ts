import { BasicBinaryTreeNode } from "./BasicBinaryTreeNode";
export declare class BasicBinaryTree {
    static preTraversal<T = any>(tree: BasicBinaryTreeNode<T>): T[];
    private static _preTraversal;
    static inTraversal<T = any>(tree: BasicBinaryTreeNode<T>): T[];
    private static _inTraversal;
    static postOrderTraversal<T = any>(tree: BasicBinaryTreeNode<T>): T[];
    private static _postOrderTraversal;
    static getHeight<T = any>(tree: BasicBinaryTreeNode<T>): number;
}
