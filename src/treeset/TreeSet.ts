import { AbstractSet } from "../interface/AbstractSet";
import { BasicBinaryTree } from "../tree/basic-binary-tree/BasicBinaryTree";
import { RedBlackTree } from "../tree/red-black-tree/RedBlackTree";

export class TreeSet<T> extends AbstractSet<T>{
    private tree: RedBlackTree<T>;
    private size = 0;
    constructor(compareKey?: keyof T){
        super();
        this.tree = new RedBlackTree<T>(compareKey);
    }
    add(item: T): this {
        if (this.tree.contains(item)){
            return this;
        }
        this.tree.insert(item);
        this.size++;
        return this;
    }
    entries(): Array<T> {
        return BasicBinaryTree.inTraversal(this.tree.Root);
    }
    has(item: T): boolean {
        return this.tree.contains(item);
    }
    remove(item: T): boolean {
        if (!this.tree.contains(item)){
            return false;
        }
        this.size--;
        return this.tree.remove(item);
    }

    diff(set: AbstractSet<T>): Array<T>{        // A-B 差集
        return super.diff(set);
    }

    union(set: AbstractSet<T>): Array<T>{       // 并集
        return super.union(set);
    }

    intersect(set: AbstractSet<T>): Array<T>{   // 交集
        return super.intersect(set);
    }

    get Size(){
        return this.size;
    }
}
