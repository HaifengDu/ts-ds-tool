export declare abstract class AbstractSet<T> {
    abstract add(item: T): this;
    abstract entries(): Array<T>;
    abstract remove(item: T): boolean;
    abstract has(item: T): boolean;
    abstract readonly Size: number;
    diff(set: AbstractSet<T>): T[];
    union(set: AbstractSet<T>): T[];
    intersect(set: AbstractSet<T>): T[];
    isEmpty(): boolean;
}
