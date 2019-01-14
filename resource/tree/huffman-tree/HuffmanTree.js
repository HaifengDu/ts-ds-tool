import { MinHeap } from "../../heap/MinHeap";
import { HuffmanTreeNode } from "./HuffmanTreeNode";
export class HuffmanTree {
    constructor(array) {
        this.array = array;
        this.traversalFlag = 0;
        this.pathCache = {};
        this.buildTree();
    }
    get Root() {
        return this.root;
    }
    buildTree() {
        const heap = new MinHeap("Weight");
        const arr = [];
        if (this.array instanceof Array) {
            this.array.forEach(item => {
                arr.push({ value: item[0], weight: item[1] });
            });
        }
        else {
            for (const key in this.array) {
                const element = this.array[key];
                arr.push({ value: key, weight: element });
            }
        }
        arr.forEach(item => {
            heap.add(new HuffmanTreeNode(item.value, item.weight));
        });
        let parent = null;
        for (let i = 0; i < arr.length - 1; i++) {
            const last = heap.poll();
            const lastSecond = heap.poll();
            parent = new HuffmanTreeNode(null, last.Weight + lastSecond.Weight);
            parent.Left = last;
            parent.Right = lastSecond;
            heap.add(parent);
        }
        heap.clear();
        this.root = parent;
        this.createPath();
    }
    getPath(value) {
        const path = this.pathCache[value];
        if (!path) {
            throw new Error(`Not Found '${value}' path`);
        }
        return path;
    }
    getText(codes) {
        const strArr = [];
        let node = this.root;
        for (const element of codes) {
            if (element === "0") {
                node = node.Left;
            }
            else {
                node = node.Right;
            }
            if (node.isLeaf()) {
                strArr.push(node.Value);
                node = this.root;
            }
        }
        return strArr.join("");
    }
    createPath(node = this.root, path = "") {
        if (!node) {
            return;
        }
        if (node.isLeaf()) {
            this.pathCache[node.Value] = path;
        }
        else {
            this.createPath(node.Left, path + "0");
            this.createPath(node.Right, path + "1");
        }
    }
    getWPL() {
        if (!this.root) {
            return 0;
        }
        this.traversalFlag = 0;
        let sum = 0;
        this.traversal(this.root, item => {
            if (!item.Left && !item.Right) {
                sum += item.Weight * this.traversalFlag;
            }
        });
        return sum;
    }
    traversal(tree, fn) {
        if (!tree) {
            return;
        }
        fn(tree);
        this.traversalFlag++;
        this.traversal(tree.Left, fn);
        this.traversal(tree.Right, fn);
        this.traversalFlag--;
    }
}
