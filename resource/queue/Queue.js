import { Collection } from "../Collection";
import LinkList from "../linklist/LinkList";
export class Queue extends Collection {
    constructor() {
        super();
        this.linkList = new LinkList();
    }
    isEmpty() {
        return !this.linkList.getTailNode();
    }
    peek() {
        if (!this.linkList.getHeadNode()) {
            return null;
        }
        return this.linkList.getHeadNode().Value;
    }
    enqueue(value) {
        this.linkList.append(value);
    }
    dequeue() {
        const head = this.linkList.shift();
        return head ? head.Value : null;
    }
    toString() {
        return this.linkList.toString();
    }
    __iterate(fn) {
        let temp = this.linkList.getHeadNode(), index = 0;
        while (temp) {
            fn(temp, index);
            index++;
            temp = temp.Next;
        }
    }
}
