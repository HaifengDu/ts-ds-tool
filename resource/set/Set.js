import { AbstractSet } from "../interface/AbstractSet";
export class ArraySet extends AbstractSet {
    constructor() {
        super();
        this.set = [];
        this.count = 0;
    }
    get Size() {
        return this.count;
    }
    has(item) {
        if (item === undefined) {
            return this.set.indexOf(undefined) > -1;
        }
        if (!isNaN(item)) {
            return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item) && !isNaN(model)) > -1;
        }
        return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item)) > -1;
    }
    findIndex(item) {
        if (item === undefined) {
            return this.set.indexOf(item);
        }
        if (!isNaN(item)) {
            return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item)
                && !isNaN(model));
        }
        return this.set.findIndex(model => JSON.stringify(model) === JSON.stringify(item));
    }
    add(item) {
        if (!this.has(item)) {
            this.set.push(item);
            this.count++;
        }
        return this;
    }
    entries() {
        return this.set;
    }
    remove(item) {
        const index = this.findIndex(item);
        if (index > -1) {
            this.set.splice(index, 1);
            this.count--;
            return true;
        }
        return false;
    }
    union(set) {
        return super.union(set);
    }
    intersect(set) {
        return super.intersect(set);
    }
    diff(set) {
        return super.diff(set);
    }
}
