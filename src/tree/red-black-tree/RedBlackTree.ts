import { BasicBinaryTreeNode } from "../basic-binary-tree/BasicBinaryTreeNode";
import { BinarySearchTree } from "../binary-search-tree/BinarySearchTree";
import { BinarySearchTreeNode, ENodeColor } from "../binary-search-tree/BinarySearchTreeNode";

function colorOf<T>(node: BinarySearchTreeNode<T>){
    return node ? node.Color : ENodeColor.Black;
}

function leftOf<T>(node: BasicBinaryTreeNode<T>): BinarySearchTreeNode<T>{
    return (node == null) ? null : node.Left as BinarySearchTreeNode<T>;
}

function parentOf<T>(node: BasicBinaryTreeNode<T>){
    return !node ? null : node.parent as BinarySearchTreeNode<T>;
}
function rightOf<T>(node: BasicBinaryTreeNode<T>){
    return !node ? null : node.Right as BinarySearchTreeNode<T>;
}
function setColor<T>(node: BinarySearchTreeNode<T>, color: ENodeColor){
    if (node){
        node.setColor(color);
    }
}
export class RedBlackTree<T> extends BinarySearchTree<T>{
    constructor(compareKey?: keyof T){
        super(compareKey);
    }

    insert(value: T){
        if (value === null || value === undefined){
            return;
        }
        const insertedNode = super.insert(value);
        if (insertedNode === this.Root){
            insertedNode.setColor(ENodeColor.Black);
            return insertedNode;
        }
        // 默认插入红节点
        insertedNode.setColor(ENodeColor.Red);
        this.blance(insertedNode);
        return insertedNode;
    }

    remove(value: T){
        if (value === null || value === undefined){
            return false;
        }
        let p = this.find(value);
        if (!p){
            return false;
        }
        if (p.Left && p.Right) {
            const s = this.getSuccessor(p);
            p.setValue(s.Value);
            p = s;
        } // p has 2 children

        // Start fixup at replacement node, if it exists.
        const replacement = (p.Left ? p.Left : p.Right) as BinarySearchTreeNode<T>;

        if (replacement) {
            // Link replacement to parent
            replacement.parent = p.parent;
            // tslint:disable-next-line:curly
            if (!p.parent)
                this.Root = replacement;
            // tslint:disable-next-line:curly
            else if (p === p.parent.Left)
                p.parent.setLeft(replacement);
            // tslint:disable-next-line:curly
            else
                p.parent.setRight(replacement);

            // Null out links so they are OK to use by fixAfterDeletion.
            p.setLeft(null);
            p.setRight(null);
            p.parent = null;

            // Fix replacement
            if (p.Color === ENodeColor.Black){
                this.deleteFixUp(replacement);
            }
        } else if (!p.parent) { // return if we are the only node.
            this.Root = null;
        } else { //  No children. Use self as phantom replacement and unlink.
            if (p.Color === ENodeColor.Black){
                this.deleteFixUp(p);
            }

            if (p.parent) {
                if (p === p.parent.Left){
                    p.parent.setLeft(null);
                }else if (p === p.parent.Right){
                    p.parent.setRight(null);
                }
                p.parent = null;
            }
        }
        return true;
    }

    // clone(node?:BinarySearchTreeNode<T>){
    //     if(!node){
    //         node = this.Root;
    //     }
    //     const nodeCopy = new BinarySearchTreeNode(node.Value);
    //     nodeCopy.setColor(node.Color);
    //     if(node.Left){
    //         nodeCopy.setLeft(this.clone(node.Left as BinarySearchTreeNode<T>));
    //     }
    //     if(node.Right){
    //         nodeCopy.setRight(this.clone(node.Right as BinarySearchTreeNode<T>));
    //     }
    //     return nodeCopy;
    // }

    public getSuccessor(t: BinarySearchTreeNode<T>) {
        // tslint:disable-next-line:curly
        if (t == null)
            return null;
        else if (t.Right) {
            let p = t.Right;
            // tslint:disable-next-line:curly
            while (p.Left)
                p = p.Left;
            return p as BinarySearchTreeNode<T>;
        } else {
            let p = t.parent as BinarySearchTreeNode<T>;
            let ch = t;
            while (p && ch === p.Right) {
                ch = p as BinarySearchTreeNode<T>;
                p = p.parent as BinarySearchTreeNode<T>;
            }
            return p as BinarySearchTreeNode<T>;
        }
    }

