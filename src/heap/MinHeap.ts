import { Heap } from "./Heap";

/**
 * 小顶堆
 */
export class MinHeap<T> extends Heap<T>{
    constructor(private key?: keyof T){
        super();
    }
    protected compare(a: T, b: T): boolean {
        if (this.key){
            return a[this.key] <= b[this.key];
        }
        return a <= b;
    }
}
