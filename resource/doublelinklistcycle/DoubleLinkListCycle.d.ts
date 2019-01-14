import { DoubleLinkListNode } from "../doublelinklist/ZKDoubleLinkListNode";
import { IEnumerable } from "../interface/IEnumerable";
import { IEnumerator } from "../interface/IEnumerator";
export declare class DoubleLinkListCycle<T> implements IEnumerable<T> {
    private headNode;
    private tailNode;
    private size;
    constructor();
    readonly Size: number;
    append(node: T): this;
    prepend(node: T): this;
    private emptyList;
    shift(): DoubleLinkListNode<T>;
    pop(): DoubleLinkListNode<T>;
    deleteNode(arg: ((item: T) => boolean) | T): number[];
    findNode(arg: ((item: T) => boolean) | T): DoubleLinkListNode<T>;
    getHeadNode(): DoubleLinkListNode<T>;
    getTailNode(): DoubleLinkListNode<T>;
    isEmpty(): boolean;
    toString(): string;
    getEnumerator(): IEnumerator<T>;
}
export default DoubleLinkListCycle;
