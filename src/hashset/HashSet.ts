import { HashTable } from "../hashtable/HashTable";
import { AbstractSet } from "../interface/AbstractSet";
/**
 * 哈希集合
 */
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
        // 以当前值为键，以布尔true为值存入哈希表中
        // 通过布尔值判断是否存在于哈希表中
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

    /**
     * 获取所有的值
     */
    entries(){
        return this.hashtable.getOrignalKeys();
    }

    /**
     * 获取左差集
     * @param set
     * @returns Array<T>
     */
    diff(set: AbstractSet<T>): Array<T>{
        return super.diff(set);
    }

    /**
     * 获取并集
     * @param set
     * @returns Array<T>
     */
    union(set: AbstractSet<T>): Array<T>{
        return super.union(set);
    }

    /**
     * 获取交集
     * @param set
     * @returns Array<T>
     */
    intersect(set: AbstractSet<T>): Array<T>{
        return super.intersect(set);
    }

    /**
     * 将数组转换为哈希集合
     * @param array
     */
    static fromArray<T>(array: Array<T>){
        const set = new HashSet<T>(array.length);
        array.forEach(item => set.add(item));
        return set;
    }
}
