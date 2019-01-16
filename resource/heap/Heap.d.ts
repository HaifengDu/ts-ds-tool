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
    add(item: T): this;
    remove(item: ((item: T) => boolean) | T): boolean;
    toString(): string;
    isEmpty(): boolean;
    find(arg: any): T;
    findAll(arg: any): T[];
    clear(): void;
    entries(): T[];
    private findAllIndex;
    protected abstract compare(a: any, b: any): boolean;
}
