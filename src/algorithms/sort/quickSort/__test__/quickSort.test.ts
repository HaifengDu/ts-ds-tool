import { quickSort } from "../quickSort";

test("test quickSort func", () => {
    expect(quickSort([])).toEqual([]);
    let numArr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    numArr = quickSort(numArr);
    expect(numArr).toEqual([2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]);
    let objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"},
    {lgid: 1, name: "1"}, {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
    objArr = quickSort(objArr, "lgid");
    expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2,
        name: "2"}, {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
});
