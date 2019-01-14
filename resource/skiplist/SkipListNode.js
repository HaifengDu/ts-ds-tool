export class SkipListNode {
    constructor(item = null) {
        this.item = item;
        this.next = [];
        this.prev = [];
    }
    getItem() {
        return this.item;
    }
    getNext(level) {
        return this.next[level];
    }
    setNext(level, node) {
        this.next[level] = node;
    }
    getPrev(level) {
        return this.prev[level];
    }
    setPrev(level, node) {
        this.prev[level] = node;
    }
    deleteLastLevel() {
        this.next.length--;
    }
    getNextLevel() {
        return this.next.length;
    }
    getPrevLevel() {
        return this.prev.length;
    }
    getHeight() {
        return Math.max(this.getPrevLevel(), this.getNextLevel());
    }
}
