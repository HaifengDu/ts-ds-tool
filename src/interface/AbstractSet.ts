export abstract class AbstractSet<T>{
    public abstract add(item: T): this;
    public abstract entries(): Array<T>;
    public abstract remove(item: T): boolean;
    public abstract has(item: T): boolean;
    public abstract get Size(): number;
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
        for (const element of smallItems) {
            if (largeSet.has(element)){
                result.push(element);
            }
        }
        return result;
    }

    public isEmpty(){
        return this.Size === 0;
    }
}
