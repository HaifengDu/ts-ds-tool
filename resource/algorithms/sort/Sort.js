export class Sort {
    static selectionSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        const len = arr.length;
        let minIndex;
        for (let i = 0; i < len; i++) {
            minIndex = i;
            for (let j = i; j < len; j++) {
                const start = arr[minIndex], current = arr[j];
                const condition = key ? start[key] > current[key] : start > current;
                if (condition) {
                    minIndex = j;
                }
            }
            this.swap(arr, i, minIndex);
        }
        return arr;
    }
    static insertSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        const len = arr.length;
        for (let i = 1; i < len; i++) {
            let j = i;
            while (j > 0) {
                const current = arr[j], prev = arr[j - 1];
                const condition = key ? current[key] < prev[key] : current < prev;
                if (condition)
                    this.swap(arr, j, j - 1);
                j--;
            }
        }
        return arr;
    }
    static bubbleSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        const len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                const condition = key ? arr[j][key] > arr[j + 1][key] : arr[j] > arr[j + 1];
                if (condition) {
                    this.swap(arr, j, j + 1);
                }
            }
        }
        return arr;
    }
    static shellSort(arr, key) {
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
                        this.swap(arr, currentIndex, currentIndex + quotient);
                    currentIndex += quotient;
                }
            }
            i++;
        }
    }
    static mergeSort(arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        const len = arr.length;
        if (len < 2) {
            return arr;
        }
        const middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle);
        return this.merge(this.mergeSort(left, key), this.mergeSort(right, key), key);
    }
    static merge(left, right, key) {
        const result = [];
        while (left.length > 0 && right.length > 0) {
            const leftLassThanEqualRight = key ? left[0][key] <= right[0][key] : left[0] <= right[0];
            if (leftLassThanEqualRight) {
                result.push(left.shift());
            }
            else {
                result.push(right.shift());
            }
        }
        while (left.length) {
            result.push(left.shift());
        }
        while (right.length) {
            result.push(right.shift());
        }
        return result;
    }
    static quickSort(arr, key) {
        sort(arr, 0, arr.length - 1);
        return arr;
        function sort(array, first, last) {
            if (first >= last) {
                return;
            }
            const low = first;
            const high = last;
            const middleValue = array[first];
            while (first < last) {
                while (first < last && Sort.compare(array[last], middleValue)) {
                    --last;
                }
                array[first] = array[last];
                while (first < last && !Sort.compare(array[first], middleValue)) {
                    ++first;
                }
                array[last] = array[first];
            }
            array[first] = middleValue;
            sort(array, low, first - 1);
            sort(array, first + 1, high);
        }
    }
    static compare(a, b, key) {
        if (key) {
            return a[key] >= b[key];
        }
        return a > b;
    }
    static swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
