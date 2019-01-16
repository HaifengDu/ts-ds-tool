import { combination } from "../combination";
test("test combination func", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = combination(arr, 3);
    expect(result.length).toEqual(10);
});
