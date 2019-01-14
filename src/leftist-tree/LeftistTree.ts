import { ICompare } from "../interface/ICompare";
import {BasicBinaryTreeNode} from "../tree/basic-binary-tree/BasicBinaryTreeNode";

// tslint:disable-next-line:no-internal-module
function compareFn<T>(a: T, b: T) {
    return a <= b;
}
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

    private fixNode(node: LeftistTreeNode<T>) {
        const left = node.Left as LeftistTreeNode<T>;
        const right = node.Right as LeftistTreeNode<T>;
        if (left && right && left.Rank < right.Rank) {
            const temp = node.Right;
            node.setRight(node.Left);
            node.setLeft(temp);
        }else if (node.Right && !node.Left) {
            node.setLeft(node.Right);
            node.setRight(null);
        }

        if (node.Right) {
            node.Rank = (node.Right as LeftistTreeNode<T>).Rank + 1;
        }else {
            node.Rank = 0;
        }
    }

    private _merge(root1: LeftistTreeNode<T>, root2: LeftistTreeNode<T>) {
        if (!root1) {
            return root2;
        }
        if (!root2) {
            return root1;
        }
        if (!this.compare(root1.Value , root2.Value)) {
            const temp = root2;
            root2 = root1;
            root1 = temp;
        }
        root1.setRight(this._merge(root1.Right as LeftistTreeNode<T>, root2));
        this.fixNode(root1);
        return root1;
    }

    public merge(tree2: LeftistTree<T>) {
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

    public findExtremum() {
        if (!this.root) {
            return null;
        }
        return this.root.Value;
    }

    public insert(value: T) {
        const node = new LeftistTree(this.compare , value);
        this.merge(node);
        return node;
    }

    public deleteExtremum(): T {
        if (!this.root) {
            return null;
        }
        const value = this.root.Value;
        this.root = this._merge(this.root.Left as LeftistTreeNode<T> , this.root.Right as LeftistTreeNode<T>);
        this.count --;
        return value;
    }
}
