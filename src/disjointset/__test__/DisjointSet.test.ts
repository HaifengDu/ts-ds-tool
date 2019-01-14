import { NotFindInSetException } from "../../exception/NotFindInSetException";
import { DisjointSet } from "../DisjointSet";
import { DisjointSetItem } from "../DisjointSetItem";

describe("DisjointSet test", () => {
    test("should throw error when trying to union and check not existing sets", () => {
        const disjointSet = new DisjointSet();
        expect(() => {
            disjointSet.union("A", "B");
        }).toThrowError(new NotFindInSetException());
        expect(() => {
            disjointSet.inSameSet("A", "B");
        }).toThrowError(new NotFindInSetException());
    });

    test("should add basic key in disjoint set", () => {
        const disjointSet = new DisjointSet();
        expect(disjointSet.find("A")).toBeNull();
        expect(disjointSet.find("B")).toBeNull();

        disjointSet.makeSet("A");
        expect(disjointSet.find("A")).toBe("A");
        expect(disjointSet.find("B")).toBeNull();
        disjointSet.makeSet("B");
        expect(disjointSet.find("B")).toBe("B");

        expect(disjointSet.inSameSet("A", "B")).toBe(false);

        disjointSet.makeSet("C");
        disjointSet.makeSet("C");

        disjointSet.union("A", "B");
        expect(disjointSet.find("B")).toBe("A");
        expect(disjointSet.find("A")).toBe("A");
        expect(disjointSet.find("C")).toBe("C");

        expect(disjointSet.inSameSet("A", "B")).toBe(true);
        expect(disjointSet.inSameSet("A", "C")).toBe(false);
        expect(disjointSet.inSameSet("B", "C")).toBe(false);

        disjointSet.union("A", "A");
        disjointSet.union("B", "C");

        expect(disjointSet.find("B")).toBe("A");
        expect(disjointSet.find("A")).toBe("A");
        expect(disjointSet.find("C")).toBe("A");

        expect(disjointSet.inSameSet("A", "B")).toBe(true);
        expect(disjointSet.inSameSet("A", "C")).toBe(true);
        expect(disjointSet.inSameSet("B", "C")).toBe(true);

        disjointSet
        .makeSet("AB")
        .makeSet("AC")
        .makeSet("AD")
        .makeSet("AE")
        .makeSet("AF")
        .makeSet("AG");

        disjointSet
        .union("AB", "AC")
        .union("AC", "AD")
        .union("AD", "AE")
        .union("AE", "AF")
        .union("AF", "AG");

        expect(disjointSet.inSameSet("AB", "AC")).toBe(true);
        expect(disjointSet.inSameSet("AB", "AD")).toBe(true);
        expect(disjointSet.inSameSet("AB", "AE")).toBe(true);
        expect(disjointSet.inSameSet("AB", "AF")).toBe(true);
        expect(disjointSet.inSameSet("AB", "AG")).toBe(true);

        expect(disjointSet.find("AC")).toBe("AB");
        expect(disjointSet.find("AD")).toBe("AB");
        expect(disjointSet.find("AE")).toBe("AB");
        expect(disjointSet.find("AF")).toBe("AB");
        expect(disjointSet.find("AG")).toBe("AB");
    });

    test("should item in set getChildren", () => {
        const disjointSetItem = new DisjointSetItem<string>("A");
        expect(disjointSetItem.getChildren().map(item => item.Value)).toEqual([]);
        disjointSetItem.addChild(new DisjointSetItem<string>("B"));
        const C = new DisjointSetItem<string>("C");
        C.setParent(disjointSetItem);

        expect(disjointSetItem.getChildren().map(item => item.Value)).toEqual(["B", "C"]);
    });

    test("should union smaller set with bigger one then making bigger one to root", () => {
        const disjointSet = new DisjointSet();
        disjointSet
        .makeSet("A")
        .makeSet("B")
        .makeSet("C");
        disjointSet.union("B", "A");
        disjointSet.union("C", "B");
        expect(disjointSet.find("A")).toBe("B");
        expect(disjointSet.find("C")).toBe("B");
    });

    test("should add custom key in disjoint set", () => {
        const disjointSet = new DisjointSet<{key: string, value: number}>("key");
        const A = {key: "A", value: 1};
        const B = {key: "B", value: 2};
        const C = {key: "C", value: 3};
        expect(disjointSet.find(A)).toBeNull();
        expect(disjointSet.find(B)).toBeNull();

        disjointSet.makeSet(A);
        expect(disjointSet.find(A)).toBe("A");
        expect(disjointSet.find(B)).toBeNull();
        disjointSet.makeSet(B);
        expect(disjointSet.find(B)).toBe("B");

        expect(disjointSet.inSameSet(A, B)).toBe(false);

        disjointSet.makeSet(C);

        disjointSet.union(A, B);
        expect(disjointSet.find(B)).toBe("A");
        expect(disjointSet.find(A)).toBe("A");
        expect(disjointSet.find(C)).toBe("C");

        expect(disjointSet.inSameSet(A, B)).toBe(true);
        expect(disjointSet.inSameSet(A, C)).toBe(false);
        expect(disjointSet.inSameSet(B, C)).toBe(false);

        disjointSet.union(A, A);
        disjointSet.union(B, C);

        expect(disjointSet.find(B)).toBe("A");
        expect(disjointSet.find(A)).toBe("A");
        expect(disjointSet.find(C)).toBe("A");

        expect(disjointSet.inSameSet(A, B)).toBe(true);
        expect(disjointSet.inSameSet(A, C)).toBe(true);
        expect(disjointSet.inSameSet(B, C)).toBe(true);
    });
});
