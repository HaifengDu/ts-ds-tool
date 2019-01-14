import { Collection } from "../Collection";
import { LinkNode } from "../linklist/LinkNode";
export declare class Stack<T> extends Collection<LinkNode<T>> {
    private linkList;
    constructor();
    push(node: T): LinkNode<T>;
    pop(): LinkNode<T>;
    peek(): T;
    isEmpty(): boolean;
    toString(): string;
    protected __iterate(fn: (item: LinkNode<T>, index: number) => void): void;
    toArray(): LinkNode<T>[];
}
export default Stack;
