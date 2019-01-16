import { swap } from "../../../util";
/**
 * 冒泡排序
 * @param arr
 * @param key
 */
export function bubbleSort<T>(arr: Array<T>, key?: keyof T){
    if (!arr || !arr.length){
        return arr;
    }
    const len = arr.length;
    for (let i = 0 ; i < len - 1 ; i++){
        for (let j = 0; j < len - 1 - i; j++){
            const condition = key ? arr[j][key] > arr[j + 1][key] : arr[j] > arr[j + 1];
            if (condition){
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}
