import { BasicBinaryTreeNode } from "./BasicBinaryTreeNode";

export class BasicBinaryTree{
    /**
     * 先序遍历
     * @param tree
     */
    public static preTraversal<T = any>(tree: BasicBinaryTreeNode<T>){
        const arr: Array<T> = [];
        this._preTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }
    private static _preTraversal<T = any>(tree: BasicBinaryTreeNode<T>, fn: (value: T) => void){
        if (!tree){
            return ;
        }
        fn(tree.Value);
        this._preTraversal(tree.Left, fn);
        this._preTraversal(tree.Right, fn);
    }

    /**
     * 中序遍历
     * @param tree
     * @param fn
     */
    public static inTraversal<T = any>(tree: BasicBinaryTreeNode<T>){
        const arr: Array<T> = [];
        this._inTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }

    private static _inTraversal<T = any>(tree: BasicBinaryTreeNode<T>, fn: (value: T) => void){
        if (!tree){
            return ;
        }
        this._inTraversal(tree.Left, fn);
        fn(tree.Value);
        this._inTraversal(tree.Right, fn);
    }

    /**
     * 后序遍历
     * @param tree
     */
    public static postOrderTraversal<T = any>(tree: BasicBinaryTreeNode<T>){
        const arr: Array<T> = [];
        this._postOrderTraversal(tree, item => {
            arr.push(item);
        });
        return arr;
    }

    private static _postOrderTraversal<T = any>(tree: BasicBinaryTreeNode<T>, fn: (value: T) => void){
        if (!tree){
            return ;
        }
        this._postOrderTraversal(tree.Left, fn);
        this._postOrderTraversal(tree.Right, fn);
        fn(tree.Value);
    }

    /**
     * 获取树高
     * @param tree
     */
    public static getHeight<T = any>(tree: BasicBinaryTreeNode<T>){
        if (!tree){
            return 0;
        }
        let length = 1;
        length +=  Math.max(this.getHeight(tree.Left), this.getHeight(tree.Right));
        return length;
    }
}
