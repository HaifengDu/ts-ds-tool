export class HuffmanTreeNode {
    get Value() {
        return this.value;
    }
    get Left() {
        return this.left;
    }
    set Left(value) {
        this.left = value;
    }
    get Right() {
        return this.right;
    }
    set Right(value) {
        this.right = value;
    }
    get Weight() {
        return this.weight;
    }
    isLeaf() {
        return !this.Left && !this.Right;
    }
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
    }
}
