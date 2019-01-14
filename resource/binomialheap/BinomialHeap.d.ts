import { ICompare } from "../interface/ICompare";
import { LinkNode } from "../linklist/LinkNode";
export interface HeapNode<T> {
    value: T;
    degree: number;
    child?: LinkNode<HeapNode<T>>;
    parent?: LinkNode<HeapNode<T>>;
}
export declare class BinomialHeap<T = number> {
    private compare;
    private head;
    private count;
    constructor(compare?: ICompare<T>);
    readonly Count: number;
    readonly Head: LinkNode<HeapNode<T>>;
    private setHead;
    clear(): void;
    isEmpty(): boolean;
    insert(value: T): LinkNode<HeapNode<T>>;
    deleteExtremum(): T;
    private _findExtremum;
    findExtremum(): T;
    union(heap: BinomialHeap<T>): this;
    private link;
    private mergeHeaps;
}
