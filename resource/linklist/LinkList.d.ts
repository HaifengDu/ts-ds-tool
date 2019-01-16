import { Collection } from "../Collection";
import CycleLinkList from "../cyclelinklist/CycleLinkList";
import DoubleLinkList from "../doublelinklist/DoubleLinkList";
import { LinkNode } from "./LinkNode";
export declare class LinkList<T> extends Collection<LinkNode<T>> {
    private headNode;
    private tailNode;
    private size;
    constructor();
    readonly Size: number;
    append(value: T): LinkNode<T>;
    prepend(value: T): LinkNode<T>;
    private emptyList;
    clear(): void;
    deleteNode(arg: any): boolean;
    findNode(arg: any): LinkNode<T>;
    insertAfter(value: T, oriNode: LinkNode<T>): boolean;
    getHeadNode(): LinkNode<T>;
    getTailNode(): LinkNode<T>;
    shift(): LinkNode<T>;
    pop(): LinkNode<T>;
    protected __iterate(fn: (item: LinkNode<T>, index: number) => void): void;
    toString(): string;
    static fromArray<K>(arr: Array<K>): LinkList<K>;
    toDoubleLinkList(): DoubleLinkList<T>;
    toCycleLinkList(): CycleLinkList<T>;
}
export default LinkList;
