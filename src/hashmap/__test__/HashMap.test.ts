import { HashMap } from "../HashMap";

describe("HashMap test", () => {
    test("should create hash table of certain size", () => {
        const hashMap = new HashMap<number>();
        expect(hashMap.Count).toBe(0);
    });

    test("should get item in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        hashMap.put("ab", 4);
        expect(hashMap.get("c")).toBe(3);
        expect(hashMap.get("ab")).toBe(4);
    });

    test("should delete item in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        hashMap.put("ab", 4);
        expect(hashMap.get("c")).toBe(3);
        hashMap.remove("c");
        expect(hashMap.get("c")).toBeNull();
        expect(hashMap.remove("d")).toBe(false);
    });

    test("should contains item in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        hashMap.put("ab", 4);
        expect(hashMap.contains("c")).toBe(true);
        expect(hashMap.contains("abc")).toBe(false);
    });

    test("should values in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        expect(hashMap.values().length).toBe(3);
        expect(hashMap.values()).toContain(1);
        expect(hashMap.values()).toContain(2);
        expect(hashMap.values()).toContain(3);
    });

    test("should getKeys in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        expect(hashMap.keys().length).toBe(3);
        expect(hashMap.keys()).toContain("a");
        expect(hashMap.keys()).toContain("b");
        expect(hashMap.keys()).toContain("c");
    });

    test("should clear in hashtable", () => {
        const hashMap = new HashMap<number>();
        hashMap.put("a", 1);
        hashMap.put("b", 2);
        hashMap.put("c", 3);
        hashMap.clear();
        expect(hashMap.Count).toBe(0);
    });
});
