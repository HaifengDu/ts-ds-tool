import {ArraySet} from "../Set";

test("test arrayset Size to equal 0", () => {
    const arrayset = new ArraySet();
    expect(arrayset.Size).toEqual(0);
});

test("test add func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(12);
    arrayset.add(1);
    expect(arrayset.Size).toEqual(2);
});

test("test has func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(3);
    expect(arrayset.has(null)).toEqual(false);
    expect(arrayset.has(undefined)).toEqual(false);
    expect(arrayset.has(NaN)).toEqual(false);
    expect(arrayset.has(3)).toEqual(true);
    expect(arrayset.has(2)).toEqual(false);
});

test("test findIndex func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(2);
    arrayset.add(3);
    expect(arrayset.findIndex(3)).toEqual(2);
    expect(arrayset.findIndex(NaN)).toEqual(-1);
    expect(arrayset.findIndex(null)).toEqual(-1);
    expect(arrayset.findIndex(undefined)).toEqual(-1);
});

test("test entire func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(2);
    const entires = arrayset.entries();
    expect(arrayset.Size).toEqual(entires.length);
});

test("test remove func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(2);
    arrayset.add(3);
    expect(arrayset.Size).toEqual(3);
    arrayset.remove(3);
    arrayset.remove(5);
    expect(arrayset.Size).toEqual(2);
    expect(arrayset.findIndex(3)).toBe(-1);
});

test("test union func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(3);
    arrayset.add(5);
    const newSet = new ArraySet();
    newSet.add(5);
    newSet.add(6);
    newSet.add(7);
    const union = arrayset.union(newSet);
    expect(union.length).toBe(5);
    expect(union.toString()).toBe("1,3,5,6,7");
});

test("test intersect func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(3);
    arrayset.add(5);
    const newSet = new ArraySet();
    newSet.add(3);
    newSet.add(5);
    newSet.add(7);
    const union = arrayset.intersect(newSet);
    expect(union.length).toBe(2);
    expect(union.toString()).toBe("3,5");
});

test("test diff func", () => {
    const arrayset = new ArraySet();
    arrayset.add(1);
    arrayset.add(3);
    arrayset.add(5);
    const newSet = new ArraySet();
    newSet.add(3);
    newSet.add(5);
    newSet.add(7);
    const union = arrayset.diff(newSet);
    expect(union.length).toBe(1);
    expect(union.toString()).toBe("1");
});
