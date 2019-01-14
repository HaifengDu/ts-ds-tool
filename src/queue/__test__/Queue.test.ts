import { Queue } from "../Queue";

describe("Queue test", () => {
    test("should create empty queue", () => {
        const queue = new Queue<number>();
        expect(queue.isEmpty()).toBe(true);
        expect(queue.peek()).toBeNull();
        expect(queue.dequeue()).toBeNull();
    });

    test("should enqueue data to queue", () => {
        const queue = new Queue<number>();
        queue.enqueue(3);
        queue.enqueue(5);
        expect(queue.toString()).toBe("3,5");
    });

    test("should dequeue data to queue", () => {
        const queue = new Queue<number>();
        queue.enqueue(3);
        queue.enqueue(5);
        expect(queue.toString()).toBe("3,5");

        expect(queue.dequeue()).toBe(3);
        expect(queue.dequeue()).toBe(5);
    });

    test("should peek data to queue", () => {
        const queue = new Queue<number>();
        queue.enqueue(3);
        expect(queue.peek()).toBe(3);
        queue.enqueue(5);
        expect(queue.peek()).toBe(3);
    });

    test("should check if queue is empty", () => {
        const queue = new Queue<number>();
        queue.enqueue(3);
        expect(queue.isEmpty()).toBe(false);
        queue.dequeue();
        expect(queue.isEmpty()).toBe(true);
    });

    test("test toArray func", () => {
        const queue = new Queue<number>();
        const arr = queue.toArray();
        expect(arr.length).toEqual(0);
        queue.enqueue(1);
        expect(queue.toArray().length).toEqual(1);
    });
});
