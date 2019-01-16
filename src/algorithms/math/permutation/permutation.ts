/**
 * 获取排列组合
 * 排列数公式(n >= m)
 * A(n,m) = n! / (n-m)!
 * @param arr
 * @param shouldLength
 */
export function permutation(arr: Array<any>, shouldLength: number): Array<Array<any>>{
    if (shouldLength === 1){
        return arr.map(item => [item]);
    }
    const result: Array<Array<any>> = [];
    arr.forEach((item, index) => {
        const tempArr = [].concat(arr);
        tempArr.splice(index, 1);
        const smallComs = permutation(tempArr, shouldLength - 1);
        smallComs.forEach((current: any) => {
            result.push([item].concat(current));
        });
    });
    return result;
}
