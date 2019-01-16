import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
import { ENodeColor } from "../binary-search-tree/BinarySearchTreeNode";
function colorOf(node) {
    return node ? node.Color : ENodeColor.Black;
}
function leftOf(node) {
    return (node == null) ? null : node.Left;
}
function parentOf(node) {
    return !node ? null : node.parent;
}
function rightOf(node) {
    return !node ? null : node.Right;
}
function setColor(node, color) {
    if (node) {
        node.setColor(color);
    }
}
export class RedBlackTree extends BinarySearchTree {
    constructor(compareKey) {
        super(compareKey);
    }
    insert(value) {
        if (value === null || value === undefined) {
            return;
        }
        const insertedNode = super.insert(value);
        if (insertedNode === this.Root) {
            insertedNode.setColor(ENodeColor.Black);
            return insertedNode;
        }
        insertedNode.setColor(ENodeColor.Red);
        this.blance(insertedNode);
        return insertedNode;
    }
    remove(value) {
        if (value === null || value === undefined) {
            return false;
        }
        let p = this.find(value);
        if (!p) {
            return false;
        }
        if (p.Left && p.Right) {
            const s = this.getSuccessor(p);
            p.setValue(s.Value);
            p = s;
        }
        const replacement = (p.Left ? p.Left : p.Right);
        if (replacement) {
            replacement.parent = p.parent;
            if (!p.parent)
                this.Root = replacement;
            else if (p === p.parent.Left)
                p.parent.setLeft(replacement);
            else
                p.parent.setRight(replacement);
            p.setLeft(null);
            p.setRight(null);
            p.parent = null;
            if (p.Color === ENodeColor.Black) {
                this.deleteFixUp(replacement);
            }
        }
        else if (!p.parent) {
            this.Root = null;
        }
        else {
            if (p.Color === ENodeColor.Black) {
                this.deleteFixUp(p);
            }
            if (p.parent) {
                if (p === p.parent.Left) {
                    p.parent.setLeft(null);
                }
                else if (p === p.parent.Right) {
                    p.parent.setRight(null);
                }
                p.parent = null;
            }
        }
        return true;
    }
    getSuccessor(t) {
        if (t == null)
            return null;
        else if (t.Right) {
            let p = t.Right;
            while (p.Left)
                p = p.Left;
            return p;
        }
        else {
            let p = t.parent;
            let ch = t;
            while (p && ch === p.Right) {
                ch = p;
                p = p.parent;
            }
            return p;
        }
    }
    deleteFixUp(x) {
        while (x !== this.Root && colorOf(x) === ENodeColor.Black) {
            if (x === leftOf(parentOf(x))) {
                let sib = rightOf(parentOf(x));
                if (colorOf(sib) === ENodeColor.Red) {
                    setColor(sib, ENodeColor.Black);
                    setColor(parentOf(x), ENodeColor.Red);
                    this.leftRotate(parentOf(x), false);
                    sib = rightOf(parentOf(x));
                }
                if (colorOf(leftOf(sib)) === ENodeColor.Black &&
                    colorOf(rightOf(sib)) === ENodeColor.Black) {
                    setColor(sib, ENodeColor.Red);
                    x = parentOf(x);
                }
                else {
                    if (colorOf(rightOf(sib)) === ENodeColor.Black) {
                        setColor(leftOf(sib), ENodeColor.Black);
                        setColor(sib, ENodeColor.Red);
                        this.rightRotate(sib, false);
                        sib = rightOf(parentOf(x));
                    }
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), ENodeColor.Black);
                    setColor(rightOf(sib), ENodeColor.Black);
                    this.leftRotate(parentOf(x), false);
                    x = this.Root;
                }
            }
            else {
                let sib = leftOf(parentOf(x));
                if (colorOf(sib) === ENodeColor.Red) {
                    setColor(sib, ENodeColor.Black);
                    setColor(parentOf(x), ENodeColor.Red);
                    this.rightRotate(parentOf(x), false);
                    sib = leftOf(parentOf(x));
                }
                if (colorOf(rightOf(sib)) === ENodeColor.Black &&
                    colorOf(leftOf(sib)) === ENodeColor.Black) {
                    setColor(sib, ENodeColor.Red);
                    x = parentOf(x);
                }
                else {
                    if (colorOf(leftOf(sib)) === ENodeColor.Black) {
                        setColor(rightOf(sib), ENodeColor.Black);
                        setColor(sib, ENodeColor.Red);
                        this.leftRotate(sib, false);
                        sib = leftOf(parentOf(x));
                    }
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), ENodeColor.Black);
                    setColor(leftOf(sib), ENodeColor.Black);
                    this.rightRotate(parentOf(x), false);
                    x = this.Root;
                }
            }
        }
        setColor(x, ENodeColor.Black);
    }
    blance(node) {
        if (node === this.Root) {
            return;
        }
        const parent = node.parent;
        if (parent.Color === ENodeColor.Black) {
            return;
        }
        const uncle = node.getUncle();
        const grandParent = parent.parent;
        if (uncle && uncle.Color === ENodeColor.Red) {
            parent.setColor(ENodeColor.Black);
            uncle.setColor(ENodeColor.Black);
            if (grandParent === this.Root) {
                return;
            }
            grandParent.setColor(ENodeColor.Red);
            this.blance(parent.parent);
        }
        else {
            let parentNode;
            if (parent === parent.parent.Left) {
                if (node === parent.Left) {
                    parentNode = this.rightRotate(grandParent);
                }
                else {
                    parentNode = this.leftRightRotate(grandParent);
                }
            }
            else {
                if (node === parent.Right) {
                    parentNode = this.leftRotate(grandParent);
                }
                else {
                    parentNode = this.rightLeftRotate(grandParent);
                }
            }
            if (!parentNode.parent) {
                this.Root = parentNode;
                this.Root.setColor(ENodeColor.Black);
            }
            this.blance(parentNode);
        }
    }
    rightRotate(grandParentNode, swapColor = true) {
        const grandGrandParent = grandParentNode.parent;
        let grandParentNodeIsLeft;
        if (grandGrandParent) {
            grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
        }
        const parentNode = grandParentNode.Left;
        const parentRightNode = parentNode.Right;
        parentNode.setRight(grandParentNode);
        grandParentNode.setLeft(parentRightNode);
        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            }
            else {
                grandGrandParent.setRight(parentNode);
            }
        }
        else {
            parentNode.parent = null;
            this.Root = parentNode;
        }
        swapColor && this.swapColor(parentNode, grandParentNode);
        return parentNode;
    }
    leftRightRotate(grandParentNode) {
        const parentNode = grandParentNode.Left;
        const childNode = parentNode.Right;
        const childLeftNode = childNode.Left;
        childNode.setLeft(parentNode);
        parentNode.setRight(childLeftNode);
        grandParentNode.setLeft(childNode);
        return this.rightRotate(grandParentNode);
    }
    leftRotate(grandParentNode, swapColor = true) {
        const grandGrandParent = grandParentNode.parent;
        let grandParentNodeIsLeft;
        if (grandGrandParent) {
            grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
        }
        const parentNode = grandParentNode.Right;
        const parentLeftNode = parentNode.Left;
        parentNode.setLeft(grandParentNode);
        grandParentNode.setRight(parentLeftNode);
        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            }
            else {
                grandGrandParent.setRight(parentNode);
            }
        }
        else {
            parentNode.parent = null;
            this.Root = parentNode;
        }
        swapColor && this.swapColor(parentNode, grandParentNode);
        return parentNode;
    }
    rightLeftRotate(grandParentNode) {
        const parentNode = grandParentNode.Right;
        const childNode = parentNode.Left;
        const childRightNode = childNode.Right;
        childNode.setRight(parentNode);
        parentNode.setLeft(childRightNode);
        grandParentNode.setRight(childNode);
        return this.leftRotate(grandParentNode);
    }
    swapColor(a, b) {
        const color = a.Color;
        a.setColor(b.Color);
        b.setColor(color);
    }
}
