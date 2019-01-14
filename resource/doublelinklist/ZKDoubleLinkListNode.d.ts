export declare class DoubleLinkListNode<T> {
    value: T;
    next?: DoubleLinkListNode<T>;
    pre?: DoubleLinkListNode<T>;
    constructor(value: T);
    setNext(node: DoubleLinkListNode<T>): void;
    setPre(node: DoubleLinkListNode<T>): void;
    readonly Next: DoubleLinkListNode<T>;
    readonly Prev: DoubleLinkListNode<T>;
    toString(): string;
}
