/**
 * 获取集合的幂集
 * @param arr
 */
export function powerSet(arr: Array<any>, allPowerSets: Array<any>= [], currentPowerSets: Array<any>= [], position = 0){
    if (position === 0){
        allPowerSets.push([]);
    }
    for (let i = position; i < arr.length; i++){
        currentPowerSets.push(arr[i]);
        allPowerSets.push([...currentPowerSets]);
        powerSet(arr, allPowerSets, currentPowerSets, i + 1);
        currentPowerSets.pop();
    }
    return allPowerSets;
}
