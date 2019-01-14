import { AbstractSet } from "../../interface/AbstractSet";
import { TreeSet } from "../TreeSet";

describe("TreeSet test", () => {
    test("init in TreeSet", () => {
        const treeSet = new TreeSet<{lgid: number, [index: string]: number}>("lgid");
        treeSet.add({lgid: 3, id: 3});
        treeSet.add({lgid: 3, id: 4});
        expect(treeSet.entries()).toEqual([{lgid: 3, id: 3}]);
    });
    test("add in TreeSet", () => {
        const treeSet = new TreeSet();
        treeSet.add(5);
        expect(treeSet.entries()).toEqual([5]);
        treeSet.add(5);
        expect(treeSet.entries()).toEqual([5]);
        treeSet.add(8);
        treeSet.add(6);
        expect(treeSet.entries()).toEqual([5, 6, 8]);
    });
    test("entries in TreeSet", () => {
        const treeSet = new TreeSet();
        treeSet.add(5);
        treeSet.add(6);
        treeSet.add(8);
        const treeSetEntries = treeSet.entries();
        expect(treeSetEntries).toEqual([5, 6, 8]);
    });
    test("has in TreeSet", () => {
        const treeSet = new TreeSet();
        const treeSetNoHas = treeSet.has(5);
        expect(treeSetNoHas).toEqual(false);
        treeSet.add(5);
        const treeSetHas = treeSet.has(5);
        expect(treeSetHas).toEqual(true);
    });
    test("remove in TreeSet", () => {
        const treeSet = new TreeSet();
        const noRemove = treeSet.remove(5);
        expect(noRemove).toEqual(false);
        treeSet.add(5);
        const remove = treeSet.remove(5);
        expect(remove).toEqual(true);
        expect(treeSet.Size).toBe(0);
    });
    test("diff in TreeSet", () => {
        const treeSet = new TreeSet();
        treeSet.add(5);
        treeSet.add(8);
        treeSet.add(9);
        treeSet.add(14);
        const diffSet = new TreeSet();
        const noDiff = treeSet.diff(diffSet);
        expect(noDiff).toEqual([5, 8, 9, 14]);
        diffSet.add(5);
        diffSet.add(6);
        diffSet.add(9);
        const diff = treeSet.diff(diffSet);
        expect(diff).toEqual([8, 14]);
    });
    test("union in TreeSet", () => {
        const treeSet = new TreeSet();
        treeSet.add(5);
        treeSet.add(8);
        treeSet.add(9);
        treeSet.add(14);
        const unionSet = new TreeSet();
        const noUnion = treeSet.union(unionSet);
        expect(noUnion).toEqual([5, 8, 9, 14]);
        unionSet.add(5);
        unionSet.add(6);
        unionSet.add(9);
        const union = treeSet.union(unionSet);
        expect(union).toEqual([5, 8, 9, 14, 6]);
    });
    test("intersect in TreeSet", () => {
        const treeSet = new TreeSet();
        treeSet.add(5);
        treeSet.add(8);
        treeSet.add(9);
        treeSet.add(14);

        const intersectSet = new TreeSet();
        const noIntersect = treeSet.intersect(intersectSet);
        expect(noIntersect).toEqual([]);
        intersectSet.add(5);
        intersectSet.add(6);
        intersectSet.add(9);
        const intersect = treeSet.intersect(intersectSet);
        expect(intersect).toEqual([5, 9]);

        intersectSet.add(14);
        const intersectLarge = treeSet.intersect(intersectSet);
        expect(intersectLarge).toEqual([5, 9, 14]);
    });
});
