import { dpMaxSubArray } from "../dpMaxSubArray";
import { maxSubArray } from "../maxSubArray";
describe("maxSubArray test", () => {
    it("maxSubArray test", () => {
        const defaultResult = {
            low: -1,
            high: -1,
            sum: -Infinity,
        };
        expect(maxSubArray(null)).toEqual(defaultResult);
        expect(maxSubArray([])).toEqual(defaultResult);

        const arr = [5, -2, 6, -4, 8, 6, -3, 9, -5, -9, 6];
        expect(maxSubArray(arr)).toEqual({
            low: 0,
            high: 7,
            sum: 25,
        });
        const genArr = arr.map(item => ({key: item}));
        expect(maxSubArray(genArr, "key")).toEqual({
            low: 0,
            high: 7,
            sum: 25,
        });
    });

    it("dpMaxSubArray test", () => {
        const defaultResult = {
            low: -1,
            high: -1,
            sum: -Infinity,
        };
        expect(dpMaxSubArray(null)).toEqual(defaultResult);
        expect(dpMaxSubArray([])).toEqual(defaultResult);

        const arr = [5, -2, 6, -4, 8, 6, -3, 9, -5, -9, 6];
        expect(dpMaxSubArray(arr)).toEqual({
            low: 0,
            high: 7,
            sum: 25,
        });
        const genArr = arr.map(item => ({key: item}));
        expect(dpMaxSubArray(genArr, "key")).toEqual({
            low: 0,
            high: 7,
            sum: 25,
        });
    });
});
