/**
 * 获取重复的组合
 * @param arr
 * @param shouldLength
 */
export function combination(arr: Array<any>, shouldLength: number): Array<Array<any>>{
    if (shouldLength === 1){
        return arr.map(item => [item]);
    }
    const result: Array<Array<any>> = [];
    arr.forEach((item, index) => {
        const smallComs = combination(arr.slice(index + 1), shouldLength - 1);
        smallComs.forEach((current: any) => {
            result.push([item].concat(current));
        });
    });
    return result;
}
