function binarySearch(arr, target, key) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        const mid = parseInt(((start + end) / 2).toString(), 10);
        const value = key ? arr[mid][key] : arr[mid];
        if (value === target) {
            return mid;
        }
        if (target > value) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }
    return -1;
}
export { binarySearch };
