import { defaultCompare } from "../../util";

/**
 * 快速求最大最小数   3*floor(n/2)
 * @param arr
 * @param compare
 */
export function minAndMax<T>(arr: Array<T>, compare: (a: T, b: T) => boolean = defaultCompare){
    if (!arr || !arr.length){
        return null;
    }
    const length = arr.length;
    let min: T, max: T;
    let beginIndex = 0;
    // 奇数时从第二个开始
    // tslint:disable-next-line:no-bitwise
    if (length & 1){
        beginIndex = 1;
        min = max = arr[0];
    }else{
        // 偶数时从第三个开始
        beginIndex = 2;
        min = compare(arr[0], arr[1]) ? arr[1] : arr[0];
        max = min === arr[0] ? arr[1] : arr[0];
    }

    let lt: T, gt: T;
    for (let index = beginIndex; index < length; index += 2) {
        const fisrt = arr[index];
        const last = arr[index + 1];
        if (compare(fisrt, last)){
            lt = last;
            gt = fisrt;
        }else{
            lt = fisrt;
            gt = last;
        }
        if (compare(gt , max)){
            max = gt;
        }
        if (compare(min , lt)){
            min = lt;
        }
    }
    return {
        min,
        max,
    };
}
