export declare class LinkNode<T> {
    private value;
    private next;
    constructor(value: T, next?: LinkNode<T>);
    readonly Value: T;
    readonly Next: LinkNode<T>;
    setValue(value: T): void;
    setNext(node: LinkNode<T>): void;
    toString(): string;
}
