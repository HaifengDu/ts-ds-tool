export class Heap {
    constructor() {
        this.container = [];
    }
    get Size() {
        return this.container.length;
    }
    getLeftChildIndex(parent) {
        return (2 * parent) + 1;
    }
    getRigthChildIndex(parent) {
        return (2 * parent) + 2;
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    getLeftChild(parent) {
        return this.container[this.getLeftChildIndex(parent)];
    }
    getRightChild(parent) {
        return this.container[this.getRigthChildIndex(parent)];
    }
    getParent(index) {
        return this.container[this.getParentIndex(index)];
    }
    hasLeftChild(parent) {
        return this.getLeftChildIndex(parent) < this.container.length;
    }
    hasRightChild(parent) {
        return this.getRigthChildIndex(parent) < this.container.length;
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    swap(indexOne, indexTwo) {
        const temp = this.container[indexTwo];
        this.container[indexTwo] = this.container[indexOne];
        this.container[indexOne] = temp;
    }
    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex || this.container.length - 1;
        while (this.hasParent(currentIndex) && !this.compare(this.getParent(currentIndex), this.container[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }
    heapifyDown(customStartIndex) {
        let currentIndex = customStartIndex || 0;
        let nextIndex = null;
        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex)
                && this.compare(this.getRightChild(currentIndex), this.getLeftChild(currentIndex))) {
                nextIndex = this.getRigthChildIndex(currentIndex);
            }
            else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }
            if (this.compare(this.container[currentIndex], this.container[nextIndex])) {
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }
    poll() {
        if (this.container.length === 0) {
            return null;
        }
        if (this.container.length === 1) {
            return this.container.pop();
        }
        const item = this.container[0];
        this.container[0] = this.container.pop();
        this.heapifyDown();
        return item;
    }
    peek() {
        if (this.container.length === 0) {
            return null;
        }
        return this.container[0];
    }
    add(item) {
        this.container.push(item);
        this.heapifyUp();
        return this;
    }
    remove(item) {
        const numberOfItemsToRemove = this.findAll(item).length;
        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            const indexToRemove = this.findAllIndex(item).pop();
            if (indexToRemove === (this.container.length - 1)) {
                this.container.pop();
            }
            else {
                this.container[indexToRemove] = this.container.pop();
                const parentItem = this.getParent(indexToRemove);
                if (this.hasLeftChild(indexToRemove) &&
                    (!parentItem || this.compare(parentItem, this.container[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                }
                else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }
        return numberOfItemsToRemove > 0;
    }
    toString() {
        return this.container.toString();
    }
    isEmpty() {
        return !this.container.length;
    }
    find(arg) {
        let temp = null;
        for (let index = 0; index < this.container.length; index++) {
            const element = this.container[index];
            const match = typeof arg === "function" ? arg(element) : arg === element;
            if (match) {
                temp = element;
                break;
            }
        }
        return temp;
    }
    findAll(arg) {
        const temp = [];
        this.container.forEach(item => {
            const match = typeof arg === "function" ? arg(item) : arg === item;
            if (match) {
                temp.push(item);
            }
        });
        return temp;
    }
    clear() {
        this.container.length = 0;
    }
    entries() {
        return [...this.container];
    }
    findAllIndex(arg) {
        const temp = [];
        this.container.forEach((item, index) => {
            const match = typeof arg === "function" ? arg(item) : arg === item;
            if (match) {
                temp.push(index);
            }
        });
        return temp;
    }
}
