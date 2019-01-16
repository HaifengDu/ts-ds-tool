import { randomizedSelect } from "../randomizedSelect";
describe("randomizedSelect test", () => {
    it("randomizedSelect test", () => {
        expect(randomizedSelect(null, 0)).toBeNull();
        expect(randomizedSelect([], 0)).toBeNull();
        expect(randomizedSelect([1], 0)).toBeNull();
        expect(randomizedSelect([1], 10)).toBeNull();
        const arr = [4, 3, 5, 2, 1, 7];
        expect(randomizedSelect(arr , 1)).toBe(1);
        expect(randomizedSelect(arr, 3)).toBe(3);
        expect(randomizedSelect(arr, arr.length)).toBe(7);

        const randomArr = Array.from({length: 100}, () => Math.random() * 100);
        const sortedArr = randomArr.sort((a, b) => a > b ? 1 : -1);
        expect(randomizedSelect(randomArr , 1)).toBe(sortedArr[0]);
        expect(randomizedSelect(randomArr, 3)).toBe(sortedArr[2]);
        expect(randomizedSelect(randomArr, randomArr.length)).toBe(sortedArr[sortedArr.length - 1]);

        const genArr = Array.from({length: 100}, () => ({key: Math.random() * 100}));
        const genSortedArr = genArr.sort((a, b) => a.key > b.key ? 1 : -1);
        const compare = (a, b) => a.key > b.key;
        expect(randomizedSelect(genArr , 1 , compare)).toBe(genSortedArr[0]);
        expect(randomizedSelect(genArr, 3 , compare)).toBe(genSortedArr[2]);
        expect(randomizedSelect(genArr, genArr.length , compare)).toBe(genSortedArr[genSortedArr.length - 1]);
    });
});
