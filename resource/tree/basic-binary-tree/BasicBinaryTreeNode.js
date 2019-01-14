import { BasicBinaryTree } from "./BasicBinaryTree";
export class BasicBinaryTreeNode {
    constructor(value) {
        this.value = value;
    }
    get Value() {
        return this.value;
    }
    get Left() {
        return this.left;
    }
    get Right() {
        return this.right;
    }
    setValue(value) {
        this.value = value;
    }
    setLeft(node) {
        this.left = node;
        if (node) {
            this.left.parent = this;
        }
        return this;
    }
    setRight(node) {
        this.right = node;
        if (node) {
            this.right.parent = this;
        }
        return this;
    }
    removeChild(node) {
        if (node === this.left) {
            this.left.parent = null;
            this.left = null;
            return true;
        }
        if (node === this.right) {
            this.right.parent = null;
            this.right = null;
            return true;
        }
        return false;
    }
    getHeight() {
        return Math.max(this.getLeftHeight(), this.getRightHeight());
    }
    getRightHeight() {
        if (!this.right) {
            return 0;
        }
        return this.right.getHeight() + 1;
    }
    getLeftHeight() {
        if (!this.left) {
            return 0;
        }
        return this.left.getHeight() + 1;
    }
    galanceFactor() {
        return this.getLeftHeight() - this.getRightHeight();
    }
    getSibling() {
        if (!this.parent) {
            return;
        }
        if (this.parent.Left === this) {
            return this.parent.Right;
        }
        return this.parent.Left;
    }
    getUncle() {
        if (!this.parent) {
            return;
        }
        if (!this.parent.parent) {
            return;
        }
        const parent = this.parent;
        if (parent.parent.Left === parent) {
            return parent.parent.Right;
        }
        return parent.parent.Left;
    }
    toString() {
        return BasicBinaryTree.inTraversal(this).toString();
    }
}
