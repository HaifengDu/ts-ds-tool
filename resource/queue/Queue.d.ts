import { Collection } from "../Collection";
import { LinkNode } from "../linklist/LinkNode";
export declare class Queue<T> extends Collection<LinkNode<T>> {
    private linkList;
    constructor();
    isEmpty(): boolean;
    peek(): T;
    enqueue(value: T): void;
    dequeue(): T;
    toString(): string;
    protected __iterate(fn: (item: LinkNode<T>, index: number) => void): void;
}
