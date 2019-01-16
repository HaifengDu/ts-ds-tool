import { swap } from "../../../util";
export function selectionSort(arr, key) {
    if (!arr || !arr.length) {
        return arr;
    }
    const len = arr.length;
    let minIndex;
    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i; j < len; j++) {
            const start = arr[minIndex], current = arr[j];
            const condition = key ? start[key] > current[key] : start > current;
            if (condition) {
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}
