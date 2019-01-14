import { IndexOutOfBoundsException } from "../../../exception/IndexOutOfBoundsException";
import { FenwickTree } from "../FenwickTree";

describe("FenwickTree test", () => {
    test("should create empty fenwick tree", () => {
        const tree = new FenwickTree(5);
        for (let i = 1; i < tree.TreeArray.length ; i++){
            expect(tree.TreeArray[i]).toBe(0);
        }
        expect(tree.Count).toBe(5 + 1);

        const tree2 = new FenwickTree(50);
        expect(tree2.Count).toBe(50 + 1);
    });

    test("should create fenwick tree", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const tree = new FenwickTree(arr.length);
        arr.forEach((item, index) => {
            tree.increase(index + 1, item);
        });
        expect(tree.TreeArray).toEqual([0, 1, 3, 3, 10, 5, 11, 7, 36, 9, 19]);
        expect(() => tree.increase(11, 1)).toThrow(new IndexOutOfBoundsException("Position is out of allowed range"));
        expect(tree.query(1)).toBe(1);
        expect(tree.query(2)).toBe(3);
        expect(tree.query(3)).toBe(6);
        expect(tree.query(4)).toBe(10);
        expect(tree.query(5)).toBe(15);
        expect(tree.query(6)).toBe(21);
        expect(tree.query(7)).toBe(28);
        expect(tree.query(8)).toBe(36);
        expect(tree.query(9)).toBe(45);
        expect(() => tree.query(11)).toThrow(new IndexOutOfBoundsException("Position is out of allowed range"));

        expect(tree.queryRange(1, 1)).toBe(1);
        expect(tree.queryRange(1, 2)).toBe(3);
        expect(tree.queryRange(2, 4)).toBe(9);
        expect(tree.queryRange(6, 9)).toBe(30);

        expect(tree.queryRange(1, 10)).toBe(55);

        expect(() => tree.queryRange(3, 1)).toThrow(new Error("Left index can not be greater then right one"));
    });
});
