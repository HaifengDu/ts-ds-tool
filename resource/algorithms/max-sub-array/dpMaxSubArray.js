export function dpMaxSubArray(arr, key) {
    if (!arr || !arr.length) {
        return {
            low: -1,
            high: -1,
            sum: -Infinity,
        };
    }
    let boundary = 0;
    let low, high, maxSum = -Infinity;
    let tempBeginIndex = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = key ? arr[index][key] : arr[index];
        if (boundary + element > element) {
            boundary += element;
        }
        else {
            boundary = element;
            tempBeginIndex = index;
        }
        if (boundary > maxSum) {
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
