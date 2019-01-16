export function powerSet(arr, allPowerSets = [], currentPowerSets = [], position = 0) {
    if (position === 0) {
        allPowerSets.push([]);
    }
    for (let i = position; i < arr.length; i++) {
        currentPowerSets.push(arr[i]);
        allPowerSets.push([...currentPowerSets]);
        powerSet(arr, allPowerSets, currentPowerSets, i + 1);
        currentPowerSets.pop();
    }
    return allPowerSets;
}
