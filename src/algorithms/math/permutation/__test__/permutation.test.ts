import { permutation } from "../permutation";

test("test permutation func", () => {
    const arr = ["A", "B", "C", "D", "E"];
    let result = permutation(arr, 3);
    expect(result.length).toEqual(60);
    result = permutation(arr, 1);
    expect(result.length).toEqual(5);
});
