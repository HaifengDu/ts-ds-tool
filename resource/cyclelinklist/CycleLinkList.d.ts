import { IEnumerable } from "../interface/IEnumerable";
import IEnumerator from "../interface/IEnumerator";
import { LinkNode } from "../linklist/LinkNode";
export declare class CycleLinkList<T> implements IEnumerable<T> {
    private linklist;
    constructor();
    private setCircle;
    readonly Size: number;
    append(value: T): LinkNode<T>;
    prepend(value: T): LinkNode<T>;
    deleteNode(arg: ((item: T) => boolean) | T): boolean;
    findNode(arg: ((item: T) => boolean) | T): LinkNode<T>;
    getHeadNode(): LinkNode<T>;
    getTailNode(): LinkNode<T>;
    shift(): LinkNode<T>;
    pop(): LinkNode<T>;
    insertAfter(value: T, oriNode: LinkNode<T>): boolean;
    clear(): void;
    toString(): string;
    static fromArray<K>(arr: Array<K>): CycleLinkList<K>;
    toArray(): LinkNode<T>[];
    getEnumerator(): IEnumerator<T>;
}
export default CycleLinkList;
