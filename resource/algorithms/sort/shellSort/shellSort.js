import { swap } from "../../../util";
export function shellSort(arr, key) {
    if (!arr || !arr.length) {
        return arr;
    }
    const len = arr.length;
    let i = 1;
    while (Math.floor(len / (2 * i))) {
        const quotient = Math.floor(len / (2 * i));
        for (let j = 0; j < 2 * i; j++) {
            let currentIndex = j;
            while (currentIndex + quotient < len) {
                const current = arr[currentIndex], quotientNext = arr[currentIndex + quotient];
                const condition = key ? quotientNext[key] < current[key] : quotientNext < current;
                if (condition)
                    swap(arr, currentIndex, currentIndex + quotient);
                currentIndex += quotient;
            }
        }
        i++;
    }
}
