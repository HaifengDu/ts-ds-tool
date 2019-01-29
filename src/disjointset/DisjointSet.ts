import { NotFindInSetException } from "../exception/NotFindInSetException";
import { DisjointSetItem } from "./DisjointSetItem";

/**
 * 并查集
 */
export class DisjointSet<T = string>{
    private items: {[index: string]: DisjointSetItem<T>};
    private rootItems: {[index: string]: DisjointSetItem<T>};

    public get RootItems(){
        return this.rootItems;
    }

    /**
     * 并查集
     * @param key 已指定键创建集合
     */
    constructor(private key?: keyof T){
        this.items = {};
        this.rootItems = {};
    }

    /**
     * 创建集合
     * @param value
     */
    public makeSet(value: T){
        const disjointSetItem = new DisjointSetItem(value);
        if (!this.items[disjointSetItem.getKey(this.key)]){
            this.items[disjointSetItem.getKey(this.key)] = disjointSetItem;
            this.rootItems[disjointSetItem.getKey(this.key)] = disjointSetItem;
        }
        return this;
    }

    /**
     * 查找节点对应的集合
     * @param value
     */
    public find(value: T): string{
        const disjointSetItem = new DisjointSetItem(value);
        const foundDisjointSetItem = this.items[disjointSetItem.getKey(this.key)];
        if (!foundDisjointSetItem){
            return null;
        }
        return foundDisjointSetItem.getRoot().getKey(this.key);
    }

    /**
     * 合并集合
     * 将两个集合合并到子集较多的集合中
     * @param value1
     * @param value2
     */
    public union(value1: T, value2: T){
        const rootKeyA = this.find(value1);
        const rootKeyB = this.find(value2);

        if (rootKeyA === null || rootKeyB === null){
            throw new NotFindInSetException();
        }

        if (rootKeyA === rootKeyB){
            return this;
        }

        const rootA = this.items[rootKeyA];
        const rootB = this.items[rootKeyB];

        if (rootA.getRank() < rootB.getRank()){
            rootB.addChild(rootA);
            delete this.rootItems[rootKeyA];
            return this;
        }

        rootA.addChild(rootB);
        delete this.rootItems[rootKeyB];
        return this;
    }

    /**
     * 判断两个节点是否在同一集合中
     * 未能查找到集合抛出NotFindInSetException异常
     * @param value1
     * @param value2
     */
    public inSameSet(value1: T, value2: T){
        const rootKeyA = this.find(value1);
        const rootKeyB = this.find(value2);
        if (rootKeyA === null || rootKeyB === null){
            throw new NotFindInSetException();
        }

        return rootKeyA === rootKeyB;
    }
}

export default DisjointSet;
