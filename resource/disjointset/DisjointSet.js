import { NotFindInSetException } from "../exception/NotFindInSetException";
import { DisjointSetItem } from "./DisjointSetItem";
export class DisjointSet {
    constructor(key) {
        this.key = key;
        this.items = {};
        this.rootItems = {};
    }
    get RootItems() {
        return this.rootItems;
    }
    makeSet(value) {
        const disjointSetItem = new DisjointSetItem(value);
        if (!this.items[disjointSetItem.getKey(this.key)]) {
            this.items[disjointSetItem.getKey(this.key)] = disjointSetItem;
            this.rootItems[disjointSetItem.getKey(this.key)] = disjointSetItem;
        }
        return this;
    }
    find(value) {
        const disjointSetItem = new DisjointSetItem(value);
        const foundDisjointSetItem = this.items[disjointSetItem.getKey(this.key)];
        if (!foundDisjointSetItem) {
            return null;
        }
        return foundDisjointSetItem.getRoot().getKey(this.key);
    }
    union(value1, value2) {
        const rootKeyA = this.find(value1);
        const rootKeyB = this.find(value2);
        if (rootKeyA === null || rootKeyB === null) {
            throw new NotFindInSetException();
        }
        if (rootKeyA === rootKeyB) {
            return this;
        }
        const rootA = this.items[rootKeyA];
        const rootB = this.items[rootKeyB];
        if (rootA.getRank() < rootB.getRank()) {
            rootB.addChild(rootA);
            delete this.rootItems[rootKeyA];
            return this;
        }
        rootA.addChild(rootB);
        delete this.rootItems[rootKeyB];
        return this;
    }
    inSameSet(value1, value2) {
        const rootKeyA = this.find(value1);
        const rootKeyB = this.find(value2);
        if (rootKeyA === null || rootKeyB === null) {
            throw new NotFindInSetException();
        }
        return rootKeyA === rootKeyB;
    }
}
export default DisjointSet;
