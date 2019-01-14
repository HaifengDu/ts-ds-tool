export class DoubleLinkListNode {
    constructor(value) {
        this.value = value;
    }
    setNext(node) {
        this.next = node;
    }
    setPre(node) {
        this.pre = node;
    }
    get Next() {
        return this.next;
    }
    get Prev() {
        return this.pre;
    }
    toString() {
        return `${this.value}`;
    }
}
