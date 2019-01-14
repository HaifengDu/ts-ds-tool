import { AbstractSet } from "../interface/AbstractSet";
import { BasicBinaryTree } from "../tree/basic-binary-tree/BasicBinaryTree";
import { RedBlackTree } from "../tree/red-black-tree/RedBlackTree";
export class TreeSet extends AbstractSet {
    constructor(compareKey) {
        super();
        this.size = 0;
        this.tree = new RedBlackTree(compareKey);
    }
    add(item) {
        if (this.tree.contains(item)) {
            return this;
        }
        this.tree.insert(item);
        this.size++;
        return this;
    }
    entries() {
        return BasicBinaryTree.inTraversal(this.tree.Root);
    }
    has(item) {
        return this.tree.contains(item);
    }
    remove(item) {
        if (!this.tree.contains(item)) {
            return false;
        }
        this.size--;
        return this.tree.remove(item);
    }
    diff(set) {
        return super.diff(set);
    }
    union(set) {
        return super.union(set);
    }
    intersect(set) {
        return super.intersect(set);
    }
    get Size() {
        return this.size;
    }
}
