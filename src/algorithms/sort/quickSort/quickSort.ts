import { defaultCompare } from "../../../util";
export function quickSort<T>(arr: Array<T>, key?: keyof T): Array<T>{
    sort(arr, 0, arr.length - 1);
    return arr;
    function sort(array: Array<T>, first: number, last: number){
        if (first >= last){
            return;
        }
        const low = first;
        const high = last;

        const middleValue = array[first];
        while (first < last){
            while (first < last && defaultCompare(array[last], middleValue, key)){
                --last;
            }
            array[first] = array[last];

            while (first < last && !defaultCompare(array[first] , middleValue, key)){
                ++first;
            }
            array[last] = array[first];
        }
        array[first] = middleValue;
        sort(array, low, first - 1);
        sort(array, first + 1, high);
    }
}
