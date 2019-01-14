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
    deleteNode(arg: T): this;
    getSkipTables(): SkipListNode<T>[][];
    toString(): string;
    private compare;
    private findUpdateNodes;
    private insertNode;
}
