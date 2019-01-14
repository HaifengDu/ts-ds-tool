export declare class HashTable<T> {
    private buckets;
    private count;
    private threshold;
    private keys;
    private static DEFAULT_TABLE_SIZE;
    private static readonly LOADFACTOR;
    static setDefaultTableSize(size: number): void;
    readonly Count: number;
    readonly TableSize: number;
    constructor(hashTableSize?: number);
    put(key: any, value: T): this;
    get(key: any): T;
    remove(key: any): boolean;
    contains(key: any): boolean;
    getKeys(): Array<string>;
    getOrignalKeys(): Array<any>;
    values(): Array<T>;
    clear(): void;
    getHashKey(key: any): number;
    toString(): string;
    private iterate;
    private rehash;
    private mod;
}
