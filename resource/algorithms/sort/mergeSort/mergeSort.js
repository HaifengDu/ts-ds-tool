export function mergeSort(arr, key) {
    if (!arr || !arr.length) {
        return arr;
    }
    const len = arr.length;
    if (len < 2) {
        return arr;
    }
    function merge(left, right, key) {
        const result = [];
        while (left.length > 0 && right.length > 0) {
            const leftLassThanEqualRight = key ? left[0][key] <= right[0][key] : left[0] <= right[0];
            if (leftLassThanEqualRight) {
                result.push(left.shift());
            }
            else {
                result.push(right.shift());
            }
        }
        while (left.length) {
            result.push(left.shift());
        }
        while (right.length) {
            result.push(right.shift());
        }
        return result;
    }
    const middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle);
    return merge(this.mergeSort(left, key), this.mergeSort(right, key), key);
}
