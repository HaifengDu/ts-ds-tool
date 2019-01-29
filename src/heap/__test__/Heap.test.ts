import { MaxHeap } from "../MaxHeap";
import { MinHeap } from "../MinHeap";

describe("MaxHeap test", () => {
    test("should create an empty max heap", () => {
        const maxHeap = new MaxHeap<number>();
        expect(maxHeap).toBeDefined();
        expect(maxHeap.peek()).toBeNull();
        expect(maxHeap.isEmpty()).toBe(true);
    });

    test("should add items to the heap and heapify it up", () => {
        const maxHeap = new MaxHeap<number>();
        maxHeap.add(10);
        expect(maxHeap).toBeDefined();
        expect(maxHeap.isEmpty()).toBe(false);
        expect(maxHeap.peek()).toBe(10);
        expect(maxHeap.toString()).toBe("10");

        maxHeap.add(5);
        expect(maxHeap.peek()).toBe(10);
        expect(maxHeap.toString()).toBe("10,5");

        maxHeap.add(12);
        expect(maxHeap.peek()).toBe(12);
        expect(maxHeap.toString()).toBe("12,5,10");

        maxHeap.add(3);
        expect(maxHeap.peek()).toBe(12);
        expect(maxHeap.toString()).toBe("12,5,10,3");

        maxHeap.add(7);
        expect(maxHeap.peek()).toBe(12);
        expect(maxHeap.toString()).toBe("12,7,10,3,5");

        expect(maxHeap.poll()).toBe(12);
        expect(maxHeap.toString()).toBe("10,7,5,3");

        expect(maxHeap.poll()).toBe(10);
        expect(maxHeap.toString()).toBe("7,3,5");

        expect(maxHeap.poll()).toBe(7);
        expect(maxHeap.toString()).toBe("5,3");

        expect(maxHeap.poll()).toBe(5);
        expect(maxHeap.toString()).toBe("3");

        expect(maxHeap.poll()).toBe(3);
        expect(maxHeap.isEmpty()).toBe(true);
    });

    test("should find items in heap", () => {
        const maxHeap = new MaxHeap<number>();
        maxHeap.add(5);
        maxHeap.add(12);
        maxHeap.add(7);
        expect(maxHeap.find(item => item === 5)).not.toBeNull();
        expect(maxHeap.find(5)).not.toBeNull();
        expect(maxHeap.findAll(item => item === 5)).toEqual([5]);
        expect(maxHeap.findAll(5)).toEqual([5]);
    });

    test("should poll empty to heap", () => {
        const maxHeap = new MaxHeap<number>();
        maxHeap.add(5);
        expect(maxHeap.poll()).toBe(5);
        expect(maxHeap.poll()).toBeNull();
    });

    test("should entries to heap", () => {
        const maxHeap = new MaxHeap<number>();
        maxHeap.add(5);
        maxHeap.add(7);
        expect(maxHeap.entries()).toEqual([7, 5]);
    });
});

