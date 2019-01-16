import { NullPointerException } from "../exception/NotNullException";
import LinkList from "../linklist/LinkList";
import { hash, toString } from "../util";
function defineHashNodeToString(node) {
    Object.defineProperty(node, "toString", {
        value: function () {
            return JSON.stringify(this);
        },
    });
}
export class HashTable {
    constructor(size = HashTable.DEFAULT_TABLE_SIZE) {
        this.buckets = Array(size).fill(null).map(() => new LinkList());
        this.count = 0;
        this.keys = {};
        this.threshold = size * HashTable.LOADFACTOR;
    }
    static setDefaultTableSize(size) {
        this.DEFAULT_TABLE_SIZE = size;
    }
    get Count() {
        return this.count;
    }
    get TableSize() {
        return this.buckets.length;
    }
    put(key, value) {
        if (key === null || key === undefined) {
            throw new NullPointerException();
        }
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        let keyHash = this.mod(hashed);
        let bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        if (node) {
            node.Value.value = value;
            return;
        }
        if (this.count >= this.threshold) {
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
    get(key) {
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        const keyHash = this.mod(hashed);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        return node ? node.Value.value : null;
    }
    remove(key) {
        const tempKey = toString(key);
        const hashed = hash(tempKey);
        const keyHash = this.mod(hashed);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.findNode(item => item.key === key);
        if (node) {
            this.count--;
            return bucketLinkedList.deleteNode(node.Value);
        }
        return false;
    }
    contains(key) {
        return this.get(key) !== null;
    }
    getKeys() {
        return Object.keys(this.keys);
    }
    getOrignalKeys() {
        const arr = new Array(this.count);
        this.iterate((item, index) => {
            arr[index] = item.key;
        });
        return arr;
    }
    values() {
        const arr = new Array(this.count);
        this.iterate((item, index) => {
            arr[index] = item.value;
        });
        return arr;
    }
    clear() {
        this.buckets.length = 0;
        this.keys = {};
        this.count = 0;
        this.buckets = Array(HashTable.DEFAULT_TABLE_SIZE)
            .fill(null).map(() => new LinkList());
    }
    getHashKey(key) {
        const tempKey = toString(key);
        return this.keys[tempKey];
    }
    toString() {
        const arr = [];
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
    iterate(fn) {
        let iterateFlag = 0;
        for (let i = 0, count = this.buckets.length; i < count; i++) {
            const linkArr = this.buckets[i].toArray();
            const arrCount = iterateFlag;
            for (let j = arrCount, addCount = arrCount + linkArr.length; j < addCount; j++) {
                fn(linkArr[j - arrCount].Value, iterateFlag);
                iterateFlag++;
            }
        }
    }
    rehash() {
        const oldBuckets = this.buckets;
        const newCapacity = oldBuckets.length * 2 + 1;
        const newBuckets = Array(newCapacity).fill(null).map(() => new LinkList());
        this.buckets = newBuckets;
        this.keys = {};
        for (let i = 0, oldLen = oldBuckets.length; i < oldLen; i++) {
            oldBuckets[i].toArray().forEach(item => {
                const data = item.Value;
                const hashed = hash(toString(data.key));
                const keyHash = this.mod(hashed);
                newBuckets[keyHash].append(data);
                this.keys[toString(data.key)] = keyHash;
            });
        }
        oldBuckets.length = 0;
        this.threshold = newCapacity * HashTable.LOADFACTOR;
    }
    mod(hashed) {
        const modulo = hashed % this.buckets.length;
        return hashed < 0 ? modulo * -1 : modulo;
    }
}
HashTable.DEFAULT_TABLE_SIZE = 11;
HashTable.LOADFACTOR = 0.75;
