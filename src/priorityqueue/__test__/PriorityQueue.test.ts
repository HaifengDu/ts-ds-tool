import PriorityQueue from "../PriorityQueue";

describe("PriorityQueue test", () => {
    test("test enqueue", () => {
        const queue = new PriorityQueue();
        expect(queue.isEmpty()).toEqual(true);
        queue.enqueue(1, 2);
        queue.enqueue(3, 5);
        expect(queue.isEmpty()).toEqual(false);
    });

    test("test dequeue", () => {
        const queue = new PriorityQueue();
        expect(queue.isEmpty()).toEqual(true);
        queue.enqueue(1, 2);
        expect(queue.isEmpty()).toEqual(false);
        queue.dequeue();
        expect(queue.isEmpty()).toEqual(true);
    });

    test("test peek", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 2);
        const head = queue.peek();
        expect(head.Value).toEqual(1);
    });

    test("test toString", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 1);
        queue.enqueue(2, 2);
        expect(queue.toString()).toBe('{"priority":2,"value":2},{"priority":1,"value":1}');
    });

    test("test changePriority", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 2);
        let head = queue.peek();
        expect(head.Priority).toEqual(2);
        queue.changePriority(1, 5);
        head = queue.peek();
        expect(head.Priority).toEqual(5);
    });

    test("test emptyList func", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 1);
        queue.enqueue(2, 2);
        expect(queue.isEmpty()).toEqual(false);
        queue.clear();
        expect(queue.isEmpty()).toEqual(true);
    });

    test("test toArray", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 1);
        queue.enqueue(2, 2);
        const array = queue.toArray();
        expect(array).toEqual([2, 1]);
    });

    test("has value", () => {
        const queue = new PriorityQueue();
        queue.enqueue(1, 1);
        queue.enqueue(2, 2);
        expect(queue.has(2)).toBe(true);
        expect(queue.has(3)).toBe(false);
    });
});
