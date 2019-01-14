import { DisjointSetItem } from "./DisjointSetItem";
export declare class DisjointSet<T = string> {
    private key?;
    private items;
    private rootItems;
    readonly RootItems: {
        [index: string]: DisjointSetItem<T>;
    };
    constructor(key?: keyof T);
    makeSet(value: T): this;
    find(value: T): string;
    union(value1: T, value2: T): this;
    inSameSet(value1: T, value2: T): boolean;
}
export default DisjointSet;
