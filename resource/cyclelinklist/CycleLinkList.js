import { LinkList } from "../linklist/LinkList";
export class CycleLinkList {
    constructor() {
        this.linklist = new LinkList();
    }
    setCircle() {
        this.getTailNode().setNext(this.getHeadNode());
    }
    get Size() {
        return this.linklist.Size;
    }
    append(value) {
        const result = this.linklist.append(value);
        this.setCircle();
        return result;
    }
    prepend(value) {
        const result = this.linklist.prepend(value);
        this.setCircle();
        return result;
    }
    deleteNode(arg) {
        const isFirstOrLast = this.linklist.findNode(arg) === this.getHeadNode()
            || this.linklist.findNode(arg) === this.getTailNode(), result = this.linklist.deleteNode(arg);
        if (isFirstOrLast) {
            this.setCircle();
        }
        return result;
    }
    findNode(arg) {
        return this.linklist.findNode(arg);
    }
    getHeadNode() {
        return this.linklist.getHeadNode();
    }
    getTailNode() {
        return this.linklist.getTailNode();
    }
    shift() {
        const result = this.linklist.shift();
        if (this.Size) {
            this.setCircle();
        }
        return result;
    }
    pop() {
        const result = this.linklist.pop();
        if (this.Size) {
            this.setCircle();
        }
        return result;
    }
    insertAfter(value, oriNode) {
        return this.linklist.insertAfter(value, oriNode);
    }
    clear() {
        this.linklist.clear();
    }
    toString() {
        return this.linklist.toString();
    }
    static fromArray(arr) {
        if (!arr) {
            return new CycleLinkList();
        }
        const linkList = new CycleLinkList();
        arr.forEach(item => {
            linkList.append(item);
        });
        return linkList;
    }
    toArray() {
        return this.linklist.toArray();
    }
    getEnumerator() {
        let temp = this.getHeadNode();
        const enumerator = {
            next: () => {
                temp = temp.Next;
                enumerator.Current = {
                    value: temp.Value,
                    done: false,
                };
                return enumerator;
            },
            Current: {
                value: temp.Value,
                done: false,
            },
        };
        return enumerator;
    }
}
export default CycleLinkList;
