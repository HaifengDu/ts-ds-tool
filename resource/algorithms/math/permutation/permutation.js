export function permutation(arr, shouldLength) {
    if (shouldLength === 1) {
        return arr.map(item => [item]);
    }
    const result = [];
    arr.forEach((item, index) => {
        const tempArr = [].concat(arr);
        tempArr.splice(index, 1);
        const smallComs = permutation(tempArr, shouldLength - 1);
        smallComs.forEach((current) => {
            result.push([item].concat(current));
        });
    });
    return result;
}
