import { NullPointerException } from "../../exception/NotNullException";
import { HashTable } from "../HashTable";

describe("HashTable test", () => {
    test("should create hash table of certain size", () => {
        const hashTable = new HashTable<number>();
        expect(hashTable.Count).toBe(0);
        expect(hashTable.TableSize).toBe(11);
        const hastTable2 = new HashTable<number>(32);
        expect(hastTable2.TableSize).toBe(32);
        HashTable.setDefaultTableSize(33);
        const hashTable3 = new HashTable<number>();
        expect(hashTable3.TableSize).toBe(33);
        HashTable.setDefaultTableSize(11);
    });

    test("should generate hashkey from property key", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        hashTable.put("ab", 4);

        expect(() => hashTable.put(null, 4)).toThrowError(new NullPointerException());
        expect(() => hashTable.put(undefined, 4)).toThrowError(new NullPointerException());
        expect(hashTable.getHashKey("a")).toBe(9);
        expect(hashTable.getHashKey("b")).toBe(10);
        expect(hashTable.getHashKey("c")).toBe(0);
        expect(hashTable.getHashKey("ab")).toBe(3);
        for (let i = 0; i < 10; i++){
            const code = "d".charCodeAt(0);
            hashTable.put(String.fromCharCode(code + i), 3);
        }
        expect(hashTable.getHashKey("a")).toBe(5);
        expect(hashTable.getHashKey("b")).toBe(6);
        expect(hashTable.getHashKey("c")).toBe(7);
    });

    test("should get item in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        hashTable.put("ab", 4);
        expect(hashTable.get("c")).toBe(3);
        expect(hashTable.get("ab")).toBe(4);
    });

    test("should delete item in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        hashTable.put("ab", 4);
        expect(hashTable.get("c")).toBe(3);
        hashTable.remove("c");
        expect(hashTable.get("c")).toBeNull();
        expect(hashTable.remove("d")).toBe(false);
    });

    test("should contains item in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        hashTable.put("ab", 4);
        expect(hashTable.contains("c")).toBe(true);
        expect(hashTable.contains("abc")).toBe(false);
    });

    test("should getKeys in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        expect(hashTable.getKeys().length).toBe(3);
        expect(hashTable.getKeys()).toContain("a");
        expect(hashTable.getKeys()).toContain("b");
        expect(hashTable.getKeys()).toContain("c");
    });

    test("should getOrignalKeys in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        expect(hashTable.getOrignalKeys().length).toBe(3);
        expect(hashTable.getOrignalKeys()).toContain("a");
        expect(hashTable.getOrignalKeys()).toContain("b");
        expect(hashTable.getOrignalKeys()).toContain("c");
    });

    test("should values in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        expect(hashTable.values().length).toBe(3);
        expect(hashTable.values()).toContain(1);
        expect(hashTable.values()).toContain(2);
        expect(hashTable.values()).toContain(3);
    });

    test("should clear in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put("a", 1);
        hashTable.put("b", 2);
        hashTable.put("c", 3);
        hashTable.clear();
        expect(hashTable.Count).toBe(0);
        expect(hashTable.getKeys().length).toBe(0);
    });

    test("should put object key in hashtable", () => {
        const hashTable = new HashTable<number>();
        hashTable.put(1, 1);
        hashTable.put(2, 2);
        hashTable.put(3, 3);
        expect(hashTable.getHashKey(1)).toBe(5);
        expect(hashTable.getHashKey(2)).toBe(6);
        expect(hashTable.getHashKey(3)).toBe(7);

        const hashTable2 = new HashTable<number>();
        hashTable2.put(true, 1);
        hashTable2.put(false, 0);
        expect(hashTable2.get(true)).toBe(1);
        expect(hashTable2.get(false)).toBe(0);

        const hashTable3 = new HashTable<number>();
        hashTable3.put({a: 1}, 1);
        const key = {a: 3};
        hashTable3.put(key, 2);
        expect(hashTable3.contains(key)).toBe(true);
        expect(hashTable3.get(key)).toBe(2);
        hashTable3.put(key, 3);
        expect(hashTable3.get(key)).toBe(3);

        expect(hashTable3.toString()).not.toBeNull();
    });
});
