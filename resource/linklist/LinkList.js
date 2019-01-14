import { Collection } from "../Collection";
import CycleLinkList from "../cyclelinklist/CycleLinkList";
import DoubleLinkList from "../doublelinklist/DoubleLinkList";
import { LinkNode } from "./LinkNode";
export class LinkList extends Collection {
    constructor() {
        super();
        this.headNode = null;
        this.tailNode = null;
        this.size = 0;
    }
    get Size() {
        return this.size;
    }
    append(value) {
        this.size++;
        if (!this.headNode) {
            this.headNode = this.tailNode = new LinkNode(value);
            return this.headNode;
        }
        if (this.headNode === this.tailNode) {
            this.tailNode = new LinkNode(value);
            this.headNode.setNext(this.tailNode);
            return this.headNode;
        }
        const tailNode = new LinkNode(value);
        this.tailNode.setNext(tailNode);
        this.tailNode = tailNode;
        return this.headNode;
    }
    prepend(value) {
        if (!this.headNode) {
            this.headNode = this.tailNode = new LinkNode(value);
        }
        else {
            this.headNode = new LinkNode(value, this.headNode);
        }
        this.size++;
        return this.headNode;
    }
    emptyList() {
        this.headNode = this.tailNode = null;
        this.size = 0;
    }
    clear() {
        this.emptyList();
    }
    deleteNode(arg) {
        let temp = this.headNode;
        let result = false;
        let prevNode;
        while (temp) {
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match) {
                this.size--;
                result = true;
                if (temp === this.headNode) {
                    this.headNode = temp.Next;
                }
                else if (temp === this.tailNode) {
                    prevNode.setNext(null);
                    this.tailNode = prevNode;
                }
                else {
                    prevNode.setNext(temp.Next);
                }
            }
            if (temp.Next && temp.Next === this.headNode)
                break;
            if (this.size === 0) {
                this.emptyList();
                break;
            }
            prevNode = temp;
            temp = temp.Next;
        }
        return result;
    }
    findNode(arg) {
        let temp = this.headNode;
        let result;
        while (temp) {
            const match = typeof arg === "function" ? arg(temp.Value) : (temp.Value === arg);
            if (match) {
                result = temp;
                break;
            }
            temp = temp.Next;
        }
        return result;
    }
    insertAfter(value, oriNode) {
        const newNode = new LinkNode(value);
        if (oriNode) {
            const nextNode = oriNode.Next;
            if (!nextNode || nextNode === this.headNode) {
                this.tailNode = newNode;
            }
            newNode.setNext(nextNode);
            oriNode.setNext(newNode);
            this.size++;
            return true;
        }
        return false;
    }
    getHeadNode() {
        return this.headNode;
    }
    getTailNode() {
        return this.tailNode;
    }
    shift() {
        if (this.size === 0) {
            return null;
        }
        else if (this.size === 1) {
            this.tailNode = null;
        }
        const temp = this.headNode;
        this.headNode = temp.Next;
        this.size--;
        return temp;
    }
    pop() {
        let temp = this.headNode;
        let result;
        let prevNode;
        if (this.size === 0) {
            return null;
        }
        if (this.size === 1) {
            result = this.headNode;
            this.emptyList();
            return result;
        }
        while (temp) {
            const nextNode = temp.Next;
            if (!nextNode || nextNode === this.headNode) {
                result = temp;
                this.tailNode = prevNode;
                prevNode.setNext(nextNode);
                break;
            }
            prevNode = temp;
            temp = nextNode;
        }
        this.size--;
        return result;
    }
    __iterate(fn) {
        let temp = this.headNode, index = 0;
        while (temp) {
            fn(temp, index);
            index++;
            const nextNode = temp.Next;
            if (!nextNode || nextNode === this.headNode) {
                break;
            }
            temp = nextNode;
        }
    }
    toString() {
        return this.toArray().map(node => node.toString()).toString();
    }
    static fromArray(arr) {
        if (!arr) {
            return new LinkList();
        }
        const linkList = new LinkList();
        arr.forEach(item => {
            linkList.append(item);
        });
        return linkList;
    }
    toDoubleLinkList() {
        if (!this.headNode) {
            return new DoubleLinkList();
        }
        const arr = this.toArray();
        const doubleListList = new DoubleLinkList();
        arr.forEach(item => {
            doubleListList.append(item.Value);
        });
        return doubleListList;
    }
    toCycleLinkList() {
        const cyclelinklist = new CycleLinkList();
        this.toArray().forEach((node) => {
            cyclelinklist.append(node.Value);
        });
        return cyclelinklist;
    }
}
export default LinkList;
