import { Collection } from "../Collection";
export declare class Stack<T> extends Collection<T> {
    private linkList;
    constructor();
    push(node: T): import("../linklist/LinkNode").LinkNode<T>;
    pop(): T;
    peek(): T;
    isEmpty(): boolean;
    toString(): string;
    protected __iterate(fn: (item: T, index: number) => void): void;
    toArray(): T[];
}
export default Stack;
