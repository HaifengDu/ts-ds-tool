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
export class HashTable<T>{
    private buckets: Array<LinkList<{key: string, value: T}>>;
    private count: number;
    private threshold: number;
    private keys: {[index: string]: number};
    private static DEFAULT_TABLE_SIZE = 11;
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

    constructor(size = HashTable.DEFAULT_TABLE_SIZE){
        this.buckets = Array(size).fill(null).map(() => new LinkList<{key: any, value: T}>());
        this.count = 0;
        this.keys = {};
        this.threshold = size * HashTable.LOADFACTOR;
    }

    public put(key: any, value: T){
        if (key === null || key === undefined){
            throw new NullPointerException();
        }
        const tempKey = toString(key);
        // 查找对应的hash的链表
        const hashed = hash(tempKey);
        let keyHash = this.mod(hashed);
        let bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        if (node){
            node.Value.value = value;
            return;
        }
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

    public get(key: any): T{
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        const keyHash = this.mod(hashed);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        return node ? node.Value.value : null;
    }

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

    public getKeys(): Array<string>{
        return Object.keys(this.keys);
    }

    public getOrignalKeys(): Array<any>{
        const arr = new Array<any>(this.count);
        this.iterate((item, index) => {
            arr[index] = item.key;
        });
        return arr;
    }

    public values(): Array<T>{
        const arr = new Array<T>(this.count);
        this.iterate((item, index) => {
            arr[index] = item.value;
        });
        return arr;
    }

    public clear(){
        this.buckets.length = 0;
        this.keys = {};
        this.count = 0;
        this.buckets = Array(HashTable.DEFAULT_TABLE_SIZE)
        .fill(null).map(() => new LinkList<{key: string, value: T}>());
    }

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

    private iterate(fn: (item: {key: string, value: T}, index?: number) => void){
        let iterateFlag = 0;
        for (let i = 0, count = this.buckets.length; i < count ; i++){
            const linkArr = this.buckets[i].toArray();
            const arrCount = iterateFlag;
            for (let j = arrCount, addCount = arrCount + linkArr.length; j < addCount ; j++){
                fn(linkArr[j - arrCount].Value, iterateFlag);
                iterateFlag++;
            }
        }
    }

    private rehash(){
        const oldBuckets = this.buckets;
        const newCapacity = oldBuckets.length * 2 + 1;
        const newBuckets = Array(newCapacity).fill(null).map(() => new LinkList<{key: string, value: T}>());
        this.buckets = newBuckets;
        this.keys = {};
        for (let i = 0 , oldLen = oldBuckets.length; i < oldLen; i++){
            oldBuckets[i].toArray().forEach(item => {
                const data = item.Value;
                const hashed = hash(toString(data.key));
                const keyHash = this.mod(hashed);
                newBuckets[keyHash].append(data);
                this.keys[toString(data.key)] = keyHash;
            });
            // 修复 重新hash
        }
        oldBuckets.length = 0;
        this.threshold = newCapacity * HashTable.LOADFACTOR;
    }

    private mod(hashed: number){
        const modulo = hashed % this.buckets.length;
        return hashed < 0 ? modulo * -1 : modulo;
    }
}
