import { Collection } from "../Collection";
export declare class PriorityQueueNode<T> {
    private value;
    private priority;
    constructor(value: T, priority: number);
    readonly Value: T;
    readonly Priority: number;
    toString(): string;
}
export declare class PriorityQueue<T> extends Collection<T> {
    private heap;
    constructor();
    peek(): PriorityQueueNode<T>;
    enqueue(value: T, priority: number): this;
    dequeue(): PriorityQueueNode<T>;
    changePriority(value: T, priority: number): void;
    has(value: T): boolean;
    clear(): void;
    isEmpty(): boolean;
    toString(): string;
    protected __iterate(fn: (item: T, index: number) => void): void;
}
export default PriorityQueue;
