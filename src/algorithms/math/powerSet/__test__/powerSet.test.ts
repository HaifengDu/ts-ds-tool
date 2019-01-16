import { powerSet } from "../powerSet";
test("test powerSet func", () => {
    const arr = ["A", "B", "C", "D", "E", "F"];
    const result = powerSet(arr);
    expect(result.length).toEqual(64);
});
