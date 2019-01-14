import { Collection } from "../Collection";
import { MaxHeap } from "../heap/MaxHeap";
export class PriorityQueueNode {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
    get Value() {
        return this.value;
    }
    get Priority() {
        return this.priority;
    }
    toString() {
        return `{"priority":${this.priority},"value":${this.value}}`;
    }
}
export class PriorityQueue extends Collection {
    constructor() {
        super();
        this.heap = new MaxHeap("Priority");
    }
    peek() {
        return this.heap.peek();
    }
    enqueue(value, priority) {
        this.heap.add(new PriorityQueueNode(value, priority));
    }
    dequeue() {
        return this.heap.poll();
    }
    changePriority(value, priority) {
        this.heap.remove(item => item.Value === value);
        this.heap.add(new PriorityQueueNode(value, priority));
    }
    has(value) {
        return !!this.heap.find(item => item.Value === value);
    }
    clear() {
        this.heap.clear();
    }
    isEmpty() {
        return this.heap.isEmpty();
    }
    toString() {
        return this.heap.toString();
    }
    __iterate(fn) {
        this.heap.entries().forEach((item, index) => fn(item.Value, index));
    }
}
export default PriorityQueue;
