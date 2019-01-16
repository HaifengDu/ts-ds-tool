import { combinationRepeat } from "../combinationRepeat";

test("test combinationRepeat func", () => {
    const arr = [1, 2, 3, 4, 5];
    let result = combinationRepeat(arr, 3);
    expect(result.length).toEqual(20);
    result = combinationRepeat(arr, 1);
    expect(result.length).toEqual(5);
});
