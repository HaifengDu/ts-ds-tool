export class DoubleLinkNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
    get Value() {
        return this.value;
    }
    get Next() {
        return this.next;
    }
    get Prev() {
        return this.prev;
    }
    setValue(value) {
        this.value = value;
    }
    setNext(node) {
        this.next = node;
        if (node) {
            node.prev = this;
        }
    }
    toString() {
        return `${this.value}`;
    }
}
