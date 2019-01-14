import { BasicBinaryTreeNode } from "../basic-binary-tree/BasicBinaryTreeNode";
export declare enum ENodeColor {
    Red = 1,
    Black = 2
}
export declare class BinarySearchTreeNode<T> extends BasicBinaryTreeNode<T> {
    private color;
    constructor(value: T);
    readonly Color: ENodeColor;
    setColor(color: ENodeColor): void;
    setValue(value: T): void;
    find(value: T, compareKey?: keyof T): BinarySearchTreeNode<T>;
    findMin(): BinarySearchTreeNode<T>;
    findMax(): BinarySearchTreeNode<T>;
    insert(value: T, compareKey?: keyof T): BinarySearchTreeNode<T>;
    contains(value: T, compareKey?: keyof T): boolean;
}
