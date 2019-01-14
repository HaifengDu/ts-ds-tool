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
    combination(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(item => [item]);
        }
        const result = [];
        arr.forEach((item, index) => {
            const smallComs = this.combination(arr.slice(index + 1), shouldLength - 1);
            smallComs.forEach(current => {
                result.push([item].concat(current));
            });
        });
        return result;
    }
    comRepeat(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(item => [item]);
        }
        const result = [];
        arr.forEach((item, index) => {
            const smallComs = this.combination(arr.slice(index), shouldLength - 1);
            smallComs.forEach(current => {
                result.push([item].concat(current));
            });
        });
        return result;
    }
    perAndCom(arr, shouldLength) {
        if (shouldLength === 1) {
            return arr.map(item => [item]);
        }
        const result = [];
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
    powerSet(arr, allPowerSets = [], currentPowerSets = [], position = 0) {
        if (position === 0) {
            allPowerSets.push([]);
        }
        for (let i = position; i < arr.length; i++) {
            currentPowerSets.push(arr[i]);
            allPowerSets.push([...currentPowerSets]);
            this.powerSet(arr, allPowerSets, currentPowerSets, i + 1);
            currentPowerSets.pop();
        }
        return allPowerSets;
    }
}
