
import { TreeMap } from "../TreeMap";

describe("TreeMap test", () => {
    test("put in TreeMap", () => {
        const treeMap = new TreeMap<any, number>();
        // tslint:disable-next-line:no-empty
        const f1 = function(){};
        treeMap.put(f1, 1);
        expect(treeMap.keys()).toEqual([f1]);
        expect(treeMap.Count).toBe(1);
        treeMap.put(f1, 2);
        expect(treeMap.values()).toEqual([2]);
        const f2 = function(){};
        treeMap.put(f2, 2);
        expect(treeMap.keys()).toEqual([f1, f2]);
        treeMap.put(function(){}, 3);
        treeMap.put(function(){}, 4);
        treeMap.put(function(){}, 5);
        treeMap.put(function(){}, 6);
        treeMap.put(function(){}, 7);
        treeMap.put(function(){}, 8);
        treeMap.put(function(){}, 9);
        treeMap.put(function(){}, 10);
    });
    test("getVal in TreeMap", () => {
        const treeMap = new TreeMap<any, number>();
        expect(treeMap.getVal(function(){})).toBeNull();
        const f1 = function(){};
        treeMap.put(f1, 1);
        // tslint:disable-next-line:no-console
        const f2 = function(){console.log(1111); };
        treeMap.put(f2, 2);
        const f3 = function(){};
        expect(treeMap.getVal(f3)).toBeNull();
        expect(treeMap.getVal(f2)).toBe(2);
    });
    test("clear in TreeMap", () => {
        const treeMap = new TreeMap();
        treeMap.put("test1", 1);
        treeMap.clear();
        expect(treeMap.Count).toBe(0);
        expect(treeMap.getVal("test1")).toBeNull();
    });
    test("remove in TreeMap", () => {
        const treeMap = new TreeMap<any, number>();
        const f1 = function(){};
        treeMap.put(f1, 1);
        const f2 = function(){};
        treeMap.put(f2, 2);
        const f3 = function(){};
        // tslint:disable-next-line:no-console
        expect(treeMap.remove(function(){console.info(11); })).toEqual(false);
        expect(treeMap.remove(f3)).toEqual(false);
        expect(treeMap.remove(f2)).toEqual(true);
        treeMap.remove(f1);
        expect(treeMap.getVal(f1)).toBeNull();
    });
    test("keys in TreeMap", () => {
        const treeMap = new TreeMap<any, number>();
        const f1 = function(){};
        treeMap.put(f1, 1);
        treeMap.put(f1, 2);
        treeMap.put(f1, 4);
        // tslint:disable-next-line:no-console
        const f2 = function(){console.log(1111); };
        treeMap.put(f2, 2);
        const keys = treeMap.keys();
        expect(keys).toEqual([f2, f1]);
    });
    test("values in TreeMap", () => {
        const treeMap = new TreeMap<any, number>();
        const f1 = function(){};
        treeMap.put(f1, 1);
        treeMap.put(f1, 2);
        treeMap.put(f1, 4);
        // tslint:disable-next-line:no-console
        const f2 = function(){console.log(1111); };
        treeMap.put(f2, 2);
        const values = treeMap.values();
        expect(values).toEqual([2, 4]);
    });
    test("contains in TreeMap", () => {
        const treeMap = new TreeMap();
        expect(treeMap.contains("test")).toEqual(false);
        treeMap.put("test1", 1);
        expect(treeMap.contains("test1")).toEqual(true);
    });

});
