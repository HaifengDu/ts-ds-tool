import { BinarySearchTreeNode } from "./BinarySearchTreeNode";
export declare class BinarySearchTree<T = number> {
    private compareKey?;
    private root?;
    constructor(compareKey?: keyof T);
    Root: BinarySearchTreeNode<T>;
    insert(value: T): BinarySearchTreeNode<T>;
    remove(value: T): boolean;
    protected removeNode(node: BinarySearchTreeNode<T>): false | {
        successorChild: BinarySearchTreeNode<T>;
        nodeSuccessor: BinarySearchTreeNode<T>;
    };
    private successor;
    private copyNode;
    contains(value: T): boolean;
    find(value: T): BinarySearchTreeNode<T>;
    getAscSeq(): T[];
    toString(): string;
}
