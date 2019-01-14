export function lcstr(text1: string , text2: string){
    /**    { 0 i=j=0
     * f(x){ arr[i - 1,j - 1] + 1  text1[i] == text2[j]
     *     { 0 text1[i] != text2[j]
     */

    if (!text1 || !text2){
        return "";
    }
    const length1 = text1.length;
    const length2 = text2.length;
    const arr = new Array(length1 + 1);
    for (let index = 0; index <= length1; index++) {
        arr[index] = new Array(length2 + 1).fill(0);
    }
    let maxCol = 0,
        maxRow = 0,
        longestLength = 0;
    for (let i = 1; i <= length1; i++) {
        for (let j = 1; j <= length2; j++) {
            if (text1[i - 1] === text2[j - 1]){
                arr[i][j] = arr[i - 1][j - 1] + 1;
            }
            if (arr[i][j] > longestLength){
                longestLength = arr[i][j];
                maxRow = i;
                maxCol = j;
            }
        }
    }
    const subArr: Array<string> = [];
    while (arr[maxRow][maxCol] > 0){
        subArr.unshift(text1[maxRow - 1]);
        maxRow --;
        maxCol --;
    }
    return subArr.join("");
}

export function lcstropt(text1: string , text2: string){
    if (!text1 || !text2){
        return "";
    }
    const length1 = text1.length;
    const length2 = text2.length;
    const arr = new Array(length2 + 1).fill(0);
    const topArr = new Array(length2 + 1).fill(0);
    let maxCol = 0,
        longestLength = 0;
    for (let i = 1; i <= length1; i++) {
        for (let j = 1; j <= length2; j++) {
            if (text1[i - 1] === text2[j - 1]){
                arr[j] = topArr[j - 1] + 1;
            }else{
                arr[j] = 0;
            }
            if (arr[j] > longestLength){
                longestLength = arr[j];
                maxCol = j;
            }
        }
        // 可优化
        for (let k = 0; k < arr.length; k++){
            topArr[k] = arr[k];
        }
    }
    const subArr = [];
    while (longestLength > 0){
        subArr.unshift(text2[maxCol - 1]);
        maxCol --;
        longestLength --;
    }
    return subArr.join("");
}
