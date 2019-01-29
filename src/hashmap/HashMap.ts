import { HashTable } from "../hashtable/HashTable";

/**
 * 哈希字典
 */
export class HashMap<T>{
    private map: HashTable<T>;
    constructor(capacity?: number){
        this.map = new HashTable(capacity);
    }

    get Count() {
        return this.map.Count;
    }

    put(key: string, value: T) {
        const self = this;
        self.map.put(key, value);
        return self;
    }

    get(key: string) {
        return this.map.get(key);
    }

    clear() {
        return this.map.clear();
    }

    remove(key: string) {
        return this.map.remove(key);
    }

    keys() {
        return this.map.getKeys();
    }

    values() {
        return this.map.values();
    }

    contains(key: string) {
        return this.map.contains(key);
    }
}
