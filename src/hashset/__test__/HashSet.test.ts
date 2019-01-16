import { HashSet } from "../HashSet";

describe("HashSet test", () => {
    test("should create an empty hashset", () => {
        const hashSet = new HashSet<number>();
        expect(hashSet.Size).toBe(0);
        expect(hashSet.isEmpty()).toBe(true);
        const hashSet2 = new HashSet<number>(32);
        expect(hashSet2.Size).toBe(0);
    });

    test("should add item in hashset", () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);
        expect(hashSet.Size).toBe(2);
        hashSet.add(2);
        expect(hashSet.Size).toBe(2);
        expect(hashSet.entries().length).toBe(2);
        expect(hashSet.entries().indexOf(2)).toBeGreaterThanOrEqual(0);
        expect(hashSet.entries().indexOf(3)).toBeGreaterThanOrEqual(0);
    });

    test("should remove item in hashset", () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);
        expect(hashSet.Size).toBe(2);
        hashSet.remove(2);
        expect(hashSet.Size).toBe(1);
        hashSet.remove(4);
        expect(hashSet.Size).toBe(1);
    });

    test("should diff between two hashsets", () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);

        const hashSet2 = new HashSet<number>();
        hashSet2.add(3);
        hashSet2.add(4);

        expect(hashSet.diff(hashSet2)).toEqual([2]);
        expect(hashSet2.diff(hashSet)).toEqual([4]);

        expect(hashSet.diff(null)).toContain(2);
    });

    test("should union between two hashsets", () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);

        const hashSet2 = new HashSet<number>();
        hashSet2.add(3);
        hashSet2.add(4);

        expect(hashSet.union(hashSet2).length).toBe(3);
        expect(hashSet.union(hashSet2)).toContain(2);
        expect(hashSet.union(hashSet2)).toContain(3);
        expect(hashSet.union(hashSet2)).toContain(4);

        expect(hashSet.union(null)).toContain(2);
    });

    test("should intersect between two hashsets", () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);

        const hashSet2 = new HashSet<number>();
        hashSet2.add(3);
        hashSet2.add(4);
        expect(hashSet.intersect(hashSet2)).toContain(3);
        hashSet2.add(2);
        expect(hashSet.intersect(hashSet2)).toContain(2);
        expect(hashSet.intersect(hashSet2)).toContain(3);
        hashSet2.remove(2);
        hashSet.add(4);
        expect(hashSet.intersect(hashSet2)).toContain(4);
        expect(hashSet.intersect(hashSet2)).toContain(3);

        expect(hashSet.intersect(null)).toEqual([]);
    });

    test("should clear item in hashset" , () => {
        const hashSet = new HashSet<number>();
        hashSet.add(2);
        hashSet.add(3);
        hashSet.clear();
        expect(hashSet.isEmpty()).toBe(true);
        expect(hashSet.has(2)).toBe(false);
        expect(hashSet.has(3)).toBe(false);
        expect(hashSet.Size).toBe(0);
    });

    test("should from array to create hashset", () => {
        const array = Array(100).fill(1).map((item, index) => index + item);
        const hashSet = HashSet.fromArray(array);
        expect(hashSet.Size).toBe(array.length);
        for (const element of array) {
            expect(hashSet.has(element)).toBe(true);
        }
    });
});
