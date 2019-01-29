export abstract class Heap<T>{
    private container: Array<T> = [];

    public get Size(){
        return this.container.length;
    }

    /**
     * 获取左节点索引(2n+1)
     * @param parent
     */
    private getLeftChildIndex(parent: number){
        return (2 * parent) + 1;
    }

    /**
     * 获取右节点索引(2n+2)
     * @param parent
     */
    private getRigthChildIndex(parent: number){
        return (2 * parent) + 2;
    }

    /**
     * 获取父节点索引 当前索引值一半下取整
     * @param index
     */
    private getParentIndex(index: number){
        return Math.floor((index - 1) / 2);
    }

    /**
     * 获取左节点
     * @param parent
     */
    private getLeftChild(parent: number){
        return this.container[this.getLeftChildIndex(parent)];
    }

    /**
     * 获取右节点
     * @param parent
     */
    private getRightChild(parent: number){
        return this.container[this.getRigthChildIndex(parent)];
    }

    /**
     * 获取父节点
     * @param index
     */
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

    /**
     * 从指定节点向上堆化
     * @param customStartIndex 未指定位置默认从最末级开始
     */
    private heapifyUp(customStartIndex?: number){
        // 比较子节点和父节点大小，交换
        let currentIndex = customStartIndex || this.container.length - 1;
        while (this.hasParent(currentIndex) && !this.compare(this.getParent(currentIndex),
         this.container[currentIndex])){
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * 从指定节点向上堆化
     * @param customStartIndex 未指定位置默认从根级开始
     */
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

    /**
     * 弹出堆顶元素
     * @returns T|null
     */
    public poll(){
        if (this.container.length === 0){
            return null;
        }
        if (this.container.length === 1){
            return this.container.pop();
        }
        const item = this.container[0];
        // 将最后一个节点赋值到堆顶，然后向下堆化
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

    /**
     * 添加节点
     * @param item
     */
    public add(item: T){
        // 添加节点到末级，然后向上堆化
        this.container.push(item);
        this.heapifyUp();
        return this;
    }

    /**
     * 删除对应节点
     * @param item
     */
    public remove(item: ((item: T) => boolean)|T) {
        // 查找所有要删除的节点，用于迭代
        const numberOfItemsToRemove = this.findAll(item).length;

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            // 每次查找要删除节点的索引，因为每删除一个值，表中的索引都会发生变化
            const indexToRemove = this.findAllIndex(item).pop();
            // 最后一个节点，直接弹出
            if (indexToRemove === (this.container.length - 1)) {
                this.container.pop();
            } else {
                this.container[indexToRemove] = this.container.pop();

                const parentItem = this.getParent(indexToRemove);

                // 存在子节点并且（是根节点或者满足父级和子级关系） 向下堆化
                // 否则向上堆化
                if (this.hasLeftChild(indexToRemove) &&
                (!parentItem || this.compare(parentItem, this.container[indexToRemove]))){
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

    /**
     * 查找符合条件的节点
     * @param arg T|T=>boolean
     */
    public find(arg: any){
        let temp: T = null;
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < this.container.length; index++) {
            const element = this.container[index];
            const match = typeof arg === "function" ? arg(element) : arg === element;
            if (match){
                temp = element;
                break;
            }
        }
        return temp;
    }

    /**
     * 查找所有符合添加的节点
     * @param arg T|T=>boolean
     */
    public findAll(arg: any){
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

    private findAllIndex(arg: any){
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
