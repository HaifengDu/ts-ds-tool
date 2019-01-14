export function maxSubArray(arr, key) {
    if (!arr || !arr.length) {
        return {
            low: -1,
            high: -1,
            sum: -Infinity,
        };
    }
    return divideConquerMaxSubArray(arr, 0, arr.length - 1, key);
}
function divideConquerMaxSubArray(arr, low, high, key) {
    const getValTemp = getVal(key);
    if (low === high) {
        return {
            low,
            high,
            sum: getValTemp(arr[low]),
        };
    }
    const mid = Math.floor((low + high) / 2);
    const left = divideConquerMaxSubArray(arr, low, mid, key);
    const right = divideConquerMaxSubArray(arr, mid + 1, high, key);
    const cross = crossMaxSubArray(arr, low, mid, high, key);
    if (left.sum >= right.sum && left.sum >= cross.sum) {
        return left;
    }
    if (right.sum >= left.sum && right.sum >= cross.sum) {
        return right;
    }
    return cross;
}
function getVal(key) {
    if (key) {
        return (val) => val[key];
    }
    return (val) => val;
}
function crossMaxSubArray(arr, low, mid, high, key) {
    const getValTemp = getVal(key);
    let leftMax = -Infinity;
    let sumLeft = 0;
    let maxLeftIndex;
    for (let i = mid; i >= low; i--) {
        sumLeft += getValTemp(arr[i]);
        if (sumLeft > leftMax) {
            leftMax = sumLeft;
            maxLeftIndex = i;
        }
    }
    let rightMax = -Infinity;
    let sumRight = 0;
    let maxRightIndex;
    for (let i = mid + 1; i <= high; i++) {
        sumRight += getValTemp(arr[i]);
        if (sumRight > rightMax) {
            rightMax = sumRight;
            maxRightIndex = i;
        }
    }
    return {
        low: maxLeftIndex,
        high: maxRightIndex,
        sum: leftMax + rightMax,
    };
}
