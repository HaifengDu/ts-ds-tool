import { AbstractSet } from "../interface/AbstractSet";
export declare class HashSet<T = string> extends AbstractSet<T> {
    private hashtable;
    private static DEFAULT_TABLE_SIZE;
    readonly Size: number;
    constructor(capacity?: number);
    add(item: T): this;
    has(element: T): boolean;
    remove(element: T): boolean;
    clear(): void;
    entries(): any[];
    diff(set: AbstractSet<T>): Array<T>;
    union(set: AbstractSet<T>): Array<T>;
    intersect(set: AbstractSet<T>): Array<T>;
    static fromArray<T>(array: Array<T>): HashSet<T>;
}
