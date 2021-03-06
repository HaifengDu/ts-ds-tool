import { ICompareOne } from "../../interface/ICompare";
import { defaultEqualCompare } from "../../util";

function binarySearch<T>(arr: Array<T>, target: T | ICompareOne<T>) {
    if (!arr || !arr.length) {
        return -1;
    }
    let start = 0;
    let end = arr.length - 1;
    const compare =
    typeof target === "function" ? (target as ICompareOne<T>) : (a: T) => defaultEqualCompare(target, a);
    while (start <= end) {
        const mid = parseInt(((start + end) / 2).toString(), 10);
        const compareResult = compare(arr[mid]);
        if (compareResult === 0) {
            return mid;
        }
        if (compareResult === 1) {
            start = mid + 1;
        }else {
            end = mid - 1;
        }
    }
    return -1;
}
export {binarySearch};
