import { selectionSort } from "../selectionSort";
test("testselectionSort func", () => {
    expect(selectionSort([])).toEqual([]);
    const numArr = [1, 2, 7, 5, 3, 10, 15, 9];
    selectionSort(numArr);
    expect(numArr).toEqual([1, 2, 3, 5, 7, 9, 10, 15]);
    const objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"}, {lgid: 1, name: "1"}
    , {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
    selectionSort(objArr, "lgid");
    expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2, name: "2"},
        {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
});
