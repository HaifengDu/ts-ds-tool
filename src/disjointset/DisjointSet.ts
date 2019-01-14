import { NotFindInSetException } from "../exception/NotFindInSetException";
import { DisjointSetItem } from "./DisjointSetItem";

export class DisjointSet<T = string>{
    private items: {[index: string]: DisjointSetItem<T>};
    private rootItems: {[index: string]: DisjointSetItem<T>};

    public get RootItems(){
        return this.rootItems;
    }

    constructor(private key?: keyof T){
        this.items = {};
        this.rootItems = {};
    }
    public makeSet(value: T){
        const disjointSetItem = new DisjointSetItem(value);
        if (!this.items[disjointSetItem.getKey(this.key)]){
            this.items[disjointSetItem.getKey(this.key)] = disjointSetItem;
            this.rootItems[disjointSetItem.getKey(this.key)] = disjointSetItem;
        }
        return this;
    }

    public find(value: T): string{
        const disjointSetItem = new DisjointSetItem(value);
        const foundDisjointSetItem = this.items[disjointSetItem.getKey(this.key)];
        if (!foundDisjointSetItem){
            return null;
        }
        return foundDisjointSetItem.getRoot().getKey(this.key);
    }

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
