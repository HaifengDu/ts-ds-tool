import { ICompare } from "../interface/ICompare";
import {BasicBinaryTreeNode} from "../tree/basic-binary-tree/BasicBinaryTreeNode";

// tslint:disable-next-line:no-internal-module
function compareFn<T>(a: T, b: T) {
    return a <= b;
}

/**
 * 左偏树节点
 */
export class LeftistTreeNode<T = number> extends BasicBinaryTreeNode<T> {
    constructor(value: T, private rank: number) {
        super(value);
    }

    public set Rank(rank: number){
        this.rank = rank;
    }

    public get Rank(){
        return this.rank;
    }
}

/**
 * 左偏树
 */
export class LeftistTree<T>{
    private root: LeftistTreeNode<T>;
    private count = 0;

    constructor(private compare: ICompare<T> = compareFn, value?: T) {
        if (typeof value !== "undefined") {
            this.root = new LeftistTreeNode(value , 0);
            this.count = 1;
        }
    }

    public get Root(){
        return this.root;
    }

    public get Count(){
        return this.count;
    }

    public isEmpty() {
        return !this.root;
    }

    /**
     * 修复合并后的节点
     * @param node
     */
    private fixNode(node: LeftistTreeNode<T>) {
        const left = node.Left as LeftistTreeNode<T>;
        const right = node.Right as LeftistTreeNode<T>;
        // 比较左右子树的距离，如果左子树距离小于右子树距离，交换左右子树
        if (left && right && left.Rank < right.Rank) {
            const temp = node.Right;
            node.setRight(node.Left);
            node.setLeft(temp);
        }else if (node.Right && !node.Left) {
            // 如果左子树为空，将右子树置为左子树
            node.setLeft(node.Right);
            node.setRight(null);
        }

        // 修复根节点距离
        if (node.Right) {
            node.Rank = (node.Right as LeftistTreeNode<T>).Rank + 1;
        }else {
            node.Rank = 0;
        }
    }

    /**
     * 递归合并两个堆
     * @param root1
     * @param root2
     */
    private _merge(root1: LeftistTreeNode<T>, root2: LeftistTreeNode<T>) {
        if (!root1) {
            return root2;
        }
        if (!root2) {
            return root1;
        }
        // 比较节点值大小，选择根
        if (!this.compare(root1.Value , root2.Value)) {
            const temp = root2;
            root2 = root1;
            root1 = temp;
        }
        // 递归合并根节点的左子树和另外一个树，然后将其设为根节点的左子树
        root1.setRight(this._merge(root1.Right as LeftistTreeNode<T>, root2));
        this.fixNode(root1);
        return root1;
    }

    /**
     * 合并两颗树
     * @param tree2
     */
    public merge(tree2: LeftistTree<T>) {
        // 如果一棵树为空，以另一个树为根
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
        this.root = this._merge(root1 , root2);
        this.count += tree2.Count;
        return this;
    }

    /**
     * 获取最值
     */
    public findExtremum() {
        if (!this.root) {
            return null;
        }
        return this.root.Value;
    }

    /**
     * 插入节点
     * @param value
     */
    public insert(value: T) {
        const node = new LeftistTree(this.compare , value);
        this.merge(node);
        return node;
    }

    /**
     * 取出最值
     */
    public deleteExtremum(): T {
        if (!this.root) {
            return null;
        }
        const value = this.root.Value;
        // 删除根节点，然后合并左右子树
        this.root = this._merge(this.root.Left as LeftistTreeNode<T> , this.root.Right as LeftistTreeNode<T>);
        this.count --;
        return value;
    }
}
