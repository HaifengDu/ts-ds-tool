import { Heap } from "./Heap";
export class MinHeap extends Heap {
    constructor(key) {
        super();
        this.key = key;
    }
    compare(a, b) {
        if (this.key) {
            return a[this.key] <= b[this.key];
        }
        return a <= b;
    }
}
