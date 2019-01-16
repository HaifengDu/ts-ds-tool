export function combination(arr, shouldLength) {
    if (shouldLength === 1) {
        return arr.map(item => [item]);
    }
    const result = [];
    arr.forEach((item, index) => {
        const smallComs = combination(arr.slice(index + 1), shouldLength - 1);
        smallComs.forEach((current) => {
            result.push([item].concat(current));
        });
    });
    return result;
}
