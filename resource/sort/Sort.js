var Sort = (function () {
    function Sort() {
    }
    Sort.selectionSort = function (arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        var minIndex;
        for (var i = 0; i < len; i++) {
            minIndex = i;
            for (var j = i; j < len; j++) {
                var start = arr[minIndex], current = arr[j];
                var condition = key ? start[key] > current[key] : start > current;
                if (condition) {
                    minIndex = j;
                }
            }
            this.swap(arr, i, minIndex);
        }
        return arr;
    };
    Sort.insertSort = function (arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        var len = arr.length;
        for (var i = 1; i < len; i++) {
            var j = i;
            while (j > 0) {
                var current = arr[j], prev = arr[j - 1];
                var condition = key ? current[key] < prev[key] : current < prev;
                if (condition)
                    this.swap(arr, j, j - 1);
                j--;
            }
        }
        ;
        return arr;
    };
    Sort.bubbleSort = function (arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        ;
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                var condition = key ? arr[j][key] > arr[j + 1][key] : arr[j] > arr[j + 1];
                if (condition) {
                    this.swap(arr, j, j + 1);
                }
            }
        }
        return arr;
    };
    Sort.shellSort = function (arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        ;
        var len = arr.length;
        var i = 1;
        while (Math.floor(len / (2 * i))) {
            var quotient = Math.floor(len / (2 * i));
            for (var j = 0; j < 2 * i; j++) {
                var currentIndex = j;
                while (currentIndex + quotient < len) {
                    var current = arr[currentIndex], quotientNext = arr[currentIndex + quotient];
                    var condition = key ? quotientNext[key] < current[key] : quotientNext < current;
                    if (condition)
                        this.swap(arr, currentIndex, currentIndex + quotient);
                    currentIndex += quotient;
                }
                ;
            }
            ;
            i++;
        }
    };
    Sort.mergeSort = function (arr, key) {
        if (!arr || !arr.length) {
            return arr;
        }
        ;
        var len = arr.length;
        if (len < 2) {
            return arr;
        }
        var middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle);
        return this.merge(this.mergeSort(left, key), this.mergeSort(right, key), key);
    };
    Sort.merge = function (left, right, key) {
        var result = [];
        while (left.length > 0 && right.length > 0) {
            var leftLassThanEqualRight = key ? left[0][key] <= right[0][key] : left[0] <= right[0];
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
    };
    Sort.quickSort = function (arr, key) {
        sort(arr, 0, arr.length - 1);
        return arr;
        function sort(arr, first, last) {
            if (first >= last) {
                return;
            }
            var low = first;
            var high = last;
            var middleValue = arr[first];
            while (first < last) {
                while (first < last && Sort.compare(arr[last], middleValue)) {
                    --last;
                }
                arr[first] = arr[last];
                while (first < last && !Sort.compare(arr[first], middleValue)) {
                    ++first;
                }
                arr[last] = arr[first];
            }
            arr[first] = middleValue;
            sort(arr, low, first - 1);
            sort(arr, first + 1, high);
        }
    };
    Sort.compare = function (a, b, key) {
        if (key) {
            return a[key] >= b[key];
        }
        return a > b;
    };
    Sort.swap = function (arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };
    return Sort;
}());
export { Sort };
