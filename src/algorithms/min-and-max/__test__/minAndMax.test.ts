import { minAndMax } from "../minAndMax";
describe("minAndMax test", () => {
    it("minAndMax test", () => {
        expect(minAndMax(null)).toBeNull();
        expect(minAndMax([])).toBeNull();
        const arr: Array<number> = [];
        for (let index = 0; index < 10; index++) {
            arr.push(Math.random() * 10);
        }

        let result = minAndMax(arr);
        expect(result.min).toBe(Math.min.apply(null, arr));
        expect(result.max).toBe(Math.max.apply(null, arr));

        for (let index = 0; index < 19; index++) {
            arr.push(Math.random() * 10);
        }

        result = minAndMax(arr);
        expect(result.min).toBe(Math.min.apply(null, arr));
        expect(result.max).toBe(Math.max.apply(null, arr));

        const arrGen = arr.concat(arr).map(item => ({ key: item }));
        const temp = arrGen[0];
        arrGen[0] = arrGen[1];
        arrGen[1] = temp;
        const genResult = minAndMax<{key: number}>(arrGen , (a, b) => a.key > b.key);
        expect(genResult.min.key).toBe(Math.min.apply(null, arr));
        expect(genResult.max.key).toBe(Math.max.apply(null, arr));

    });
});
