import { defaultCompare } from "../../util";
export function minAndMax(arr, compare = defaultCompare) {
    if (!arr || !arr.length) {
        return null;
    }
    const length = arr.length;
    let min, max;
    let beginIndex = 0;
    if (length & 1) {
        beginIndex = 1;
        min = max = arr[0];
    }
    else {
        beginIndex = 2;
        min = compare(arr[0], arr[1]) ? arr[1] : arr[0];
        max = min === arr[0] ? arr[1] : arr[0];
    }
    let lt, gt;
    for (let index = beginIndex; index < length; index += 2) {
        const fisrt = arr[index];
        const last = arr[index + 1];
        if (compare(fisrt, last)) {
            lt = last;
            gt = fisrt;
        }
        else {
            lt = fisrt;
            gt = last;
        }
        if (compare(gt, max)) {
            max = gt;
        }
        if (compare(min, lt)) {
            min = lt;
        }
    }
    return {
        min,
        max,
    };
}
