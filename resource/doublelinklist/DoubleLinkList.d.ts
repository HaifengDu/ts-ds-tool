import { Collection } from "../Collection";
import { DoubleLinkNode } from "./DoubleLinkNode";
export declare class DoubleLinkList<T> extends Collection<DoubleLinkNode<T>> {
    private headNode;
    private tailNode;
    private size;
    constructor();
    readonly Size: number;
    append(value: T): DoubleLinkNode<T>;
    prepend(value: T): DoubleLinkNode<T>;
    private emptyList;
    clear(): void;
    deleteNode(arg: ((item: T) => boolean) | T): boolean;
    findNode(arg: ((item: T) => boolean) | T): DoubleLinkNode<T>;
    insertAfter(value: T, oriNode: DoubleLinkNode<T>): boolean;
    getHeadNode(): DoubleLinkNode<T>;
    getTailNode(): DoubleLinkNode<T>;
    shift(): DoubleLinkNode<T>;
    pop(): DoubleLinkNode<T>;
    protected __iterate(fn: (item: DoubleLinkNode<T>, index: number) => void): void;
    toString(): string;
    static fromArray<K>(arr: Array<K>): DoubleLinkList<K>;
}
export default DoubleLinkList;
