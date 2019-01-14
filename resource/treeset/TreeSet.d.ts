import { AbstractSet } from "../interface/AbstractSet";
export declare class TreeSet<T> extends AbstractSet<T> {
    private tree;
    private size;
    constructor(compareKey?: keyof T);
    add(item: T): this;
    entries(): Array<T>;
    has(item: T): boolean;
    remove(item: T): boolean;
    diff(set: AbstractSet<T>): Array<T>;
    union(set: AbstractSet<T>): Array<T>;
    intersect(set: AbstractSet<T>): Array<T>;
    readonly Size: number;
}
