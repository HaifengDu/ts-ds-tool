import { HashTable } from "../hashtable/HashTable";
import { AbstractSet } from "../interface/AbstractSet";
export class HashSet<T= string> extends AbstractSet<T>{
    private hashtable: HashTable<boolean>;
    private static DEFAULT_TABLE_SIZE = 11;

    public get Size(){
        return this.hashtable.Count;
    }

    constructor(capacity = HashSet.DEFAULT_TABLE_SIZE){
        super();
        this.hashtable = new HashTable(capacity);
    }
    add(item: T){
        this.hashtable.put(item, true);
        return this;
    }

    has(element: T){
        return this.hashtable.contains(element);
    }

    remove(element: T){
        return this.hashtable.remove(element);
    }

    clear(){
        this.hashtable.clear();
    }

    entries(){
        return this.hashtable.getOrignalKeys();
    }

    diff(set: AbstractSet<T>): Array<T>{
        return super.diff(set);
    }

    union(set: AbstractSet<T>): Array<T>{
        return super.union(set);
    }

    intersect(set: AbstractSet<T>): Array<T>{
        return super.intersect(set);
    }

    static fromArray<T>(array: Array<T>){
        const set = new HashSet<T>(array.length);
        array.forEach(item => set.add(item));
        return set;
    }
}
