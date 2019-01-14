import { HashTable } from "../hashtable/HashTable";
export class HashMap {
    constructor(capacity) {
        this.map = new HashTable(capacity);
    }
    get Count() {
        return this.map.Count;
    }
    put(key, value) {
        const self = this;
        self.map.put(key, value);
        return self;
    }
    get(key) {
        return this.map.get(key);
    }
    clear() {
        return this.map.clear();
    }
    remove(key) {
        return this.map.remove(key);
    }
    keys() {
        return this.map.getKeys();
    }
    values() {
        return this.map.values();
    }
    contains(key) {
        return this.map.contains(key);
    }
}
