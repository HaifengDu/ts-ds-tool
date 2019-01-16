import { SkipListNode } from "./SkipListNode";
export declare class SkipList<T> {
    private compareKey?;
    private level;
    private count;
    private head;
    constructor(compareKey?: keyof T);
    readonly Level: number;
    readonly Count: number;
    readonly Head: SkipListNode<T>;
    isEmpty(): boolean;
    private randomLevel;
    findNode(item: any): SkipListNode<T>;
    insert(item: T): this;
    remove(arg: T): this;
    getSkipTables(): any[];
    toString(): any;
    private compare;
    private findUpdateNodes;
    private insertNode;
}
