export function levenshteinDistance(text1, text2) {
    const length1 = text1.length;
    const length2 = text2.length;
    const distanceArr = new Array(length1 + 1).fill(0).map(() => new Array(length2 + 1).fill(0));
    for (let i = 0; i <= length1; i++) {
        distanceArr[i][0] = i;
    }
    for (let j = 0; j <= length2; j++) {
        distanceArr[0][j] = j;
    }
    for (let i = 1; i <= length1; i++) {
        for (let j = 1; j <= length2; j++) {
            const flag = text1[i - 1] === text2[j - 1] ? 0 : 1;
            distanceArr[i][j] = Math.min(distanceArr[i][j - 1] + 1, distanceArr[i - 1][j] + 1, distanceArr[i - 1][j - 1] + flag);
        }
    }
    return distanceArr[length1][length2];
}
