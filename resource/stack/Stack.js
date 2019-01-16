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
        const node = this.linkList.pop();
        if (node) {
            return node.Value;
        }
        return null;
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
            fn(temp.Value, index);
            index++;
            temp = temp.Next;
        }
    }
    toArray() {
        return super.toArray().reverse();
    }
}
export default Stack;
