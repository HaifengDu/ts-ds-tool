import { swap } from "../../../util";
/**
 * 插入排序
 * @param arr
 * @param key
 */
export function insertSort<T>(arr: Array<T>, key?: keyof T){
    if (!arr || !arr.length){
        return arr;
    }
    const len = arr.length;
    for (let i = 1 ; i < len ; i++){
        let j = i;

        while (j > 0){
            const current = arr[j],
                prev = arr[j - 1];
            const condition = key ? current[key] < prev[key] : current < prev;
            // tslint:disable-next-line:curly
            if (condition) swap(arr, j, j - 1);
            j--;
        }
    }
    return arr;
}
