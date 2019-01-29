export abstract class AbstractSet<T>{
    public abstract add(item: T): this;
    public abstract entries(): Array<T>;
    public abstract remove(item: T): boolean;
    public abstract has(item: T): boolean;
    public abstract get Size(): number;

    /**
     * 获取左差集
     * @param set
     * @returns Array<T>
     */
    public diff(set: AbstractSet<T>){
        if (!set){
            return this.entries();
        }
        const items = this.entries();
        const result: Array<T> = [];
        for (const element of items) {
            if (!set.has(element)){
                result.push(element);
            }
        }
        return result;
    }

    /**
     * 获取并集
     * @param set
     * @returns Array<T>
     */
    public union(set: AbstractSet<T>){
        if (!set){
            return this.entries();
        }
        const items = set.entries();
        const thisItems = this.entries();
        for (const element of items) {
            if (!this.has(element)){
                thisItems.push(element);
            }
        }
        return thisItems;
    }

    /**
     * 获取交集
     * @param set
     * @returns Array<T>
     */
    public intersect(set: AbstractSet<T>){
        if (!set){
            return [];
        }
        const result: Array<T> = [];
        let largeSet: AbstractSet<T>, smallItems: Array<T>;
        if (this.Size > set.Size){
            largeSet = this;
            smallItems = set.entries();
        }else{
            largeSet = set;
            smallItems = this.entries();
        }
        // 遍历大的集合取两个集合的交集
        for (const element of smallItems) {
            if (largeSet.has(element)){
                result.push(element);
            }
        }
        return result;
    }

    /**
     * 判断是否为空集合
     * @returns boolean
     */
    public isEmpty(){
        return this.Size === 0;
    }
}
