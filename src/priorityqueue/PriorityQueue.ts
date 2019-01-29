import { Collection } from "../Collection";
import { Heap } from "../heap/Heap";
import { MaxHeap } from "../heap/MaxHeap";

export class PriorityQueueNode<T>{
    constructor(private value: T, private priority: number){

    }

    public get Value(){
        return this.value;
    }

    public get Priority(){
        return this.priority;
    }

    public toString(){
        return `{"priority":${this.priority},"value":${this.value}}`;
    }
}

export class PriorityQueue<T> extends Collection<T>{
    private heap: Heap<PriorityQueueNode<T>>;
    constructor(){
        super();
        this.heap = new MaxHeap<PriorityQueueNode<T>>("Priority");
    }

    /**
     * 查看队列头部节点
     */
    public peek(){
        return this.heap.peek();
    }

    /**
     * 向优先队列中添加一个节点
     * @param value 节点的值
     * @param priority 节点的优先级
     */
    public enqueue(value: T, priority: number){
        this.heap.add(new PriorityQueueNode(value, priority));
        return this;
    }

    /**
     * 从优先队列中推出一个节点
     */
    public dequeue(){
        return this.heap.poll();
    }

    /**
     * 调整队列中某个节点优先级
     * @param value
     * @param priority
     */
    public changePriority(value: T, priority: number){
        this.heap.remove(item => item.Value === value);
        this.heap.add(new PriorityQueueNode(value, priority));
    }

    /**
     * 判断是否存在
     * @param value
     * @returns boolean
     */
    public has(value: T){
        return !!this.heap.find(item => item.Value === value);
    }

    /**
     * 清空队列
     */
    public clear(){
        this.heap.clear();
    }

    /**
     * 查看是否为空队列
     */
    public isEmpty(){
        return this.heap.isEmpty();
    }

    /**
     * @returns string
     */
    public toString() {
        return this.heap.toString();
    }

    protected __iterate(fn: (item: T, index: number) => void): void {
        this.heap.entries().forEach((item, index) => fn(item.Value, index));
    }
}

export default PriorityQueue;
