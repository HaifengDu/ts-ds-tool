import { binarySearch } from "../binarySearch";

describe("binary search test", () => {
    it("should search item in empty array", () => {
        const defaultCompare = a =>  a === 0 ? 0 : a > 0 ? 1 : -1;
        expect(binarySearch(null, null)).toBe(-1);
        expect(binarySearch(null, undefined)).toBe(-1);
        expect(binarySearch(undefined, null)).toBe(-1);
        expect(binarySearch(undefined, undefined)).toBe(-1);
        expect(binarySearch(null, 0)).toBe(-1);
        expect(binarySearch(undefined, 0)).toBe(-1);
        expect(binarySearch([], 0)).toBe(-1);
        expect(binarySearch(null, 0)).toBe(-1);
        expect(binarySearch(undefined, 0)).toBe(-1);
        expect(binarySearch([], 0)).toBe(-1);
        expect(binarySearch(null, defaultCompare)).toBe(-1);
        expect(binarySearch(undefined, defaultCompare)).toBe(-1);
        expect(binarySearch([], defaultCompare)).toBe(-1);
    });

    it("should search false key in array", () => {
        expect(binarySearch([1, 2, 3, 4, 5], null)).toBe(-1);
        expect(binarySearch([1, 2, 3, 4, 5], undefined)).toBe(-1);
    });

    it("should search key in array", () => {
        const defaultCompare = value => key =>  key === value ? 0 : key > value ? -1 : 1;
        expect(binarySearch([1, 2, 3, 4, 5], 2)).toBe(1);
        expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
        expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(-1);
        expect(binarySearch([1, 2, 3, 4, 5], 0)).toBe(-1);

        expect(binarySearch([1, 2, 3, 4, 5], defaultCompare(2))).toBe(1);
        expect(binarySearch([1, 2, 3, 4, 5], defaultCompare(3))).toBe(2);
        expect(binarySearch([1, 2, 3, 4, 5], defaultCompare(6))).toBe(-1);
        expect(binarySearch([1, 2, 3, 4, 5], defaultCompare(0))).toBe(-1);
    });
});
