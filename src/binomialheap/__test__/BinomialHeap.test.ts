import { BinomialHeap } from "../BinomialHeap";

describe("BinomialHeap test", () => {
    it("should make empty binomial heap", () => {
        const heap = new BinomialHeap();
        expect(heap.Count).toBe(0);
        expect(heap.Head).toBeUndefined();
        expect(heap.isEmpty()).toBe(true);
        expect(heap.findExtremum()).toBe(null);
        expect(heap.deleteExtremum()).toBe(null);
        expect(heap.union(null)).toBe(heap);
        expect(heap.union(new BinomialHeap())).toBe(heap);
    });

    it("should insert into binomial heap", () => {
        const heap = new BinomialHeap<number>();
        const arr = [3, 2, 5, 8, 5, 9, 7, 6];
        arr.forEach(item => heap.insert(item));
        expect(heap.Count).toBe(arr.length);
        expect(heap.findExtremum()).toBe(2);
        heap.insert(1);
        expect(heap.findExtremum()).toBe(1);

        const heap2 = new BinomialHeap<number>((a, b) => a >= b);
        arr.forEach(item => heap2.insert(item));
        expect(heap2.Count).toBe(arr.length);
        expect(heap2.findExtremum()).toBe(9);
        heap2.insert(10);
        expect(heap2.findExtremum()).toBe(10);

        const heap3 = new BinomialHeap<{key: number, value: number}>((a, b) => a.key <= b.key);
        const arr2 = arr.map((item, index) => ({key: item, value: index}));
        arr2.forEach(item => heap3.insert(item));
        expect(heap3.Count).toBe(arr.length);
        expect(heap3.findExtremum()).toEqual({key: 2, value: 1});
        heap3.insert({key: 1, value: 10});
        expect(heap3.findExtremum()).toEqual({key: 1, value: 10});
    });

    it("should delete extremum in binomial heap", () => {
        const heap = new BinomialHeap<number>();
        const arr = [3, 2, 5, 8, 5, 9, 7, 6];
        arr.forEach(item => heap.insert(item));
        let delArr: Array<number> = [];
        expect(heap.isEmpty()).toBe(false);
        while (heap.Count){
            delArr.push(heap.deleteExtremum());
        }
        expect(delArr).toEqual([2, 3, 5, 5, 6, 7, 8, 9]);
        expect(heap.Count).toBe(0);
        expect(heap.isEmpty()).toBe(true);

        const heap2 = new BinomialHeap<number>((a, b) => a >= b);
        arr.forEach(item => heap2.insert(item));
        delArr = [];
        expect(heap2.isEmpty()).toBe(false);
        while (heap2.Count){
            delArr.push(heap2.deleteExtremum());
        }
        expect(delArr).toEqual([9, 8, 7, 6, 5, 5, 3, 2]);
        expect(heap2.Count).toBe(0);
        expect(heap2.isEmpty()).toBe(true);

        const heap3 = new BinomialHeap<{key: number, value: number}>((a, b) => a.key <= b.key);
        const arr2 = arr.map((item, index) => ({key: item, value: index}));
        arr2.forEach(item => heap3.insert(item));
        const delArr2: Array<{key: number, value: number}> = [];
        expect(heap3.isEmpty()).toBe(false);
        while (heap3.Count){
            delArr2.push(heap3.deleteExtremum());
        }
        expect(delArr2.map(item => item.key)).toEqual([2, 3, 5, 5, 6, 7, 8, 9]);
        expect(heap3.Count).toBe(0);
        expect(heap3.isEmpty()).toBe(true);
    });

    it("should clear in binomial heap", () => {
        const heap = new BinomialHeap<number>();
        const arr = [3, 2, 5, 8, 5, 9, 7, 6];
        arr.forEach(item => heap.insert(item));
        expect(heap.Count).toBe(arr.length);
        expect(heap.isEmpty()).toBe(false);
        heap.clear();
        expect(heap.Count).toBe(0);
        expect(heap.isEmpty()).toBe(true);
    });
});
