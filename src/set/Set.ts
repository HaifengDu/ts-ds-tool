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

    public add(item: T){
        if (!this.has(item)){
            this.set.push(item);
            this.count++;
        }
        return this;
    }

    public entries(): Array<T> {
        return this.set;
    }

    public remove(item: T){
        const index = this.findIndex(item);
        if (index > -1){
            this.set.splice(index, 1);
            this.count--;
            return true;
        }
        return false;
    }

    public union(set: AbstractSet<T>): Array<T>{
        return super.union(set);
    }

    public intersect(set: AbstractSet<T>): Array<T>{
        return super.intersect(set);
    }

    public diff(set: AbstractSet<T>): Array<T>{
        return super.diff(set);
    }

    /**
     * 获取不重复的组合
     * 组合数公式(n >= m)
     * C(n,m) = n! / m!(n-m)!
     * @param arr
     * @param shouldLength
     */
    public combination(arr: Array<any>, shouldLength: number): Array<Array<any>>{
        if (shouldLength === 1){
            return arr.map(item => [item]);
        }
        const result: Array<Array<any>> = [];
        arr.forEach((item, index) => {
            const smallComs = this.combination(arr.slice(index + 1), shouldLength - 1);
            smallComs.forEach(current => {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    /**
     * 获取重复的组合
     * @param arr
     * @param shouldLength
     */
    public comRepeat(arr: Array<any>, shouldLength: number): Array<Array<any>>{
        if (shouldLength === 1){
            return arr.map(item => [item]);
        }
        const result: Array<Array<any>> = [];
        arr.forEach((item, index) => {
            const smallComs = this.combination(arr.slice(index), shouldLength - 1);
            smallComs.forEach(current => {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    /**
     * 获取排列组合
     * 排列数公式(n >= m)
     * A(n,m) = n! / (n-m)!
     * @param arr
     * @param shouldLength
     */
    public perAndCom(arr: Array<any>, shouldLength: number): Array<Array<any>>{
        if (shouldLength === 1){
            return arr.map(item => [item]);
        }
        const result: Array<Array<any>> = [];
        arr.forEach((item, index) => {
            const tempArr = [].concat(arr);
            tempArr.splice(index, 1);
            const smallComs = this.perAndCom(tempArr, shouldLength - 1);
            smallComs.forEach(current => {
                result.push([item].concat(current));
            });
        });
        return result;
    }

    /**
     * 获取集合的幂集
     * @param arr
     */
    public powerSet(arr: Array<any>, allPowerSets: Array<any>= [], currentPowerSets: Array<any>= [], position = 0){
        if (position === 0){
            allPowerSets.push([]);
        }
        for (let i = position; i < arr.length; i++){
            currentPowerSets.push(arr[i]);
            allPowerSets.push([...currentPowerSets]);
            this.powerSet(arr, allPowerSets, currentPowerSets, i + 1);
            currentPowerSets.pop();
        }
        return allPowerSets;
    }
}
