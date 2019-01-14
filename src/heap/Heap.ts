export abstract class Heap<T>{
    private container: Array<T> = [];

    public get Size(){
        return this.container.length;
    }

    private getLeftChildIndex(parent: number){
        return (2 * parent) + 1;
    }

    private getRigthChildIndex(parent: number){
        return (2 * parent) + 2;
    }

    private getParentIndex(index: number){
        return Math.floor((index - 1) / 2);
    }

    private getLeftChild(parent: number){
        return this.container[this.getLeftChildIndex(parent)];
    }

    private getRightChild(parent: number){
        return this.container[this.getRigthChildIndex(parent)];
    }

    private getParent(index: number){
        return this.container[this.getParentIndex(index)];
    }

    private hasLeftChild(parent: number){
        return this.getLeftChildIndex(parent) < this.container.length;
    }

    private hasRightChild(parent: number){
        return this.getRigthChildIndex(parent) < this.container.length;
    }

    private hasParent(index: number){
        return this.getParentIndex(index) >= 0;
    }

    private swap(indexOne: number, indexTwo: number){
        const temp = this.container[indexTwo];
        this.container[indexTwo] = this.container[indexOne];
        this.container[indexOne] = temp;
    }

    private heapifyUp(customStartIndex?: number){
        /**
         * desc
         * 比较子节点和父节点大小，交换
         */
        let currentIndex = customStartIndex || this.container.length - 1;
        while (this.hasParent(currentIndex) && !this.compare(this.getParent(currentIndex),
         this.container[currentIndex])){
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    private heapifyDown(customStartIndex?: number){
        /**
         * desc
         * 1、取左右节点 比较大小 取索引
         * 2、比较当前节点和第一步所取的索引，交换元素或跳出
         */
        let currentIndex = customStartIndex || 0;
        let nextIndex: number = null;
        while (this.hasLeftChild(currentIndex)){
            if (this.hasRightChild(currentIndex)
            && this.compare(this.getRightChild(currentIndex), this.getLeftChild(currentIndex))){
                nextIndex = this.getRigthChildIndex(currentIndex);
            }else{
                nextIndex = this.getLeftChildIndex(currentIndex);
            }
            if (this.compare(this.container[currentIndex], this.container[nextIndex])){
                break;
            }
            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    // public getContainer(){
    //     return this.container;
    // }

    // NOTE:查看 binomialheap，leftist-tree
    // public union(heap:Heap<T>){
    //     const mergeThreshold = 100;
    //     if(heap.Size - this.Size > mergeThreshold){
    //         const arr = this.container;
    //         const heapArr = heap.getContainer();
    //         for (let index = 0; index < heapArr.length; index++) {
    //             this.add(heapArr[index]);
    //         }
    //         for (let index = 0; index < arr.length; index++) {
    //             this.add(arr[index]);
    //         }
    //     }else{
    //         while(heap.Size){
    //             this.add(heap.poll());
    //         }
    //     }
    // }

    public poll(){
        if (this.container.length === 0){
            return null;
        }
        if (this.container.length === 1){
            return this.container.pop();
        }
        const item = this.container[0];
        this.container[0] = this.container.pop();
        this.heapifyDown();
        return item;
    }

    public peek() {
        if (this.container.length === 0) {
        return null;
        }

        return this.container[0];
    }

    public add(item: T){
        this.container.push(item);
        this.heapifyUp();
        return this;
    }

    public remove(item: ((item: T) => boolean)|T) {
        const numberOfItemsToRemove = this.findAll(item).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
          const indexToRemove = this.findAllIndex(item).pop();
          if (indexToRemove === (this.container.length - 1)) {
            this.container.pop();
          } else {
            this.container[indexToRemove] = this.container.pop();

            const parentItem = this.getParent(indexToRemove);

            if (this.hasLeftChild(indexToRemove) && !parentItem){
              this.heapifyDown(indexToRemove);
            } else {
              this.heapifyUp(indexToRemove);
            }
          }
        }

        return numberOfItemsToRemove > 0;
    }

    public toString() {
        return this.container.toString();
    }

    public isEmpty(){
        return !this.container.length;
    }

    public find(arg: ((item: T) => boolean)|T){
        let temp: T = null;
        this.container.forEach(item => {
            const match = typeof arg === "function" ? arg(item) : arg === item;
            if (match){
                temp = item;
                return false;
            }
            return true;
        });
        return temp;
    }

    public findAll(arg: ((item: T) => boolean)|T){
        const temp: Array<T> = [];
        this.container.forEach(item => {
            const match = typeof arg === "function" ? arg(item) : arg === item;
            if (match){
                temp.push(item);
            }
        });
        return temp;
    }

    public clear(){
        this.container.length = 0;
    }

    public entries(){
        return [...this.container];
    }

    private findAllIndex(arg: ((item: T) => boolean)|T){
        const temp: Array<number> = [];
        this.container.forEach((item, index) => {
            const match = typeof arg === "function" ? arg(item) : arg === item;
            if (match){
                temp.push(index);
            }
        });
        return temp;
    }

    protected abstract compare(a: any, b: any): boolean;
}