describe("MinHeap test", () => {
    test("should create an empty max heap", () => {
        const minHeap = new MinHeap<number>();
        expect(minHeap).toBeDefined();
        expect(minHeap.peek()).toBeNull();
        expect(minHeap.isEmpty()).toBe(true);
    });

    test("should add items to the heap and heapify it up", () => {
        const minHeap = new MinHeap<number>();
        minHeap.add(10);
        expect(minHeap.isEmpty()).toBe(false);
        expect(minHeap.peek()).toBe(10);

        minHeap.add(5);
        expect(minHeap.peek()).toBe(5);
        expect(minHeap.toString()).toBe("5,10");

        minHeap.add(7);
        expect(minHeap.peek()).toBe(5);
        expect(minHeap.toString()).toBe("5,10,7");

        minHeap.add(8);
        expect(minHeap.peek()).toBe(5);
        expect(minHeap.toString()).toBe("5,8,7,10");

        minHeap.add(3);
        expect(minHeap.peek()).toBe(3);
        expect(minHeap.toString()).toBe("3,5,7,10,8");

        expect(minHeap.poll()).toBe(3);
        expect(minHeap.toString()).toBe("5,8,7,10");

        expect(minHeap.poll()).toBe(5);
        expect(minHeap.toString()).toBe("7,8,10");

        expect(minHeap.poll()).toBe(7);
        expect(minHeap.toString()).toBe("8,10");

        expect(minHeap.poll()).toBe(8);
        expect(minHeap.toString()).toBe("10");

        expect(minHeap.poll()).toBe(10);
        expect(minHeap.toString()).toBe("");
        expect(minHeap.isEmpty()).toBe(true);
    });

    test("MinHeap delete test", () => {
        const minHeap = new MinHeap<number>();
        minHeap.add(5);
        minHeap.add(15);
        minHeap.remove(5);
        expect(minHeap.find(5)).toBeNull();
        minHeap.add(5);
        minHeap.add(7);
        minHeap.remove(5);
        expect(minHeap.find(5)).toBeNull();
        minHeap.add(12);
        minHeap.add(6);
        minHeap.remove(6);
        minHeap.remove(item => item === 12);
        minHeap.remove(15);
        minHeap.remove(7);
        expect(minHeap.find(15)).toBeNull();
        expect(minHeap.Size).toBe(0);

        minHeap.add(6);
        minHeap.add(8);
        minHeap.add(10);
        minHeap.add(14);
        minHeap.add(5);
        minHeap.add(7);

        minHeap.remove(6);
        minHeap.remove(10);
        minHeap.remove(5);
        minHeap.remove(14);
        minHeap.remove(8);
        minHeap.remove(7);

        expect(minHeap.Size).toBe(0);
    });

    test("MinHeap empty test", () => {
        const minHeap = new MinHeap<number>();
        minHeap.add(5);
        minHeap.add(15);
        minHeap.clear();
        expect(minHeap.Size).toBe(0);
    });
});

describe("Heap Gen test", () => {
    test("MaxHeap Gen test", () => {
        const maxHeap = new MaxHeap<{value: number}>("value");
        maxHeap.add({value: 10});
        expect(maxHeap).toBeDefined();
        expect(maxHeap.isEmpty()).toBe(false);
        expect(maxHeap.peek()).toEqual({value: 10});

        maxHeap.add({value: 5});
        expect(maxHeap.peek()).toEqual({value: 10});

        maxHeap.add({value: 12});
        expect(maxHeap.peek()).toEqual({value: 12});

        maxHeap.add({value: 3});
        expect(maxHeap.peek()).toEqual({value: 12});

        maxHeap.add({value: 7});
        expect(maxHeap.peek()).toEqual({value: 12});

        expect(maxHeap.poll()).toEqual({value: 12});
        expect(maxHeap.poll()).toEqual({value: 10});
        expect(maxHeap.poll()).toEqual({value: 7});
        expect(maxHeap.poll()).toEqual({value: 5});
        expect(maxHeap.poll()).toEqual({value: 3});

        expect(maxHeap.isEmpty()).toBe(true);
    });

    test("MinHeap Gen test", () => {
        const minHeap = new MinHeap<{value: number}>("value");
        minHeap.add({value: 10});
        expect(minHeap.isEmpty()).toBe(false);
        expect(minHeap.peek()).toEqual({value: 10});

        minHeap.add({value: 5});
        expect(minHeap.peek()).toEqual({value: 5});

        minHeap.add({value: 7});
        expect(minHeap.peek()).toEqual({value: 5});

        minHeap.add({value: 8});
        expect(minHeap.peek()).toEqual({value: 5});

        minHeap.add({value: 3});
        expect(minHeap.peek()).toEqual({value: 3});

        expect(minHeap.poll()).toEqual({value: 3});
        expect(minHeap.poll()).toEqual({value: 5});
        expect(minHeap.poll()).toEqual({value: 7});
        expect(minHeap.poll()).toEqual({value: 8});
        expect(minHeap.poll()).toEqual({value: 10});

        expect(minHeap.isEmpty()).toBe(true);
    });
});
