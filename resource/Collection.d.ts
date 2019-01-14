import { IEnumerable } from "./interface/IEnumerable";
import IEnumerator from "./interface/IEnumerator";
export declare abstract class Collection<T> implements IEnumerable<T> {
    getEnumerator(): IEnumerator<T>;
    toArray(): T[];
    protected abstract __iterate(fn: (item: T, index: number) => void): void;
}
