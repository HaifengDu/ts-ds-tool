export declare class DoubleLinkNode<T> {
    private value;
    private next;
    private prev;
    constructor(value: T, next?: DoubleLinkNode<T>, prev?: DoubleLinkNode<T>);
    readonly Value: T;
    readonly Next: DoubleLinkNode<T>;
    readonly Prev: DoubleLinkNode<T>;
    setValue(value: T): void;
    setNext(node: DoubleLinkNode<T>): void;
    toString(): string;
}
