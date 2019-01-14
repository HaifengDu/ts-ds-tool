import { BasicBinaryTreeNode } from "../tree/basic-binary-tree/BasicBinaryTreeNode";
function compareFn(a, b) {
    return a <= b;
}
export class LeftistTreeNode extends BasicBinaryTreeNode {
    constructor(value, rank) {
        super(value);
        this.rank = rank;
    }
    set Rank(rank) {
        this.rank = rank;
    }
    get Rank() {
        return this.rank;
    }
}
export class LeftistTree {
    constructor(compare = compareFn, value) {
        this.compare = compare;
        this.count = 0;
        if (typeof value !== "undefined") {
            this.root = new LeftistTreeNode(value, 0);
            this.count = 1;
        }
    }
    get Root() {
        return this.root;
    }
    get Count() {
        return this.count;
    }
    isEmpty() {
        return !this.root;
    }
    fixNode(node) {
        const left = node.Left;
        const right = node.Right;
        if (left && right && left.Rank < right.Rank) {
            const temp = node.Right;
            node.setRight(node.Left);
            node.setLeft(temp);
        }
        else if (node.Right && !node.Left) {
            node.setLeft(node.Right);
            node.setRight(null);
        }
        if (node.Right) {
            node.Rank = node.Right.Rank + 1;
        }
        else {
            node.Rank = 0;
        }
    }
    _merge(root1, root2) {
        if (!root1) {
            return root2;
        }
        if (!root2) {
            return root1;
        }
        if (!this.compare(root1.Value, root2.Value)) {
            const temp = root2;
            root2 = root1;
            root1 = temp;
        }
        root1.setRight(this._merge(root1.Right, root2));
        this.fixNode(root1);
        return root1;
    }
    merge(tree2) {
        if (!tree2 || tree2.isEmpty()) {
            return this;
        }
        if (!this.root) {
            this.root = tree2.Root;
            this.count = tree2.Count;
            return this;
        }
        const root1 = this.Root;
        const root2 = tree2.Root;
        this.root = this._merge(root1, root2);
        this.count += tree2.Count;
        return this;
    }
    findExtremum() {
        if (!this.root) {
            return null;
        }
        return this.root.Value;
    }
    insert(value) {
        const node = new LeftistTree(this.compare, value);
        this.merge(node);
        return node;
    }
    deleteExtremum() {
        if (!this.root) {
            return null;
        }
        const value = this.root.Value;
        this.root = this._merge(this.root.Left, this.root.Right);
        this.count--;
        return value;
    }
}
