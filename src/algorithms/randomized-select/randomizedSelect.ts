import { defaultCompare, random, swap } from "../../util";

export function randomizedSelect<T>(arr: Array<T> , i: number , compare: (a: T, b: T) => boolean = defaultCompare){
    if (!arr || !arr.length || i <= 0 || i > arr.length){
        return null;
    }
    const tempArr = Array.prototype.slice.call(arr);
    return select(tempArr, 0, tempArr.length - 1, i);

    function select(array: Array<T>, start: number, end: number , num: number): T{
        if (start === end){
            return array[start];
        }

        const index = random(start , end);
        swap(array, start , index);
        const middle = partition(array , start , end);
        const lowNum = middle - start + 1;
        if (num === lowNum){
            return array[middle];
        }else if (num < lowNum){
            return select(array , start , middle - 1 , num);
        }else{
            return select(array , middle + 1 , end , num - lowNum);
        }
    }

    function partition(array: Array<T>, p: number, r: number) {
        const x = array[p];
        let currentIndex = p;
        for (let j = p + 1; j <= r; j++){
            if (compare(x , array[j])) {
                currentIndex++;
                swap(array, currentIndex, j);
            }
        }
        swap(array, currentIndex, p);
        return currentIndex;
    }
}
