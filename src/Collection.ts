import { IEnumerable } from "./interface/IEnumerable";
import IEnumerator from "./interface/IEnumerator";

class CollectionEnumerator<T> implements IEnumerator<T>{
    private index = 0;
    constructor(private array: Array<T>){
    }
    next(): IEnumerator<T> {
        this.index ++;
        return this;
    }
    get Current() {
        return {
            value : this.array[this.index],
            done : this.index === this.array.length - 1,
        };
    }
}

export abstract class Collection<T> implements IEnumerable<T>{
    getEnumerator(): IEnumerator<T> {
        return new CollectionEnumerator(this.toArray());
    }
    public toArray(){
        const arr: Array<T> = [];
        this.__iterate((item, index) => {
            arr[index] = item;
        });
        return arr;
    }

    protected abstract __iterate(fn: (item: T, index: number) => void): void;
}
