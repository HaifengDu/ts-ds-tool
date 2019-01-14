import { Sort } from "../Sort";

describe("Sort test", () => {
    test("selectionSort in sort", () => {
        expect(Sort.selectionSort([])).toEqual([]);
        const numArr = [1, 2, 7, 5, 3, 10, 15, 9];
        Sort.selectionSort(numArr);
        expect(numArr).toEqual([1, 2, 3, 5, 7, 9, 10, 15]);
        const objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"}, {lgid: 1, name: "1"}
        , {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
        Sort.selectionSort(objArr, "lgid");
        expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2, name: "2"},
         {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
    });
    test("insertSort in sort", () => {
        expect(Sort.insertSort([])).toEqual([]);
        const numArr = [1, 2, 7, 2, 5, 3, 10, 15, 9];
        Sort.insertSort(numArr);
        expect(numArr).toEqual([1, 2, 2, 3, 5, 7, 9, 10, 15]);
        const objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"}, {lgid: 1, name: "1"},
         {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
        Sort.insertSort(objArr, "lgid");
        expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2, name: "2"},
         {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
    });
    test("bubbleSort in sort", () => {
        expect(Sort.bubbleSort([])).toEqual([]);
        const numArr = [7, 1, 2, 7, 2, 5, 3, 10, 15, 9];
        Sort.bubbleSort(numArr);
        expect(numArr).toEqual([1, 2, 2, 3, 5, 7, 7, 9, 10, 15]);
        const objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"},
         {lgid: 1, name: "1"}, {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
        Sort.bubbleSort(objArr, "lgid");
        expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2, name: "2"},
         {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
    });
    test("shellSort in sort", () => {
        expect(Sort.shellSort([])).toEqual([]);
        const numArr = [7, 1, 2, 7, 2, 5, 3, 10, 15, 9];
        Sort.shellSort(numArr);
        expect(numArr).toEqual([1, 2, 2, 3, 5, 7, 7, 9, 10, 15]);
        const objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"},
        {lgid: 1, name: "1"}, {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
        Sort.shellSort(objArr, "lgid");
        expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2, name: "2"},
         {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
    });
    test("MergeSort in sort", () => {
        expect(Sort.mergeSort([])).toEqual([]);
        let numArr = [7, 1, 2, 7, 2, 5, 3, 10, 15, 9, 4];
        numArr = Sort.mergeSort(numArr);
        expect(numArr).toEqual([1, 2, 2, 3, 4, 5, 7, 7, 9, 10, 15]);
        let objArr = [{lgid: 2, name: "2"}, {lgid: 5, name: "5"},
         {lgid: 1, name: "1"}, {lgid: 8, name: "8"}, {lgid: 3, name: "3"}];
        objArr = Sort.mergeSort(objArr, "lgid");
        expect(objArr).toEqual([{lgid: 1, name: "1"}, {lgid: 2,
             name: "2"}, {lgid: 3, name: "3"}, {lgid: 5, name: "5"}, {lgid: 8, name: "8"}]);
    });
});
