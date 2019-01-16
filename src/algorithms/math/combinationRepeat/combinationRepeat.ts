/**
 * 获取重复的组合
 * @param arr
 * @param shouldLength
 */
import { combination } from "../combination/combination";
export function combinationRepeat(arr: Array<any>, shouldLength: number): Array<Array<any>>{
    if (shouldLength === 1){
        return arr.map(item => [item]);
    }
    const result: Array<Array<any>> = [];
    arr.forEach((item, index) => {
        const smallComs = combination(arr.slice(index), shouldLength - 1);
        smallComs.forEach((current: any) => {
            result.push([item].concat(current));
        });
    });
    return result;
}
