export function lcs(text1: string , text2: string){
    if (!text1 || !text2){
        return "";
    }
    const length1 = text1.length;
    const length2 = text2.length;
    const arr = new Array(length1 + 1);
    for (let index = 0; index <= length1; index++) {
        arr[index] = new Array(length2 + 1).fill(0);
    }

    for (let i = 1 ; i <= length1 ; i++){
        for (let j = 1; j <= length2; j++) {
            if (text1[i - 1] === text2[j - 1]){
                arr[i][j] = arr[i - 1][j - 1] + 1;
            }else{
                arr[i][j] = Math.max(arr[i][j - 1], arr[i - 1][j]);
            }
        }
    }
    if (!arr[length1][length2]){
        return "";
    }
    let i = length1 , j = length2;
    const columnArr = [];
    while (i > 0 && j > 0){
        if (text1[i - 1] === text2[j - 1]){
            columnArr.unshift(text1[i - 1]);
            i --;
            j --;
        }else if (arr[i][j] === arr[i][j - 1]){
            j --;
        }else{
            i --;
        }
    }
    return columnArr.join("");
}
