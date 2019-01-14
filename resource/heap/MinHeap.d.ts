import { Heap } from "./Heap";
export declare class MinHeap<T> extends Heap<T> {
    private key?;
    constructor(key?: keyof T);
    protected compare(a: T, b: T): boolean;
}