    private deleteFixUp(x: BinarySearchTreeNode<T>){
        while (x !== this.Root && colorOf(x) === ENodeColor.Black) {
            if (x === leftOf(parentOf(x))) {
                let sib = rightOf(parentOf(x)) as BinarySearchTreeNode<T>;

                if (colorOf(sib) === ENodeColor.Red) {
                    setColor(sib, ENodeColor.Black);

                    setColor(parentOf(x), ENodeColor.Red);
                    this.leftRotate(parentOf(x), false);
                    sib = rightOf(parentOf(x));
                }

                if (colorOf(leftOf(sib))  === ENodeColor.Black &&
                    colorOf(rightOf(sib)) === ENodeColor.Black) {
                    setColor(sib, ENodeColor.Red);
                    x = parentOf(x);
                } else {
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
            } else { // symmetric
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
                } else {
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

    private blance(node: BinarySearchTreeNode<T>){
        if (node === this.Root){
            return;
        }
        const parent = node.parent as BinarySearchTreeNode<T>;
        if (parent.Color === ENodeColor.Black){
            return;
        }

        const uncle = node.getUncle() as BinarySearchTreeNode<T>;
        const grandParent = parent.parent as BinarySearchTreeNode<T>;
        if (uncle && uncle.Color === ENodeColor.Red){
            // 叔叔节点是红色
            parent.setColor(ENodeColor.Black);
            uncle.setColor(ENodeColor.Black);
            if (grandParent === this.Root){
                return;
            }
            grandParent.setColor(ENodeColor.Red);
            this.blance(parent.parent as BinarySearchTreeNode<T>);
        }else{
            let parentNode: BinarySearchTreeNode<T>;
            // 叔叔节点是黑色
            if (parent === parent.parent.Left){
                // 插入节点的父节点为祖父节点的左支时
                if (node === parent.Left){
                    // 插入的节点为父级的左节点时，右旋grandparent
                    parentNode = this.rightRotate(grandParent);
                }else{
                    // 插入的节点为父级的右节点
                    // 左旋父节点，然后右旋祖父节点
                    parentNode = this.leftRightRotate(grandParent);
                }
            }else{
                // 插入节点父节点为祖父节点的右支时
                if (node === parent.Right){
                    // 插入的节点为父级的右节点，左旋grandparent
                    parentNode = this.leftRotate(grandParent);
                }else{
                    parentNode = this.rightLeftRotate(grandParent);
                }
            }
            if (!parentNode.parent){
                this.Root = parentNode;
                (this.Root as BinarySearchTreeNode<T>).setColor(ENodeColor.Black);
            }
            this.blance(parentNode);
        }
    }

    private rightRotate(grandParentNode: BinarySearchTreeNode<T>, swapColor = true){
        /**
         * 右旋
         * 1、设置当前节点的左节点为当前节点左节点的右节点
         * 2、设置当前节点的左节点的右节点为当前节点
         * 3、判断当前节点属于父节点的左节点还是右节点，然后挂载当前节点的父节点的子节点为当前节点的左节点
         */
        const grandGrandParent = grandParentNode.parent;
        let grandParentNodeIsLeft;
        if (grandGrandParent) {
            grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
        }
        const parentNode = grandParentNode.Left as BinarySearchTreeNode<T>;

        const parentRightNode = parentNode.Right as BinarySearchTreeNode<T>;

        parentNode.setRight(grandParentNode);

        grandParentNode.setLeft(parentRightNode);

        if (grandGrandParent) {
        if (grandParentNodeIsLeft) {
            grandGrandParent.setLeft(parentNode);
        } else {
            grandGrandParent.setRight(parentNode);
        }
        } else {
            parentNode.parent = null;
            this.Root = parentNode;
        }

        // tslint:disable-next-line:no-unused-expression
        swapColor && this.swapColor(parentNode, grandParentNode);

        return parentNode;
    }

    private leftRightRotate(grandParentNode: BinarySearchTreeNode<T>){
         const parentNode = grandParentNode.Left;
         const childNode = parentNode.Right;

         const childLeftNode = childNode.Left;

         childNode.setLeft(parentNode);

         parentNode.setRight(childLeftNode);

         grandParentNode.setLeft(childNode);

         return this.rightRotate(grandParentNode);
    }

    private leftRotate(grandParentNode: BinarySearchTreeNode<T>, swapColor = true){
        // 左旋
        const grandGrandParent = grandParentNode.parent;

        let grandParentNodeIsLeft;
        if (grandGrandParent) {
            grandParentNodeIsLeft = grandGrandParent.Left === grandParentNode;
        }

        const parentNode = grandParentNode.Right as BinarySearchTreeNode<T>;

        const parentLeftNode = parentNode.Left;

        parentNode.setLeft(grandParentNode);

        grandParentNode.setRight(parentLeftNode);

        if (grandGrandParent) {
        if (grandParentNodeIsLeft) {
            grandGrandParent.setLeft(parentNode);
        } else {
            grandGrandParent.setRight(parentNode);
        }
        } else {
            parentNode.parent = null;
            this.Root = parentNode;
        }

        // tslint:disable-next-line:no-unused-expression
        swapColor && this.swapColor(parentNode, grandParentNode);

        return parentNode;
    }

    private rightLeftRotate(grandParentNode: BinarySearchTreeNode<T>){
        /**
         * 先右旋 后左旋
         */
        const parentNode = grandParentNode.Right;
        const childNode = parentNode.Left;

        const childRightNode = childNode.Right;

        childNode.setRight(parentNode);

        parentNode.setLeft(childRightNode);

        grandParentNode.setRight(childNode);

        return this.leftRotate(grandParentNode);
    }

    private swapColor(a: BinarySearchTreeNode<T>, b: BinarySearchTreeNode<T>){
        const color = a.Color;
        a.setColor(b.Color);
        b.setColor(color);
    }
}
