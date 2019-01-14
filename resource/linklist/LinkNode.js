export class LinkNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
    get Value() {
        return this.value;
    }
    get Next() {
        return this.next;
    }
    setValue(value) {
        this.value = value;
    }
    setNext(node) {
        this.next = node;
    }
    toString() {
        return `${this.value}`;
    }
}
