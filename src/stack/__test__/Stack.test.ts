import { Stack } from "../Stack";

describe("Stack test", () => {
    test("push in stack", () => {
        const stack = new Stack();
        stack.push(1);
        expect(stack.peek()).toBe(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
    });
    test("pop in stack", () => {
        const stack = new Stack();
        expect(stack.pop()).toBeNull();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        const popValue1 = stack.pop();
        expect(popValue1).toBe(3);
        expect(stack.peek()).toBe(2);
        const popValue2 = stack.pop();
        expect(popValue2).toBe(2);
        expect(stack.peek()).toBe(1);
        stack.pop();
        expect(stack.isEmpty()).toEqual(true);
    });
    test("peek in stack", () => {
        const stack = new Stack();
        expect(stack.peek()).toBeNull();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.peek()).toBe(3);
    });
    test("isEmpty in stack", () => {
        const stack = new Stack();
        expect(stack.isEmpty()).toEqual(true);
        stack.push(1);
        expect(stack.isEmpty()).toEqual(false);
    });
    test("toString in stack", () => {
        const stack = new Stack();
        stack.push(1);
        expect(stack.toString()).toEqual("1");
    });
    test("toArray in stack", () => {
        const stack = new Stack();
        stack.push(1);
        expect(stack.toArray()).toEqual([1]);
    });
});
