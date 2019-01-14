export declare abstract class Heap<T> {
    private container;
    readonly Size: number;
    private getLeftChildIndex;
    private getRigthChildIndex;
    private getParentIndex;
    private getLeftChild;
    private getRightChild;
    private getParent;
    private hasLeftChild;
    private hasRightChild;
    private hasParent;
    private swap;
    private heapifyUp;
    private heapifyDown;
    poll(): T;
    peek(): T;
    add(item: T): void;
    remove(item: ((item: T) => boolean) | T): this;
    toString(): string;
    isEmpty(): boolean;
    find(arg: ((item: T) => boolean) | T): T;
    findAll(arg: ((item: T) => boolean) | T): T[];
    clear(): void;
    entries(): T[];
    private findAllIndex;
    protected abstract compare(a: any, b: any): boolean;
}
