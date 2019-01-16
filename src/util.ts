// from http://jsperf.com/hashing-strings
export function hash(str: string){
    let hashed = 0;
    for (let ii = 0; ii < str.length; ii++) {
        hashed = (31 * hashed + str.charCodeAt(ii)) | 0;
    }
    return smi(hashed);
}

export function toString(value: any) {
    const type = typeof value;
    if (type === "string") {
      return value;
    } else if (type === "number" || type === "boolean" || type === "function") {
      return value.toString();
    }
    return JSON.stringify(value);
}

/**
 * 默认比较函数
 * @param a
 * @param b
 */
export function defaultCompare<T>(a: T, b: T, key?: keyof T){
    if (key){
        return a[key] >= b[key];
    }
    return a >= b;
}

/**
 * 默认比较函数
 * a === b => 0,
 * a > b => 1,
 * a < b => -1,
 * @param a
 * @param b
 * @returns number
 */
export function defaultEqualCompare<T>(a: T, b: T){
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
}

/**
 * 创建比较函数
 * 1、<string>key => (a, b) => defaultCompare(a[key], b[key])
 * 2、<function>key => key;
 * 2、<undefined>key => defaultCompare
 * @param key
 */
// export function createCompare<T>(key ?: IEqualCompare<T> | (keyof T)){
//     let compare = defaultEqualCompare as IEqualCompare<T>;
//     if (typeof key === "string") {
//         compare = (a, b) => defaultEqualCompare(a[key], b[key]);
//     }
//     if (typeof key === "function") {
//         compare = key;
//     }
//     return compare;
// }

/**
 * 创建随机数
 * @param begin 开始数值
 * @param end 结束数值
 */
export function random(begin: number, end: number){
    return Math.round(Math.random() * (end - begin) + begin);
}

/**
 * 交换函数
 * @param arr
 * @param i
 * @param j
 */
export function swap(arr: Array<any> , i: number , j: number){
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

// v8 has an optimization for storing 31-bit signed numbers.
// Values which have either 00 or 11 as the high order bits qualify.
// This function drops the highest order bit in a signed number, maintaining
// the sign bit.
function smi(i32: number) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}
