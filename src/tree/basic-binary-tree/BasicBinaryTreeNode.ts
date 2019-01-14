import { BasicBinaryTree } from "./BasicBinaryTree";

export class BasicBinaryTreeNode<T>{
    private value: T;
    private left: BasicBinaryTreeNode<T>;
    private right: BasicBinaryTreeNode<T>;
    public parent: BasicBinaryTreeNode<T>;
    constructor(value?: T){
        this.value = value;
    }

    public get Value() {
        return this.value;
    }

    public get Left() {
        return this.left;
    }

    public get Right() {
        return this.right;
    }

    public setValue(value: T){
        this.value = value;
    }

    public setLeft(node: BasicBinaryTreeNode<T>){
        // if(this.left){
        //     this.left.parent = null;
        // }
        this.left = node;
        if (node){
            this.left.parent = this;
        }
        return this;
    }

    public setRight(node: BasicBinaryTreeNode<T>){
        // if(this.right){
        //     this.right.parent = null;
        // }
        this.right = node;
        if (node){
            this.right.parent = this;
        }
        return this;
    }

    public removeChild(node: BasicBinaryTreeNode<T>){
        if (node === this.left){
            this.left.parent = null;
            this.left = null;
            return true;
        }

        if (node === this.right){
            this.right.parent = null;
            this.right = null;
            return true;
        }
        return false;
    }

    public getHeight(){
        return Math.max(this.getLeftHeight(), this.getRightHeight());
    }

    public getRightHeight(): number{
        if (!this.right){
            return 0;
        }
        return this.right.getHeight() + 1;
    }

    public getLeftHeight(): number{
        if (!this.left){
            return 0;
        }
        return this.left.getHeight() + 1;
    }

    public balanceFactor() {
        return this.getLeftHeight() - this.getRightHeight();
    }

    public getSibling(){
        if (!this.parent){
            return;
        }
        if (this.parent.Left === this){
            return this.parent.Right;
        }
        return this.parent.Left;
    }

    public getUncle() {
        if (!this.parent){
            return;
        }
        if (!this.parent.parent){
            return;
        }

        const parent = this.parent;
        if (parent.parent.Left === parent){
            return parent.parent.Right;
        }
        return parent.parent.Left;
    }

    public toString(): string{
        return BasicBinaryTree.inTraversal(this).toString();
    }
}
