import { Collection } from "../Collection";
import LinkList from "../linklist/LinkList";
export class Stack extends Collection {
    constructor() {
        super();
        this.linkList = new LinkList();
    }
    push(node) {
        return this.linkList.append(node);
    }
    pop() {
        return this.linkList.pop();
    }
    peek() {
        if (!this.linkList.getTailNode()) {
            return null;
        }
        return this.linkList.getTailNode().Value;
    }
    isEmpty() {
        return !this.linkList.getTailNode();
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
    toArray() {
        return super.toArray().reverse();
    }
}
export default Stack;
