export declare class TreeMap<K = string, T = any> {
    private size;
    private tree;
    constructor();
    readonly Count: number;
    put(key: K, value: T): this;
    private get;
    getVal(key: K): T;
    clear(): void;
    remove(key: K): boolean;
    keys(): K[];
    values(): T[];
    contains(key: K): boolean;
    private getHashKey;
}
