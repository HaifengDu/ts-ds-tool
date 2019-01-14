import { ICompare } from "../interface/ICompare";
import { LinkNode } from "../linklist/LinkNode";

export interface HeapNode<T>{
    value: T;
    degree: number;
    child ?: LinkNode<HeapNode<T>>;
    parent ?: LinkNode<HeapNode<T>>;
}

function compareFn<T>(a: T, b: T){
    return a <= b;
}

export class BinomialHeap<T = number>{
    private head: LinkNode<HeapNode<T>>;
    private count = 0;
    constructor(private compare: ICompare<T> = compareFn){
        //
    }

    get Count(){
        return this.count;
    }

    get Head(){
        return this.head;
    }

    private setHead(value: T){
        this.head = new LinkNode<HeapNode<T>>({
            value,
            degree: 0,
        });
        this.count = 1;
    }

    public clear(){
        this.head = null;
        this.count = 0;
    }

    public isEmpty(){
        return !this.head;
    }

    public insert(value: T){
        const heap = new BinomialHeap<T>();
        heap.setHead(value);
        const newNode = heap.Head;
        this.union(heap);
        return newNode;
    }

    public deleteExtremum(){
        if (!this.head){
            return null;
        }
        const deleteNode = this._findExtremum();
        if (!deleteNode.minPrev){
            this.head = deleteNode.minNode.Next;
        }else{
            deleteNode.minPrev.setNext(deleteNode.minNode.Next);
        }
        let child = deleteNode.minNode.Value.child;
        const newHead = child;
        // NOTE:为什么反转
        while (child){
            child.Value.parent = null;
            child = child.Next;
        }
        const heap = new BinomialHeap<T>(this.compare);
        heap.head = newHead;
        // count为0;
        this.union(heap);
        this.count --;
        return deleteNode.minNode.Value.value;
    }

    private _findExtremum(){
        let next = this.head.Next;
        let minNode = this.head;
        let prev: LinkNode<HeapNode<T>> = this.head;
        let minPrev: LinkNode<HeapNode<T>> = null;
        let min = minNode.Value.value;
        while (next){
            if (!this.compare(min, next.Value.value)){
                minPrev = prev;
                minNode = next;
                min = minNode.Value.value;
            }
            prev = next;
            next = next.Next;
        }
        return {minNode, minPrev};
    }

    public findExtremum(){
        if (!this.head){
            return null;
        }
        return this._findExtremum().minNode.Value.value;
    }

    public union(heap: BinomialHeap<T>){
        /**
         * 1、将两个堆串联成新链表
         * 2、从头到尾合并两个堆（合并度数相同的）
         */
        if (!heap){
            return this;
        }
        this.count += heap.Count;
        let newHead = this.mergeHeaps(heap);
        if (!newHead) {
            return this;
        }
        this.head = null;
        heap.head = null;

        let prev: LinkNode<HeapNode<T>>;
        let curr = newHead;
        let next = newHead.Next;
        /**
         * 判断两个度数是否相同，相同合并
         */
        while (next){
            // 节点度数不同，或者三个度数相同
            if (next.Value.degree !== curr.Value.degree ||
                (next.Next && next.Next.Value.degree === curr.Value.degree)){
                prev = curr;
                curr = next;
            }else{
                if (this.compare( curr.Value.value , next.Value.value)){
                    //
                    curr.setNext(next.Next);
                    this.link(curr, next);
                    // curr游标不走，判断curr和next.next
                }else{
                    // 并且第二个key小于第一个key
                    if (!prev){
                        // 第一个和第二个相同度
                        newHead = next;
                    }else{
                        // 不是第一个和第二个元素
                        prev.setNext(next);
                    }
                    this.link(next, curr);
                    curr = next;
                    // curr游标走动，判断next和next.next;
                }
            }
             // 不能取next ，next已经合并
            next = curr.Next;
        }
        this.head = newHead;
        return this;
    }

    private link(tomerge: LinkNode<HeapNode<T>>, frommerge: LinkNode<HeapNode<T>>){
        frommerge.setNext(tomerge.Value.child);
        frommerge.Value.parent = tomerge;
        tomerge.Value.child = frommerge;
        tomerge.Value.degree ++;
    }

    private mergeHeaps(heap: BinomialHeap<T>){
        let thisHead = this.head;
        let thatHead = heap.Head;
        if (!thisHead) {
            return heap.head;
        }
        if (!thatHead) {
            return this.head;
        }
        let newHead: LinkNode<HeapNode<T>>;
        if (thisHead.Value.degree <= thatHead.Value.degree){
            newHead = this.head;
            thisHead = thisHead.Next;
        }else{
            newHead = heap.head;
            thatHead = thatHead.Next;
        }
        let temp = newHead;
        while (thisHead && thatHead) {
            if (thisHead.Value.degree <= thatHead.Value.degree) {
                temp.setNext(thisHead);
                thisHead = thisHead.Next;
            }else{
                temp.setNext(thatHead);
                thatHead = thatHead.Next;
            }
            temp = temp.Next;
        }
        temp.setNext(thisHead ? thisHead : thatHead);
        return newHead;
    }
}
