import { AbstractSet } from "../interface/AbstractSet";

export class ArraySet<T> extends AbstractSet<T>{
    private set: Array<T>;
    private count: number;
    constructor(){
        super();
        this.set = [];
        this.count = 0;
    }

    public get Size(){
        return this.count;
    }

    /**
     * 判断集合是否有元素
     * @param item
     * @returns boolean
     */
    public has(item: T): boolean{
        if (item === undefined){
            return this.set.indexOf(undefined) > -1;
        }
        if (!isNaN((item as any))){
            return this.set.findIndex(model =>
                JSON.stringify(model) === JSON.stringify(item) && !isNaN((model as any))) > -1;
        }
        return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item)) > -1;
    }

    /**
     * 获取元素index
     * @param item
     * @returns number
     */
    public findIndex(item: T): number{
        if (item === undefined){
            return this.set.indexOf(item);
        }
        if (!isNaN((item as any))){
            return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item)
            && !isNaN((model as any)));
        }
        return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item));
    }

    /**
     * 向集合中添加元素
     * @param item
     * @returns ArraySet
     */
    public add(item: T){
        if (!this.has(item)){
            this.set.push(item);
            this.count++;
        }
        return this;
    }

    /**
     * 获取集合
     * @returns Array<T>
     */
    public entries(): Array<T> {
        return this.set;
    }

    /**
     * 删除集合中的某一元素
     * @param item
     * @returns boolean
     */
    public remove(item: T){
        const index = this.findIndex(item);
        if (index > -1){
            this.set.splice(index, 1);
            this.count--;
            return true;
        }
        return false;
    }

    /**
     * 获取并集
     * @param set
     * @returns Array<T>
     */
    public union(set: AbstractSet<T>): Array<T>{
        return super.union(set);
    }

    public intersect(set: AbstractSet<T>): Array<T>{
        return super.intersect(set);
    }

    /**
     * 获取左差集
     * @param set
     * @returns Array<T>
     */
    public diff(set: AbstractSet<T>): Array<T>{
        return super.diff(set);
    }
}
