export declare class HashMap<T> {
    private map;
    constructor(capacity?: number);
    readonly Count: number;
    put(key: string, value: T): this;
    get(key: string): T;
    clear(): void;
    remove(key: string): boolean;
    keys(): string[];
    values(): T[];
    contains(key: string): boolean;
}
