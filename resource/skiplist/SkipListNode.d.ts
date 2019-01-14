export declare class SkipListNode<T> {
    private readonly item;
    private next;
    private prev;
    constructor(item?: T);
    getItem(): T;
    getNext(level: number): SkipListNode<T>;
    setNext(level: number, node: SkipListNode<T>): void;
    getPrev(level: number): SkipListNode<T>;
    setPrev(level: number, node: SkipListNode<T>): void;
    deleteLastLevel(): void;
    getNextLevel(): number;
    getPrevLevel(): number;
    getHeight(): number;
}
