import { HashTable } from "../hashtable/HashTable";
import { AbstractSet } from "../interface/AbstractSet";
export class HashSet extends AbstractSet {
    constructor(capacity = HashSet.DEFAULT_TABLE_SIZE) {
        super();
        this.hashtable = new HashTable(capacity);
    }
    get Size() {
        return this.hashtable.Count;
    }
    add(item) {
        this.hashtable.put(item, true);
        return this;
    }
    has(element) {
        return this.hashtable.contains(element);
    }
    remove(element) {
        return this.hashtable.remove(element);
    }
    clear() {
        this.hashtable.clear();
    }
    entries() {
        return this.hashtable.getOrignalKeys();
    }
    diff(set) {
        return super.diff(set);
    }
    union(set) {
        return super.union(set);
    }
    intersect(set) {
        return super.intersect(set);
    }
    static fromArray(array) {
        const set = new HashSet(array.length);
        array.forEach(item => set.add(item));
        return set;
    }
}
HashSet.DEFAULT_TABLE_SIZE = 11;
