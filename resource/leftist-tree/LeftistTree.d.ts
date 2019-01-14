import { ICompare } from "../interface/ICompare";
import { BasicBinaryTreeNode } from "../tree/basic-binary-tree/BasicBinaryTreeNode";
export declare class LeftistTreeNode<T = number> extends BasicBinaryTreeNode<T> {
    private rank;
    constructor(value: T, rank: number);
    Rank: number;
}
export declare class LeftistTree<T> {
    private compare;
    private root;
    private count;
    constructor(compare?: ICompare<T>, value?: T);
    readonly Root: LeftistTreeNode<T>;
    readonly Count: number;
    isEmpty(): boolean;
    private fixNode;
    private _merge;
    merge(tree2: LeftistTree<T>): this;
    findExtremum(): T;
    insert(value: T): LeftistTree<T>;
    deleteExtremum(): T;
}
