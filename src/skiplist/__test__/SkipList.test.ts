import { SkipList } from "../SkipList";

describe("SkipList test", () => {
    test("should create an empty skiplist", () => {
        const skipList = new SkipList<number>();
        expect(skipList.Count).toBe(0);
        expect(skipList.isEmpty()).toBe(true);
        expect(skipList.Level).toBe(0);
        expect(skipList.Head.getNextLevel()).toBe(0);
    });

    test("should insert item in skiplist", () => {
        const skipList = new SkipList<number>();
        skipList.insert(2);
        expect(skipList.Count).toBe(1);
        expect(skipList.isEmpty()).toBe(false);
        expect(skipList.Level).toBe(1);
        expect(skipList.Head.getNextLevel()).toBe(1);
        skipList.insert(3);
        skipList.insert(3);
        expect(skipList.Count).toBe(2);
        expect(skipList.getSkipTables().length).toBe(skipList.Level);
    });

    test("should find item in skiplist", () => {
        const skipList = new SkipList<number>();
        skipList.insert(2);
        skipList.insert(3);
        skipList.insert(4);
        skipList.insert(5);
        expect(skipList.findNode(3)).not.toBeNull();
        expect(skipList.findNode(3).getItem()).toBe(3);
        expect(skipList.findNode(6)).toBeNull();
        expect(skipList.toString().length).toBeGreaterThan(0);
    });

    test("should delete item in skiplist", () => {
        const skipList = new SkipList<number>();
        skipList.insert(2);
        skipList.insert(3);
        skipList.insert(4);
        skipList.insert(10);
        skipList.insert(5);
        expect(skipList.Count).toBe(5);
        skipList.remove(3);
        expect(skipList.Count).toBe(4);
        skipList.remove(11);
        expect(skipList.Count).toBe(4);
        const table = skipList.getSkipTables()[0];
        if (table.length){
            table.forEach(item => {
                skipList.remove(item.getItem());
            });
            expect(skipList.Level).toBe(0);
        }
    });
    test("should find time in skiplist", () => {
        const arr = [];
        const skipList = new SkipList<number>();
        for (let i = 0; i < 3000; i++){
            arr.push(i);
            skipList.insert(i);
        }
        const startdate1 = Date.now();
        for (let i = 0; i < 3000; i++){
            arr.find(item => item === 2999);
        }
        const enddate1 = Date.now();

        const startdate2 = Date.now();
        for (let i = 0; i < 3000; i++){
            skipList.findNode(2999);
        }
        const enddate2 = Date.now();
        expect(enddate2 - startdate2).toBeLessThanOrEqual(enddate1 - startdate1);
    });

    test("should create with compare key in skiplist", () => {
        const skipList = new SkipList<{key: string, value: number}>("value");
        skipList.insert({
            key: "a",
            value: 1,
        });
        skipList.insert({
            key: "a",
            value: 10,
        });
        const node = {
            key: "a",
            value: 5,
        };
        skipList.insert(node);
        expect(skipList.Count).toBe(3);
        skipList.remove(node);
        expect(skipList.Count).toBe(2);
    });
});
