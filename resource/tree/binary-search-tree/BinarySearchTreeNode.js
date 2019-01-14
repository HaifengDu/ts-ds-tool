import { BasicBinaryTreeNode } from "../basic-binary-tree/BasicBinaryTreeNode";
export var ENodeColor;
(function (ENodeColor) {
    ENodeColor[ENodeColor["Red"] = 1] = "Red";
    ENodeColor[ENodeColor["Black"] = 2] = "Black";
})(ENodeColor || (ENodeColor = {}));
export class BinarySearchTreeNode extends BasicBinaryTreeNode {
    constructor(value) {
        super(value);
    }
    get Color() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    setValue(value) {
        super.setValue(value);
    }
    find(value, compareKey) {
        let a, b;
        if (compareKey) {
            a = this.Value[compareKey];
            b = value[compareKey];
        }
        else {
            a = this.Value;
            b = value;
        }
        if (a === b) {
            return this;
        }
        if (a > b && this.Left) {
            return this.Left.find(value, compareKey);
        }
        if (a < b && this.Right) {
            return this.Right.find(value, compareKey);
        }
        return null;
    }
    findMin() {
        if (!this.Left) {
            return this;
        }
        return this.Left.findMin();
    }
    findMax() {
        if (!this.Right) {
            return this;
        }
        return this.Right.findMax();
    }
    insert(value, compareKey) {
        if (value === null || value === undefined) {
            return;
        }
        let compareFunc = (a, b) => a < b;
        if (compareKey) {
            compareFunc = (a, b) => a[compareKey] < b[compareKey];
        }
        let resultNode;
        if (compareFunc(value, this.Value)) {
            if (this.Left) {
                resultNode = this.Left.insert(value, compareKey);
            }
            else {
                resultNode = new BinarySearchTreeNode(value);
                this.setLeft(resultNode);
            }
        }
        else {
            if (this.Right) {
                resultNode = this.Right.insert(value, compareKey);
            }
            else {
                resultNode = new BinarySearchTreeNode(value);
                this.setRight(resultNode);
            }
        }
        return resultNode;
    }
    contains(value, compareKey) {
        return !!this.find(value, compareKey);
    }
}
