export function dpMaxSubArray<T>(arr: Array<T>, key?: keyof T){
    if (!arr || !arr.length){
        return {
            low: -1,
            high: -1,
            sum: -Infinity,
        };
    }
    let boundary = 0;
    let low: number, high: number, maxSum: number = -Infinity;
    let tempBeginIndex = 0;
    for (let index = 0; index < arr.length; index++) {
        const element: any = key ? arr[index][key] : arr[index];
        if (boundary + element > element){
            boundary += element;
        }else{
            boundary = element;
            tempBeginIndex = index;
        }
        if (boundary > maxSum){
            maxSum = boundary;
            high = index;
            low = tempBeginIndex;
        }
    }
    return {
        low,
        high,
        sum: maxSum,
    };
}
