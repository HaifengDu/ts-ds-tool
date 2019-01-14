import { BasicBinaryTreeNode } from "../basic-binary-tree/BasicBinaryTreeNode";
export enum ENodeColor{
    Red = 1,
    Black,
}
export class BinarySearchTreeNode<T> extends BasicBinaryTreeNode<T>{
    private color: ENodeColor;
    constructor(value: T){
        super(value);
    }

    get Color(){
        return this.color;
    }

    setColor(color: ENodeColor){
        this.color = color;
    }

    setValue(value: T){
        super.setValue(value);
    }

    find(value: T, compareKey?: keyof T): BinarySearchTreeNode<T>{
        let a: any, b: any;
        if (compareKey){
            a = this.Value[compareKey];
            b = value[compareKey];
        }else{
            a = this.Value;
            b = value;
        }
        if (a === b){
            return this;
        }
        if (a > b && this.Left){
            return (this.Left as BinarySearchTreeNode<T>).find(value, compareKey);
        }
        if (a < b && this.Right){
            return (this.Right as BinarySearchTreeNode<T>).find(value, compareKey);
        }
        return null;
    }

    findMin(): BinarySearchTreeNode<T>{
        if (!this.Left){
            return this;
        }
        return (this.Left as BinarySearchTreeNode<T>).findMin();
    }

    findMax(): BinarySearchTreeNode<T>{
        if (!this.Right){
            return this;
        }
        return (this.Right as BinarySearchTreeNode<T>).findMax();
    }

    insert(value: T, compareKey?: keyof T){
        if (value === null || value === undefined){
            return;
        }
        let compareFunc: (a: any, b: any) => boolean = (a, b) => a < b;
        if (compareKey){
            compareFunc = (a: T, b: T) => a[compareKey] < b[compareKey];
        }
        let resultNode: BinarySearchTreeNode<T>;
        if (compareFunc(value, this.Value)){
            if (this.Left){
                resultNode = (this.Left as BinarySearchTreeNode<T>).insert(value, compareKey);
            }else{
                resultNode = new BinarySearchTreeNode(value);
                this.setLeft(resultNode);
            }
        }else{
            if (this.Right){
                resultNode = (this.Right as BinarySearchTreeNode<T>).insert(value, compareKey);
            }else{
                resultNode = new BinarySearchTreeNode(value);
                this.setRight(resultNode);
            }
        }
        return resultNode;
    }

    contains(value: T, compareKey?: keyof T){
        return !!this.find(value, compareKey);
    }
}
