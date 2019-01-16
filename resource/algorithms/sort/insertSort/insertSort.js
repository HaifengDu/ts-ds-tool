import { swap } from "../../../util";
export function insertSort(arr, key) {
    if (!arr || !arr.length) {
        return arr;
    }
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        let j = i;
        while (j > 0) {
            const current = arr[j], prev = arr[j - 1];
            const condition = key ? current[key] < prev[key] : current < prev;
            if (condition)
                swap(arr, j, j - 1);
            j--;
        }
    }
    return arr;
}
