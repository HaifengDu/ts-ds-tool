export function hash(str) {
    let hashed = 0;
    for (let ii = 0; ii < str.length; ii++) {
        hashed = (31 * hashed + str.charCodeAt(ii)) | 0;
    }
    return smi(hashed);
}
export function toString(value) {
    const type = typeof value;
    if (type === "string") {
        return value;
    }
    else if (type === "number" || type === "boolean" || type === "function") {
        return value.toString();
    }
    return JSON.stringify(value);
}
export function defaultCompare(a, b) {
    return a >= b;
}
export function random(begin, end) {
    return Math.round(Math.random() * (end - begin) + begin);
}
export function swap(arr, i, j) {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}
function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}
