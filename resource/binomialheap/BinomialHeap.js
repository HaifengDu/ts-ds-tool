import { LinkNode } from "../linklist/LinkNode";
function compareFn(a, b) {
    return a <= b;
}
export class BinomialHeap {
    constructor(compare = compareFn) {
        this.compare = compare;
        this.count = 0;
    }
    get Count() {
        return this.count;
    }
    get Head() {
        return this.head;
    }
    setHead(value) {
        this.head = new LinkNode({
            value,
            degree: 0,
        });
        this.count = 1;
    }
    clear() {
        this.head = null;
        this.count = 0;
    }
    isEmpty() {
        return !this.head;
    }
    insert(value) {
        const heap = new BinomialHeap();
        heap.setHead(value);
        const newNode = heap.Head;
        this.union(heap);
        return newNode;
    }
    deleteExtremum() {
        if (!this.head) {
            return null;
        }
        const deleteNode = this._findExtremum();
        if (!deleteNode.minPrev) {
            this.head = deleteNode.minNode.Next;
        }
        else {
            deleteNode.minPrev.setNext(deleteNode.minNode.Next);
        }
        let child = deleteNode.minNode.Value.child;
        const newHead = child;
        while (child) {
            child.Value.parent = null;
            child = child.Next;
        }
        const heap = new BinomialHeap(this.compare);
        heap.head = newHead;
        this.union(heap);
        this.count--;
        return deleteNode.minNode.Value.value;
    }
    _findExtremum() {
        let next = this.head.Next;
        let minNode = this.head;
        let prev = this.head;
        let minPrev = null;
        let min = minNode.Value.value;
        while (next) {
            if (!this.compare(min, next.Value.value)) {
                minPrev = prev;
                minNode = next;
                min = minNode.Value.value;
            }
            prev = next;
            next = next.Next;
        }
        return { minNode, minPrev };
    }
    findExtremum() {
        if (!this.head) {
            return null;
        }
        return this._findExtremum().minNode.Value.value;
    }
    union(heap) {
        if (!heap) {
            return this;
        }
        this.count += heap.Count;
        let newHead = this.mergeHeaps(heap);
        if (!newHead) {
            return this;
        }
        this.head = null;
        heap.head = null;
        let prev;
        let curr = newHead;
        let next = newHead.Next;
        while (next) {
            if (next.Value.degree !== curr.Value.degree ||
                (next.Next && next.Next.Value.degree === curr.Value.degree)) {
                prev = curr;
                curr = next;
            }
            else {
                if (this.compare(curr.Value.value, next.Value.value)) {
                    curr.setNext(next.Next);
                    this.link(curr, next);
                }
                else {
                    if (!prev) {
                        newHead = next;
                    }
                    else {
                        prev.setNext(next);
                    }
                    this.link(next, curr);
                    curr = next;
                }
            }
            next = curr.Next;
        }
        this.head = newHead;
    }
    link(tomerge, frommerge) {
        frommerge.setNext(tomerge.Value.child);
        frommerge.Value.parent = tomerge;
        tomerge.Value.child = frommerge;
        tomerge.Value.degree++;
    }
    mergeHeaps(heap) {
        let thisHead = this.head;
        let thatHead = heap.Head;
        if (!thisHead) {
            return heap.head;
        }
        if (!thatHead) {
            return this.head;
        }
        let newHead;
        if (thisHead.Value.degree <= thatHead.Value.degree) {
            newHead = this.head;
            thisHead = thisHead.Next;
        }
        else {
            newHead = heap.head;
            thatHead = thatHead.Next;
        }
        let temp = newHead;
        while (thisHead && thatHead) {
            if (thisHead.Value.degree <= thatHead.Value.degree) {
                temp.setNext(thisHead);
                thisHead = thisHead.Next;
            }
            else {
                temp.setNext(thatHead);
                thatHead = thatHead.Next;
            }
            temp = temp.Next;
        }
        temp.setNext(thisHead ? thisHead : thatHead);
        return newHead;
    }
}
