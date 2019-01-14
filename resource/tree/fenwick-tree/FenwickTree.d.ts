export declare class FenwickTree {
    private tableSize;
    private treeArray;
    readonly TreeArray: number[];
    readonly Count: number;
    constructor(tableSize: number);
    increase(position: number, value: number): this;
    query(position: number): number;
    queryRange(start: number, end: number): number;
}
