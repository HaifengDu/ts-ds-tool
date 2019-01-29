import { NullPointerException } from "../exception/NotNullException";
import LinkList from "../linklist/LinkList";
import { hash, toString } from "../util";
function defineHashNodeToString<T>(node: {key: any, value: T}){
    Object.defineProperty(node, "toString", {
        // tslint:disable-next-line:object-literal-shorthand
        value: function(){
            return JSON.stringify(this);
        },
    });
}
/**
 * 哈希表
 */
export class HashTable<T>{
    private buckets: Array<LinkList<{key: string, value: T}>>;
    private count: number;
    /**
     * 扩容参数 用于判断是否需要扩容
     */
    private threshold: number;
    private keys: {[index: string]: number};
    private static DEFAULT_TABLE_SIZE = 11;
    /**
     * 加载因子 用于重哈希时扩容哈希表
     */
    private static readonly LOADFACTOR = 0.75;

    static setDefaultTableSize(size: number){
        this.DEFAULT_TABLE_SIZE = size;
    }

    public get Count(){
        return this.count;
    }

    public get TableSize(){
        return this.buckets.length;
    }

    /**
     * 哈希表
     * @param size 指定默认哈希表大小
     */
    constructor(size = HashTable.DEFAULT_TABLE_SIZE){
        this.buckets = Array(size).fill(null).map(() => new LinkList<{key: any, value: T}>());
        this.count = 0;
        this.keys = {};
        this.threshold = size * HashTable.LOADFACTOR;
    }

    /**
     * 存放键值
     * @param key 区分基础类型和对象类型，对象使用json序列化
     * @param value 值
     */
    public put(key: any, value: T){
        if (key === null || key === undefined){
            throw new NullPointerException();
        }
        const tempKey = toString(key);
        // 查找对应的hash的链表
        const hashed = hash(tempKey);
        let keyHash = this.mod(hashed);
        // 取余后，指定索引位置
        let bucketLinkedList = this.buckets[keyHash];
        // 查找链表，判断节点是否存在
        const node = bucketLinkedList.findNode(item => item.key === key);
        if (node){
            node.Value.value = value;
            return;
        }
        // 判断数量是否大于扩容因子，然后扩容，重哈希。
        if (this.count >= this.threshold){
            this.rehash();
            keyHash = this.mod(hashed);
            bucketLinkedList = this.buckets[keyHash];
        }
        this.keys[tempKey] = keyHash;
        bucketLinkedList.append({
            key,
            value,
        });
        this.count++;
        return this;
    }

    /**
     * 获取指定键对应的值
     * @param key
     */
    public get(key: any): T{
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        const keyHash = this.mod(hashed);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        return node ? node.Value.value : null;
    }

    /**
     * 移出指定键
     * @param key
     */
    public remove(key: any): boolean{
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        const keyHash = this.mod(hashed);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        if (node){
            this.count--;
            // TODO:没有rehash
            return bucketLinkedList.deleteNode(node.Value);
        }
        return false;
    }

    public contains(key: any): boolean{
        return this.get(key) !== null;
    }

    /**
     * 获取所有的序列化后的key
     */
    public getKeys(): Array<string>{
        return Object.keys(this.keys);
    }

    /**
     * 获取所有原始的key
     */
    public getOrignalKeys(): Array<any>{
        const arr = new Array<any>(this.count);
        this.iterate((item, index) => {
            arr[index] = item.key;
        });
        return arr;
    }

    /**
     * 获取所有的值
     */
    public values(): Array<T>{
        const arr = new Array<T>(this.count);
        this.iterate((item, index) => {
            arr[index] = item.value;
        });
        return arr;
    }

    /**
     * 清空哈希表
     */
    public clear(){
        this.buckets.length = 0;
        this.keys = {};
        this.count = 0;
        this.buckets = Array(HashTable.DEFAULT_TABLE_SIZE)
        .fill(null).map(() => new LinkList<{key: string, value: T}>());
    }

    /**
     * 获取指定键对应的哈希值
     * @param key
     */
    public getHashKey(key: any){
        const tempKey = toString(key);
        return this.keys[tempKey];
    }

    public toString(){
        const arr: Array<{key: string, value: T}> = [];
        this.iterate(item => {
            const node = {
                key: item.key,
                value: item.value,
            };
            defineHashNodeToString(node);
            arr.push(node);
        });
        return arr.toString();
    }

    /**
     * 哈希表迭代器
     * @param fn
     */
    private iterate(fn: (item: {key: string, value: T}, index?: number) => void){
        let iterateFlag = 0;
        // 循环所有的链表，取出对应的值
        for (let i = 0, count = this.buckets.length; i < count ; i++){
            const linkArr = this.buckets[i].toArray();
            const arrCount = iterateFlag;
            for (let j = arrCount, addCount = arrCount + linkArr.length; j < addCount ; j++){
                fn(linkArr[j - arrCount].Value, iterateFlag);
                iterateFlag++;
            }
        }
    }

    /**
     * 重哈希
     */
    private rehash(){
        const oldBuckets = this.buckets;
        // 扩容为原来的2n+1倍
        const newCapacity = oldBuckets.length * 2 + 1;
        const newBuckets = Array(newCapacity).fill(null).map(() => new LinkList<{key: string, value: T}>());
        this.buckets = newBuckets;
        this.keys = {};
        // 将原来的所有数据重新计算哈希，然后放入新的哈希表中
        for (let i = 0 , oldLen = oldBuckets.length; i < oldLen; i++){
            oldBuckets[i].toArray().forEach(item => {
                const data = item.Value;
                const hashed = hash(toString(data.key));
                const keyHash = this.mod(hashed);
                newBuckets[keyHash].append(data);
                this.keys[toString(data.key)] = keyHash;
            });
        }
        oldBuckets.length = 0;
        // 重新计算扩容因子
        this.threshold = newCapacity * HashTable.LOADFACTOR;
    }

    private mod(hashed: number){
        const modulo = hashed % this.buckets.length;
        return hashed < 0 ? modulo * -1 : modulo;
    }
}
