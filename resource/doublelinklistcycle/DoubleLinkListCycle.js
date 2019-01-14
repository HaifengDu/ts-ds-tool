import { DoubleLinkListNode } from "../doublelinklist/ZKDoubleLinkListNode";
export class DoubleLinkListCycle {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
        this.size = 0;
    }
    get Size() {
        return this.size;
    }
    append(node) {
        const currentNode = new DoubleLinkListNode(node);
        if (!this.tailNode) {
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }
        else {
            currentNode.setPre(this.tailNode);
            currentNode.setNext(this.headNode);
            this.tailNode.setNext(currentNode);
            this.headNode.setPre(currentNode);
            this.tailNode = currentNode;
        }
        this.size++;
        return this;
    }
    prepend(node) {
        const currentNode = new DoubleLinkListNode(node);
        if (!this.headNode) {
            this.headNode = this.tailNode = currentNode;
            this.headNode.setNext(this.tailNode);
            this.tailNode.setPre(this.headNode);
        }
        else {
            this.headNode.setPre(currentNode);
            currentNode.setNext(this.headNode);
            currentNode.setPre(this.tailNode);
            this.tailNode.setNext(currentNode);
            this.headNode = currentNode;
        }
        this.size++;
        return this;
    }
    emptyList() {
        this.headNode = this.tailNode = null;
        this.size = 0;
    }
    shift() {
        const result = this.headNode;
        if (this.headNode === this.tailNode) {
            this.emptyList();
        }
        else {
            this.headNode = this.headNode.next;
            this.headNode.setPre(this.tailNode);
            this.size--;
        }
        return result;
    }
    pop() {
        const result = this.tailNode;
        if (this.headNode === this.tailNode) {
            this.emptyList();
        }
        else {
            this.tailNode = this.tailNode.Prev;
            this.tailNode.setNext(this.headNode);
            this.size--;
        }
        return result;
    }
    deleteNode(arg) {
        const deleteArr = [];
        if (this.isEmpty()) {
            return deleteArr;
        }
        let cycleNode = this.headNode;
        let index = 0;
        while (cycleNode) {
            const match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            let deleteNode = null;
            if (match) {
                if (this.headNode === this.tailNode) {
                    this.emptyList();
                    break;
                }
                else {
                    cycleNode.Prev.setNext(cycleNode.Next);
                    cycleNode.Next.setPre(cycleNode.Prev);
                }
                deleteNode = cycleNode;
                deleteArr.push(index);
            }
            cycleNode = cycleNode.Next;
            const shouldBreak = cycleNode === this.headNode;
            if (deleteNode) {
                if (deleteNode === this.headNode) {
                    this.headNode = deleteNode.Next;
                }
                if (deleteNode === this.tailNode) {
                    this.tailNode = deleteNode.Prev;
                }
                deleteNode.setNext(null);
                deleteNode.setPre(null);
            }
            if (shouldBreak) {
                break;
            }
            index++;
        }
    }
    findNode(arg) {
        let cycleNode = this.headNode;
        let result = null;
        while (cycleNode) {
            const match = typeof arg === "function" ? arg(cycleNode.value) : (cycleNode.value === arg);
            if (match) {
                result = cycleNode;
                break;
            }
            else if (cycleNode === this.tailNode) {
                break;
            }
            cycleNode = cycleNode.Next;
        }
        return result;
    }
    getHeadNode() {
        return this.headNode;
    }
    getTailNode() {
        return this.tailNode;
    }
    isEmpty() {
        return !this.Size;
    }
    toString() {
        let temp = this.headNode;
        const arr = [];
        while (temp) {
            arr.push(temp);
            temp = temp.Next;
            if (temp === this.headNode) {
                break;
            }
        }
        return arr.toString();
    }
    getEnumerator() {
        let temp = this.getHeadNode();
        const enumerator = {
            next: () => {
                temp = temp.Next;
                enumerator.Current = {
                    value: temp.value,
                    done: false,
                };
                return enumerator;
            },
            Current: {
                value: temp.value,
                done: false,
            },
        };
        return enumerator;
    }
}
export default DoubleLinkListCycle;
